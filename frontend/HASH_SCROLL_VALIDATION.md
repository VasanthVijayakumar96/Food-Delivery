# Hash Scroll Validation — Manual Regression Checklist

Validates acceptance criteria for ENH-001: Harden `/#explore-menu` deep-link behavior.

---

## Prerequisites

- Dev server running: `npm run dev` from `frontend/`
- Test in Chrome/Firefox/Safari (latest)
- Optionally enable OS "Reduce Motion" setting for motion tests

---

## Test Cases

### AC-1 — Direct navigation on initial load

**Steps:**
1. Open a new browser tab.
2. Navigate directly to `http://localhost:5173/#explore-menu`.

**Expected:** Page loads and viewport scrolls to the Explore Menu section.
**Pass / Fail:** ___

---

### AC-2 — Refresh while on `/#explore-menu`

**Steps:**
1. Navigate to `http://localhost:5173/#explore-menu` so the section is visible.
2. Hard-refresh the page (Ctrl+R / Cmd+R).

**Expected:** After reload the page scrolls back to the Explore Menu section.
**Pass / Fail:** ___

---

### AC-3 — Cross-route navigation (e.g., from `/cart`)

**Steps:**
1. Navigate to `http://localhost:5173/cart`.
2. Click the **menu** link in the Navbar.

**Expected:** Browser navigates to `/` and scrolls to the Explore Menu section.
**Pass / Fail:** ___

---

### AC-4 — Bounded retry when section is not immediately available

**Steps:**
1. Simulate a slow render (e.g., add a temporary `setTimeout` delay in `Home.jsx` before mounting `ExploreMenu`).
2. Navigate to `/#explore-menu`.

**Expected:** App retries and eventually scrolls once the section mounts (within ~30 frames / ~1 second). No infinite loop or crash.
**Pass / Fail:** ___

---

### AC-5 — No console errors during hash handling

**Steps:**
1. Open browser DevTools → Console tab.
2. Navigate to `/#explore-menu` via direct URL, refresh, and cross-route navigation.

**Expected:** No errors or unexpected warnings appear in the console.
**Pass / Fail:** ___

---

### AC-6 — Smooth scroll behavior (default)

**Steps:**
1. Ensure OS/browser Reduce Motion is OFF.
2. Navigate to `/#explore-menu` from the top of the home page.

**Expected:** Viewport scrolls smoothly (animated) to the Explore Menu section.
**Pass / Fail:** ___

---

### AC-7 — Instant scroll when `prefers-reduced-motion` is enabled

**Steps:**
1. Enable Reduce Motion in OS settings (or via DevTools: Rendering panel → "Emulate CSS media feature prefers-reduced-motion: reduce").
2. Navigate to `/#explore-menu`.

**Expected:** Viewport jumps instantly (no animation) to the Explore Menu section.
**Pass / Fail:** ___

---

### AC-8 — Keyboard focus moves to Explore Menu heading

**Steps:**
1. Navigate to `/#explore-menu`.
2. After scroll completes, press Tab.

**Expected:** Focus is visibly on (or immediately after) the "Explore our menu" heading. The heading should receive focus programmatically without disrupting the natural tab order.
**Pass / Fail:** ___

---

### AC-9 — Focus target is programmatically focusable without affecting tab order

**Steps:**
1. Open the page at `/`.
2. Tab through the page without navigating to `#explore-menu`.

**Expected:** The `<h1>` heading in ExploreMenu is NOT reachable via Tab (because `tabIndex={-1}` keeps it out of the sequential tab order).
**Pass / Fail:** ___

---

### AC-10 — Screen reader announcement on navigation

**Steps:**
1. Enable a screen reader (NVDA, JAWS, VoiceOver, or ORCA).
2. Navigate to `/#explore-menu`.

**Expected:** Screen reader announces the heading "Explore our menu" (or reads the `aria-label`) after navigation, giving the user a clear indication they arrived at the section.
**Pass / Fail:** ___

---

## Browser Matrix

| Browser        | AC-1 | AC-2 | AC-3 | AC-5 | AC-6 | AC-7 | AC-8 |
|----------------|------|------|------|------|------|------|------|
| Chrome latest  |      |      |      |      |      |      |      |
| Firefox latest |      |      |      |      |      |      |      |
| Safari latest  |      |      |      |      |      |      |      |
| Edge latest    |      |      |      |      |      |      |      |

---

## Sign-off

Tested by: _______________  
Date: _______________  
Build / commit: _______________
