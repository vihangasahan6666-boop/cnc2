import { useEffect, useRef, memo } from 'react';

interface WebGLCacheEntry {
  program: WebGLProgram;
  vs: WebGLShader;
  fs: WebGLShader;
  buffer: WebGLBuffer;
  positionLoc: number;
  timeLoc: WebGLUniformLocation | null;
  resLoc: WebGLUniformLocation | null;
}

// Global WeakMap to cache WebGL compiled resources per rendering context.
// Avoids compiling shaders or linking programs more than once for a given context interface.
// Since the context is held weakly, resources compile immediately on first canvas mount,
// and are seamlessly garbage collected when the canvas/UI is disposed.
const contextCache = new WeakMap<WebGLRenderingContext, WebGLCacheEntry>();

const WebGLBackground = memo(function WebGLBackground() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    // Retrieve high-performance WebGL context with optimized buffer configuration.
    // Specifying alpha: false, depth: false, and stencil: false dramatically reduces GPU memory overhead.
    const gl = canvas.getContext('webgl', {
      alpha: false,
      depth: false,
      stencil: false,
      antialias: false,
      premultipliedAlpha: false,
      preserveDrawingBuffer: false,
      powerPreference: 'high-performance'
    });
    if (!gl) return;

    let cache = contextCache.get(gl);

    if (!cache) {
      const vertexSource = `
        attribute vec2 position;
        varying vec2 v_texCoord;
        void main() {
          v_texCoord = position * 0.5 + 0.5;
          v_texCoord.y = 1.0 - v_texCoord.y;
          gl_Position = vec4(position, 0.0, 1.0);
        }
      `;

      const fragmentSource = `
        precision mediump float;
        varying vec2 v_texCoord;
        uniform float u_time;
        uniform vec2 u_resolution;

        void main() {
            vec2 uv = v_texCoord;
            float t = u_time * 0.08;
            
            float n = sin(uv.x * 4.0 + t) * cos(uv.y * 3.0 - t);
            n += sin(uv.y * 2.0 + t * 0.5) * 0.5;
            n += sin((uv.x + uv.y) * 5.0 + t * 0.8) * 0.2;
            
            vec3 baseColor = vec3(0.04, 0.06, 0.05); 
            vec3 accentColor = vec3(0.06, 0.09, 0.07); 
            
            vec3 finalColor = mix(baseColor, accentColor, n * 0.4 + 0.6);
            
            float dist = distance(uv, vec2(0.5, 0.5));
            finalColor *= 1.0 - dist * 0.45;
            
            gl_FragColor = vec4(finalColor, 1.0);
        }
      `;

      function createShader(gl: WebGLRenderingContext, type: number, source: string) {
        const shader = gl.createShader(type);
        if (!shader) return null;
        gl.shaderSource(shader, source);
        gl.compileShader(shader);
        if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
          console.error('Shader compilation error:', gl.getShaderInfoLog(shader));
          gl.deleteShader(shader);
          return null;
        }
        return shader;
      }

      const vs = createShader(gl, gl.VERTEX_SHADER, vertexSource);
      const fs = createShader(gl, gl.FRAGMENT_SHADER, fragmentSource);
      if (!vs || !fs) return;

      const program = gl.createProgram();
      if (!program) return;
      gl.attachShader(program, vs);
      gl.attachShader(program, fs);
      gl.linkProgram(program);

      if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
        console.error('Program linking error:', gl.getProgramInfoLog(program));
        return;
      }

      const buffer = gl.createBuffer();
      if (!buffer) return;
      gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
      gl.bufferData(
        gl.ARRAY_BUFFER,
        new Float32Array([-1, -1, 1, -1, -1, 1, -1, 1, 1, -1, 1, 1]),
        gl.STATIC_DRAW
      );

      const positionLoc = gl.getAttribLocation(program, 'position');
      const timeLoc = gl.getUniformLocation(program, 'u_time');
      const resLoc = gl.getUniformLocation(program, 'u_resolution');

      cache = {
        program,
        vs,
        fs,
        buffer,
        positionLoc,
        timeLoc,
        resLoc,
      };
      
      contextCache.set(gl, cache);
    }

    // Bind from local CPU registers referencing our cached shader state.
    // Extremely efficient and eliminates hot path lookups.
    const { program, buffer, positionLoc, timeLoc, resLoc } = cache;

    gl.useProgram(program);
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.enableVertexAttribArray(positionLoc);
    gl.vertexAttribPointer(positionLoc, 2, gl.FLOAT, false, 0, 0);

    let animationFrameId: number;
    let lastTime = 0;
    const isMobile = typeof navigator !== 'undefined' && /Mobi|Android|iPhone|iPad|iPod/i.test(navigator.userAgent);
    const fpsInterval = isMobile ? 1000 / 24 : 1000 / 30; // Highly efficient locked render pacing

    function resize() {
      if (!canvas || !gl) return;
      const scaleFactor = isMobile ? 0.08 : 0.125;
      canvas.width = Math.max(128, Math.floor(window.innerWidth * scaleFactor));
      canvas.height = Math.max(128, Math.floor(window.innerHeight * scaleFactor));
      gl.viewport(0, 0, canvas.width, canvas.height);
      if (resLoc) {
        gl.uniform2f(resLoc, canvas.width, canvas.height);
      }
    }

    let resizeTimeout: any;
    function handleResize() {
      if (resizeTimeout) clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(resize, 150);
    }

    let isPageVisible = true;
    function handleVisibilityChange() {
      isPageVisible = document.visibilityState === 'visible';
    }
    document.addEventListener('visibilitychange', handleVisibilityChange);

    window.addEventListener('resize', handleResize, { passive: true });
    resize();

    function render(time: number) {
      if (!gl) return;
      animationFrameId = requestAnimationFrame(render);

      if (!isPageVisible) return;

      const elapsed = time - lastTime;
      if (elapsed < fpsInterval) return;

      lastTime = time - (elapsed % fpsInterval);

      if (timeLoc) {
        gl.uniform1f(timeLoc, time * 0.001);
      }
      gl.drawArrays(gl.TRIANGLES, 0, 6);
    }
    animationFrameId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      if (resizeTimeout) clearTimeout(resizeTimeout);
      // We do not delete programs or shaders here to allow cached state recovery on context re-entry.
      // They are weakly reference-bound and automatically managed by GPU context GC.
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      id="shader-canvas"
      className="fixed inset-0 w-full h-full -z-10 pointer-events-none opacity-80"
      style={{ mixBlendMode: 'normal' }}
    />
  );
});

export default WebGLBackground;
