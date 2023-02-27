export type ToastProps = {
  type: "success" | "error" | "warning" | "info" | "bug";
  title?: string;
  message: string;
  duration?: number;
}