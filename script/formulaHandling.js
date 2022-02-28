import rulesGSC from "./rules_gsc.js";

/**
 * class for formula handling
 */
export default class FormulaHandling {
  /**
   * constructor
   * @param {*} formula - formula from input
   * @param {*} method - proof method
   */
  constructor(formula, method) {
    this.formulaSuccessMessage = document.querySelector("#js-formulaIsProved");
    this.treeContainer = document.querySelector(".tree-js");

    this.tree = new Array(formula);
    this.leaf = new Array(formula);

    this.method = method;

    if (this.method === "gsc") this.rules = rulesGSC;

    // clear tree element
    this.treeContainer.innerHTML = "";

    // message
    this.formulaSuccessMessage.style.visibility = "hidden";

    this.prepareRules();

    this.renderFormula();
  }

  /**
   * add event listener to rules
   */
  prepareRules() {
    // get elements with rules
    const rules = document.querySelector(`#js-${this.method}`).children;

    // add listener and style to rules
    Array.from(rules, (rule) => {
      rule.classList.add("readyToUse");
      rule.addEventListener("click", (event) => {
        this.handleChooseOfRule(
          rule.dataset.rule,
          event.clientX,
          event.clientY
        );
      });
    });
  }

  /**
   * apply rule on formula
   * @param {*} ruleName - rule
   */
  async handleChooseOfRule(ruleName, x, y) {
    let formulaForProof = await this.getFormulaForProof(x, y);
    if (formulaForProof === null) return;

    const parser = new nearley.Parser(nearley.Grammar.fromCompiled(grammar));

    try {
      // try to create abstract syntax tree
      parser.feed(formulaForProof);
    } catch (error) {
      // catch error
      console.log("====================================");
      console.log(formulaForProof);
      console.log(error);
      console.log("====================================");
    }

    // find and apply rule
    const result = await this.rules
      .find((rule) => rule.name === ruleName)
      .apply(formulaForProof, parser.results.slice(-1)[0], x, y);

    if (Array.isArray(result)) {
      result[1].forEach((item) => this.leaf.push(item));
      this.addToFormulaArray(this.tree, result);
      this.renderFormula();
      this.checkIfProved();
    } else {
      this.leaf.push(result);
    }
  }

  /**
   * let user choose formula
   * @returns formula
   */
  async getFormulaForProof(x, y) {
    // check if there are multiple formulas
    if (this.leaf.length > 1) {
      let leafContainer = document.querySelector("#js-chooseLeaf");
      // clear options
      leafContainer.innerHTML = "";

      // add options
      let defaultOption = document.createElement("option");
      defaultOption.innerText = "výber";
      leafContainer.appendChild(defaultOption);
      this.leaf.forEach((item) => {
        let option = document.createElement("option");
        option.innerText = item;
        leafContainer.appendChild(option);
      });

      // set coordinates and visibility of selection box
      leafContainer.style.visibility = "initial";
      leafContainer.style.top = `${y}px`;
      leafContainer.style.left = `${x}px`;

      // wait for user choice
      return new Promise((resolve) => {
        // return chosen formula
        const listenerForChange = (event) => {
          document.removeEventListener("mouseup", listenerForMouseup);
          leafContainer.removeEventListener("change", listenerForChange);

          leafContainer.style.visibility = "hidden";
          // remove formula from array of leaves
          this.leaf.splice(this.leaf.indexOf(event.target.value), 1);
          resolve(event.target.value);
        };

        // if clicked outside the selection box return null and hide the selection box
        const listenerForMouseup = (event) => {
          if (event.target.id !== "js-chooseLeaf") {
            document.removeEventListener("mouseup", listenerForMouseup);
            leafContainer.removeEventListener("change", listenerForChange);

            leafContainer.style.visibility = "hidden";
            resolve(null);
          }
        };

        // add listener of change of option
        leafContainer.addEventListener("change", listenerForChange);
        // add listener for click outside the selection box
        document.addEventListener("mouseup", listenerForMouseup);
      });
    } else return this.leaf.pop();
  }

  /**
   * add formula to array
   * @param {*} formula
   * @param {*} result
   */
  addToFormulaArray(formula, result) {
    // proof
    if (formula.length > 1) {
      // two proofs
      if (formula[1].length > 1)
        formula[1].forEach((item) => this.addToFormulaArray(item, result));
      // one proof
      else this.addToFormulaArray(formula[1][0], result);
    }
    // leaf
    else {
      if (formula[0] === result[0]) {
        formula[1] = [];
        result[1].forEach((item) => formula[1].push([item]));
        formula.push(result[2]);
      }
    }
  }

  /**
   * render formula
   */
  renderFormula() {
    this.treeContainer.innerHTML = "";
    this.treeContainer.appendChild(this.addToTree(this.tree));
  }

  /**
   * add formula elements to tree
   * @param {} formula
   * @returns elements
   */
  addToTree(formula) {
    // proof
    if (formula.length > 1) {
      const div = document.createElement("div");

      // add class for border
      const divProof = document.createElement("div");
      divProof.className = "proof";

      // add name of rule
      const rule = document.createElement("div");
      rule.innerText = formula[2];
      rule.className = "nameOfRule";

      // two proofs
      if (formula[1].length > 1) {
        divProof.classList.add("siblings");
        formula[1].forEach((item) =>
          divProof.appendChild(this.addToTree(item))
        );
      }
      // one proof
      else divProof.appendChild(this.addToTree(formula[1][0]));

      divProof.appendChild(rule);
      div.appendChild(divProof);

      const span = document.createElement("span");
      span.innerText = formula[0];
      div.appendChild(span);

      return div;
    }
    // leaf
    else {
      const div = document.createElement("div");
      const span = document.createElement("span");

      span.innerText = formula[0];

      div.appendChild(span);

      return div;
    }
  }

  /**
   * check all leaves if are axioms
   */
  checkIfProved() {
    let proved = false;
    for (let leaf of this.leaf) {
      if (
        leaf.includes("¬") ||
        leaf.includes("∧") ||
        leaf.includes("∨") ||
        leaf.includes("⇒")
      ) {
        proved = false;
        break;
      } else proved = true;
    }

    proved ? this.handleEnd() : null;
  }

  /**
   * remove listeners, class and show message
   */
  handleEnd() {
    // get elements with rules
    const rulesContainer = document.querySelector(`#js-${this.method}`);

    // remove listener by clone
    const newRuleContainer = rulesContainer.cloneNode(true);
    rulesContainer.parentNode.replaceChild(newRuleContainer, rulesContainer);

    // remove class
    Array.from(newRuleContainer.children, (rule) => {
      rule.classList.remove("readyToUse");
    });

    this.formulaSuccessMessage.style.visibility = "initial";
  }
}
