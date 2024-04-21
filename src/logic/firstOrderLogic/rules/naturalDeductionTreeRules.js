import i18n from "src/i18n";

const rules = [
  {
    rule: "nd-tree-uqi",
    label: i18n.global.t("rules.universalQuantifier.intro.label"),
    desc: `${i18n.global.t("rules.universalQuantifier.intro.title")} (∀I)`,
    proof:
      ' <div class="q-ma-sm rule"> <div>ϕ[t/x]</div> <div class="rule__border-top"> <span>(∀x)ϕ</span> <span class="rule__border-top__rule-name">(∀I)</span> </div> </div>',
  },
  {
    rule: "nd-tree-uqe",
    label: i18n.global.t("rules.universalQuantifier.elimination.label"),
    desc: `${i18n.global.t(
      "rules.universalQuantifier.elimination.title"
    )} (∀E)`,
    proof:
      '  <div class="q-ma-sm rule"> <div>(∀x)ϕ</div> <div class="rule__border-top"> <span>ϕ[t/x]</span> <span class="rule__border-top__rule-name">(∀E)</span> </div> </div>',
  },
  {
    rule: "nd-tree-eqi",
    label: i18n.global.t("rules.existentionalQuantifier.intro.label"),
    desc: `${i18n.global.t("rules.existentionalQuantifier.intro.title")}} (∃I)`,
    proof:
      '<div class="q-ma-sm rule"> <div>ϕ[t/x]</div> <div class="rule__border-top"> <span>(∃x)ϕ</span> <span class="rule__border-top__rule-name">(∃I)</span> </div> </div>',
  },
  {
    rule: "nd-tree-eqe",
    label: i18n.global.t("rules.existentionalQuantifier.elimination.label"),
    desc: `${i18n.global.t(
      "rules.existentionalQuantifier.elimination.title"
    )} (∃E)`,
    proof:
      '<div class="q-ma-sm rule"> <div class="rule__siblings"> <div>(∃x)<span toInput>ϕ</span></div> <div class="rule__hypo"> <div>[<span toDelete>ϕ[t/x]</span>]</div> <div class="rule__hypo__dots"> <span>.</span> <span>.</span> <span>.</span> </div> <span toReplace>ψ</span> </div> </div> <div class="rule__border-top"> <span><span toReplace>ψ</span></span> <span class="rule__border-top__rule-name">(∃E)</span> </div> </div>',
  },
  {
    rule: "nd-tree-vi",
    label: i18n.global.t("rules.verum.intro.label"),
    desc: `${i18n.global.t("rules.verum.intro.title")} (⊤I)`,
    proof:
      '<div class="q-ma-sm rule"> <div class="rule__border-top"> <span>⊤</span> <span class="rule__border-top__rule-name">(⊤I)</span> </div> </div>',
  },
  {
    rule: "nd-tree-ae1",
    label: i18n.global.t("rules.absurdum.elimination.label1"),
    desc: `${i18n.global.t("rules.absurdum.elimination.title")} (⊥E1)`,
    proof:
      ' <div class="q-ma-sm rule"> <div>⊥</div> <div class="rule__border-top"> <span>ϕ</span> <span class="rule__border-top__rule-name">(⊥E1)</span> </div> </div>',
  },
  {
    rule: "nd-tree-ae2",
    label: i18n.global.t("rules.absurdum.elimination.label2"),
    desc: `${i18n.global.t("rules.absurdum.elimination.title")} (⊥E2)`,
    proof:
      '<div class="q-ma-sm rule"> <div class="rule__hypo"> <div>[¬ϕ]</div> <div class="rule__hypo__dots"> <span>.</span> <span>.</span> <span>.</span> </div> </div> <div>⊥</div> <div class="rule__border-top"> <span>ϕ</span> <span class="rule__border-top__rule-name">(⊥E2)</span> </div> </div>',
  },
  {
    rule: "nd-tree-ni",
    label: i18n.global.t("rules.negation.intro.label"),
    desc: `${i18n.global.t("rules.negation.intro.title")}} (¬I)`,
    proof:
      '<div class="q-ma-sm rule"> <div class="rule__hypo"> <div>[ϕ]</div> <div class="rule__hypo__dots"> <span>.</span> <span>.</span> <span>.</span> </div> </div> <div>⊥</div> <div class="rule__border-top"> <span>¬ϕ</span> <span class="rule__border-top__rule-name">(¬I)</span> </div> </div>',
  },
  {
    rule: "nd-tree-ne",
    label: i18n.global.t("rules.negation.elimination.label"),
    desc: `${i18n.global.t("rules.negation.elimination.title")} (¬E)`,
    proof:
      '<div class="q-ma-sm rule"> <div class="rule__siblings"> <div><span toInput>ϕ</span></div> <div>¬<span toInput>ϕ</span></div> </div> <div class="rule__border-top"> <span>⊥</span> <span class="rule__border-top__rule-name">(¬E)</span> </div> </div>',
  },
  {
    rule: "nd-tree-ci",
    label: i18n.global.t("rules.conjunction.intro.label"),
    desc: `${i18n.global.t("rules.conjunction.intro.title")} (∧I)`,
    proof:
      '<div class="q-ma-sm rule"> <div class="rule__siblings"> <div>ψ</div> <div>ϕ</div> </div> <div class="rule__border-top"> <span>ϕ ∧ ψ</span> <span class="rule__border-top__rule-name">(∧I)</span> </div> </div>',
  },
  {
    rule: "nd-tree-ce1",
    label: i18n.global.t("rules.conjunction.elimination.label1"),
    desc: `${i18n.global.t("rules.conjunction.elimination.title")} (∧E1)`,
    proof:
      '<div class="q-ma-sm rule" rule-tree="nd-tree-ce1"><div><span toReplace>ϕ</span> ∧ <span toInput>ψ</span></div><div class="rule__border-top"><span toReplace>ϕ</span><span class="rule__border-top__rule-name">(∧E1)</span></div></div>',
  },
  {
    rule: "nd-tree-ce2",
    label: i18n.global.t("rules.conjunction.elimination.label2"),
    desc: `${i18n.global.t("rules.conjunction.elimination.title")} (∧E2)`,
    proof:
      '<div class="q-ma-sm rule"> <div><span toInput>ψ</span> ∧ <span toReplace>ϕ</span></div> <div class="rule__border-top"> <span toReplace>ϕ</span> <span class="rule__border-top__rule-name">(∧E2)</span> </div> </div>',
  },
  {
    rule: "nd-tree-di1",
    label: i18n.global.t("rules.disjunction.intro.label1"),
    desc: `${i18n.global.t("rules.disjunction.intro.title")} (∨I1)`,
    proof:
      '<div class="q-ma-sm rule"> <div>ϕ</div> <div class="rule__border-top"> <span>ϕ ∨ ψ</span> <span class="rule__border-top__rule-name">(∨I1)</span> </div> </div>',
  },
  {
    rule: "nd-tree-di2",
    label: i18n.global.t("rules.disjunction.intro.label2"),
    desc: `${i18n.global.t("rules.disjunction.intro.title")} (∨I2)`,
    proof:
      '<div class="q-ma-sm rule"> <div>ψ</div> <div class="rule__border-top"> <span>ϕ ∨ ψ </span> <span class="rule__border-top__rule-name">(∨I2)</span> </div> </div>',
  },
  {
    rule: "nd-tree-de",
    label: i18n.global.t("rules.disjunction.elimination.label"),
    desc: `${i18n.global.t("rules.disjunction.elimination.title")} (∨E)`,
    proof:
      '<div class="q-ma-sm rule"> <div class="rule__siblings"> <div><span toInput>ϕ ∨ ψ</span></div> <div class="rule__hypo"> <div>[<span toDelete>ϕ</span>]</div> <div class="rule__hypo__dots"> <span>.</span> <span>.</span> <span>.</span> </div> <span toReplace>θ</span> </div> <div class="rule__hypo"> <div>[<span toDelete>ψ</span>]</div> <div class="rule__hypo__dots"> <span>.</span> <span>.</span> <span>.</span> </div> <span toReplace>θ</span> </div> </div> <div class="rule__border-top"> <span toReplace>θ</span> <span class="rule__border-top__rule-name">(∨E)</span> </div> </div>',
  },
  {
    rule: "nd-tree-ii",
    label: i18n.global.t("rules.implication.intro.label"),
    desc: `${i18n.global.t("rules.implication.intro.title")} (⇒I)`,
    proof:
      '<div class="q-ma-sm rule"> <div class="rule__hypo"> <div>[ϕ]</div> <div class="rule__hypo__dots"> <span>.</span> <span>.</span> <span>.</span> </div> ψ </div> <div class="rule__border-top"> <span>ϕ ⇒ ψ</span> <span class="rule__border-top__rule-name">(⇒I)</span> </div> </div>',
  },
  {
    rule: "nd-tree-ie",
    label: i18n.global.t("rules.implication.elimination.label"),
    desc: `${i18n.global.t("rules.implication.elimination.title")} (⇒E)`,
    proof:
      '<div class="q-ma-sm rule"> <div class="rule__siblings"> <div><span toInput>ψ</span></div> <div><span toInput>ψ</span> ⇒ <span toReplace>ϕ</span></div> </div> <div class="rule__border-top"> <span toReplace>ϕ</span> <span class="rule__border-top__rule-name">(⇒E)</span> </div> </div>',
  },
];

export default rules;
