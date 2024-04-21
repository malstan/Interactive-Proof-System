const ndTreeRules = [
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
  if (!Array.isArray(array)) return array;

  if (array[0] == "(" && array[2] == ")") array = array[1];

  let string = array.join("");
  string = string.replaceAll(",", "");
  return string;
}

/**
 * remove unnecessary brackets
 * @param {string} formula
 * @returns formula without brackets
 */
function removeUnnecessaryBrackets(formula) {
  if (!Array.isArray(formula))
    return (formula = formula.replace("(", "").replace(/\)(?=[^\)]*$)/, ""));
  else return formula;
}

function addBrackets(formula) {
  if (formula.length > 1) return `(${formula})`;
  else return formula;
}

/**
 * APPLY INTRODUCTION OF VERUM RULE
 * @param {string} leaf
 * @param {array} ast
 */
function applyVerIn(leaf, ast) {
  if (leaf == "⊤") {
    return [leaf, [], "(⊤I)"];
  } else {
    return leaf;
  }
}
/**
 * APPLY ELIMINATION OF ABSURDUM 1 RULE
 * @param {string} leaf
 * @param {array} ast
 */
function applyAbsEl1(leaf, ast) {
  return [leaf, ["⊥"], "(⊥E1)"];
}
/**
 * APPLY ELIMINATION OF ABSURDUM 2 RULE
 * @param {string} leaf
 * @param {array} ast
 */
function applyAbsEl2(leaf, ast) {
  return [leaf, ["⊥"], "(⊥E2)", [`¬${addBrackets(leaf)}`]];
}
/**
 * APPLY INTRODUCTION OF NEGATION RULE
 * @param {string} leaf
 * @param {array} ast
 */
function applyNegIn(leaf, ast) {
  if (ast.includes("¬")) {
    return [leaf, ["⊥"], "(¬I)", [arrayToString(ast[1])]];
  } else {
    return leaf;
  }
}
/**
 * APPLY INTRODUCTION OF NEGATION RULE
 * @param {string} leaf
 * @param {array} ast
 * @param {object} formula
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
 * @param {string} leaf
 * @param {array} ast
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
 * APPLY ELIMINATION OF CONJUNCTION 1 RULE
 * @param {string} leaf
 * @param {array} ast
 * @param {object} formula
 */
function applyConEl1(leaf, ast, formula) {
  let first = addBrackets(arrayToString(ast));
  let second = addBrackets(formula.asString);

  return [leaf, [`${first}∧${second}`], "(∧E1)"];
}
/**
 * APPLY ELIMINATION OF CONJUNCTION 2 RULE
 * @param {string} leaf
 * @param {array} ast
 * @param {object} formula
 */
function applyConEl2(leaf, ast, formula) {
  let first = addBrackets(formula.asString);
  let second = addBrackets(arrayToString(ast));

  return [leaf, [`${first}∧${second}`], "(∧E2)"];
}
/**
 * APPLY INTRODUCTION OF DISJUNCTION 1 RULE
 * @param {string} leaf
 * @param {array} ast
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
 * APPLY INTRODUCTION OF DISJUNCTION 2 RULE
 * @param {string} leaf
 * @param {array} ast
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
 * @param {string} leaf
 * @param {array} ast
 * @param {object} formula
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
 * @param {string} leaf
 * @param {array} ast
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
 * @param {string} leaf
 * @param {array} ast
 * @param {object} formula
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
