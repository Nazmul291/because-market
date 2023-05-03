import "./style.css"

const items = document.querySelectorAll(".product-faq")

const toggleDisplay = (el) => {
  el.classList.toggle("collapsed")
}

const handleClick = ({ target }) => {
  const qa = target.closest(".qa")
  const header = target.closest(".qa_question")

  if (header) {
    toggleDisplay(qa)
  }
}

items.forEach((el) => el.addEventListener("click", handleClick))
