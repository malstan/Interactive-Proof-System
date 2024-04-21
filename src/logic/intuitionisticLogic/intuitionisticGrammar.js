// Generated automatically by nearley, version 2.20.1
// http://github.com/Hardmath123/nearley
export default {
  Lexer: undefined,
  ParserRules: [
    { name: "formula", symbols: [{ literal: "⊢" }, "statementIL"] },
    {
      name: "formula",
      symbols: ["statement", { literal: "⊢" }, "statementIL"],
    },
    { name: "formula", symbols: ["statement", { literal: "⊢" }] },
    { name: "formula", symbols: ["statement"], postprocess: id },
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
      postprocess:
        // remove comma and return one array with items as symbols or statements
        (data) => {
          const formulas = data[1].map((item) =>
            item.filter((item) => item != ",")
          );
          data.pop();
          formulas.forEach((item) =>
            item.length > 1 ? data.push(item) : data.push(item[0])
          );
          return data;
        },
    },
    { name: "statementIL", symbols: ["implication"], postprocess: id },
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
    { name: "negation", symbols: [{ literal: "¬" }, "term"] },
    { name: "negation", symbols: ["term"], postprocess: id },
    { name: "term", symbols: ["symbol"], postprocess: id },
    {
      name: "term",
      symbols: [{ literal: "(" }, "statement", { literal: ")" }],
    },
    { name: "symbol", symbols: [/[α-ωΑ-Ω]/], postprocess: id },
    { name: "symbol", symbols: [{ literal: "⊥" }], postprocess: id },
    { name: "symbol", symbols: [{ literal: "⊤" }], postprocess: id },
  ],
  ParserStart: "formula",
};

function id(x) {
  return x[0];
}
