import FormHandling from "./formHandling.js";
import FormulaHandling from "./formulaHandling.js";

let formulaHandling;
// listener for form submit
document.getElementById("formulaForm").addEventListener("submit", (event) => {
  event.preventDefault();

  // if there is formula than end proving
  if (formulaHandling) formulaHandling.handleEnd();

  // create object for form handling and formula validation
  const formHandling = new FormHandling("formulaForm");

  const { formula, method } = formHandling.handleForm();

  // if formula is valid than start proving
  formula && (formulaHandling = new FormulaHandling(formula, method));
});

// listener for form reset
document.getElementById("formulaForm").addEventListener("reset", (event) => {
  event.target[0].placeholder = "napr.: A∧B⊢¬(C⇒D),¬E";

  formulaHandling && formulaHandling.handleEnd();

  document.getElementById("tree-js").innerHTML = "";

  document.getElementById("formulaIsProved-js").style.visibility = "hidden";
});

//listener for remove button to remove character
document.getElementById("js-removeButton").addEventListener("click", () => {
  const formForCut = document.getElementById("formForCut");

  if (formForCut.style.display === "initial") {
    let inputFormula = formForCut.elements["forCut"].value;
    formForCut.elements["forCut"].value = inputFormula.substr(
      0,
      inputFormula.length - 1
    );
  } else {
    let inputFormula =
      document.getElementById("formulaForm").elements["formula"].value;
    document.getElementById("formulaForm").elements["formula"].value =
      inputFormula.substr(0, inputFormula.length - 1);
  }
});

// listeners for remove button to remove formula
let timer;
document.getElementById("js-removeButton").addEventListener("mousedown", () => {
  timer = setTimeout(
    () =>
      document.getElementById("formForCut").style.display === "initial"
        ? (document.getElementById("formForCut").elements["forCut"].value = "")
        : (document.getElementById("formulaForm").elements["formula"].value =
            ""),
    500
  );
});
document.getElementById("js-removeButton").addEventListener("mouseup", () => {
  clearTimeout(timer);
});

// add symbol when button is pressed
window.addSymbol = (symbol) => {
  // check for input - input for formula or input for statement for cut rule
  const formForCut = document.getElementById("formForCut");

  if (formForCut.style.display === "initial")
    formForCut.elements["forCut"].value += symbol;
  else
    document.getElementById("formulaForm").elements["formula"].value += symbol;
};
