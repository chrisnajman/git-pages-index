import { itemsArray } from "../globals.js"
import lazyLoad from "../observers/lazy-load-images-intersection-observer.js"

const ITEMS = "./items.json"
const itemsList = document.getElementById("items-list")
const itemTemplate = document.getElementById("item-template")

export default async function itemsDisplay() {
  const loadingMessage = document.getElementById("loading-message")
  try {
    const response = await fetch(ITEMS)

    loadingMessage.textContent = "Loading..."

    if (response.ok) {
      const items = await response.json()
      items.forEach((item) => {
        const ITEM_TPL = itemTemplate.content.cloneNode(true)
        const itemContainer = ITEM_TPL.querySelector(".item-container")

        const category = ITEM_TPL.querySelector("[data-category]")
        category.setAttribute("data-category", item.category)

        const title = ITEM_TPL.querySelector("[data-title]")
        title.textContent = item.title

        const thumbnail = ITEM_TPL.querySelector("[data-src]")
        thumbnail.setAttribute("data-src", item.thumbnail)
        lazyLoad(ITEM_TPL)

        const description = ITEM_TPL.querySelector("[data-description]")
        description.textContent = item.description

        const featuresList = ITEM_TPL.querySelector("[data-features]")
        const features = [...item.features]
        features.sort()
        features.forEach((feature) => {
          const li = document.createElement("li")
          li.textContent = feature
          featuresList.append(li)
        })

        const itemCategory = ITEM_TPL.querySelector("[data-item-category]")
        itemCategory.textContent = item.category

        if (item.category === "frontend-challenges") {
          itemCategory.textContent = "challenges"
        }

        const firstCommit = ITEM_TPL.querySelector("[data-commit]")
        firstCommit.textContent = item.firstCommit

        const repoUrl = ITEM_TPL.querySelector("[data-repo-link]")
        repoUrl.href = item.linkRepo

        const pageUrl = ITEM_TPL.querySelector("[data-page-link]")
        pageUrl.href = item.linkPage

        itemsList.append(itemContainer)
        itemsArray.push(itemContainer)
      })

      loadingMessage.textContent = ""
    } else {
      loadingMessage.textContent =
        "Something went wrong. Please try again later..."
    }
  } catch (e) {
    console.log(e)
  }
}
