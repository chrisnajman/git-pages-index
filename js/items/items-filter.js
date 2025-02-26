import { itemsArray } from "../globals.js"

const filters = document.getElementById("filters")
const filterButtons = document.querySelectorAll(".filter-btn")
const categoryHeading = document.getElementById("category-heading")
const categoryIntro = document.getElementById("category-intro")

export default function itemsFilter() {
  filterButtons.forEach((button) => {
    button.addEventListener("click", (e) => {
      e.preventDefault()
      let itemCategory = e.target.getAttribute("data-filter")

      if (!document.startViewTransition) {
        updateActiveButton(e.target)
        filterItems(itemCategory)
        populateCategoryHeading(itemCategory)
        populateArticleIntro(itemCategory)
      }

      document.startViewTransition(() => {
        updateActiveButton(e.target)
        filterItems(itemCategory)
        populateCategoryHeading(itemCategory)
        populateArticleIntro(itemCategory)
      })
    })
  })

  function updateActiveButton(newButton) {
    filters.querySelector(".active").classList.remove("active")
    newButton.classList.add("active")
  }

  function filterItems(filter) {
    itemsArray.forEach((item) => {
      let itemCategory = item.getAttribute("data-category")

      if (filter === "all" || filter === itemCategory) {
        item.removeAttribute("hidden")
      } else {
        item.setAttribute("hidden", "")
      }
    })
  }

  function populateCategoryHeading(heading) {
    categoryHeading.textContent = heading
  }

  function populateArticleIntro(intro) {
    switch (intro) {
      case "all":
        categoryIntro.textContent = "All Git Pages, most recent first."
        break
      case "apps":
        categoryIntro.textContent =
          "Useful web pages that work both on a server, and the local file system (excluding React projects)."
        break
      case "snippets":
        categoryIntro.textContent =
          "HTML, CSS and JavaScript items that can be incorporated into other projects."
        break
      case "widgets":
        categoryIntro.textContent =
          "Self-contained UI components that perform a specific function, such as displaying information or enabling user interaction."
        break
      case "challenges":
        categoryIntro.textContent =
          "My response to frontend challenges set by various websites."
        break
      case "frameworks":
        categoryIntro.textContent =
          "Configuring frameworks and getting them to display on the web page."
        break
      case "course":
        categoryIntro.textContent = "Projects built from following a course."
        break
      case "misc":
        categoryIntro.textContent =
          "Miscellaneous pages covering a range of subjects."
        break
      default:
        categoryIntro.textContent = "All Git Pages, most recent first."
    }
  }
}
