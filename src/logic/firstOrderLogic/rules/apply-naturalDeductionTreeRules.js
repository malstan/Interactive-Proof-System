const ndTreeRules = [
  {
    name: "nd-tree-uqi",
    apply: applyUQIn,
  },
  {
    name: "nd-tree-uqe",
    apply: applyUQEl,
  },
  {
    name: "nd-tree-eqi",
    apply: applyEQIn,
  },
  {
    name: "nd-tree-eqe",
    apply: applyEQEl,
  },
  {
    name: "nd-tree-vi",
    apply: applyVerIn,
  },
  {
    name: "nd-tree-ae1",
    apply: applyAbsEl1,
  },
  {
    name: "nd-tree-ae2",
    apply: applyAbsEl2,
  },
  {
    name: "nd-tree-ni",
    apply: applyNegIn,
  },
  {
    name: "nd-tree-ne",
    apply: applyNegEl,
  },
  {
    name: "nd-tree-ci",
    apply: applyConIn,
  },
  {
    name: "nd-tree-ce1",
    apply: applyConEl1,
  },
  {
    name: "nd-tree-ce2",
    apply: applyConEl2,
  },
  {
    name: "nd-tree-di1",
    apply: applyDisIn1,
  },
  {
    name: "nd-tree-di2",
    apply: applyDisIn2,
  },
  {
    name: "nd-tree-de",
    apply: applyDisEl,
  },
  {
    name: "nd-tree-ii",
    apply: applyImpIn,
  },
  {
    name: "nd-tree-ie",
    apply: applyImpEl,
  },
];

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

function addBrackets(formula, ast) {
  if (ast && (ast[0].match(/[A-Z]\(/g) || ast[0].match(/[a-z]\(/g)))
    return formula;
  if (formula.length > 1) return `(${formula})`;
  else return formula;
}

/**
 * APPLY INTRODUCTION OF UNIVERSAL QUANTIFIER RULE
 */
function applyUQIn(leaf, ast, formula, term) {
  if (ast[0].includes("∀")) {
    // get variable and formula
    const variable = ast[0][2];
    let QFormula = arrayToString(ast[1]);

    // substitute
    QFormula = QFormula.replaceAll(variable, term);

    return [leaf, [QFormula], "(∀I)"];
  } else {
    return leaf;
  }
}
/**
 * APPLY ELIMINATION OF UNIVERSAL QUANTIFIER RULE
 *
 */
function applyUQEl(leaf, ast, formula, term) {
  let newFormula = "(∀x)";

  newFormula +=
    ast[ast.length - 1] != ")"
      ? "(" + leaf.replaceAll(term, "x") + ")"
      : leaf.replaceAll(term, "x");

  return [leaf, [newFormula], "(∀E)"];
}
/**
 * APPLY INTRODUCTION OF EXISTENTIONAL QUANTIFIER RULE
 */
function applyEQIn(leaf, ast, formula, term) {
  if (ast[0].includes("∃")) {
    // get variable and formula
    const variable = ast[0][2];
    let QFormula = arrayToString(ast[1]);

    // substitute
    QFormula = QFormula.replaceAll(variable, term);

    return [leaf, [QFormula], "(∃I)"];
  } else {
    return leaf;
  }
}
/**
 * APPLY ELIMINATION OF EXISTENTIONAL QUANTIFIER RULE
 */
function applyEQEl(leaf, ast, formula, term) {
  return [
    leaf,
    [`(∃x)(${formula.asString.replaceAll(term, "x")})`, leaf],
    "(∃E)",
    [formula.asString],
  ];
}
/**
 * APPLY INTRODUCTION OF VERUM RULE
 */
function applyVerIn(leaf, ast) {
  if (leaf == "⊤") {
    return [leaf, [], "(⊤I)"];
  } else {
    return leaf;
  }
}
/**
 * APPLY ELIMINATION OF ABSURDUM RULE 1
 */
function applyAbsEl1(leaf, ast) {
  return [leaf, ["⊥"], "(⊥E1)"];
}
/**
 * APPLY ELIMINATION OF ABSURDUM RULE 2
 */
function applyAbsEl2(leaf, ast) {
  return [leaf, ["⊥"], "(⊥E2)", [`¬${addBrackets(leaf)}`]];
}
/**
 * APPLY INTRODUCTION OF NEGATION RULE
 */
function applyNegIn(leaf, ast) {
  if (ast.includes("¬")) {
    return [leaf, ["⊥"], "(¬I)", [arrayToString(ast[1])]];
  } else {
    return leaf;
  }
}
/**
 * APPLY ELIMINATION OF NEGATION RULE
 */
function applyNegEl(leaf, ast, formula) {
  if (leaf == "⊥") {
    let first = formula.asString;
    let second = `¬${addBrackets(formula.asString)}`;

    return [leaf, [first, second], "(¬E)"];
  } else {
    return leaf;
  }
}
/**
 * APPLY INTRODUCTION OF CONJUNCTION RULE
 */
function applyConIn(leaf, ast) {
  if (ast.includes("∧")) {
    let firstStatement = ast[0];
    let secondStatement = ast[2];

    return [
      leaf,
      [arrayToString(firstStatement), arrayToString(secondStatement)],
      "(∧I)",
    ];
  } else {
    return leaf;
  }
}
/**
 * APPLY ELIMINATION OF CONJUNCTION RULE 1
 */
function applyConEl1(leaf, ast, formula) {
  let first = addBrackets(arrayToString(ast), ast);
  let second = addBrackets(formula.asString, formula.asAst);

  return [leaf, [`${first}∧${second}`], "(∧E1)"];
}
/**
 * APPLY ELIMINATION OF CONJUNCTION RULE 2
 */
function applyConEl2(leaf, ast, formula) {
  let first = addBrackets(formula.asString);
  let second = addBrackets(arrayToString(ast));

  return [leaf, [`${first}∧${second}`], "(∧E2)"];
}
/**
 * APPLY INTRODUCTION OF DISJUNCTION RULE 1
 */
function applyDisIn1(leaf, ast) {
  if (ast.includes("∨")) {
    let firstStatement = ast[0];

    return [leaf, [arrayToString(firstStatement)], "(∧I1)"];
  } else {
    return leaf;
  }
}
/**
 * APPLY INTRODUCTION OF DISJUNCTION RULE 2
 */
function applyDisIn2(leaf, ast) {
  if (ast.includes("∨")) {
    let secondStatement = ast[2];

    return [leaf, [arrayToString(secondStatement)], "(∧I1)"];
  } else {
    return leaf;
  }
}
/**
 * APPLY ELIMINATION OF DISJUNCTION RULE
 */
function applyDisEl(leaf, ast, formula) {
  if (formula.asAst.includes("∨")) {
    return [
      leaf,
      [formula.asString, leaf, leaf],
      "(∨E)",
      [arrayToString(formula.asAst[0]), arrayToString(formula.asAst[2])],
    ];
  } else {
    return leaf;
  }
}
/**
 * APPLY INTRODUCTION OF IMPLICATION RULE
 */
function applyImpIn(leaf, ast) {
  if (ast.includes("⇒")) {
    let firstStatement = ast[0];
    let secondStatement = ast[2];

    return [
      leaf,
      [arrayToString(secondStatement)],
      "(⇒I)",
      [arrayToString(firstStatement)],
    ];
  } else {
    return leaf;
  }
}
/**
 * APPLY ELIMINATION OF IMPLICATION RULE
 */
function applyImpEl(leaf, ast, formula) {
  return [
    leaf,
    [
      formula.asString,
      `${addBrackets(formula.asString)}⇒${addBrackets(arrayToString(ast))}`,
    ],
    "(∧E2)",
  ];
}

export default ndTreeRules;
