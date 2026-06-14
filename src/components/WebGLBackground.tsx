import { useEffect, useRef } from 'react';

export default function WebGLBackground() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const gl = canvas.getContext('webgl');
    if (!gl) return;

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
      precision highp float;
      varying vec2 v_texCoord;
      uniform float u_time;
      uniform vec2 u_resolution;

      float noise(vec2 p) {
          return fract(sin(dot(p, vec2(12.9898, 78.233))) * 43758.5453);
      }

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

    gl.useProgram(program);

    const buffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.bufferData(
      gl.ARRAY_BUFFER,
      new Float32Array([-1, -1, 1, -1, -1, 1, -1, 1, 1, -1, 1, 1]),
      gl.STATIC_DRAW
    );

    const positionLoc = gl.getAttribLocation(program, 'position');
    gl.enableVertexAttribArray(positionLoc);
    gl.vertexAttribPointer(positionLoc, 2, gl.FLOAT, false, 0, 0);

    const timeLoc = gl.getUniformLocation(program, 'u_time');
    const resLoc = gl.getUniformLocation(program, 'u_resolution');

    let animationFrameId: number;
    let lastTime = 0;
    const isMobile = typeof navigator !== 'undefined' && /Mobi|Android|iPhone|iPad|iPod/i.test(navigator.userAgent);
    const fpsInterval = isMobile ? 1000 / 30 : 1000 / 60; // 30 FPS on mobile, 60 FPS on desktop works beautifully with fluid motion

    function resize() {
      if (!canvas || !gl) return;
      // High-DPI screen shader optimizations for mobile and desktop
      const dpr = isMobile ? 0.5 : Math.min(window.devicePixelRatio || 1, 1.5);
      canvas.width = Math.floor(window.innerWidth * dpr);
      canvas.height = Math.floor(window.innerHeight * dpr);
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

      // Avoid drawing frames and doing GPU math when the tab is in the background
      if (!isPageVisible) return;

      // Throttling render rate for battery efficiency and temperature protection on mobile
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
      if (gl) {
        gl.deleteProgram(program);
        gl.deleteShader(vs);
        gl.deleteShader(fs);
        gl.deleteBuffer(buffer);
      }
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
}
