import nearley from "nearley";
import grammar from "./firstOrderGrammar";

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

  // get hypothesis when ND
  if (method == "ND" && formulaToCheck.includes("⊢")) {
    if (result[1] == "⊢") {
      if (result.length < 3) return false;
      let hypo = result[0].every(Array.isArray)
        ? result[0].map(arrayToString)
        : [arrayToString(result[0])];
      return {
        hypothesis: hypo,
        formula: formulaToCheck.split("⊢")[1],
      };
    } else return formulaToCheck.split("⊢")[1];
  }

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

  return formulaToCheck;
}

/**
 * apply sequent calculus rule in tree notation
 */
export function applyGskTreeRule(
  rule,
  leaf,
  ast,
  formula,
  cut,
  exchange,
  term
) {
  return gskTreeRules
    .find((item) => item.name == rule)
    .apply(leaf, ast, formula, cut, exchange, term);
}

/**
 * apply natural deduction rule in tree notation
 */
export function applyNdTreeRule(rule, leaf, ast, formula, term) {
  return ndTreeRules
    .find((item) => item.name == rule)
    .apply(leaf, ast, formula, term);
}

/**
 * apply natural deduction rule in fitch notation
 */
export function applyNdFitchRule(rule, formula, rows, proof, term) {
  return ndFitchRules
    .find((item) => item.name == rule)
    .apply(formula, rows, proof, term);
}

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
