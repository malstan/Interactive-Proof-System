import nearley from "nearley";
import grammar from "./propositionalGrammar";

import gskTreeRules from "./rules/apply-sequentCalculusTreeRules";
import ndTreeRules from "./rules/apply-naturalDeductionTreeRules";
import ndFitchRules from "./rules/apply-naturalDeductionFitchRules";

/**
 * check if it is possible to create abstract syntax tree
 */
export function validateFormula(formula, method) {
  let formulaToCheck;
  if (method == "GSK" && !formula.includes("⊢")) formulaToCheck = "⊢" + formula;
  else formulaToCheck = formula;

  formulaToCheck = formulaToCheck.replaceAll(" ", "");

  const parser = new nearley.Parser(nearley.Grammar.fromCompiled(grammar));

  try {
    // try to create abstract syntax tree
    parser.feed(formulaToCheck);
    if (parser.results.length === 0) throw new Error("Formula is not valid.");
    if (method == "ND" && parser.results[0].every(Array.isArray))
      throw new Error("Formula is not valid.");
  } catch (error) {
    //console.log(error);
    return false;
  }

  const result = parser.results[0];
  // remove unnessesary brackets
  let turniket = result.indexOf("⊢");
  if (
    (turniket == 0 && result[1][0] == "(") ||
    (turniket == 1 && result[0][0] == "(") ||
    (result[0] == "(" && result[2] == ")")
  )
    formulaToCheck = formulaToCheck
      .replace("(", "")
      .replace(/\)(?=[^\)]*$)/, "");

  // get hypothesis when ND
  if (method == "ND" && formulaToCheck.includes("⊢")) {
    if (result[1] == "⊢" && result.length < 3) return false;
    let [hypothesis, ndFormula] = formulaToCheck.split("⊢");
    return { hypothesis: hypothesis.split(","), formula: ndFormula };
  }

  return formulaToCheck;
}

/**
 * apply sequent calculus rule in tree notation
 */
export function applyGskTreeRule(rule, leaf, ast, formula, cut, exchange) {
  return gskTreeRules
    .find((item) => item.name == rule)
    .apply(leaf, ast, formula, cut, exchange);
}

/**
 * apply natural deduction rule in tree notation
 */
export function applyNdTreeRule(rule, leaf, ast, formula) {
  return ndTreeRules
    .find((item) => item.name == rule)
    .apply(leaf, ast, formula);
}

/**
 * apply natural deduction rule in fitch notation
 */
export function applyNdFitchRule(rule, formula, rows, proof) {
  return ndFitchRules
    .find((item) => item.name == rule)
    .apply(formula, rows, proof);
}
