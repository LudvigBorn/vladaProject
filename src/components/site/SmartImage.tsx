import Image from "next/image";
import { CraneIcon } from "./Icons";

export function SmartImage({
  src,
  alt,
  className,
  sizes,
  placeholder = "blueprint",
}: {
  src: string | null;
  alt: string;
  className?: string;
  sizes?: string;
  placeholder?: "blueprint" | "flat";
}) {
  if (!src) {
    if (placeholder === "flat") {
      return <div className={`bg-block-blue overflow-hidden ${className ?? ""}`} />;
    }
    return (
      <div className={`blueprint-pattern relative flex items-center justify-center overflow-hidden ${className ?? ""}`}>
        <CraneIcon className="h-1/4 w-1/4 min-h-8 min-w-8 text-white/25" />
      </div>
    );
  }

  return (
    <div className={`relative overflow-hidden ${className ?? ""}`}>
      <Image
        src={src}
        alt={alt}
        fill
        sizes={sizes ?? "100vw"}
        className="object-cover"
      />
    </div>
  );
}
