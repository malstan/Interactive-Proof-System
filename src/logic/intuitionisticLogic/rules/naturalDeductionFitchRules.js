import i18n from "src/i18n";

const rules = [
  {
    rule: "nd-fitch-as",
    label: i18n.global.t("rules.assumption.label"),
    desc: `${i18n.global.t("rules.assumption.title")}`,
    proof:
      '<div class="q-ma-sm fitch-proof"> <!-- formulas --> <div> <div> <span class="fitch-index"></span> <div class="fitch-spacer"> <div class="fitch-formula fitch-as">φ</div> </div> </div> <div> <span class="fitch-index"></span> <div class="fitch-formula"></div> </div> </div> <!-- rule --> <div> <div class="fitch-rule--as"></div> </div> </div>',
  },
  {
    rule: "nd-fitch-ae1",
    label: i18n.global.t("rules.absurdum.elimination.label1"),
    desc: `${i18n.global.t("rules.absurdum.elimination.title")} (⊥E1, m)`,
    proof:
      '<div class="q-ma-sm fitch-proof"> <!-- formulas --> <div> <div> <span class="fitch-index">m</span> <div class="fitch-formula">⊥</div> </div> <div> <span class="fitch-index"></span> <div class="fitch-formula">φ</div> </div> </div> <!-- rule --> <div> <div class="fitch-rule">&nbsp;</div> <div class="fitch-rule">⊥E1, m</div> </div> </div>',
    forInput: {
      mask: /^(\d+)$/,
      placeholder: "#",
    },
  },
  {
    rule: "nd-fitch-ne",
    label: i18n.global.t("rules.negation.elimination.label"),
    desc: `${i18n.global.t("rules.negation.elimination.title")} (¬E, m, n)`,
    proof:
      '<div class="q-ma-sm fitch-proof"> <!-- formulas --> <div> <div> <span class="fitch-index">m</span> <div class="fitch-formula">¬φ</div> </div> <div> <span class="fitch-index">n</span> <div class="fitch-formula">φ</div> </div> <div> <span class="fitch-index"></span> <div class="fitch-formula">⊥</div> </div> </div> <!-- rule --> <div> <div class="fitch-rule">&nbsp;</div> <div class="fitch-rule">&nbsp;</div> <div class="fitch-rule">¬E, m, n</div> </div> </div>',
    forInput: {
      mask: /^(\d+,\d+)$/,
      placeholder: "#,#",
    },
  },
  {
    rule: "nd-fitch-ci",
    label: i18n.global.t("rules.conjunction.intro.label"),
    desc: `${i18n.global.t("rules.conjunction.intro.title")} (∧I, m, n)`,
    proof:
      '    <div class="q-ma-sm fitch-proof"> <div> <div> <span class="fitch-index">m</span> <div class="fitch-formula">φ</div> </div> <div> <span class="fitch-index">n</span> <div class="fitch-formula">ψ</div> </div> <div> <span class="fitch-index"></span> <div class="fitch-formula">φ∧ψ</div> </div> </div> <div> <div class="fitch-rule">&nbsp;</div> <div class="fitch-rule">&nbsp;</div> <div class="fitch-rule">∧I, m, n</div> </div> </div>',
    forInput: {
      mask: /^(\d+,\d+)$/,
      placeholder: "#,#",
    },
  },
  {
    rule: "nd-fitch-ce1",
    label: i18n.global.t("rules.conjunction.elimination.label1"),
    desc: `${i18n.global.t("rules.conjunction.elimination.title")} (∧E1, m)`,
    proof:
      ' <div class="q-ma-sm fitch-proof"> <div> <div> <span class="fitch-index">m</span> <div class="fitch-formula">φ∧ψ</div> </div> <div> <span class="fitch-index"></span> <div class="fitch-formula">φ</div> </div> </div> <div> <div class="fitch-rule">&nbsp;</div> <div class="fitch-rule">∧E1, m</div> </div> </div>',
    forInput: {
      mask: /^(\d+)$/,
      placeholder: "#",
    },
  },
  {
    rule: "nd-fitch-ce2",
    label: i18n.global.t("rules.conjunction.elimination.label2"),
    desc: `${i18n.global.t("rules.conjunction.elimination.title")} (∧E2, m)`,
    proof:
      '<div class="q-ma-sm fitch-proof"> <div> <div> <span class="fitch-index">m</span> <div class="fitch-formula">φ∧ψ</div> </div> <div> <span class="fitch-index"></span> <div class="fitch-formula">ψ</div> </div> </div> <div> <div class="fitch-rule">&nbsp;</div> <div class="fitch-rule">∧E2, m</div> </div> </div>',
    forInput: {
      mask: /^(\d+)$/,
      placeholder: "#",
    },
  },
  {
    rule: "nd-fitch-di1",
    label: i18n.global.t("rules.disjunction.intro.label1"),
    desc: `${i18n.global.t("rules.disjunction.intro.title")} (∨I1, m)`,
    proof:
      '  <div class="q-ma-sm fitch-proof"> <div> <div> <span class="fitch-index">m</span> <div class="fitch-formula">φ</div> </div> <div> <span class="fitch-index"></span> <div class="fitch-formula">φ∨ψ</div> </div> </div> <div> <div class="fitch-rule">&nbsp;</div> <div class="fitch-rule">∨I1, m</div> </div> </div>',
    forInput: {
      mask: /^(\d+)$/,
      placeholder: "#",
    },
  },
  {
    rule: "nd-fitch-di2",
    label: i18n.global.t("rules.disjunction.intro.label2"),
    desc: `${i18n.global.t("rules.disjunction.intro.title")} (∨I2, m)`,
    proof:
      '<div class="q-ma-sm fitch-proof"> <div> <div> <span class="fitch-index">m</span> <div class="fitch-formula">ψ</div> </div> <div> <span class="fitch-index"> </span> <div class="fitch-formula">φ∨ψ</div> </div> </div> <div> <div class="fitch-rule">&nbsp;</div> <div class="fitch-rule">∨I2, m</div> </div> </div>',
    forInput: {
      mask: /^(\d+)$/,
      placeholder: "#",
    },
  },
  {
    rule: "nd-fitch-de",
    label: i18n.global.t("rules.disjunction.elimination.label"),
    desc: `${i18n.global.t(
      "rules.disjunction.elimination.title"
    )} (∨E, m, i-j, k-l)`,
    proof:
      '   <div class="q-ma-sm fitch-proof"> <div> <div> <span class="fitch-index">m</span> <div class="fitch-formula">φ∨ψ</div> </div> <div> <span class="fitch-index">i</span> <div class="fitch-spacer"> <div class="fitch-formula fitch-as">φ</div> </div> </div> <div> <span class="fitch-index">j</span> <div class="fitch-spacer"> <div class="fitch-formula">ϕ</div> </div> </div> <div> <span class="fitch-index">k</span> <div class="fitch-spacer"> <div class="fitch-formula fitch-as">ψ</div> </div> </div> <div> <span class="fitch-index">l</span> <div class="fitch-spacer"> <div class="fitch-formula">ϕ</div> </div> </div> <div> <span class="fitch-index"></span> <div class="fitch-formula">ϕ</div> </div> </div> <div> <div class="fitch-rule">&nbsp;</div> <div class="fitch-rule--as">&nbsp;</div> <div class="fitch-rule">&nbsp;</div> <div class="fitch-rule--as">&nbsp;</div> <div class="fitch-rule">&nbsp;</div> <div class="fitch-rule">∨E, m, i-j, k-l</div> </div> </div>',
    forInput: {
      mask: /^(\d+,(\d+-\d+),(\d+-\d+))$/,
      placeholder: "#,#,#",
    },
  },
  {
    rule: "nd-fitch-ii",
    label: i18n.global.t("rules.implication.intro.label"),
    desc: `${i18n.global.t("rules.implication.intro.title")} (⇒I, m-n)`,
    proof:
      '<div class="q-ma-sm fitch-proof"> <div> <div> <span class="fitch-index">m</span> <div class="fitch-spacer"> <div class="fitch-formula fitch-as">φ</div> </div> </div> <div> <span class="fitch-index">n</span> <div class="fitch-spacer"> <div class="fitch-formula">ψ</div> </div> </div> <div> <span class="fitch-index"></span> <div class="fitch-formula">φ⇒ψ</div> </div> </div> <div> <div class="fitch-rule--as">&nbsp;</div> <div class="fitch-rule">&nbsp;</div> <div class="fitch-rule">⇒I, m-n</div> </div> </div>',
    forInput: {
      mask: /^(\d+-\d+)$/,
      placeholder: "#-#",
    },
  },
  {
    rule: "nd-fitch-ie",
    label: i18n.global.t("rules.implication.elimination.label"),
    desc: `${i18n.global.t("rules.implication.elimination.title")} (⇒E, m, n)`,
    proof:
      '  <div class="q-ma-sm fitch-proof"> <div> <div> <span class="fitch-index">m</span> <div class="fitch-formula">φ⇒ψ</div> </div> <div> <span class="fitch-index">n</span> <div class="fitch-formula">φ</div> </div> <div> <span class="fitch-index"></span> <div class="fitch-formula">ψ</div> </div> </div> <div> <div class="fitch-rule">&nbsp;</div> <div class="fitch-rule">&nbsp;</div> <div class="fitch-rule">⇒E, m, n</div> </div> </div>',
    forInput: {
      mask: /^(\d+,\d+)$/,
      placeholder: "#,#",
    },
  },
];

export default rules;
