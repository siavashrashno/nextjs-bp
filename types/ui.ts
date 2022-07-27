import type { ReactElement, ReactNode } from "react";

// A unique placeholder we can use as a default. This is nice because we can use this instead of
// defaulting to null / never / ... and possibly collide with actual data.
// Ideally we use a unique symbol here.
let __ = "1D45E01E-AF44-47C4-988A-19A94EBAF55C" as const;
export type __ = typeof __;

// Provide clean TypeScript props, which exposes some of our custom API's.
export type AsProps<TTag, TOmitableProps extends keyof any = __> = CleanProps<
  TTag,
  TOmitableProps
> &
  OurProps<TTag>;

// Resolve the props of the component, but ensure to omit certain props that we control
type CleanProps<
  TTag,
  TOmitableProps extends keyof any = __
> = TOmitableProps extends __
  ? Omit<PropsOf<TTag>, PropsWeControl>
  : Omit<PropsOf<TTag>, TOmitableProps | PropsWeControl>;

// Add certain props that we control
type OurProps<TTag> = {
  as?: TTag;
  children?: ReactNode;
  refName?: string;
};

export type PropsOf<TTag = any> = TTag extends React.ElementType
  ? React.ComponentProps<TTag>
  : never;

type PropsWeControl = "as" | "children" | "refName" | "className";
