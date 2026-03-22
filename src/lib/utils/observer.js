/**
 * Svelte action for scroll-triggered fade-ins.
 * SSR-safe: guards against missing IntersectionObserver in Node.js.
 * Usage: <div class="fade-in" use:observeFadeIn>
 * @param {HTMLElement} node
 */
export function observeFadeIn(node) {
  if (typeof IntersectionObserver === 'undefined') {
    node.classList.add('visible');
    return { destroy() {} };
  }

  const observer = new IntersectionObserver(
    ([entry]) => {
      if (entry.isIntersecting) {
        node.classList.add('visible');
        observer.unobserve(node);
      }
    },
    { threshold: 0.1 }
  );

  observer.observe(node);

  return {
    destroy() {
      observer.disconnect();
    }
  };
}
