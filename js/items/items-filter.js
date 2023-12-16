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

      let buttonText = e.target.textContent

      if (!document.startViewTransition) {
        updateActiveButton(e.target)
        filterItems(itemCategory)
        populateCategoryHeading(buttonText)
        populateArticleIntro(buttonText)
      }

      document.startViewTransition(() => {
        updateActiveButton(e.target)
        filterItems(itemCategory)
        populateCategoryHeading(buttonText)
        populateArticleIntro(buttonText)
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

  function populateCategoryHeading(buttonText) {
    categoryHeading.textContent = buttonText
  }

  function populateArticleIntro(buttonText) {
    switch (buttonText) {
      case "All":
        categoryIntro.textContent = "All Pages, most recent first."
        break
      case "Apps":
        categoryIntro.textContent = "Useful web pages."
        break
      case "Snippets":
        categoryIntro.textContent =
          "HTML, CSS and JavaScript items that can be incorporated into other projects."
        break
      case "Challenges":
        categoryIntro.textContent =
          "Frontend challenges set by various websites."
        break
      case "Frameworks":
        categoryIntro.textContent =
          "Configuring frameworks and getting them to display on the web page."
        break
      case "Course":
        categoryIntro.textContent = "Project(s) built from following a course."
        break
      case "Biology":
        categoryIntro.textContent =
          "Having contracted Covid early on, I became interested in the mechanics of viruses."
        break
      default:
        categoryIntro.textContent = "All Pages, most recent first."
    }
  }
}
