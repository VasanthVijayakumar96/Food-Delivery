import { useEffect } from "react";
import { useLocation } from "react-router-dom";

/**
 * Handles deep-link navigation to `#explore-menu`:
 * - Waits 2 animation frames for render stabilization.
 * - Retries up to 30 times (via rAF) until the element is in the DOM.
 * - Respects `prefers-reduced-motion` when scrolling.
 * - Moves keyboard focus to the first `[data-focus-target]` or heading in the section.
 * - All pending callbacks are cancelled on unmount or location change.
 */
const useHashScrollHandler = () => {
  const location = useLocation();

  useEffect(() => {
    if (location.hash !== "#explore-menu") return;

    let canceled = false;
    let rafId;
    let attempts = 0;
    const MAX_ATTEMPTS = 30;

    const tryScroll = () => {
      if (canceled) return;

      const element = document.getElementById("explore-menu");

      if (element) {
        const reducedMotion = window.matchMedia(
          "(prefers-reduced-motion: reduce)"
        ).matches;
        element.scrollIntoView({
          behavior: reducedMotion ? "auto" : "smooth",
          block: "start",
        });

        rafId = requestAnimationFrame(() => {
          if (canceled) return;
          const focusTarget =
            element.querySelector("[data-focus-target]") ||
            element.querySelector("h1, h2, h3, h4, h5, h6");
          if (focusTarget) {
            focusTarget.focus();
          }
        });
      } else if (attempts < MAX_ATTEMPTS) {
        attempts += 1;
        rafId = requestAnimationFrame(tryScroll);
      }
    };

    // Two frames for render stabilization before the first attempt
    rafId = requestAnimationFrame(() => {
      if (canceled) return;
      rafId = requestAnimationFrame(tryScroll);
    });

    return () => {
      canceled = true;
      cancelAnimationFrame(rafId);
    };
  }, [location]);
};

export default useHashScrollHandler;
