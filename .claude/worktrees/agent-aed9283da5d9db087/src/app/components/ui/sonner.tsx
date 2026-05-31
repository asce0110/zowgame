import { Toaster as Sonner, ToasterProps } from "sonner";
import { useTheme } from "../theme-store";

const Toaster = (props: ToasterProps) => {
  const { theme } = useTheme();
  return (
    <Sonner
      theme={theme}
      position="top-right"
      offset={20}
      duration={3200}
      visibleToasts={4}
      toastOptions={{
        unstyled: true,
        classNames: {
          toast:
            "pointer-events-auto relative w-full sm:w-[360px] flex items-start gap-3 p-4 pr-3 rounded-xl border ec-border-brand ec-surface-strong backdrop-blur-xl overflow-hidden isolate",
          title: "ec-text tracking-wider [font-family:Orbitron,sans-serif] font-bold text-[14px] leading-tight",
          description: "ec-text-muted mt-1 leading-relaxed",
          icon: "shrink-0 mt-0.5 text-fuchsia-500",
          actionButton:
            "ml-auto shrink-0 px-3 py-1.5 rounded-md bg-gradient-to-r from-fuchsia-500 to-cyan-400 text-white tracking-widest hover:scale-[1.03] active:scale-95 transition-transform cursor-pointer",
          cancelButton:
            "px-2.5 py-1 rounded-md ec-surface ec-text-faint hover:ec-text ec-hover-surface tracking-widest cursor-pointer",
          closeButton:
            "absolute top-2 right-2 size-6 rounded-md ec-surface ec-hover-surface ec-text-faint hover:ec-text border ec-border transition-colors cursor-pointer",
          success: "border-emerald-400/50",
          error: "border-rose-500/50",
          info: "border-cyan-400/50",
          warning: "border-amber-400/50",
        },
        style: {
          fontFamily: "Rajdhani, sans-serif",
          fontSize: "14px",
          boxShadow: "var(--ec-shadow-card)",
        },
      }}
      style={
        {
          "--toast-close-button-start": "auto",
          "--toast-close-button-end": "8px",
          zIndex: 2147483600,
          pointerEvents: "auto",
        } as React.CSSProperties
      }
      {...props}
    />
  );
};

export { Toaster };
