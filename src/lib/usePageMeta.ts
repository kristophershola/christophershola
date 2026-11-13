import { useEffect } from "react";

function setMeta(selector: string, attr: "name" | "property", key: string, value: string) {
  let tag = document.head.querySelector<HTMLMetaElement>(selector);
  if (!tag) {
    tag = document.createElement("meta");
    tag.setAttribute(attr, key);
    document.head.appendChild(tag);
  }
  tag.setAttribute("content", value);
}

/**
 * Sets the document title and meta description for a route, and puts the
 * previous values back when the route unmounts so untouched pages never
 * inherit a stale title.
 */
export function usePageMeta(title: string, description: string) {
  useEffect(() => {
    const prevTitle = document.title;
    const prevDesc =
      document.head.querySelector<HTMLMetaElement>('meta[name="description"]')?.content ?? "";

    document.title = title;
    setMeta('meta[name="description"]', "name", "description", description);
    setMeta('meta[property="og:title"]', "property", "og:title", title);
    setMeta('meta[property="og:description"]', "property", "og:description", description);

    return () => {
      document.title = prevTitle;
      setMeta('meta[name="description"]', "name", "description", prevDesc);
      setMeta('meta[property="og:title"]', "property", "og:title", prevTitle);
      setMeta('meta[property="og:description"]', "property", "og:description", prevDesc);
    };
  }, [title, description]);
}

export default usePageMeta;
