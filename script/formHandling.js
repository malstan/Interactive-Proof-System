import { onError } from "./messages.js";

/**
 * class for form handling
 */
export default class FormHandling {
  /**
   * constructor
   * @param {*} form - id of form
   */
  constructor(form) {
    this.formulaForm = document.getElementById(form);
    this.formulaInput = this.formulaForm.elements["formula"];
  }

  /**
   * handle form submit
   * @returns formula or false
   */
  handleForm() {
    let formula = this.formulaInput.value.trim();
    const method = "gsc";

    this.formulaForm.reset();

    if (!formula.includes("⊢")) formula = "⊢" + formula;

    // check
    if (this.formulaCheck(formula)) {
      this.formulaInput.placeholder = formula;
      return {
        formula: formula,
        method: method,
      };
    } else return { formula: null, method: method };
  }

  /**
   * check formula
   * @param {*} formula - formula for check
   * @returns valid formula ? true : false
   */
  formulaCheck(formula) {
    this.formulaInput.classList.remove("invalid");

    const parser = new nearley.Parser(nearley.Grammar.fromCompiled(grammar));
    try {
      // check if formula is empty
      if (formula === "" || formula === "⊢")
        throw new Error("Formula is empty.");

      // try to create abstract syntax tree
      parser.feed(formula);
    } catch (error) {
      // catch error and show message
      console.log(error);
      onError("Zadajte správny tvar formuly.");
      this.formulaInput.classList.add("invalid");
      return false;
    }
    return true;
  }
}
