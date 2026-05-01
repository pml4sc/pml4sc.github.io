{
  const toggleBibtex = (button) => {
    const id = button.dataset.bibtexToggle;
    if (!id) return;

    const panel = document.getElementById(id);
    if (!panel) return;

    const isOpen = !panel.hasAttribute("hidden");
    if (isOpen) {
      panel.setAttribute("hidden", "");
      button.setAttribute("aria-expanded", "false");
      return;
    }

    panel.removeAttribute("hidden");
    button.setAttribute("aria-expanded", "true");
    panel.scrollIntoView({ block: "nearest", behavior: "smooth" });
  };

  const copyBibtex = async (button) => {
    const id = button.dataset.bibtexCopy;
    if (!id) return;

    const code = document.getElementById(id)?.querySelector("code");
    const text = code?.textContent;
    if (!text) return;

    const original = button.innerHTML;

    try {
      await navigator.clipboard.writeText(text);
      button.innerHTML = "<span>Copied</span>";
    } catch {
      button.innerHTML = "<span>Copy failed</span>";
    }

    window.setTimeout(() => {
      button.innerHTML = original;
    }, 1400);
  };

  document.addEventListener("click", (event) => {
    const toggle = event.target.closest("[data-bibtex-toggle]");
    if (toggle) {
      toggleBibtex(toggle);
      return;
    }

    const copy = event.target.closest("[data-bibtex-copy]");
    if (copy) {
      copyBibtex(copy);
    }
  });
}
