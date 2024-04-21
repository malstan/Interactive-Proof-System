// Generated automatically by nearley, version 2.20.1
// http://github.com/Hardmath123/nearley
export default {
  Lexer: undefined,
  ParserRules: [
    { name: "expression", symbols: [{ literal: "⊢" }, "formula"] },
    { name: "expression", symbols: ["formula", { literal: "⊢" }, "formula"] },
    { name: "expression", symbols: ["formula", { literal: "⊢" }] },
    { name: "expression", symbols: ["formula"], postprocess: id },
    { name: "formula", symbols: ["constant"], postprocess: id },
    { name: "formula", symbols: ["predicate"], postprocess: id },
    { name: "formula", symbols: ["statement"], postprocess: id },
    { name: "formulaForQ", symbols: ["constant"], postprocess: id },
    { name: "formulaForQ", symbols: ["predicate"], postprocess: id },
    { name: "formulaForQ", symbols: ["implication"], postprocess: id },
    { name: "statement", symbols: ["implication"], postprocess: id },
    {
      name: "statement$ebnf$1$subexpression$1",
      symbols: [{ literal: "," }, "implication"],
    },
    { name: "statement$ebnf$1", symbols: ["statement$ebnf$1$subexpression$1"] },
    {
      name: "statement$ebnf$1$subexpression$2",
      symbols: [{ literal: "," }, "implication"],
    },
    {
      name: "statement$ebnf$1",
      symbols: ["statement$ebnf$1", "statement$ebnf$1$subexpression$2"],
      postprocess: function arrpush(d) {
        return d[0].concat([d[1]]);
      },
    },
    {
      name: "statement",
      symbols: ["implication", "statement$ebnf$1"],
      postprocess: skipComma,
    },
    {
      name: "implication",
      symbols: ["disjunction", { literal: "⇒" }, "implication"],
    },
    { name: "implication", symbols: ["disjunction"], postprocess: id },
    {
      name: "disjunction",
      symbols: ["conjunction", { literal: "∨" }, "disjunction"],
    },
    { name: "disjunction", symbols: ["conjunction"], postprocess: id },
    {
      name: "conjunction",
      symbols: ["negation", { literal: "∧" }, "conjunction"],
    },
    { name: "conjunction", symbols: ["negation"], postprocess: id },
    { name: "negation", symbols: [{ literal: "¬" }, "quantificatorE"] },
    { name: "negation", symbols: ["quantificatorE"], postprocess: id },
    {
      name: "quantificatorE$string$1",
      symbols: [{ literal: "(" }, { literal: "∃" }],
      postprocess: function joiner(d) {
        return d.join("");
      },
    },
    {
      name: "quantificatorE",
      symbols: [
        "quantificatorE$string$1",
        "variable",
        { literal: ")" },
        "formulaForQ",
      ],
      postprocess: processQuantificator,
    },
    { name: "quantificatorE", symbols: ["quantificatorV"], postprocess: id },
    {
      name: "quantificatorV$string$1",
      symbols: [{ literal: "(" }, { literal: "∀" }],
      postprocess: function joiner(d) {
        return d.join("");
      },
    },
    {
      name: "quantificatorV",
      symbols: [
        "quantificatorV$string$1",
        "variable",
        { literal: ")" },
        "formulaForQ",
      ],
      postprocess: processQuantificator,
    },
    { name: "quantificatorV", symbols: ["predicate"], postprocess: id },
    { name: "predicate$ebnf$1", symbols: [] },
    {
      name: "predicate$ebnf$1$subexpression$1",
      symbols: [{ literal: "," }, "term"],
    },
    {
      name: "predicate$ebnf$1",
      symbols: ["predicate$ebnf$1", "predicate$ebnf$1$subexpression$1"],
      postprocess: function arrpush(d) {
        return d[0].concat([d[1]]);
      },
    },
    {
      name: "predicate",
      symbols: [
        /[A-Z]/,
        { literal: "(" },
        "term",
        "predicate$ebnf$1",
        { literal: ")" },
      ],
      postprocess: processPredicate,
    },
    { name: "predicate", symbols: ["constant"], postprocess: id },
    { name: "constant", symbols: [{ literal: "⊥" }], postprocess: id },
    { name: "constant", symbols: [{ literal: "⊤" }], postprocess: id },
    { name: "constant", symbols: ["single"], postprocess: id },
    { name: "single", symbols: [/[α-ωΑ-Ω]/], postprocess: id },
    {
      name: "single",
      symbols: [{ literal: "(" }, "formula", { literal: ")" }],
    },
    { name: "term", symbols: ["variable"], postprocess: id },
    { name: "term", symbols: ["function"] },
    { name: "function$ebnf$1", symbols: [] },
    {
      name: "function$ebnf$1$subexpression$1",
      symbols: [{ literal: "," }, "term"],
    },
    {
      name: "function$ebnf$1",
      symbols: ["function$ebnf$1", "function$ebnf$1$subexpression$1"],
      postprocess: function arrpush(d) {
        return d[0].concat([d[1]]);
      },
    },
    {
      name: "function",
      symbols: [
        /[a-z]/,
        { literal: "(" },
        "term",
        "function$ebnf$1",
        { literal: ")" },
      ],
      postprocess: processFunction,
    },
    { name: "variable", symbols: [/[a-z]/], postprocess: id },
  ],
  ParserStart: "expression",
};

function id(x) {
  return x[0];
}

function processQuantificator(data) {
  return [data[0] + data[1] + ")", data[3]];
}

function skipComma(data) {
  const formulas = data[1].map((item) => item.filter((item) => item != ","));
  data.pop();
  formulas.forEach((item) =>
    item.length > 1 ? data.push(item) : data.push(item[0])
  );
  return data;
}

function processFunction(data) {
  return [data[0] + "(", [...data[2], ...data[3].map((item) => item[1])], ")"];
}

function processPredicate(data) {
  return [data[0] + "(", [...data[2], ...data[3].map((item) => item[1])], ")"];
}
