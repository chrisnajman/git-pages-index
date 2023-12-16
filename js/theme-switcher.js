export default function themeSwitcher() {
  const LOCAL_STORAGE_PREFIX = "FILTER"
  const DARKMODE_STORAGE_KEY = `${LOCAL_STORAGE_PREFIX}-darkmode-switcher`

  const btnThemeToggle = document.getElementById("btn-theme-toggle")
  const themeSun = document.getElementById("theme-sun")
  const themeMoon = document.getElementById("theme-moon")
  const root = document.querySelector("html")

  btnThemeToggle.addEventListener("click", (e) => {
    e.preventDefault()
    root.classList.toggle("dark-theme")

    const isDarkMode = root.classList.contains("dark-theme")

    e.target.setAttribute("aria-pressed", String(isDarkMode))

    if (isDarkMode) {
      themeSun.classList.add("hide")
      themeMoon.classList.remove("hide")
    } else {
      themeMoon.classList.add("hide")
      themeSun.classList.remove("hide")
    }

    const sunClass = themeSun.classList.contains("hide") ? "hide" : ""
    const moonClass = themeMoon.classList.contains("hide") ? "hide" : ""

    const themeItems = [isDarkMode, sunClass, moonClass]
    localStorage.setItem(DARKMODE_STORAGE_KEY, JSON.stringify(themeItems))
  })

  function setTheme() {
    const activeTheme = JSON.parse(
      localStorage.getItem(DARKMODE_STORAGE_KEY)
    ) || [false, "", ""]

    const isDarkMode = activeTheme[0]

    if (isDarkMode) {
      root.classList.add("dark-theme")
      themeSun.classList.add("hide")
      themeMoon.classList.remove("hide")
    } else {
      root.classList.remove("dark-theme")
      themeMoon.classList.add("hide")
      themeSun.classList.remove("hide")
    }

    btnThemeToggle.setAttribute("aria-pressed", String(isDarkMode))
  }

  setTheme()
}
