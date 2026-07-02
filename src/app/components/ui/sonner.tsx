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
            "pointer-events-auto relative w-full sm:w-[360px] flex items-start gap-3 p-4 pr-3 rounded-xl border-2 border-foreground bg-card overflow-hidden isolate shadow-[4px_4px_0_#24312c]",
          title: "text-foreground tracking-wider font-extrabold text-[14px] leading-tight",
          description: "text-muted-foreground mt-1 leading-relaxed font-bold",
          icon: "shrink-0 mt-0.5 text-accent",
          actionButton:
            "ml-auto shrink-0 px-3 py-1.5 rounded-md border-2 border-foreground bg-primary text-primary-foreground font-black tracking-widest hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-[1px_1px_0_#24312c] shadow-[2px_2px_0_#24312c] transition-all cursor-pointer",
          cancelButton:
            "px-2.5 py-1 rounded-md border-2 border-foreground bg-card text-muted-foreground hover:text-foreground font-extrabold tracking-widest cursor-pointer",
          closeButton:
            "absolute top-2 right-2 size-6 rounded-md bg-card border-2 border-foreground text-muted-foreground hover:text-foreground transition-colors cursor-pointer",
          success: "border-emerald-500/50",
          error: "border-rose-500/50",
          info: "border-cyan-400/50",
          warning: "border-amber-400/50",
        },
        style: {
          fontFamily: "Nunito, sans-serif",
          fontSize: "14px",
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
