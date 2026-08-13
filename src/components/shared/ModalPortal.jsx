import { createPortal } from "react-dom";

// Renders its children into document.body instead of wherever this
// component sits in the React tree. This is what actually fixes
// full-screen modals (product image, cart, search, auth) rendering
// underneath the header: a page-level CSS animation elsewhere in the
// app leaves a non-"none" `transform` on the page's <section>, and
// per the CSS spec a transformed ancestor becomes the containing
// block for any `position: fixed` descendant — silently turning the
// modal's "fixed inset-0" into "fixed relative to that section"
// instead of the real viewport. Portaling to <body> sidesteps that
// entirely, so modals always cover the full screen no matter what
// animation or transform classes exist on their parents.
export default function ModalPortal({ children }) {
  return createPortal(children, document.body);
}
