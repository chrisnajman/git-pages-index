export default function articleHeaderIntersectionObserver() {
  const articleHeader = document.querySelector(".article-header")
  const articleHeaderHeight = articleHeader.offsetHeight
  const backToFilters = document.querySelector(".back-to-filters")

  const articleHeaderOptions = {
    rootMargin: `-${articleHeaderHeight}px  0px 0px 0px`,
  }

  const articleHeaderObserver = new IntersectionObserver(function (entries) {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) {
        backToFilters.classList.add("show")
      } else {
        backToFilters.classList.remove("show")
      }
    })
  }, articleHeaderOptions)

  articleHeaderObserver.observe(articleHeader)
}
