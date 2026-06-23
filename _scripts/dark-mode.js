/*
  manages light/dark mode.
*/

{
  const getSavedMode = () => window.localStorage.getItem("dark-mode") ?? "false";

  const setMode = (value) => {
    document.documentElement.dataset.dark = value;
    window.localStorage.setItem("dark-mode", value);
    syncToggles();
  };

  const syncToggles = () => {
    const dark = document.documentElement.dataset.dark === "true";
    document.querySelectorAll(".dark-toggle").forEach((toggle) => {
      toggle.checked = dark;
      toggle.setAttribute("aria-checked", dark);
    });
  };

  // immediately load saved (or default) mode before page renders
  document.documentElement.dataset.dark = getSavedMode();

  // Sync as soon as controls exist. Waiting for window load can be delayed by
  // third-party footer widgets, which makes the toggle appear out of state.
  document.addEventListener("DOMContentLoaded", syncToggles);
  window.addEventListener("load", syncToggles);
  new MutationObserver(syncToggles).observe(document.documentElement, {
    childList: true,
    subtree: true,
  });

  // when user toggles mode button
  window.onDarkToggleChange = (event) => {
    setMode(event.target.checked ? "true" : "false");
  };
}
