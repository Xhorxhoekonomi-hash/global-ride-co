import { Children, isValidElement, cloneElement, type ReactNode, type ReactElement } from "react";

/** Plain text of a React node (strings and numbers, recursively). */
export function nodeText(node: ReactNode): string {
  if (node == null || typeof node === "boolean") return "";
  if (typeof node === "string" || typeof node === "number") return String(node);
  if (Array.isArray(node)) return node.map(nodeText).join("");
  if (isValidElement(node)) return nodeText((node.props as { children?: ReactNode }).children);
  return "";
}

/** Hero h1 size bucket from character count: s ≤ 28, m 29–48, l > 48. */
export function headingLength(text: string): "s" | "m" | "l" {
  const n = text.replace(/\s+/g, " ").trim().length;
  return n <= 28 ? "s" : n <= 48 ? "m" : "l";
}

/** Adds data-len to every <h1> inside bespoke hero markup. */
export function tagHeroHeadings(children: ReactNode): ReactNode {
  return Children.map(children, (child) => {
    if (!isValidElement(child)) return child;
    const el = child as ReactElement<{ children?: ReactNode }>;
    if (el.type === "h1") return cloneElement(el, { "data-len": headingLength(nodeText(el.props.children)) } as object);
    if (el.props.children === undefined) return el;
    return cloneElement(el, undefined, tagHeroHeadings(el.props.children));
  });
}
