/*
 * Adapted from `apollo` theme:
 * https://github.com/not-matthias/apollo/blob/main/static/js/themetoggle.js
 */

/**
 * Update the theme mode in local storage.
 * @param {string} mode - The theme mode to set ("light" or "dark")
 * @returns {void}
 */
function setTheme(mode) {
  localStorage.setItem("theme-storage", mode);
}

/** Fetch the current theme mode from local storage or the browser settings.
 * @returns {string} The current theme mode ("light" or "dark")
 * */
function getSavedTheme() {
  let currentTheme = localStorage.getItem("theme-storage");
  if (!currentTheme) {
    if (
      window.matchMedia &&
      window.matchMedia("(prefers-color-scheme: dark)").matches
    ) {
      currentTheme = "dark";
    } else {
      currentTheme = "light";
    }
  }

  return currentTheme;
}

/**
 * Toggle the theme between light and dark mode
 * @returns {void}
 */
function toggleTheme() {
  if (localStorage.getItem("theme-storage") === "light") {
    setTheme("dark");
    updateItemToggleTheme();
  } else if (localStorage.getItem("theme-storage") === "dark") {
    setTheme("light");
    updateItemToggleTheme();
  }
}

/**
 * Update the theme UI icon based on the current theme mode.
 * @returns {void}
 */
function updateItemToggleTheme() {
  let mode = getSavedTheme();

  const darkModeStyle = document.getElementById("darkModeStyle");
  if (darkModeStyle) {
    darkModeStyle.disabled = mode === "light";
  }

  const sunIcon = document.getElementById("sun-icon");
  const moonIcon = document.getElementById("moon-icon");
  if (sunIcon && moonIcon) {
    sunIcon.style.display = mode === "dark" ? "inline-block" : "none";
    moonIcon.style.display = mode === "light" ? "inline-block" : "none";
  }

  let htmlElement = document.querySelector("html");
  if (mode === "dark") {
    htmlElement.classList.remove("light");
    htmlElement.classList.add("dark");
  } else if (mode === "light") {
    htmlElement.classList.remove("dark");
    htmlElement.classList.add("light");
  }
}

// Update the toggle theme on page load
updateItemToggleTheme();
