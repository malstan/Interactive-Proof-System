// Generated automatically by nearley, version 2.20.1
// http://github.com/Hardmath123/nearley
export default {
  Lexer: undefined,
  ParserRules: [
    { name: "term", symbols: ["variable"], postprocess: id },
    { name: "term", symbols: ["function"], postprocess: id },
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
  ParserStart: "term",
};

function id(x) {
  return x[0];
}

function processFunction(data) {
  return [data[0] + "(", [...data[2], ...data[3].map((item) => item[1])], ")"];
}
