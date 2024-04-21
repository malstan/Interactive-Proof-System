const gskTreeRules = [
  {
    name: "gsk-tree-id",
    apply: applyId,
  },
  {
    name: "gsk-tree-nr",
    apply: applyNegR,
  },
  {
    name: "gsk-tree-nl",
    apply: applyNegL,
  },
  {
    name: "gsk-tree-cr",
    apply: applyConR,
  },
  {
    name: "gsk-tree-cl1",
    apply: applyConL1,
  },
  {
    name: "gsk-tree-cl2",
    apply: applyConL2,
  },
  {
    name: "gsk-tree-dr1",
    apply: applyDisR1,
  },
  {
    name: "gsk-tree-dr2",
    apply: applyDisR2,
  },
  {
    name: "gsk-tree-dl",
    apply: applyDisL,
  },
  {
    name: "gsk-tree-ir",
    apply: applyImpR,
  },
  {
    name: "gsk-tree-il",
    apply: applyImpL,
  },
  {
    name: "gsk-tree-wl",
    apply: applyWL,
  },
  {
    name: "gsk-tree-col",
    apply: applyCL,
  },
  {
    name: "gsk-tree-cut",
    apply: applyCut,
  },
  {
    name: "gsk-tree-exl",
    apply: applyExL,
  },
];

/**
 * function for converting array of formula to string
 * @param {*} array
 * @returns string formula
 */
function arrayToString(array) {
  if (!Array.isArray(array)) return array;

  if (array[0] == "(" && array[2] == ")") array = array[1];
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
  if (formula[0] === "⊢") return `${result}${formula}`;
  else {
    let splitFormula = formula.split("⊢");
    return `${splitFormula[0]},${result}⊢${splitFormula[1]}`;
  }
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
  formula = formula.replace(/,,/g, ",");

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
    return (formula = formula.replace("(", "").replace(/\)(?=[^\)]*$)/, ""));
  else return formula;
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

function applyId(leaf, ast, formula) {
  let left = ast[ast.indexOf("⊢") - 1];
  let right = ast[ast.indexOf("⊢") + 1];

  if (left == undefined || right == undefined) return leaf;

  // check if there only atoms
  if (
    Array.isArray(left) &&
    left.some((item) => Array.isArray(item) && item[0] != "¬")
  )
    return leaf;
  if (
    Array.isArray(right) &&
    right.some((item) => Array.isArray(item) && item[0] != "¬")
  )
    return leaf;

  left =
    !checkComma(left) || !Array.isArray(left)
      ? [arrayToString(left)]
      : left.map(arrayToString);
  right =
    !checkComma(right) || !Array.isArray(right)
      ? [arrayToString(right)]
      : right?.map(arrayToString);

  const formulaAtom = leaf
    .replace("⊢", ",")
    .split(",")
    .filter((item) => item != "")[formula];

  if (left.includes(formulaAtom) && right.includes(formulaAtom)) {
    return [leaf, [""], "(id)"];
  } else return leaf;
}

/**
 * APPLY RIGHT NEGATION RULE
 * @param {string} leaf
 * @param {array} ast
 * @param {number} formula
 * @returns formula | array
 */
function applyNegR(leaf, ast, formula) {
  // save only right side
  let formulaWithNeg = ast[ast.indexOf("⊢") + 1];

  if (formulaWithNeg === undefined) return leaf;

  // check comma
  if (checkComma(formulaWithNeg)) {
    formulaWithNeg = formulaWithNeg[formula];
  }

  // proving
  if (formulaWithNeg !== null && formulaWithNeg.includes("¬")) {
    // to string
    formulaWithNeg = arrayToString(formulaWithNeg);
    // remove formula from right side
    let newFormula = leaf.replace(formulaWithNeg, "");
    // remove ¬ from formula
    formulaWithNeg = formulaWithNeg.replace("¬", "");
    // handle odd comma
    newFormula = removeOddComma(newFormula);
    return [leaf, [addToLeft(newFormula, formulaWithNeg)], "(¬r)"];
  } else {
    return leaf;
  }
}

/**
 * APPLY LEFT NEGATION RULE
 * @param {string} leaf
 * @param {array} ast
 * @param {number} formula
 * @returns formula | array
 */
function applyNegL(leaf, ast, formula) {
  // save only left side
  let formulaWithNeg = ast[ast.indexOf("⊢") - 1];

  if (formulaWithNeg === undefined) return leaf;

  // check comma
  if (checkComma(formulaWithNeg)) {
    formulaWithNeg = formulaWithNeg[formula];
  }

  // proving
  if (formulaWithNeg !== null && formulaWithNeg.includes("¬")) {
    // to string
    formulaWithNeg = arrayToString(formulaWithNeg);
    // remove formula from right side
    let newFormula = leaf.replace(formulaWithNeg, "");
    // remove ¬ from formula
    formulaWithNeg = formulaWithNeg.replace("¬", "");
    // handle odd comma
    newFormula = removeOddComma(newFormula);
    return [leaf, [addToRight(newFormula, formulaWithNeg)], "(¬l)"];
  } else {
    return leaf;
  }
}

/**
 * APPLY RIGHT CONJUNCTION RULE
 * @param {string} leaf
 * @param {array} ast
 * @param {number} formula
 * @returns formula | array
 */
function applyConR(leaf, ast, formula) {
  // save only right side
  let formulaWithCon = ast[ast.indexOf("⊢") + 1];

  if (formulaWithCon === undefined) return leaf;

  // check comma
  if (checkComma(formulaWithCon)) {
    formulaWithCon = formulaWithCon[formula];
  }

  // proving
  if (formulaWithCon !== null && formulaWithCon.includes("∧")) {
    let firstStatement = formulaWithCon[0];
    let secondStatement = formulaWithCon[2];
    // to string
    formulaWithCon = arrayToString(formulaWithCon);
    // remove formula from right side
    let newFormula = leaf.replace(formulaWithCon, "");
    // handle odd comma
    newFormula = removeOddComma(newFormula);

    return [
      leaf,
      [
        addToRight(newFormula, arrayToString(firstStatement)),
        addToRight(newFormula, arrayToString(secondStatement)),
      ],
      "(∧r)",
    ];
  } else {
    return leaf;
  }
}

/**
 * APPLY LEFT 1 CONJUNCTION RULE
 * @param {string} leaf
 * @param {array} ast
 * @param {number} formula
 * @returns formula | array
 */
function applyConL1(leaf, ast, formula) {
  // save only left side
  let formulaWithCon = ast[ast.indexOf("⊢") - 1];

  if (formulaWithCon === undefined) return leaf;

  // check comma
  if (checkComma(formulaWithCon)) {
    formulaWithCon = formulaWithCon[formula];
  }

  // proving
  if (formulaWithCon !== null && formulaWithCon.includes("∧")) {
    let firstStatement = formulaWithCon[0];
    // to string
    formulaWithCon = arrayToString(formulaWithCon);
    // remove formula from right side
    let newFormula = leaf.replace(formulaWithCon, "");
    // handle odd comma
    newFormula = removeOddComma(newFormula);

    return [
      leaf,
      [addToLeft(newFormula, arrayToString(firstStatement))],
      "(∧l1)",
    ];
  } else {
    return leaf;
  }
}

/**
 * APPLY LEFT 2 CONJUNCTION RULE
 * @param {string} leaf
 * @param {array} ast
 * @param {number} formula
 * @returns formula | array
 */
function applyConL2(leaf, ast, formula) {
  // save only left side
  let formulaWithCon = ast[ast.indexOf("⊢") - 1];

  if (formulaWithCon === undefined) return leaf;

  // check comma
  if (checkComma(formulaWithCon)) {
    formulaWithCon = formulaWithCon[formula];
  }

  // proving
  if (formulaWithCon !== null && formulaWithCon.includes("∧")) {
    let secondStatement = formulaWithCon[2];
    // to string
    formulaWithCon = arrayToString(formulaWithCon);
    // remove formula from right side
    let newFormula = leaf.replace(formulaWithCon, "");
    // handle odd comma
    newFormula = removeOddComma(newFormula);

    return [
      leaf,
      [addToLeft(newFormula, arrayToString(secondStatement))],
      "(∧l2)",
    ];
  } else {
    return leaf;
  }
}

/**
 * APPLY RIGHT DISJUNCTION 1 RULE
 * @param {string} leaf
 * @param {array} ast
 * @param {number} formula
 * @returns formula | array
 */
function applyDisR1(leaf, ast, formula) {
  // save only right side
  let formulaWithDis = ast[ast.indexOf("⊢") + 1];

  if (formulaWithDis === undefined) return leaf;

  // check comma
  if (checkComma(formulaWithDis)) {
    formulaWithDis = formulaWithDis[formula];
  }

  // proving
  if (formulaWithDis !== null && formulaWithDis.includes("∨")) {
    let firstStatement = formulaWithDis[0];
    // to string
    formulaWithDis = arrayToString(formulaWithDis);
    // remove formula from right side
    let newFormula = leaf.replace(formulaWithDis, "");
    // handle odd comma
    newFormula = removeOddComma(newFormula);

    return [
      leaf,
      [addToRight(newFormula, arrayToString(firstStatement))],
      "(∨r1)",
    ];
  } else {
    return leaf;
  }
}

/**
 * APPLY RIGHT DISJUNCTION 2
 * @param {string} leaf
 * @param {array} ast
 * @param {number} formula
 * @returns formula | array
 */
function applyDisR2(leaf, ast, formula) {
  // save only right side
  let formulaWithDis = ast[ast.indexOf("⊢") + 1];

  if (formulaWithDis === undefined) return leaf;

  // check comma
  if (checkComma(formulaWithDis)) {
    formulaWithDis = formulaWithDis[formula];
  }

  // proving
  if (formulaWithDis !== null && formulaWithDis.includes("∨")) {
    let secondStatement = formulaWithDis[2];
    // to string
    formulaWithDis = arrayToString(formulaWithDis);
    // remove formula from right side
    let newFormula = leaf.replace(formulaWithDis, "");
    // handle odd comma
    newFormula = removeOddComma(newFormula);

    return [
      leaf,
      [addToRight(newFormula, arrayToString(secondStatement))],
      "(∨r2)",
    ];
  } else {
    return leaf;
  }
}

/**
 * APPLY LEFT DISJUNCTION
 * @param {string} leaf
 * @param {array} ast
 * @param {number} formula
 * @returns formula | array
 */
function applyDisL(leaf, ast, formula) {
  // save only left side
  let formulaWithDis = ast[ast.indexOf("⊢") - 1];

  if (formulaWithDis === undefined) return leaf;

  // check comma
  if (checkComma(formulaWithDis)) {
    formulaWithDis = formulaWithDis[formula];
  }

  // proving
  if (formulaWithDis !== null && formulaWithDis.includes("∨")) {
    let firstStatement = formulaWithDis[0];
    let secondStatement = formulaWithDis[2];
    // to string
    formulaWithDis = arrayToString(formulaWithDis);
    // remove formula from right side
    let newFormula = leaf.replace(formulaWithDis, "");
    // handle odd comma
    newFormula = removeOddComma(newFormula);

    return [
      leaf,
      [
        addToLeft(newFormula, arrayToString(firstStatement)),
        addToLeft(newFormula, arrayToString(secondStatement)),
      ],
      "(∨l)",
    ];
  } else {
    return leaf;
  }
}

/**
 * APPLY RIGHT IMPLICATION
 * @param {string} leaf
 * @param {array} ast
 * @param {number} formula
 * @returns formula | array
 */
function applyImpR(leaf, ast, formula) {
  // save only right side
  let formulaWithImp = ast[ast.indexOf("⊢") + 1];

  if (formulaWithImp === undefined) return leaf;

  // check comma
  if (checkComma(formulaWithImp)) {
    formulaWithImp = formulaWithImp[formula];
  }

  // proving
  if (formulaWithImp !== null && formulaWithImp.includes("⇒")) {
    let firstStatement = formulaWithImp[0];
    let secondStatement = formulaWithImp[2];
    // to string
    formulaWithImp = arrayToString(formulaWithImp);
    // remove formula from right side
    let newFormula = leaf.replace(formulaWithImp, "");
    // handle odd comma
    newFormula = removeOddComma(newFormula);

    return [
      leaf,
      [
        addToLeft(
          addToRight(newFormula, arrayToString(secondStatement)),
          arrayToString(firstStatement)
        ),
      ],
      "(⇒r)",
    ];
  } else {
    return leaf;
  }
}

/**
 * APPLY LEFT IMPLICATION
 * @param {string} leaf
 * @param {array} ast
 * @param {number} formula
 * @returns formula | array
 */
function applyImpL(leaf, ast, formula) {
  // save only left side
  let formulaWithImp = ast[ast.indexOf("⊢") - 1];

  if (formulaWithImp === undefined) return leaf;

  // check comma
  if (checkComma(formulaWithImp)) {
    formulaWithImp = formulaWithImp[formula];
  }

  // proving
  if (formulaWithImp !== null && formulaWithImp.includes("⇒")) {
    let firstStatement = formulaWithImp[0];
    let secondStatement = formulaWithImp[2];

    // to string
    formulaWithImp = arrayToString(formulaWithImp);
    // remove formula from right side
    let newFormula = leaf.replace(formulaWithImp, "");
    // handle odd comma
    newFormula = removeOddComma(newFormula);

    return [
      leaf,
      [
        addToRight(
          `${newFormula.split("⊢")[0]}⊢`,
          arrayToString(firstStatement)
        ),
        addToLeft(newFormula, arrayToString(secondStatement)),
      ],
      "(⇒l)",
    ];
  } else {
    return leaf;
  }
}

/**
 * APPLY LEFT WEAKENING
 * @param {string} leaf
 * @param {array} ast
 * @param {number} formula
 * @returns formula | array
 */
function applyWL(leaf, ast, formula) {
  // save only left side
  let formulaWithW = ast[ast.indexOf("⊢") - 1];

  if (formulaWithW === undefined) return leaf;

  // check comma
  if (checkComma(formulaWithW)) {
    formulaWithW = formulaWithW[formula];
  }

  // proving
  if (formulaWithW !== null) {
    // to string
    formulaWithW = arrayToString(formulaWithW);
    // remove formula from right side
    let newFormula = leaf.replace(formulaWithW, "");
    // handle odd comma
    newFormula = removeOddComma(newFormula);

    return [leaf, [newFormula], "(wl)"];
  } else {
    return leaf;
  }
}

/**
 * APPLY LEFT CONTRACTION
 * @param {string} leaf
 * @param {array} ast
 * @param {number} formula
 * @returns formula | array
 */
function applyCL(leaf, ast, formula) {
  // save only left side
  let formulaWithC = ast[ast.indexOf("⊢") - 1];

  if (formulaWithC === undefined) return leaf;

  // check comma
  if (checkComma(formulaWithC)) {
    formulaWithC = formulaWithC[formula];
  }

  // proving
  if (formulaWithC !== null) {
    // to string
    formulaWithC = arrayToString(formulaWithC);

    return [leaf, [addToLeft(leaf, formulaWithC)], "(cl)"];
  } else {
    return leaf;
  }
}

/**
 * APPLY CUT
 * @param {string} leaf
 * @param {array} ast
 * @param {number} formula
 * @returns formula | array
 */
function applyCut(leaf, ast, formula, cut) {
  // proving
  if (cut !== null) {
    return [leaf, [addToRight(leaf, cut), addToLeft(leaf, cut)], "(cut)"];
  } else {
    return leaf;
  }
}

/**
 * APPLY LEFT EXCHANGE
 * @param {string} leaf
 * @param {array} ast
 * @param {number} formula
 * @returns formula | array
 */
function applyExL(leaf, ast, formula, cut, exchange) {
  // proving
  if (exchange.first && exchange.second) {
    // get right side as array
    let left = leaf.split("⊢")[0];
    let leftArray = left.split(",");

    // swap
    let firstIndex = leftArray.indexOf(exchange.first);
    let secondIndex = leftArray.indexOf(exchange.second);
    leftArray[firstIndex] = exchange.second;
    leftArray[secondIndex] = exchange.first;

    // new formula
    let newFormula = leftArray.join(",") + leaf.slice(leaf.indexOf("⊢"));

    return [leaf, [newFormula], "(exl)"];
  } else {
    return leaf;
  }
}

export default gskTreeRules;
