import { onError } from "./messages.js";

export default [
  {
    name: "neg_r",
    apply: applyNegR,
  },
  {
    name: "neg_l",
    apply: applyNegL,
  },
  {
    name: "con_r",
    apply: applyConR,
  },
  {
    name: "con_l1",
    apply: applyConL1,
  },
  {
    name: "con_l2",
    apply: applyConL2,
  },
  {
    name: "dis_r1",
    apply: applyDisR1,
  },
  {
    name: "dis_r2",
    apply: applyDisR2,
  },
  {
    name: "dis_l",
    apply: applyDisL,
  },
  {
    name: "imp_r",
    apply: applyImpR,
  },
  {
    name: "imp_l",
    apply: applyImpL,
  },
  {
    name: "wr",
    apply: applyWR,
  },
  {
    name: "wl",
    apply: applyWL,
  },
  {
    name: "cr",
    apply: applyCR,
  },
  {
    name: "cl",
    apply: applyCL,
  },
  {
    name: "cut",
    apply: applyCut,
  },
  {
    name: "exr",
    apply: applyExR,
  },
  {
    name: "exl",
    apply: applyExL,
  },
];

/**
 * get user know about error
 * @param {string} rule  - name of rule
 */
function canNotApply(rule) {
  onError("Pravidlo " + rule + " sa nedá aplikovať na formulu.");
}

/**
 * function for converting array of formula to string
 * @param {*} array
 * @returns string formula
 */
function arrayToString(array) {
  if (!Array.isArray(array)) return array;

  let string = array.join("");
  string = string.replaceAll(",", "");
  return string;
}

/**
 * add result of proof to right side of formula
 * @param {string} formula
 * @param {string} result
 * @returns new formula
 */
function addToRight(formula, result) {
  result = removeUnnecessaryBrackets(result);
  if (formula[formula.length - 1] === "⊢") return `${formula}${result}`;
  else return `${formula},${result}`;
}

/**
 * add result of proof to left side of formula
 * @param {string} formula
 * @param {string} result
 * @returns new formula
 */
function addToLeft(formula, result) {
  result = removeUnnecessaryBrackets(result);
  if (formula[0] === "⊢") return `${result}${formula}`;
  else {
    let splitFormula = formula.split("⊢");
    return `${splitFormula[0]},${result}⊢${splitFormula[1]}`;
  }
}

/**
 * check if array includes the symbols
 * yes -> there is no comma in formula
 * no -> there is comma in formula
 * @param {string} formula
 * @returns boolean
 */
function checkComma(formula) {
  return !(
    formula.includes("¬") ||
    formula.includes("∧") ||
    formula.includes("∨") ||
    formula.includes("⇒")
  );
}

/**
 * let user choose proposition from formula
 * @param {string} formula
 * @param {number} x
 * @param {number} y
 * @returns proposition
 */
async function handleComma(formula, x, y) {
  if (!Array.isArray(formula)) return formula;
  // split
  let formulas = formula.filter((item) => item !== ",");

  let formulaContainer = document.getElementById("js-chooseLeaf");
  // clear options
  formulaContainer.innerHTML = "";

  // add options
  let defaultOption = document.createElement("option");
  defaultOption.innerText = "výber";
  formulaContainer.appendChild(defaultOption);
  formulas.forEach((item) => {
    let option = document.createElement("option");
    option.innerText = arrayToString(item);
    formulaContainer.appendChild(option);
  });

  // set coordinates and visibility
  formulaContainer.style.visibility = "initial";
  formulaContainer.style.top = `${y}px`;
  formulaContainer.style.left = `${x}px`;

  // wait for user choice
  return new Promise((resolve) => {
    // return chosen formula
    const listenerForChange = () => {
      document.removeEventListener("mouseup", listenerForMouseup);
      formulaContainer.removeEventListener("change", listenerForChange);

      formulaContainer.style.visibility = "hidden";
      resolve(formulas[formulaContainer.selectedIndex - 1]);
    };

    // if clicked outside the selection box return false and hide the selection box
    const listenerForMouseup = (event) => {
      if (event.target.id !== "js-chooseLeaf") {
        document.removeEventListener("mouseup", listenerForMouseup);
        formulaContainer.removeEventListener("change", listenerForChange);

        formulaContainer.style.visibility = "hidden";
        resolve(false);
      }
    };

    // add listener of change of option
    formulaContainer.addEventListener("change", listenerForChange);
    // add listener for click outside the selection box
    document.addEventListener("mouseup", listenerForMouseup);
  });
}

/**
 * get new formula from user for cut rule
 * @param {number} x
 * @param {number} y
 * @returns formula
 */
async function inputForCut(x, y) {
  const formForCut = document.getElementById("formForCut");

  // show form
  formForCut.style.display = "initial";

  return new Promise((resolve) => {
    // return input formula
    const listenerForSubmit = (event) => {
      event.preventDefault();

      formForCut.removeEventListener("submit", listenerForSubmit);
      formForCut.removeEventListener("reset", listenerForReset);

      let formula = formForCut.elements["forCut"].value.replace(" ", "");

      // check input formula
      const parser = new nearley.Parser(nearley.Grammar.fromCompiled(grammar));
      try {
        // check if formula is empty
        if (formula === "" || formula.includes("⊢"))
          throw new Error("Formula is empty.");

        // try to create abstract syntax tree
        parser.feed(formula);
      } catch (error) {
        // catch error and show message
        console.log(error);
        onError("Zadajte správny tvar formuly.");
        resolve(null);
      }

      // hide form
      formForCut.style.display = "none";
      formForCut.reset();

      resolve(formula);
    };

    // reset and hide form
    const listenerForReset = () => {
      formForCut.removeEventListener("submit", listenerForSubmit);
      formForCut.removeEventListener("reset", listenerForReset);

      formForCut.style.display = "none";
      formForCut.reset();

      resolve(false);
    };

    // listeners
    formForCut.addEventListener("submit", listenerForSubmit);
    formForCut.addEventListener("reset", listenerForReset);
  });
}

/**
 * remove odd comma after proving
 * @param {string} formula
 * @returns edited formula
 */
function removeOddComma(formula) {
  // comma is at the start
  if (formula[0] === ",") formula = formula.slice(1);

  let id = formula.indexOf("⊢");
  // comma is right before ⊢
  if (formula[id - 1] === ",") {
    formula = formula.slice(0, id - 1) + formula.slice(id);
    id--;
  }

  // comma is right after ⊢
  if (formula[id + 1] === ",")
    formula = formula.slice(0, id + 1) + formula.slice(id + 2);

  // comma is at the end
  if (formula[formula.length - 1] === ",") formula = formula.slice(0, -1);

  // duplicate commas
  formula = [...formula]
    .filter((item, index, formula) => item !== formula[index + 1])
    .join("");

  return formula;
}

/**
 * remove unnecessary brackets
 * @param {string} formula
 * @param {array} ast
 * @param {number} x
 * @param {number} y
 * @returns formula without brackets
 */
function removeUnnecessaryBrackets(formula) {
  if (!Array.isArray(formula))
    return (formula = formula.replace("(", "").replace(")", ""));
  else return formula;
}

/**
 * APPLY RIGHT NEGATION RULE
 * @param {string} formula
 * @param {array} ast
 * @param {number} x
 * @param {number} y
 * @returns formula | array
 */
async function applyNegR(formula, ast, x, y) {
  // save only right side
  let formulaWithNeg = ast[ast.indexOf("⊢") + 1];

  // check undefined
  if (formulaWithNeg === undefined) {
    canNotApply("pravá negácia");
    return formula;
  }

  // handle commas
  if (checkComma(formulaWithNeg))
    formulaWithNeg = await handleComma(formulaWithNeg, x, y);

  if (formulaWithNeg === false) return formula;

  // proving
  if (formulaWithNeg !== null && formulaWithNeg.includes("¬")) {
    // to string
    formulaWithNeg = arrayToString(formulaWithNeg);
    // remove formula from right side
    let newFormula = formula.replace(formulaWithNeg, "");
    // remove ¬ from formula
    formulaWithNeg = formulaWithNeg.replace("¬", "");
    // handle odd comma
    newFormula = removeOddComma(newFormula);

    return [formula, [addToLeft(newFormula, formulaWithNeg)], "(¬r)"];
  } else {
    canNotApply("pravá negácia");
    return formula;
  }
}

/**
 * APPLY LEFT NEGATION RULE
 * @param {string} formula
 * @param {array} ast
 * @param {number} x
 * @param {number} y
 * @returns formula | array
 */
async function applyNegL(formula, ast, x, y) {
  // save only left side
  let formulaWithNeg = ast[ast.indexOf("⊢") - 1];

  // check undefined
  if (formulaWithNeg === undefined) {
    canNotApply("ľavá negácia");
    return formula;
  }

  // handle commas
  if (checkComma(formulaWithNeg))
    formulaWithNeg = await handleComma(formulaWithNeg, x, y);

  if (formulaWithNeg === false) return formula;

  // proving
  if (formulaWithNeg !== null && formulaWithNeg.includes("¬")) {
    // to string
    formulaWithNeg = arrayToString(formulaWithNeg);
    // remove formula from right side
    let newFormula = formula.replace(formulaWithNeg, "");
    // remove ¬ from formula
    formulaWithNeg = formulaWithNeg.replace("¬", "");
    // handle odd comma
    newFormula = removeOddComma(newFormula);

    // add to right side
    return [formula, [addToRight(newFormula, formulaWithNeg)], "(¬l)"];
  } else {
    canNotApply("ľavá negácia");
    return formula;
  }
}

/**
 * APPLY RIGHT CONJUNCTION RULE
 * @param {string} formula
 * @param {array} ast
 * @param {number} x
 * @param {number} y
 * @returns formula | array
 */
async function applyConR(formula, ast, x, y) {
  // save only right side
  let formulaWithCon = ast[ast.indexOf("⊢") + 1];

  // check undefined
  if (formulaWithCon === undefined) {
    canNotApply("pravá konjunkcia");
    return formula;
  }

  // handle commas
  if (checkComma(formulaWithCon))
    formulaWithCon = await handleComma(formulaWithCon, x, y);

  if (formulaWithCon === false) return formula;

  // proving
  if (formulaWithCon !== null && formulaWithCon.includes("∧")) {
    let firstStatement = formulaWithCon[0];
    let secondStatement = formulaWithCon[2];
    // to string
    formulaWithCon = arrayToString(formulaWithCon);
    // remove formula from right side
    let newFormula = formula.replace(formulaWithCon, "");
    // handle odd comma
    newFormula = removeOddComma(newFormula);

    return [
      formula,
      [
        addToRight(newFormula, arrayToString(firstStatement)),
        addToRight(newFormula, arrayToString(secondStatement)),
      ],
      "(∧r)",
    ];
  } else {
    canNotApply("pravá konjunkcia");
    return formula;
  }
}

/**
 * APPLY LEFT 1 CONJUNCTION RULE
 * @param {string} formula
 * @param {array} ast
 * @param {number} x
 * @param {number} y
 * @returns formula | array
 */
async function applyConL1(formula, ast, x, y) {
  // save only left side
  let formulaWithCon = ast[ast.indexOf("⊢") - 1];

  if (formulaWithCon === undefined) {
    canNotApply("ľavá konjunkcia 1");
    return formula;
  }

  // handle commas
  if (checkComma(formulaWithCon))
    formulaWithCon = await handleComma(formulaWithCon, x, y);

  if (formulaWithCon === false) return formula;

  // proving
  if (formulaWithCon !== null && formulaWithCon.includes("∧")) {
    let firstStatement = formulaWithCon[0];
    // to string
    formulaWithCon = arrayToString(formulaWithCon);
    // remove formula from right side
    let newFormula = formula.replace(formulaWithCon, "");
    // handle odd comma
    newFormula = removeOddComma(newFormula);

    return [
      formula,
      [addToLeft(newFormula, arrayToString(firstStatement))],
      "(∧l1)",
    ];
  } else {
    canNotApply("ľavá konjunkcia 1");
    return formula;
  }
}

/**
 * APPLY LEFT 2 CONJUNCTION RULE
 * @param {string} formula
 * @param {array} ast
 * @param {number} x
 * @param {number} y
 * @returns formula | array
 */
async function applyConL2(formula, ast, x, y) {
  // save only left side
  let formulaWithCon = ast[ast.indexOf("⊢") - 1];

  if (formulaWithCon === undefined) {
    canNotApply("ľavá konjunkcia 2");
    return formula;
  }

  // handle commas
  if (checkComma(formulaWithCon))
    formulaWithCon = await handleComma(formulaWithCon, x, y);

  if (formulaWithCon === false) return formula;

  // proving
  if (formulaWithCon !== null && formulaWithCon.includes("∧")) {
    let secondStatement = formulaWithCon[2];
    // to string
    formulaWithCon = arrayToString(formulaWithCon);
    // remove formula from right side
    let newFormula = formula.replace(formulaWithCon, "");
    // handle odd comma
    newFormula = removeOddComma(newFormula);

    return [
      formula,
      [addToLeft(newFormula, arrayToString(secondStatement))],
      "(∧l2)",
    ];
  } else {
    canNotApply("ľavá konjunkcia 2");
    return formula;
  }
}

/**
 * APPLY RIGHT DISJUNCTION 1 RULE
 * @param {string} formula
 * @param {array} ast
 * @param {number} x
 * @param {number} y
 * @returns formula | array
 */
async function applyDisR1(formula, ast, x, y) {
  // save only right side
  let formulaWithDis = ast[ast.indexOf("⊢") + 1];

  if (formulaWithDis === undefined) {
    canNotApply("pravá disjunkcia 1");
    return formula;
  }

  // handle commas
  if (checkComma(formulaWithDis))
    formulaWithDis = await handleComma(formulaWithDis, x, y);

  if (formulaWithDis === false) return formula;

  // proving
  if (formulaWithDis !== null && formulaWithDis.includes("∨")) {
    let firstStatement = formulaWithDis[0];
    // to string
    formulaWithDis = arrayToString(formulaWithDis);
    // remove formula from right side
    let newFormula = formula.replace(formulaWithDis, "");
    // handle odd comma
    newFormula = removeOddComma(newFormula);

    return [
      formula,
      [addToRight(newFormula, arrayToString(firstStatement))],
      "(∨r1)",
    ];
  } else {
    canNotApply("pravá disjunkcia 1");
    return formula;
  }
}

/**
 * APPLY RIGHT DISJUNCTION 2
 * @param {string} formula
 * @param {array} ast
 * @param {number} x
 * @param {number} y
 * @returns formula | array
 */
async function applyDisR2(formula, ast, x, y) {
  // save only right side
  let formulaWithDis = ast[ast.indexOf("⊢") + 1];

  if (formulaWithDis === undefined) {
    canNotApply("pravá disjunkcia 2");
    return formula;
  }

  // handle commas
  if (checkComma(formulaWithDis))
    formulaWithDis = await handleComma(formulaWithDis, x, y);

  if (formulaWithDis === false) return formula;

  // proving
  if (formulaWithDis !== null && formulaWithDis.includes("∨")) {
    let secondStatement = formulaWithDis[2];
    // to string
    formulaWithDis = arrayToString(formulaWithDis);
    // remove formula from right side
    let newFormula = formula.replace(formulaWithDis, "");
    // handle odd comma
    newFormula = removeOddComma(newFormula);

    return [
      formula,
      [addToRight(newFormula, arrayToString(secondStatement))],
      "(∨r2)",
    ];
  } else {
    canNotApply("pravá disjunkcia 2");
    return formula;
  }
}

/**
 * APPLY LEFT DISJUNCTION
 * @param {string} formula
 * @param {array} ast
 * @param {number} x
 * @param {number} y
 * @returns formula | array
 */
async function applyDisL(formula, ast, x, y) {
  // save only left side
  let formulaWithDis = ast[ast.indexOf("⊢") - 1];

  if (formulaWithDis === undefined) {
    canNotApply("ľavá disjunkcia");
    return formula;
  }

  // handle commas
  if (checkComma(formulaWithDis))
    formulaWithDis = await handleComma(formulaWithDis, x, y);

  if (formulaWithDis === false) return formula;

  // proving
  if (formulaWithDis !== null && formulaWithDis.includes("∨")) {
    let firstStatement = formulaWithDis[0];
    let secondStatement = formulaWithDis[2];
    // to string
    formulaWithDis = arrayToString(formulaWithDis);
    // remove formula from right side
    let newFormula = formula.replace(formulaWithDis, "");
    // handle odd comma
    newFormula = removeOddComma(newFormula);

    return [
      formula,
      [
        addToLeft(newFormula, arrayToString(firstStatement)),
        addToLeft(newFormula, arrayToString(secondStatement)),
      ],
      "(∨l)",
    ];
  } else {
    canNotApply("ľavá disjunkcia");
    return formula;
  }
}

/**
 * APPLY RIGHT IMPLICATION
 * @param {string} formula
 * @param {array} ast
 * @param {number} x
 * @param {number} y
 * @returns formula | array
 */
async function applyImpR(formula, ast, x, y) {
  // save only right side
  let formulaWithImp = ast[ast.indexOf("⊢") + 1];

  if (formulaWithImp === undefined) {
    canNotApply("pravá implikácia");
    return formula;
  }

  // handle commas
  if (checkComma(formulaWithImp))
    formulaWithImp = await handleComma(formulaWithImp, x, y);

  if (formulaWithImp === false) return formula;

  // proving
  if (formulaWithImp !== null && formulaWithImp.includes("⇒")) {
    let firstStatement = formulaWithImp[0];
    let secondStatement = formulaWithImp[2];
    // to string
    formulaWithImp = arrayToString(formulaWithImp);
    // remove formula from right side
    let newFormula = formula.replace(formulaWithImp, "");
    // handle odd comma
    newFormula = removeOddComma(newFormula);

    return [
      formula,
      [
        addToLeft(
          addToRight(newFormula, arrayToString(secondStatement)),
          arrayToString(firstStatement)
        ),
      ],
      "(⇒r)",
    ];
  } else {
    canNotApply("pravá implikácia");
    return formula;
  }
}

/**
 * APPLY LEFT IMPLICATION
 * @param {string} formula
 * @param {array} ast
 * @param {number} x
 * @param {number} y
 * @returns formula | array
 */
async function applyImpL(formula, ast, x, y) {
  // save only left side
  let formulaWithImp = ast[ast.indexOf("⊢") - 1];

  if (formulaWithImp === undefined) {
    canNotApply("ľavá implikácia");
    return formula;
  }

  // handle commas
  if (checkComma(formulaWithImp))
    formulaWithImp = await handleComma(formulaWithImp, x, y);

  if (formulaWithImp === false) return formula;

  // proving
  if (formulaWithImp !== null && formulaWithImp.includes("⇒")) {
    let firstStatement = formulaWithImp[0];
    let secondStatement = formulaWithImp[2];

    // to string
    formulaWithImp = arrayToString(formulaWithImp);
    // remove formula from right side
    let newFormula = formula.replace(formulaWithImp, "");
    // handle odd comma
    newFormula = removeOddComma(newFormula);

    return [
      formula,
      [
        addToRight(newFormula, arrayToString(firstStatement)),
        addToLeft(newFormula, arrayToString(secondStatement)),
      ],
      "(⇒l)",
    ];
  } else {
    canNotApply("ľavá implikácia");
    return formula;
  }
}

/**
 * APPLY RIGHT WEAKENING
 * @param {string} formula
 * @param {array} ast
 * @param {number} x
 * @param {number} y
 * @returns formula | array
 */
async function applyWR(formula, ast, x, y) {
  // save only right side
  let formulaWithW = ast[ast.indexOf("⊢") + 1];

  if (formulaWithW === undefined) {
    canNotApply("pravé zoslabenie");
    return formula;
  }

  // handle commas
  if (checkComma(formulaWithW))
    formulaWithW = await handleComma(formulaWithW, x, y);

  if (formulaWithW === false) return formula;

  // proving
  if (formulaWithW !== null) {
    // to string
    formulaWithW = arrayToString(formulaWithW);
    // remove formula from right side
    let newFormula = formula.replace(formulaWithW, "");
    // handle odd comma
    newFormula = removeOddComma(newFormula);

    return [formula, [newFormula], "(wr)"];
  } else {
    canNotApply("pravé zoslabenie");
    return formula;
  }
}

/**
 * APPLY LEFT WEAKENING
 * @param {string} formula
 * @param {array} ast
 * @param {number} x
 * @param {number} y
 * @returns formula | array
 */
async function applyWL(formula, ast, x, y) {
  // save only left side
  let formulaWithW = ast[ast.indexOf("⊢") - 1];

  if (formulaWithW === undefined) {
    canNotApply("ľavé zoslabenie");
    return formula;
  }

  // handle commas
  if (checkComma(formulaWithW))
    formulaWithW = await handleComma(formulaWithW, x, y);

  if (formulaWithW === false) return formula;

  // proving
  if (formulaWithW !== null) {
    // to string
    formulaWithW = arrayToString(formulaWithW);
    // remove formula from right side
    let newFormula = formula.replace(formulaWithW, "");
    // handle odd comma
    newFormula = removeOddComma(newFormula);

    return [formula, [newFormula], "(wl)"];
  } else {
    canNotApply("ľavé zoslabenie");
    return formula;
  }
}

/**
 * APPLY RIGHT CONTRACTION
 * @param {string} formula
 * @param {array} ast
 * @param {number} x
 * @param {number} y
 * @returns formula | array
 */
async function applyCR(formula, ast, x, y) {
  // save only right side
  let formulaWithC = ast[ast.indexOf("⊢") + 1];

  if (formulaWithC === undefined) {
    canNotApply("pravá kontrakcia");
    return formula;
  }

  // handle commas
  if (checkComma(formulaWithC))
    formulaWithC = await handleComma(formulaWithC, x, y);

  if (formulaWithC === false) return formula;

  // proving
  if (formulaWithC !== null) {
    // to string
    formulaWithC = arrayToString(formulaWithC);

    return [
      formula,
      [addToRight(formula, arrayToString(formulaWithC))],
      "(cr)",
    ];
  } else {
    canNotApply("pravá kontrakcia");
    return formula;
  }
}

/**
 * APPLY LEFT CONTRACTION
 * @param {string} formula
 * @param {array} ast
 * @param {number} x
 * @param {number} y
 * @returns formula | array
 */
async function applyCL(formula, ast, x, y) {
  // save only left side
  let formulaWithC = ast[ast.indexOf("⊢") - 1];

  if (formulaWithC === undefined) {
    canNotApply("ľavá kontrakcia");
    return formula;
  }

  // handle commas
  if (checkComma(formulaWithC))
    formulaWithC = await handleComma(formulaWithC, x, y);

  if (formulaWithC === false) return formula;

  // proving
  if (formulaWithC !== null) {
    // to string
    formulaWithC = arrayToString(formulaWithC);

    return [formula, [addToLeft(formula, formulaWithC)], "(cl)"];
  } else {
    canNotApply("ľavá kontrakcia");
    return formula;
  }
}

/**
 * APPLY CUT
 * @param {string} formula
 * @param {array} ast
 * @param {number} x
 * @param {number} y
 * @returns formula | array
 */
async function applyCut(formula, ast, x, y) {
  let formulaToAdd = await inputForCut();
  // proving
  if (formulaToAdd === false) return formula;
  if (formulaToAdd !== null) {
    return [
      formula,
      [addToRight(formula, formulaToAdd), addToLeft(formula, formulaToAdd)],
      "(cut)",
    ];
  } else {
    canNotApply("rez");
    return formula;
  }
}

/**
 * APPLY LEFT EXCHANGE
 * @param {string} formula
 * @param {array} ast
 * @param {number} x
 * @param {number} y
 * @returns formula | array
 */
async function applyExL(formula, ast, x, y) {
  // save only left side
  let formulaWithEx = ast[ast.indexOf("⊢") - 1];

  if (formulaWithEx === undefined) {
    canNotApply("ľavá výmena");
    return formula;
  }

  let first, second;
  // handle commas
  if (checkComma(formulaWithEx)) {
    first = arrayToString(await handleComma(formulaWithEx, x, y));
    second = arrayToString(
      await handleComma(
        formulaWithEx.filter((item) => item != first),
        x,
        y
      )
    );
  }

  // proving
  if (first && second) {
    // get right side as array
    let left = formula.split("⊢")[0];
    let leftArray = left.split(",");

    // swap
    let firstIndex = leftArray.indexOf(first);
    let secondIndex = leftArray.indexOf(second);
    leftArray[firstIndex] = second;
    leftArray[secondIndex] = first;

    // new formula
    let newFormula = leftArray.join(",") + formula.slice(formula.indexOf("⊢"));

    return [formula, [newFormula], "(exl)"];
  } else {
    canNotApply("ľavá výmena");
    return formula;
  }
}

/**
 * APPLY RIGHT EXCHANGE
 * @param {string} formula
 * @param {array} ast
 * @param {number} x
 * @param {number} y
 * @returns formula | array
 */
async function applyExR(formula, ast, x, y) {
  // save only right side
  let formulaWithEx = ast[ast.indexOf("⊢") + 1];

  if (formulaWithEx === undefined) {
    canNotApply("pravá výmena");
    return formula;
  }

  let first, second;
  // handle commas
  if (checkComma(formulaWithEx)) {
    first = arrayToString(await handleComma(formulaWithEx, x, y));
    second = arrayToString(
      await handleComma(
        formulaWithEx.filter((item) => item != first),
        x,
        y
      )
    );
  }

  // proving
  if (first && second) {
    // get right side as array
    let right = formula.split("⊢")[1];
    let rightArray = right.split(",");

    // swap
    let firstIndex = rightArray.indexOf(first);
    let secondIndex = rightArray.indexOf(second);
    rightArray[firstIndex] = second;
    rightArray[secondIndex] = first;

    // new formula
    let newFormula =
      formula.slice(0, formula.indexOf("⊢") + 1) + rightArray.join(",");

    return [formula, [newFormula], "(exr)"];
  } else {
    canNotApply("pravá výmena");
    return formula;
  }
}
