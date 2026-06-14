import React, { createContext, useContext, useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { CheckCircle, AlertTriangle, Info, X, Leaf, Copy } from 'lucide-react';

export type ToastType = 'success' | 'error' | 'warning' | 'info' | 'eco' | 'copy';

export interface Toast {
  id: string;
  message: string;
  type: ToastType;
  duration?: number;
}

interface ToastContextType {
  toast: (message: string, type?: ToastType, duration?: number) => void;
  dismiss: (id: string) => void;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  return context;
};

interface ToastProviderProps {
  children: React.ReactNode;
}

export function ToastProvider({ children }: ToastProviderProps) {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const toast = useCallback((message: string, type: ToastType = 'info', duration = 4000) => {
    const id = Math.random().toString(36).substring(2, 9);
    setToasts((prev) => [...prev, { id, message, type, duration }]);
  }, []);

  const dismiss = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  return (
    <ToastContext.Provider value={{ toast, dismiss }}>
      {children}
      <ToastContainer toasts={toasts} dismiss={dismiss} />
    </ToastContext.Provider>
  );
}

interface ToastContainerProps {
  toasts: Toast[];
  dismiss: (id: string) => void;
}

function ToastContainer({ toasts, dismiss }: ToastContainerProps) {
  return (
    <div className="fixed bottom-6 right-6 z-[9999] flex flex-col gap-3 w-full max-w-[22rem] px-4 pointer-events-none md:px-0">
      <AnimatePresence>
        {toasts.map((item) => (
          <ToastCard key={item.id} item={item} dismiss={dismiss} />
        ))}
      </AnimatePresence>
    </div>
  );
}

function ToastCard({ item, dismiss }: { item: Toast; dismiss: (id: string) => void; key?: string }) {
  const [isHovered, setIsHovered] = useState(false);
  const { id, message, type, duration = 4000 } = item;

  React.useEffect(() => {
    if (isHovered) return;
    const timer = setTimeout(() => {
      dismiss(id);
    }, duration);
    return () => clearTimeout(timer);
  }, [id, duration, dismiss, isHovered]);

  const config = {
    success: {
      bg: 'bg-[#0f1b13]/95',
      border: 'border-emerald-500/40',
      icon: CheckCircle,
      iconColor: 'text-emerald-400',
      glow: 'shadow-[0_10px_30px_rgba(16,185,129,0.15)]',
      accent: 'bg-emerald-500',
    },
    error: {
      bg: 'bg-[#221010]/95',
      border: 'border-rose-500/40',
      icon: AlertTriangle,
      iconColor: 'text-rose-400',
      glow: 'shadow-[0_10px_30px_rgba(244,63,94,0.15)]',
      accent: 'bg-rose-500',
    },
    warning: {
      bg: 'bg-[#21190f]/95',
      border: 'border-amber-500/40',
      icon: AlertTriangle,
      iconColor: 'text-amber-400',
      glow: 'shadow-[0_10px_30px_rgba(245,158,11,0.15)]',
      accent: 'bg-amber-500',
    },
    info: {
      bg: 'bg-[#0c1410]/95',
      border: 'border-sky-500/40',
      icon: Info,
      iconColor: 'text-sky-400',
      glow: 'shadow-[0_10px_30px_rgba(14,165,233,0.15)]',
      accent: 'bg-sky-500',
    },
    eco: {
      bg: 'bg-[#0a1410]/95',
      border: 'border-[#52b788]/40',
      icon: Leaf,
      iconColor: 'text-[#52b788]',
      glow: 'shadow-[0_10px_30px_rgba(82,183,136,0.2)]',
      accent: 'bg-[#52b788]',
    },
    copy: {
      bg: 'bg-[#141209]/95',
      border: 'border-[#ffd700]/40',
      icon: Copy,
      iconColor: 'text-[#ffd700]',
      glow: 'shadow-[0_10px_30px_rgba(255,215,0,0.15)]',
      accent: 'bg-[#ffd700]',
    },
  }[type];

  const IconComponent = config.icon;

  return (
    <motion.div
      initial={{ opacity: 0, y: 25, scale: 0.9 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9, y: 15, transition: { duration: 0.2 } }}
      layout
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`pointer-events-auto relative overflow-hidden rounded-2xl border ${config.bg} ${config.border} ${config.glow} p-4.5 flex gap-4.5 items-start select-none backdrop-blur-md font-manrope max-w-full`}
    >
      {/* Visual Accent top mini-bar */}
      <div className={`absolute top-0 inset-x-0 h-[3px] ${config.accent}`} />

      {/* Styled Icon Box */}
      <div className={`p-2 rounded-xl bg-black/40 ${config.iconColor} shrink-0 shadow-inner`}>
        <IconComponent className="h-4.5 w-4.5" />
      </div>

      {/* Message and Controls */}
      <div className="flex-1 flex flex-col gap-1 min-w-0 pr-2 pt-0.5">
        <p className="text-white text-xs leading-relaxed font-semibold tracking-tight font-manrope">
          {message}
        </p>
      </div>

      {/* Manual Dismiss Cross Button */}
      <button
        onClick={() => dismiss(id)}
        className="p-1 rounded-lg hover:bg-white/10 text-gray-500 hover:text-white transition-all cursor-pointer pointer-events-auto shrink-0 self-start"
        aria-label="Dismiss Notification"
      >
        <X className="h-3.5 w-3.5" />
      </button>

      {/* Breathing background progression line if not hovered */}
      {!isHovered && (
        <motion.div
          className={`absolute bottom-0 left-0 h-[2.5px] ${config.accent} opacity-50`}
          initial={{ width: '100%' }}
          animate={{ width: '0%' }}
          transition={{ duration: duration / 1000, ease: 'linear' }}
        />
      )}
    </motion.div>
  );
}
