import { onError } from "./messages.js";

/**
 * class for form handling
 * get formula from user and check it
 */
export default class FormHandling {
  /**
   * constructor
   * @param {string} form - id of form
   */
  constructor(form) {
    this.formulaForm = document.getElementById(form);
    this.formulaInput = this.formulaForm.elements["formula"];
  }

  /**
   * handle form submit
   * @returns json with formula as string or null
   */
  handleForm() {
    let formula = this.formulaInput.value.replaceAll(" ", "");
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
   * @param {string} formula - formula for check
   * @returns valid formula ? true : false
   */
  formulaCheck(formula) {
    this.formulaInput.classList.remove("invalid");

    const parser = new nearley.Parser(nearley.Grammar.fromCompiled(grammar));
    try {
      // check if formula is empty
      if (formula === "" || formula === "⊢")
        throw new Error("Formula is empty.");

      // check last symbol
      const last = formula[formula.length - 1];
      if (last === "¬" || last === "∧" || last === "∨" || last === "⇒")
        throw new Error("Syntax error uncaught by parser");

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
