// import type { AriaButtonProps } from "@react-types/button";
import type { ElementType, ReactElement, Ref } from "react";
import type { AsProps } from "@types";

import React, { useRef, Fragment, createElement } from "react";
import cn from "classnames";
// import { useButton } from "@react-aria/button";
import Loader from "./loader";

import { useSyncRefs } from "@hooks/useSyncRef";
import { forwardRefWithAs, omit } from "@utils/ui";
import { useResolveButtonType } from "@hooks/useResolveButtonType";

interface Props {
  loading?: boolean;
  isDisabled?: boolean;
  className?: string;
  size?: "slim" | "normal" | "mini";
  theme?: "primary" | "secondary" | "blue";
}
let DEFAULT_BUTTON_TAG = "button" as const;

// eslint-disable-next-line react/display-name
const Button = forwardRefWithAs(function Button<
  TTag extends ElementType = typeof DEFAULT_BUTTON_TAG
>(
  {
    loading = false,
    className,
    theme = "primary",
    isDisabled,
    // type = "button",
    size = "normal",
    ...buttonProps
  }: AsProps<TTag> & Props,
  ref: Ref<HTMLElement>
) {
  const buttonRef = useRef<HTMLElement | null>(null);
  let _ref = useSyncRefs(buttonRef, ref);

  let passthroughProps = buttonProps;

  let propsWeControl = {
    ref: _ref,
    type: useResolveButtonType(buttonProps, buttonRef),
    disabled: loading || isDisabled,
    tabIndex: 0,
    className: cn(
      "relative disabled:cursor-not-allowed  truncate focus:outline-none no-underline  z-0 py-0   overflow-hidden  text-center items-center justify-center flex rounded-full",
      "transition-transform duration-200 ease-in-out border  scale-1 ",
      "hover:scale-[1.05]",
      size === "slim"
        ? "h-8 px-5 text-sm min-w-[9.6875rem]"
        : size === "normal"
        ? "h-12 px-8 text-base min-w-[8.6875rem]"
        : "h-7 px-6 text-sm min-w-[6.1875rem]",
      theme === "primary"
        ? "bg-primary text-white hover:text-white border-primary  "
        : theme === "secondary"
        ? "bg-transparent text-primary  border-primary  "
        : "bg-blue text-white hover:text-white border-blue  ",
      loading ? " opacity-100" : " disabled:opacity-60 opacity-100",
      className
    ),
  };
  const props = { ...passthroughProps, ...propsWeControl };

  let {
    as: Component = DEFAULT_BUTTON_TAG,
    children,
    refName = "ref",
    ...ptProps
  } = omit(props, ["unmount", "static"]);

  // This allows us to use `<HeadlessUIComponent as={MyComponent} refName="innerRef" />`
  let refRelatedProps = props.ref !== undefined ? { [refName]: props.ref } : {};
  let resolvedChildren = (
    loading ? (
      <Loader
        type={theme === "primary" ? "white" : "primary"}
        className="w-6 h-6 "
      />
    ) : (
      children
    )
  ) as ReactElement | ReactElement[];

  return createElement(
    Component,
    Object.assign(
      {},
      omit(ptProps, ["ref"]),
      Component !== Fragment ? refRelatedProps : undefined
    ),

    resolvedChildren
  );
});

export default Button;
