import { forwardRef } from "react";

/**
 * This is a hack, but basically we want to keep the full 'API' of the component, but we do want to
 * wrap it in a forwardRef so that we _can_ passthrough the ref
 */
export function forwardRefWithAs<
  T extends { name: string; displayName?: string }
>(component: T): T & { displayName: string } {
  return Object.assign(forwardRef(component as unknown as any) as any, {
    displayName: component.displayName ?? component.name,
  });
}

export function compact<T extends Record<any, any>>(object: T) {
  let clone = Object.assign({}, object);
  for (let key in clone) {
    if (clone[key] === undefined) delete clone[key];
  }
  return clone;
}

export function omit<T extends Record<any, any>>(
  object: T,
  keysToOmit: string[] = []
) {
  let clone = Object.assign({}, object);
  for (let key of keysToOmit) {
    if (key in clone) delete clone[key];
  }
  return clone;
}
export function isValidElement(input: any): boolean {
  if (input == null) return false; // No children
  if (typeof input.type === "string") return true; // 'div', 'span', ...
  if (typeof input.type === "object") return true; // Other components
  if (typeof input.type === "function") return true; // Built-ins like Transition
  return false; // Comments, strings, ...
}

export function outerWidth(el: HTMLElement, style?: CSSStyleDeclaration) {
  return (
    el.offsetWidth +
    (style
      ? parseInt(style.marginLeft) || 0 - parseInt(style.marginRight) || 0
      : 0)
  );
}
export function outerHeight(el: HTMLElement, style?: CSSStyleDeclaration) {
  return (
    el.offsetHeight +
    (style
      ? parseInt(style.marginTop) || 0 - parseInt(style.marginRight) || 0
      : 0)
  );
}
export function width(el: HTMLElement, style: CSSStyleDeclaration) {
  return (
    el.clientWidth - parseInt(style.borderLeftWidth) ||
    0 - parseInt(style.borderRightWidth) ||
    0
  );
}

export function height(el: HTMLElement, style: CSSStyleDeclaration) {
  return (
    el.clientHeight - parseInt(style.borderTopWidth) ||
    0 - parseInt(style.borderBottomWidth) ||
    0
  );
}

export function innerWidth(el: HTMLElement) {
  return el.clientWidth;
}

export function innerHeight(el: HTMLElement) {
  return el.clientHeight;
}
