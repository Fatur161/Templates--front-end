//Полифил
if (window.NodeList && !NodeList.prototype.forEach) {
  NodeList.prototype.forEach = function (callback, thisArg) {
    thisArg = thisArg || window;
    for (var i = 0; i < this.length; i++) {
      callback.call(thisArg, this[i], i, this);
    }
  };
}

document
  .querySelectorAll(".dropdown")
  .forEach(function (dropDownWrapper) {
    const dropDownBtn =
      dropDownWrapper.querySelector(".dropdown__button");
    const dropDownList = dropDownWrapper.querySelector(".dropdown__list");
    const dropDownListItems = dropDownList.querySelectorAll(
      ".dropdown__list-item"
    );
    const dropwDownInput = dropDownWrapper.querySelector(
      ".dropdown__input-hidden"
    );
    
    dropDownBtn.addEventListener("click", () => {
      dropDownList.classList.toggle("dropdown__list--visible");
      dropDownBtn.classList.toggle("dropdown__button--active");
    });
    
    dropDownListItems.forEach(function (element) {
      element.addEventListener("click", function (e) {
        e.stopPropagation();
        dropDownBtn.innerText = this.innerText;
        dropDownBtn.focus();
        dropwDownInput.value = this.dataset.value;
        dropDownList.classList.remove("dropdown__list--visible");
        dropDownBtn.classList.remove("dropdown__button--active");
      });
    });
    
    document.addEventListener("click", function (e) {
      if (e.target !== dropDownBtn) {
        dropDownList.classList.remove("dropdown__list--visible");
        dropDownBtn.classList.remove("dropdown__button--active");
      }
    });
    
    document.addEventListener("keydown", function (e) {
      if (e.key === "Tab" || e.key === "Escape") {
        dropDownList.classList.remove("dropdown__list--visible");
        dropDownBtn.classList.remove("dropdown__button--active");
      }
    });
  });
