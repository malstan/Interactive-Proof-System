import FormHandling from "./formHandling.js";
import FormulaHandling from "./formulaHandling.js";

let formulaHandling;
// listener for form submit
document.getElementById("formulaForm").addEventListener("submit", (event) => {
  event.preventDefault();
  if (formulaHandling) formulaHandling.handleEnd();

  // create object for form handling and formula validation
  const formHandling = new FormHandling("formulaForm");

  const { formula, method } = formHandling.handleForm();

  if (formula) {
    formulaHandling = new FormulaHandling(formula, method);
  }
});

//listener for remove button to remove character
document
  .getElementById("js-removeButton")
  .addEventListener("click", (event) => {
    let inputFormula =
      document.getElementById("formulaForm").elements["formula"].value;
    document.getElementById("formulaForm").elements["formula"].value =
      inputFormula.substr(0, inputFormula.length - 1);
  });
// listeners for remove button to remove formula
let timer;
document
  .getElementById("js-removeButton")
  .addEventListener("mousedown", (event) => {
    timer = setTimeout(
      () =>
        (document.getElementById("formulaForm").elements["formula"].value = ""),
      500
    );
  });
document
  .getElementById("js-removeButton")
  .addEventListener("mouseup", (event) => {
    clearTimeout(timer);
  });

// add symbol when button is pressed
window.addSymbol = (symbol) => {
  document.getElementById("formulaForm").elements["formula"].value += symbol;
};
