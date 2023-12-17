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

  function populateCategoryHeading(itemCategory) {
    categoryHeading.textContent = itemCategory
  }

  function populateArticleIntro(itemCategory) {
    switch (itemCategory) {
      case "all":
        categoryIntro.textContent = "All Pages, most recent first."
        break
      case "apps":
        categoryIntro.textContent = "Useful web pages."
        break
      case "snippets":
        categoryIntro.textContent =
          "HTML, CSS and JavaScript items that can be incorporated into other projects."
        break
      case "challenges":
        categoryIntro.textContent =
          "Frontend challenges set by various websites."
        break
      case "frameworks":
        categoryIntro.textContent =
          "Configuring frameworks and getting them to display on the web page."
        break
      case "course":
        categoryIntro.textContent = "Project(s) built from following a course."
        break
      case "biology":
        categoryIntro.textContent =
          "Having contracted Covid early on, I became interested in the mechanics of viruses."
        break
      default:
        categoryIntro.textContent = "All Pages, most recent first."
    }
  }
}
