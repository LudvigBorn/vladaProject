import type {
  AnchorHTMLAttributes,
  ButtonHTMLAttributes,
  ReactNode,
} from "react";

/**
 * Structural/behavioral defaults only — no color, padding, or font-color.
 * Those are entirely up to the className passed at each call site, e.g.:
 *   <Button href="#contact" className="bg-accent-600 px-6 py-3 font-semibold text-white hover:bg-accent-700">
 */
const BASE_CLASSES =
  "inline-flex items-center justify-center gap-2 whitespace-nowrap transition-colors";

// Default button size (276x40px). Skipped automatically if the passed
// className already sets its own w-*/max-w-*/min-w-* or h-*/max-h-*/min-h-* —
// e.g. className="w-auto ..." to size to content instead, or
// className="w-full ..." to fill its parent.
const DEFAULT_WIDTH_CLASS = "w-[280px]";
const DEFAULT_HEIGHT_CLASS = "h-10";
const HAS_WIDTH_CLASS = /(^|\s)(w-|max-w-|min-w-)/;
const HAS_HEIGHT_CLASS = /(^|\s)(h-|max-h-|min-h-)/;

// Default text size (text-base). Skipped automatically if the passed
// className already sets its own text-<size> utility, e.g. className="text-sm ...".
const DEFAULT_TEXT_CLASS = "text-base";
const HAS_TEXT_SIZE_CLASS = /(^|\s)text-(xs|sm|base|lg|[2-9]?xl|\[)/;

function widthClass(className: string | undefined): string {
  return HAS_WIDTH_CLASS.test(className ?? "") ? "" : DEFAULT_WIDTH_CLASS;
}

function heightClass(className: string | undefined): string {
  return HAS_HEIGHT_CLASS.test(className ?? "") ? "" : DEFAULT_HEIGHT_CLASS;
}

function textSizeClass(className: string | undefined): string {
  return HAS_TEXT_SIZE_CLASS.test(className ?? "") ? "" : DEFAULT_TEXT_CLASS;
}

type SharedProps = {
  children: ReactNode;
  className?: string;
  icon?: ReactNode;
  iconPosition?: "left" | "right";
};

type LinkProps = SharedProps &
  Omit<
    AnchorHTMLAttributes<HTMLAnchorElement>,
    "className" | "children" | "href"
  > & {
    href: string;
    /** Adds target="_blank" rel="noopener noreferrer" for links to other sites. */
    external?: boolean;
  };

type PlainButtonProps = SharedProps &
  Omit<
    ButtonHTMLAttributes<HTMLButtonElement>,
    "className" | "children" | "type"
  > & {
    href?: undefined;
    type?: "button" | "submit";
  };

export type ButtonProps = LinkProps | PlainButtonProps;

function Content({
  children,
  icon,
  iconPosition,
}: Pick<SharedProps, "children" | "icon" | "iconPosition">) {
  return (
    <>
      {icon && iconPosition !== "right" ? icon : null}
      {children}
      {icon && iconPosition === "right" ? icon : null}
    </>
  );
}

export function Button(props: ButtonProps) {
  const classes = `${BASE_CLASSES} ${widthClass(props.className)} ${heightClass(props.className)} ${textSizeClass(props.className)} ${props.className ?? ""}`;

  if (props.href !== undefined) {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars -- pulled out so it isn't spread onto the element below
    const {
      href,
      external,
      children,
      icon,
      iconPosition,
      className,
      ...anchorProps
    } = props;
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
  const { children, icon, iconPosition, className, type, ...buttonProps } =
    props;
  return (
    <button type={type ?? "button"} className={classes} {...buttonProps}>
      <Content icon={icon} iconPosition={iconPosition}>
        {children}
      </Content>
    </button>
  );
}
