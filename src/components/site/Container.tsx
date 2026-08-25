export function Container({ className, children }: { className?: string; children: React.ReactNode }) {
  return <div className={`mx-auto w-full max-w-(--container-max) ${className ?? ""}`}>{children}</div>;
}
