import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from "react";

/**
 * Structural/behavioral defaults only — no color, padding, or font-size.
 * Those are entirely up to the className passed at each call site, e.g.:
 *   <Button href="#contact" className="bg-accent-600 px-6 py-3 text-sm font-semibold text-white hover:bg-accent-700">
 */
const BASE_CLASSES = "inline-flex items-center justify-center gap-2 whitespace-nowrap transition-colors";

// Default button width (276px). Skipped automatically if the passed className
// already sets its own w-*/max-w-*/min-w-* — e.g. className="w-auto ..." to
// size to content instead, or className="w-full ..." to fill its parent.
const DEFAULT_WIDTH_CLASS = "w-69";
const HAS_WIDTH_CLASS = /(^|\s)(w-|max-w-|min-w-)/;

function widthClass(className: string | undefined): string {
  return HAS_WIDTH_CLASS.test(className ?? "") ? "" : DEFAULT_WIDTH_CLASS;
}

type SharedProps = {
  children: ReactNode;
  className?: string;
  icon?: ReactNode;
  iconPosition?: "left" | "right";
};

type LinkProps = SharedProps &
  Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "className" | "children" | "href"> & {
    href: string;
    /** Adds target="_blank" rel="noopener noreferrer" for links to other sites. */
    external?: boolean;
  };

type PlainButtonProps = SharedProps &
  Omit<ButtonHTMLAttributes<HTMLButtonElement>, "className" | "children" | "type"> & {
    href?: undefined;
    type?: "button" | "submit";
  };

export type ButtonProps = LinkProps | PlainButtonProps;

function Content({ children, icon, iconPosition }: Pick<SharedProps, "children" | "icon" | "iconPosition">) {
  return (
    <>
      {icon && iconPosition !== "right" ? icon : null}
      {children}
      {icon && iconPosition === "right" ? icon : null}
    </>
  );
}

export function Button(props: ButtonProps) {
  const classes = `${BASE_CLASSES} ${widthClass(props.className)} ${props.className ?? ""}`;

  if (props.href !== undefined) {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars -- pulled out so it isn't spread onto the element below
    const { href, external, children, icon, iconPosition, className, ...anchorProps } = props;
    return (
      <a
        href={href}
        className={classes}
        {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
        {...anchorProps}
      >
        <Content icon={icon} iconPosition={iconPosition}>
          {children}
        </Content>
      </a>
    );
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars -- pulled out so it isn't spread onto the element below
  const { children, icon, iconPosition, className, type, ...buttonProps } = props;
  return (
    <button type={type ?? "button"} className={classes} {...buttonProps}>
      <Content icon={icon} iconPosition={iconPosition}>
        {children}
      </Content>
    </button>
  );
}
