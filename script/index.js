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
  if (formula) {
    formulaHandling = new FormulaHandling(formula, method);
    $("#rules").show().siblings().hide();
    $("*[data-tab='#rules']")
      .addClass("activeTab")
      .siblings()
      .removeClass("activeTab");
  }
});

// listener for form reset
document.getElementById("formulaForm").addEventListener("reset", (event) => {
  event.target[0].placeholder = "napr.: A∧B⊢¬(C⇒D),¬E";

  formulaHandling && formulaHandling.handleEnd();

  document.getElementById("tree-js").innerHTML = "";

  document.getElementById("formulaIsProved-js").style.visibility = "hidden";
  $("#symbols").show().siblings().hide();
  $("*[data-tab='#symbols']")
    .addClass("activeTab")
    .siblings()
    .removeClass("activeTab");
});

//listener for remove button to remove character
document.getElementById("js-removeButton").addEventListener("click", () => {
  const formForCut = document.getElementById("formForCut");

  if (formForCut.style.display === "initial") {
    let inputForCut = formForCut.elements["forCut"].value;

    // get position of cursor
    let position = inputForCut.slice(
      0,
      formForCut.elements["forCut"].selectionStart
    ).length;

    if (position == 0) {
      formForCut.elements["forCut"].focus();
      return;
    }

    // add new symbol on position
    formForCut.elements["forCut"].value =
      inputForCut.slice(0, position - 1) + inputForCut.slice(position);
    // set cursor position after added symbol
    formForCut.elements["forCut"].setSelectionRange(position - 1, position - 1);

    formForCut.elements["forCut"].focus();
  } else {
    const form = document.getElementById("formulaForm");
    let input = form.elements["formula"].value;

    // get position of cursor
    let position = input.slice(
      0,
      form.elements["formula"].selectionStart
    ).length;

    if (position == 0) {
      form.elements["formula"].focus();
      return;
    }

    // add new symbol on position
    form.elements["formula"].value =
      input.slice(0, position - 1) + input.slice(position);
    // set cursor position after added symbol
    form.elements["formula"].setSelectionRange(position - 1, position - 1);

    form.elements["formula"].focus();
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

  if (formForCut.style.display === "initial") {
    let inputForCut = formForCut.elements["forCut"].value;

    // get position of cursor
    let position = inputForCut.slice(
      0,
      formForCut.elements["forCut"].selectionStart
    ).length;

    // add new symbol on position
    formForCut.elements["forCut"].value =
      inputForCut.slice(0, position) + symbol + inputForCut.slice(position);
    // set cursor position after added symbol
    formForCut.elements["forCut"].setSelectionRange(position + 1, position + 1);

    formForCut.elements["forCut"].focus();
  } else {
    const form = document.getElementById("formulaForm");
    let input = form.elements["formula"].value;

    // get position of cursor
    let position = input.slice(
      0,
      form.elements["formula"].selectionStart
    ).length;

    // add new symbol on position
    form.elements["formula"].value =
      input.slice(0, position) + symbol + input.slice(position);
    // set cursor position after added symbol
    form.elements["formula"].setSelectionRange(position + 1, position + 1);

    form.elements["formula"].focus();
  }
};
