const gskTreeRules = [
  {
    name: "gsk-tree-id",
    apply: applyId,
  },
  {
    name: "gsk-tree-uqr",
    apply: applyUQR,
  },
  {
    name: "gsk-tree-uql",
    apply: applyUQL,
  },
  {
    name: "gsk-tree-eqr",
    apply: applyEQR,
  },
  {
    name: "gsk-tree-eql",
    apply: applyEQL,
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
    name: "gsk-tree-wr",
    apply: applyWR,
  },
  {
    name: "gsk-tree-wl",
    apply: applyWL,
  },
  {
    name: "gsk-tree-cor",
    apply: applyCR,
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
    name: "gsk-tree-exr",
    apply: applyExR,
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
  if (array[0] == "(" && array[2] == ")") array = array[1];

  const itemToString = (item) => {
    if (Array.isArray(item)) {
      if (Array.isArray(item[0])) {
        return item.flatMap(itemToString).join("");
      } else {
        if (item[0] == "¬") {
          return `${item[0]}${itemToString(item[1])}`;
        } else if (item[0].match(/[A-Z]\(/g) || item[0].match(/[a-z]\(/g)) {
          return `${item[0]}${item[1]
            .flatMap(itemToString)
            .join(",")
            .replaceAll("(,", "(")
            .replaceAll(",)", ")")}${item[2]}`;
        } else if (item.length == 2 && Array.isArray(item[1])) {
          return `${item[0]}${item[1].flatMap(itemToString).join("")}${
            item[2] != null ? item[2] : ""
          }`;
        } else {
          return item.flatMap(itemToString).join("");
        }
      }
    } else return item.toString();
  };

  return itemToString(array);
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
    formula.includes("⇒") ||
    formula[0].includes("∀") ||
    formula[0].includes("∃")
  );
}

/**
 * APPLY IDENTITY RULE
 */
function applyId(leaf, ast, formula) {
  const left = ast[ast.indexOf("⊢") - 1];
  const right = ast[ast.indexOf("⊢") + 1];

  if (left == undefined || right == undefined) return leaf;

  if (!checkComma(leaf.replaceAll("¬", "0"))) return leaf;

  let formulaAtom = "";

  const termToString = (term) => {
    return Array.isArray(term)
      ? term.length == 1
        ? term[0]
        : `${term[0]}${term[1]
            .map(termToString)
            .join(",")
            .replaceAll("(,", "(")
            .replaceAll(",)", ")")}${term[2]}`
      : term;
  };

  // is predicate or quantidfier
  if (
    (left[0].match(/[A-Z]\(/g) || left[0].match(/[a-z]\(/g)) &&
    formula == 0
  ) {
    formulaAtom = termToString(left);
    // is just one
  } else if (!Array.isArray(left) && formula == 0) {
    formulaAtom = left;
    // is more
  } else formulaAtom = left.map(arrayToString)[formula];

  if (leaf.split("⊢").every((side) => side.includes(formulaAtom))) {
    return [leaf, [""], "(id)"];
  } else return leaf;
}
/**
 * APPLY UNIVERSAL QUANTIFIER RIGHT RULE
 */
function applyUQR(leaf, ast, formula, cut, exchange, term) {
  // save only right side
  let formulaWithUQ = ast[ast.indexOf("⊢") + 1];

  if (formulaWithUQ === undefined) return leaf;

  // check comma
  if (checkComma(formulaWithUQ)) {
    formulaWithUQ = formulaWithUQ[formula];
  }

  // proving
  if (
    formulaWithUQ !== null &&
    formulaWithUQ[0].includes("∀") &&
    term.length == 1
  ) {
    // get variable and formula
    const variable = formulaWithUQ[0][2];
    let QFormula = arrayToString(formulaWithUQ[1]);

    // substitution
    QFormula = QFormula.replaceAll(variable, term);

    // to string
    formulaWithUQ = arrayToString(formulaWithUQ);
    // remove formula from right side
    let newFormula = leaf.replace(formulaWithUQ, "");
    // handle odd comma
    newFormula = removeOddComma(newFormula);
    return [leaf, [addToRight(newFormula, QFormula)], "(∀r)"];
  } else {
    return leaf;
  }
}
/**
 * APPLY UNIVERSAL QUANTIFIER LEFT RULE
 */
function applyUQL(leaf, ast, formula, cut, exchange, term) {
  // save only right side
  let formulaWithUQ = ast[ast.indexOf("⊢") - 1];

  if (formulaWithUQ === undefined) return leaf;

  // check comma
  if (checkComma(formulaWithUQ)) {
    formulaWithUQ = formulaWithUQ[formula];
  }

  // proving
  if (
    formulaWithUQ !== null &&
    formulaWithUQ[0].includes("∀") &&
    term.length > 0
  ) {
    // get variable and formula
    const variable = formulaWithUQ[0][2];
    let QFormula = arrayToString(formulaWithUQ[1]);

    // substitution
    QFormula = QFormula.replaceAll(variable, term);

    // to string
    formulaWithUQ = arrayToString(formulaWithUQ);
    // remove formula from left side
    let newFormula = leaf.replace(formulaWithUQ, "");
    // handle odd comma
    newFormula = removeOddComma(newFormula);
    return [leaf, [addToLeft(newFormula, QFormula)], "(∀l)"];
  } else {
    return leaf;
  }
}
/**
 * APPLY EXISTENTIONAL QUANTIFIER RIGHT RULE
 */
function applyEQR(leaf, ast, formula, cut, exchange, term) {
  // save only right side
  let formulaWithUQ = ast[ast.indexOf("⊢") + 1];

  if (formulaWithUQ === undefined) return leaf;

  // check comma
  if (checkComma(formulaWithUQ)) {
    formulaWithUQ = formulaWithUQ[formula];
  }

  // proving
  if (
    formulaWithUQ !== null &&
    formulaWithUQ[0].includes("∃") &&
    term.length > 0
  ) {
    // get variable and formula
    const variable = formulaWithUQ[0][2];
    let QFormula = arrayToString(formulaWithUQ[1]);

    // substitution
    QFormula = QFormula.replaceAll(variable, term);

    // to string
    formulaWithUQ = arrayToString(formulaWithUQ);
    // remove formula from right side
    let newFormula = leaf.replace(formulaWithUQ, "");
    // handle odd comma
    newFormula = removeOddComma(newFormula);
    console.log(newFormula);
    return [leaf, [addToRight(newFormula, QFormula)], "(∃r)"];
  } else {
    return leaf;
  }
}
/**
 * APPLY EXISTENTIONAL QUANTIFIER LEFT RULE
 */
function applyEQL(leaf, ast, formula, cut, exchange, term) {
  // save only right side
  let formulaWithUQ = ast[ast.indexOf("⊢") - 1];

  if (formulaWithUQ === undefined) return leaf;

  // check comma
  if (checkComma(formulaWithUQ)) {
    formulaWithUQ = formulaWithUQ[formula];
  }

  // proving
  if (
    formulaWithUQ !== null &&
    formulaWithUQ[0].includes("∃") &&
    term.length > 0
  ) {
    // get variable and formula
    const variable = formulaWithUQ[0][2];
    let QFormula = arrayToString(formulaWithUQ[1]);

    // substitution
    QFormula = QFormula.replaceAll(variable, term);

    // to string
    formulaWithUQ = arrayToString(formulaWithUQ);
    // remove formula from left side
    let newFormula = leaf.replace(formulaWithUQ, "");
    // handle odd comma
    newFormula = removeOddComma(newFormula);
    return [leaf, [addToLeft(newFormula, QFormula)], "(∃l)"];
  } else {
    return leaf;
  }
}
/**
 * APPLY NEGATION RIGHT RULE
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
 * APPLY NEGATION LEFT RULE
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
 * APPLY CONJUNCTION RIGHT RULE
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
 * APPLY CONJUNCTION LEFT RULE 1
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
 * APPLY CONJUNCTION LEFT RULE 2
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
 * APPLY DISJUNCTION RIGHT RULE 1
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
 * APPLY DISJUNCTION RIGHT RULE 2
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
 * APPLY DISJUNCTION LEFT RULE
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
 * APPLY IMPLICATION RIGHT RULE
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
 * APPLY IMPLICATION LEFT RULE
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
        addToRight(newFormula, arrayToString(firstStatement)),
        addToLeft(newFormula, arrayToString(secondStatement)),
      ],
      "(⇒l)",
    ];
  } else {
    return leaf;
  }
}
/**
 * APPLY WEAKENING RIGHT RULE
 */
function applyWR(leaf, ast, formula) {
  // save only right side
  let formulaWithW = ast[ast.indexOf("⊢") + 1];

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

    return [leaf, [newFormula], "(wr)"];
  } else {
    return leaf;
  }
}
/**
 * APPLY WEAKENING LEFT RULE
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
 * APPLY CONTRACTION RIGHT RULE
 */
function applyCR(leaf, ast, formula) {
  // save only right side
  let formulaWithC = ast[ast.indexOf("⊢") + 1];

  if (formulaWithC === undefined) return leaf;

  // check comma
  if (checkComma(formulaWithC)) {
    formulaWithC = formulaWithC[formula];
  }

  // proving
  if (formulaWithC !== null) {
    // to string
    formulaWithC = arrayToString(formulaWithC);

    return [leaf, [addToRight(leaf, arrayToString(formulaWithC))], "(cr)"];
  } else {
    return leaf;
  }
}
/**
 * APPLY CONTRACTION LEFT RULE
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
 * APPLY CUT RULE
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
 * APPLY EXCHANGE RIGHT RULE
 */
function applyExR(leaf, ast, formula, cut, exchange) {
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
/**
 * APPLY EXCHANGE LEFT RULE
 */
function applyExL(leaf, ast, formula, exchange) {
  // proving
  if (exchange.first && exchange.second) {
    // get right side as array
    let right = leaf.split("⊢")[1];
    let rightArray = right.split(",");

    // swap
    let firstIndex = rightArray.indexOf(exchange.first);
    let secondIndex = rightArray.indexOf(exchange.second);
    rightArray[firstIndex] = exchange.second;
    rightArray[secondIndex] = exchange.first;

    // new formula
    let newFormula =
      leaf.slice(0, leaf.indexOf("⊢") + 1) + rightArray.join(",");

    return [leaf, [newFormula], "(exr)"];
  } else {
    return leaf;
  }
}

export default gskTreeRules;
