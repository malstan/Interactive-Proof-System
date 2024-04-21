const ndFitchRules = [
  {
    name: "nd-fitch-as",
    apply: applyAs,
  },
  {
    name: "nd-fitch-ae1",
    apply: applyAbsEl1,
  },
  {
    name: "nd-fitch-ae2",
    apply: applyAbsEl2,
  },
  {
    name: "nd-fitch-ni",
    apply: applyNegIn,
  },
  {
    name: "nd-fitch-ne",
    apply: applyNegEl,
  },
  {
    name: "nd-fitch-ci",
    apply: applyConIn,
  },
  {
    name: "nd-fitch-ce1",
    apply: applyConEl1,
  },
  {
    name: "nd-fitch-ce2",
    apply: applyConEl2,
  },
  {
    name: "nd-fitch-di1",
    apply: applyDisIn1,
  },
  {
    name: "nd-fitch-di2",
    apply: applyDisIn2,
  },
  {
    name: "nd-fitch-de",
    apply: applyDisEl,
  },
  {
    name: "nd-fitch-ii",
    apply: applyImpIn,
  },
  {
    name: "nd-fitch-ie",
    apply: applyImpEl,
  },
];

function addBrackets(formula) {
  if (formula.length > 1) return `(${formula})`;
  else return formula;
}

/**
 * APPLY ASSUMPTION
 * @param {string} formula
 * @param {string} rows
 * @param {array} proof
 */
function applyAs(formula, rows, proof) {
  return {
    formula: formula,
    rule: "AS",
    depth: proof.length > 0 ? proof[proof.length - 1].depth + 1 : 1,
  };
}

/**
 * APPLY ABSURDUM ELIMINATION 1
 * @param {string} formula
 * @param {string} rows
 * @param {array} proof
 */
function applyAbsEl1(formula, rows, proof) {
  // check rows are number
  if (isNaN(rows)) return false;
  // check row m
  if (proof[rows - 1]?.formula != "⊥") return false;
  return {
    formula: formula,
    rule: "⊥E1, " + rows,
    depth: proof[proof.length - 1].depth,
  };
}

/**
 * APPLY ABSURDUM ELIMINATION 2
 * @param {string} formula
 * @param {string} rows
 * @param {array} proof
 */
function applyAbsEl2(formula, rows, proof) {
  let row = rows.split("-");

  // chceck rows are numbers
  if (row.some((item) => isNaN(item))) return false;
  // check row m is assumption and negation of formula
  if (proof[row[0] - 1]?.rule != "AS") return false;
  // check row n is absurdum
  if (proof[row[1] - 1]?.formula != "⊥") return false;
  // check depth of rows
  if (proof[row[0] - 1]?.depth > proof[row[1] - 1]?.depth) return false;

  return {
    formula: proof[row[0] - 1].formula.substring(1),
    rule: "⊥E2, " + rows,
    depth: proof[row[1] - 1].depth - 1,
  };
}

/**
 * APPLY NEGATION INTRODUCTION
 * @param {string} formula
 * @param {string} rows
 * @param {array} proof
 */
function applyNegIn(formula, rows, proof) {
  let row = rows.split("-");

  // chceck rows are numbers
  if (row.some((item) => isNaN(item))) return false;
  // check row m is assumption and negation of formula
  if (proof[row[0] - 1]?.rule != "AS") return false;
  // check row n is absurdum
  if (proof[row[1] - 1]?.formula != "⊥") return false;
  // check depth of rows
  if (proof[row[0] - 1]?.depth > proof[row[1] - 1]?.depth) return false;

  return {
    formula: `¬${addBrackets(proof[row[0] - 1].formula)}`,
    rule: "¬I, " + rows,
    depth: 0,
  };
}

/**
 * APPLY NEGATION ELIMINATION
 * @param {string} formula
 * @param {string} rows
 * @param {array} proof
 */
function applyNegEl(formula, rows, proof) {
  let row = rows.split(",");

  // check rows are numbers
  if (row.some((item) => isNaN(item))) return false;
  // check m n rows
  if (
    proof[row[0] - 1]?.formula != `¬${addBrackets(proof[row[1] - 1]?.formula)}`
  )
    return false;
  // check depth
  if (proof[row[0] - 1]?.depth > proof[row[1] - 1]?.depth) return false;

  return {
    formula: "⊥",
    rule: "¬E, " + rows,
    depth: proof[proof.length - 1].depth,
  };
}

/**
 * APPLY CONJUNCTION INTRODUCTION
 * @param {string} formula
 * @param {string} rows
 * @param {array} proof
 */
function applyConIn(formula, rows, proof) {
  let row = rows.split(",");

  // check rows are numbers
  if (row.some((item) => isNaN(item))) return false;
  // check depth
  if (proof[row[0] - 1]?.depth > proof[row[1] - 1]?.depth) return false;

  return {
    formula: `${addBrackets(proof[row[0] - 1].formula)}∧${addBrackets(
      proof[row[1] - 1].formula
    )}`,
    rule: "∧I, " + rows,
    depth: proof[proof.length - 1].depth,
  };
}

/**
 * APPLY CONJUNCTION ELIMINATION 1
 * @param {string} formula
 * @param {string} rows
 * @param {array} proof
 */
function applyConEl1(formula, rows, proof) {
  // check rows are numbers
  if (isNaN(rows)) return false;
  // check conjunction
  if (!proof[rows - 1]?.formula.includes("∧")) return false;

  return {
    formula: proof[rows - 1].formula.split("∧")[0],
    rule: "∧E1, " + rows,
    depth: proof[proof.length - 1].depth,
  };
}

/**
 * APPLY CONJUNCTION ELIMINATION 2
 * @param {string} formula
 * @param {string} rows
 * @param {array} proof
 */
function applyConEl2(formula, rows, proof) {
  // check rows are numbers
  if (isNaN(rows)) return false;
  // check conjunction
  if (!proof[rows - 1]?.formula.includes("∧")) return false;

  return {
    formula: proof[rows - 1].formula.split("∧")[1],
    rule: "∧E2, " + rows,
    depth: proof[proof.length - 1].depth,
  };
}

/**
 * APPLY DISJUNCTION INTRODUCTION 1
 * @param {string} formula
 * @param {string} rows
 * @param {array} proof
 */
function applyDisIn1(formula, rows, proof) {
  // check rows are numbers
  if (isNaN(rows)) return false;
  if (!proof[rows - 1]?.formula) return false;

  return {
    formula: `${addBrackets(proof[rows - 1].formula)}∨${addBrackets(formula)}`,
    rule: "∨I1, " + rows,
    depth: proof[proof.length - 1].depth,
  };
}

/**
 * APPLY DISJUNCTION INTRODUCTION 2
 * @param {string} formula
 * @param {string} rows
 * @param {array} proof
 */
function applyDisIn2(formula, rows, proof) {
  // check rows are numbers
  if (isNaN(rows)) return false;
  if (!proof[rows - 1]?.formula) return false;

  return {
    formula: `${addBrackets(formula)}∨${addBrackets(proof[rows - 1].formula)}`,
    rule: "∨I2, " + rows,
    depth: proof[proof.length - 1].depth,
  };
}

/**
 * APPLY DISJUNCTION ELIMINATION
 * @param {string} formula
 * @param {string} rows
 * @param {array} proof
 */
function applyDisEl(formula, rows, proof) {
  let row = rows.split(",");

  // check rows are numbers
  if (row.some((item) => isNaN(item))) return false;
  // check assumptions
  if (proof[row[1] - 1]?.rule != "AS" || proof[row[3] - 1]?.rule != "AS")
    return false;
  // check n or o to m
  if (
    proof[row[0] - 1]?.formula !=
    `${addBrackets(proof[row[1] - 1]?.formula)}∨${addBrackets(
      proof[row[3] - 1]?.formula
    )}`
  )
    return false;
  // check formula in n+1 and o+1
  if (proof[row[2]]?.formula != proof[row[4]]?.formula) return false;
  // check depth
  if (
    proof[row[1] - 1]?.depth > proof[row[2] - 1]?.depth ||
    proof[row[3] - 1]?.depth > proof[row[4] - 1]?.depth ||
    proof[row[1] - 1]?.depth != proof[row[3] - 1]?.depth ||
    proof[row[1] - 1]?.depth - 1 != proof[row[0] - 1]?.depth
  )
    return false;

  return {
    formula: proof[row[1]].formula,
    rule: "∨E, " + rows,
    depth: proof[row[0] - 1].depth,
  };
}

/**
 * APPLY IMPLICATION INTRODUCTION
 * @param {string} formula
 * @param {string} rows
 * @param {array} proof
 */
function applyImpIn(formula, rows, proof) {
  let row = rows.split("-");

  // check rows are numbers
  if (row.some((item) => isNaN(item))) return false;
  // check assumption
  if (proof[row[0] - 1]?.rule != "AS") return false;
  //check depth
  if (proof[row[0] - 1]?.depth > proof[row[1] - 1]?.depth) return false;

  return {
    formula: `${addBrackets(proof[row[0] - 1].formula)}⇒${addBrackets(
      proof[row[1] - 1].formula
    )}`,
    rule: "⇒I, " + rows,
    depth: proof[row[0] - 1].depth - 1,
  };
}

/**
 * APPLY IMPLICATION ELIMINATION
 * @param {string} formula
 * @param {string} rows
 * @param {array} proof
 */
function applyImpEl(formula, rows, proof) {
  let row = rows.split(",");

  // check rows are numbers
  if (row.some((item) => isNaN(item))) return false;
  // check implication
  let imp = proof[row[0] - 1]?.formula.split("⇒");
  if (imp[0] != addBrackets(proof[row[1] - 1]?.formula)) return false;
  // check depth
  if (proof[row[0] - 1]?.depth > proof[row[1] - 1]?.depth) return false;

  return {
    formula: imp[1],
    rule: "⇒E, " + rows,
    depth: proof[proof.length - 1].depth,
  };
}

export default ndFitchRules;
