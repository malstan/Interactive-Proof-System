// Generated automatically by nearley, version 2.20.1
// http://github.com/Hardmath123/nearley
export default {
  Lexer: undefined,
  ParserRules: [
    { name: "formula$ebnf$1", symbols: [] },
    {
      name: "formula$ebnf$1$subexpression$1",
      symbols: [{ literal: "∧" }, "clausule"],
    },
    {
      name: "formula$ebnf$1",
      symbols: ["formula$ebnf$1", "formula$ebnf$1$subexpression$1"],
      postprocess: function arrpush(d) {
        return d[0].concat([d[1]]);
      },
    },
    { name: "formula", symbols: ["clausule", "formula$ebnf$1"] },
    { name: "clausule$ebnf$1", symbols: [] },
    {
      name: "clausule$ebnf$1$subexpression$1",
      symbols: [{ literal: "∨" }, "variable"],
    },
    {
      name: "clausule$ebnf$1",
      symbols: ["clausule$ebnf$1", "clausule$ebnf$1$subexpression$1"],
      postprocess: function arrpush(d) {
        return d[0].concat([d[1]]);
      },
    },
    {
      name: "clausule",
      symbols: [
        { literal: "(" },
        "variable",
        "clausule$ebnf$1",
        { literal: ")" },
      ],
    },
    { name: "clausule$ebnf$2", symbols: [] },
    {
      name: "clausule$ebnf$2$subexpression$1",
      symbols: [{ literal: "∨" }, "variable"],
    },
    {
      name: "clausule$ebnf$2",
      symbols: ["clausule$ebnf$2", "clausule$ebnf$2$subexpression$1"],
      postprocess: function arrpush(d) {
        return d[0].concat([d[1]]);
      },
    },
    { name: "clausule", symbols: ["variable", "clausule$ebnf$2"] },
    { name: "variable", symbols: [/[a-z]/], postprocess: id },
    { name: "variable", symbols: [{ literal: "¬" }, /[a-z]/], postprocess: id },
  ],
  ParserStart: "formula",
};
function id(x) {
  return x[0];
}
