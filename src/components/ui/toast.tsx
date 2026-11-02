"use client";

import * as React from "react";
import { X, CheckCircle2, AlertCircle, AlertTriangle, Info } from "lucide-react";

type ToastType = "success" | "error" | "warning" | "info";

export interface Toast {
  id: string;
  title: string;
  description?: string;
  type: ToastType;
  duration?: number;
}

interface ToastProps {
  toast: Toast;
  onDismiss: (id: string) => void;
}

const ICONS: Record<ToastType, React.ElementType> = {
  success: CheckCircle2,
  error: AlertCircle,
  warning: AlertTriangle,
  info: Info,
};

const TYPE_CLASSES: Record<ToastType, string> = {
  success: "border-emerald-500 text-emerald-900 dark:text-emerald-100",
  error: "border-rose-500 text-rose-900 dark:text-rose-100",
  warning: "border-amber-500 text-amber-900 dark:text-amber-100",
  info: "border-blue-500 text-blue-900 dark:text-blue-100",
};

export function Toast({ toast, onDismiss }: ToastProps) {
  const [timer, setTimer] = React.useState<ReturnType<typeof setTimeout> | null>(null);

  React.useEffect(() => {
    if (toast.duration && toast.duration > 0) {
      setTimer(setTimeout(() => onDismiss(toast.id), toast.duration));
    }
    return () => {
      if (timer) clearTimeout(timer);
    };
  }, [toast.duration, toast.id, onDismiss, timer]);

  const Icon = ICONS[toast.type];

  return (
    <div className="relative flex w-full items-start gap-3 p-4 rounded-xl border bg-card text-foreground shadow-lg transition-all data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-80 data-[state=open]:slide-in-from-bottom-2" data-state="open">
      <div className="relative z-10 flex items-center justify-between space-x-2">
        <div className="flex w-0 flex-1 items-center gap-3">
          <div className="shrink-0 rounded-md p-2">
            <Icon className="h-5 w-5" />
          </div>
          <div>
            <h4 className="font-semibold">{toast.title}</h4>
            {toast.description && (
              <p className="text-xs text-muted-foreground mt-0.5">{toast.description}</p>
            )}
          </div>
        </div>
        <button
          onClick={() => onDismiss(toast.id)}
          className="rounded-md p-1 opacity-0 group-hover:opacity-100 transition-opacity"
          aria-label="Dismiss"
        >
          <X className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}

interface ToastProviderProps {
  children: React.ReactNode;
}

export function ToastProvider({ children }: ToastProviderProps) {
  const [toasts, setToasts] = React.useState<Toast[]>([]);

  const addToast = (toast: Omit<Toast, "id">) => {
    const id = `toast-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`;
    setToasts((prev) => [{ ...toast, id }, ...prev].slice(0, 6));
    return id;
  };

  const dismiss = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  const toastApi = {
      success: (title: string, description?: string) =>
      addToast({ title, description, type: "success", duration: 4000 }),
    error: (title: string, description?: string) =>
      addToast({ title, description, type: "error", duration: 5000 }),
    warning: (title: string, description?: string) =>
      addToast({ title, description, type: "warning", duration: 6000 }),
    info: (title: string, description?: string) =>
      addToast({ title, description, type: "info", duration: 4000 }),
  };

  return (
    <ToastContext.Provider value={{ toasts, dismiss, toast: toastApi }}>
      {children}
      <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-2 pointer-events-none">
        {toasts.map((t) => (
          <Toast key={t.id} toast={t} onDismiss={dismiss} />
        ))}
      </div>
    </ToastContext.Provider>
  );
}

const ToastContext = React.createContext<{
  toasts: Toast[];
  dismiss: (id: string) => void;
  toast: {
    success: (title: string, description?: string) => string;
    error: (title: string, description?: string) => string;
    warning: (title: string, description?: string) => string;
    info: (title: string, description?: string) => string;
  };
} | undefined>(undefined);

export function useToast() {
  const ctx = React.useContext(ToastContext);
  if (!ctx) throw new Error("useToast must be used within a ToastProvider");
  return ctx;
}

