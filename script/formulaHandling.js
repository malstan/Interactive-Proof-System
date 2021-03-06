import rulesGSC from "./rules_gsc.js";
import { onError, onSuccess } from "./messages.js";

/**
 * class for formula handling
 *
 *
 * structure of array for store proof tree - this.tree
 * [
 *  'A',
 *  [[
 *    'B',
 *    [[
 *      'C',
 *      [['E']],
 *      '(3)'
 *    ],
 *    [
 *      'D',
 *      [['F']],
 *      '(4)
 *    ]],
 *    '(2)'
 *  ]],
 *  '(1)'
 * ]
 *
 *
 * structure of array for store history - this.history
 * [
 *  {
 *    tree: array tree,
 *    leaf: array leaf,
 *    atom: array atom
 *  },
 *  {...}
 * ]
 */

export default class FormulaHandling {
  /**
   * constructor
   * @param {string} formula - formula from input
   * @param {string} method - proof method
   */
  constructor(formula, method) {
    this.formulaSuccessMessage = document.getElementById("formulaIsProved-js");
    this.treeContainer = document.getElementById("tree-js");

    this.tree = new Array(formula);
    this.leaf = new Array(formula);
    this.atom = [...new Set(formula.replace(/[^A-Z]/g, "").split(""))];

    this.history = new Array();

    this.method = method;

    if (this.method === "gsc") this.rules = rulesGSC;

    // clear tree element
    this.treeContainer.innerHTML = "";

    // message
    this.formulaSuccessMessage.style.visibility = "hidden";

    this.checkIfProved && this.handleEnd();

    this.prepareRules();

    this.renderFormula();

    // listener for step back
    document.getElementById("stepBack-js").addEventListener("click", () => {
      if (
        this.history.length < 1 ||
        this.formulaSuccessMessage.style.visibility == "initial"
      )
        return;

      // get previous state from history
      let previous = this.history.pop();

      this.tree = previous.tree;
      this.leaf = previous.leaf;
      this.atom = previous.atom;

      this.renderFormula();
    });
  }

  /**
   * add event listener to rules
   */
  prepareRules() {
    // get elements with rules
    const rules = document.getElementById(`js-${this.method}`).children;

    // add listener and style to rules
    Array.from(rules, (rule) => {
      rule.classList.add("readyToUse");
      rule.addEventListener("click", (event) => {
        this.handleChooseOfRule(rule.dataset.rule, event.pageX, event.pageY);
      });
    });
  }

  /**
   * apply rule on formula
   * @param {string} ruleName - rule
   * @param {number} x - coordinates of cursor
   * @param {number} y - coordinates of cursor
   */
  async handleChooseOfRule(ruleName, x, y) {
    const actualLeaves = [...this.leaf];
    // get formula for
    let formulaForProof = await this.getFormulaForProof(x, y);
    if (formulaForProof === null || formulaForProof === undefined) return;

    const parser = new nearley.Parser(nearley.Grammar.fromCompiled(grammar));

    try {
      // try to create abstract syntax tree
      parser.feed(formulaForProof);
    } catch (error) {
      // catch error
      console.log(error);
      onError("Niekde nastala chyba");
      return;
    }

    // find and apply rule
    const result = await this.rules
      .find((rule) => rule.name === ruleName)
      .apply(formulaForProof, parser.results.slice(-1)[0], x, y);

    if (Array.isArray(result)) {
      // add to history
      this.history.push(
        JSON.parse(
          JSON.stringify({
            tree: this.tree,
            leaf: actualLeaves,
            atom: this.atom,
          })
        )
      );
      // add new leaves to array
      result[1].forEach((item) => this.leaf.push(item));
      // add result to array
      this.addToFormulaArray(this.tree, result);
      // create new atoms
      if (ruleName == "cut")
        this.atom = [
          ...new Set(
            result[1]
              .join()
              .replace(/[^A-Z]/g, "")
              .split("")
          ),
        ];
      //render and check
      this.renderFormula();
      this.checkIfProved() && this.handleEnd();
    } else {
      this.leaf.push(result);
    }
  }

  /**
   * let user choose formula
   * @param {number} x - coordinates of cursor
   * @param {number} y - coordinates of cursor
   * @returns formula
   */
  async getFormulaForProof(x, y) {
    // check if there are multiple formulas
    if (this.leaf.length > 1) {
      let leafContainer = document.getElementById("js-chooseLeaf");
      // clear options in select box
      leafContainer.innerHTML = "";

      // add options to select box
      let defaultOption = document.createElement("option");
      defaultOption.innerText = "v??ber listu";
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
      return await new Promise((resolve) => {
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
   * add formula to array where is stored every stage of proving
   * @param {string} formula - formula
   * @param {json object} result - consists of formula and new formula/formulas
   */
  addToFormulaArray(formula, result) {
    // as proof
    if (formula.length > 1) {
      // as two proofs
      if (formula[1].length > 1)
        formula[1].forEach((item) => this.addToFormulaArray(item, result));
      // as one proof
      else this.addToFormulaArray(formula[1][0], result);
    }
    // as leaf
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

    // check if tree is bigger than width of viewport. if so, set vertical scrolling
    if (this.treeContainer.offsetWidth < this.treeContainer.scrollWidth) {
      this.treeContainer.style.justifyContent = "flex-start";
      this.treeContainer.style.overflowY = "hidden";
    } else {
      this.treeContainer.style.justifyContent = "center";
      this.treeContainer.style.overflowY = "initial";
    }
  }

  /**
   * add formula elements to tree
   * @param {string} formula - formula
   * @returns elements
   */
  addToTree(formula) {
    // as proof
    if (formula.length > 1) {
      const div = document.createElement("div");

      // add class for border
      const divProof = document.createElement("div");
      divProof.className = "proof";

      // add name of rule
      const rule = document.createElement("div");
      rule.innerText = formula[2];
      rule.className = "nameOfRule";

      // as two proofs
      if (formula[1].length > 1) {
        divProof.classList.add("siblings");
        formula[1].forEach((item) =>
          divProof.appendChild(this.addToTree(item))
        );
      }
      // as one proof
      else divProof.appendChild(this.addToTree(formula[1][0]));

      divProof.appendChild(rule);
      div.appendChild(divProof);

      const span = document.createElement("span");
      span.innerText = formula[0];
      div.appendChild(span);

      return div;
    }
    // as leaf
    else {
      const div = document.createElement("div");
      const span = document.createElement("span");

      span.innerText = formula[0];

      div.appendChild(span);

      return div;
    }
  }

  /**
   * check all leaves if they are axioms
   * @returns proved ? true : false
   */
  checkIfProved() {
    let atomsInFormula = [];
    // check leafs
    for (let leaf of this.leaf) {
      // check for symbol
      if (
        leaf.includes("??") ||
        leaf.includes("???") ||
        leaf.includes("???") ||
        leaf.includes("???")
      )
        return false;

      let sequent = leaf.split("???");
      const left = sequent[0].split(",");
      const right = sequent[1].split(",");

      // check for atoms
      this.atom.map((atom) => {
        if (
          !atomsInFormula.includes(atom) &&
          left.includes(atom) &&
          right.includes(atom)
        )
          atomsInFormula.push(atom);
      });
    }
    if (this.atom.length == atomsInFormula.length) return true;
    else return false;
  }

  /**
   * remove listeners, class and show message
   */
  handleEnd() {
    // get elements with rules
    const rulesContainer = document.getElementById(`js-${this.method}`);

    // remove listener by clone
    const newRuleContainer = rulesContainer.cloneNode(true);
    rulesContainer.parentNode.replaceChild(newRuleContainer, rulesContainer);

    // remove class
    Array.from(newRuleContainer.children, (rule) => {
      rule.classList.remove("readyToUse");
    });

    // check
    this.checkIfProved() &&
      (this.formulaSuccessMessage.style.visibility = "initial");
  }
}
