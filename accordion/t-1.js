/*
       Taken from https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/forEach
     */

if (!Array.prototype.forEach) {
  Array.prototype.forEach = function (fn, scope) {
    "use strict";
    var i, len;
    for (i = 0, len = this.length; i < len; ++i) {
      if (i in this) {
        fn.call(scope, this[i], i, this);
      }
    }
  };
}

const accordions = document.querySelectorAll(".accordion__title");

//Если не нужно закрывать предыдущие
// const accordionHandler = (e) => {
//   e.preventDefault();
//   const currentAccrodion = e.target.closest(".accordion");
//   const currentContent = e.target.nextElementSibling;
//   currentAccrodion.classList.toggle("active");
//   currentAccrodion.classList.contains("active")
//     ? (currentContent.style.maxHeight =
//         currentContent.scrollHeight + "px")
//     : (currentContent.style.maxHeight = 0);currentAccrodion.classList.containscurrentContent.style.maxHeightcurrentContent.scrollHeight
// };

const accordionHandler = (e) => {
  e.preventDefault();
  
  accordions.forEach((accordionTitle) => {
    const accordion = accordionTitle.closest(".accordion");
    if (accordion !== e.target.closest(".accordion")) {
      accordion.classList.remove("active");
      const content = accordionTitle.nextElementSibling;
      content.style.maxHeight = 0;
    }
  });
  
  // Логика для текущего аккордеона
  const currentAccordion = e.target.closest(".accordion");
  const currentContent = e.target.nextElementSibling;
  
  currentAccordion.classList.toggle("active");
  currentAccordion.classList.contains("active")
    ? (currentContent.style.maxHeight =
      currentContent.scrollHeight + "px")
    : (currentContent.style.maxHeight = 0);
  currentContent.style.maxHeightcurrentContent.scrollHeight;
};

accordions.forEach((accordion) => {
  accordion.addEventListener("click", accordionHandler);
});
