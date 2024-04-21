import i18n from "src/i18n";

const rules = [
  {
    rule: "nd-tree-vi",
    label: i18n.global.t("rules.verum.intro.label"),
    desc: `${i18n.global.t("rules.verum.intro.title")} (⊤I)`,
    tree: '<div class="q-ma-sm rule"><div class="rule__border-top"><span>⊤</span><span class="rule__border-top__rule-name">(⊤I)</span></div></div>',
  },
  {
    rule: "nd-tree-ae1",
    label: i18n.global.t("rules.absurdum.elimination.label1"),
    desc: `${i18n.global.t("rules.absurdum.elimination.title")} (⊥E1)`,
    tree: '<div class="q-ma-sm rule"><div>⊥</div><div class="rule__border-top"><span>ϕ</span><span class="rule__border-top__rule-name">(⊥E1)</span></div></div>',
  },
  {
    rule: "nd-tree-ae2",
    label: i18n.global.t("rules.absurdum.elimination.label2"),
    desc: `${i18n.global.t("rules.absurdum.elimination.title")} (⊥E2)`,
    tree: '<div class="q-ma-sm rule"><div class="rule__hypo"><div>[¬ϕ]</div><div class="rule__hypo__dots"><span>.</span> <span>.</span> <span>.</span> </div> </div> <div>⊥</div> <div class="rule__border-top"> <span>ϕ</span> <span class="rule__border-top__rule-name">(⊥E2)</span> </div> </div>',
  },
  {
    rule: "nd-tree-ni",
    label: i18n.global.t("rules.negation.intro.label"),
    desc: `${i18n.global.t("rules.negation.intro.title")} (¬I)`,
    tree: '<div class="q-ma-sm rule"> <div class="rule__hypo"> <div>[ϕ]</div> <div class="rule__hypo__dots"> <span>.</span> <span>.</span> <span>.</span> </div> </div> <div>⊥</div> <div class="rule__border-top"> <span>¬ϕ</span> <span class="rule__border-top__rule-name">(¬I)</span> </div> </div>',
  },
  {
    rule: "nd-tree-ne",
    label: i18n.global.t("rules.negation.elimination.label"),
    desc: `${i18n.global.t("rules.negation.elimination.title")} (¬E)`,
    tree: '<div class="q-ma-sm rule"> <div class="rule__siblings"> <div><span toInput>ϕ</span></div> <div>¬<span toInput>ϕ</span></div> </div> <div class="rule__border-top"> <span>⊥</span> <span class="rule__border-top__rule-name">(¬E)</span> </div> </div>',
  },
  {
    rule: "nd-tree-ci",
    label: i18n.global.t("rules.conjunction.intro.label"),
    desc: `${i18n.global.t("rules.conjunction.intro.title")} (∧I)`,
    tree: '<div class="q-ma-sm rule"> <div class="rule__siblings"> <div>ϕ</div> <div>ψ</div> </div> <div class="rule__border-top"> <span>ϕ ∧ ψ</span> <span class="rule__border-top__rule-name">(∧I)</span> </div> </div>',
  },
  {
    rule: "nd-tree-ce1",
    label: i18n.global.t("rules.conjunction.elimination.label1"),
    desc: `${i18n.global.t("rules.conjunction.elimination.title")} (∧E1)`,
    tree: '<div class="q-ma-sm rule" rule-tree="nd-tree-ce1"><div><span toReplace>ϕ</span> ∧ <span toInput>ψ</span></div><div class="rule__border-top"><span toReplace>ϕ</span><span class="rule__border-top__rule-name">(∧E1)</span></div></div>',
  },
  {
    rule: "nd-tree-ce2",
    label: i18n.global.t("rules.conjunction.elimination.label2"),
    desc: `${i18n.global.t("rules.conjunction.elimination.title")} (∧E2)`,
    tree: '<div class="q-ma-sm rule"> <div><span toInput>ψ</span> ∧ <span toReplace>ϕ</span></div> <div class="rule__border-top"> <span toReplace>ϕ</span> <span class="rule__border-top__rule-name">(∧E2)</span> </div> </div>',
  },
  {
    rule: "nd-tree-di1",
    label: i18n.global.t("rules.disjunction.intro.label1"),
    desc: `${i18n.global.t("rules.disjunction.intro.title")} (∨I1)`,
    tree: '<div class="q-ma-sm rule"> <div>ϕ</div> <div class="rule__border-top"> <span>ϕ ∨ ψ</span> <span class="rule__border-top__rule-name">(∨I1)</span> </div> </div>',
  },
  {
    rule: "nd-tree-di2",
    label: i18n.global.t("rules.disjunction.intro.label2"),
    desc: `${i18n.global.t("rules.disjunction.intro.title")} (∨I2)`,
    tree: '<div class="q-ma-sm rule"> <div>ψ</div> <div class="rule__border-top"> <span>ϕ ∨ ψ </span> <span class="rule__border-top__rule-name">(∨I2)</span> </div> </div>',
  },
  {
    rule: "nd-tree-de",
    label: i18n.global.t("rules.disjunction.elimination.label"),
    desc: `${i18n.global.t("rules.disjunction.elimination.title")} (∨E)`,
    tree: '<div class="q-ma-sm rule"> <div class="rule__siblings"> <div><span toInput>ϕ ∨ ψ</span></div> <div class="rule__hypo"> <div>[<span toDelete>ϕ</span>]</div> <div class="rule__hypo__dots"> <span>.</span> <span>.</span> <span>.</span> </div> <span toReplace>θ</span> </div> <div class="rule__hypo"> <div>[<span toDelete>ψ</span>]</div> <div class="rule__hypo__dots"> <span>.</span> <span>.</span> <span>.</span> </div> <span toReplace>θ</span> </div> </div> <div class="rule__border-top"> <span toReplace>θ</span> <span class="rule__border-top__rule-name">(∨E)</span> </div> </div>',
  },
  {
    rule: "nd-tree-ii",
    label: i18n.global.t("rules.implication.intro.label"),
    desc: `${i18n.global.t("rules.implication.intro.title")} (⇒I)`,
    tree: '<div class="q-ma-sm rule"> <div class="rule__hypo"> <div>[ϕ]</div> <div class="rule__hypo__dots"> <span>.</span> <span>.</span> <span>.</span> </div> ψ </div> <div class="rule__border-top"> <span>ϕ ⇒ ψ</span> <span class="rule__border-top__rule-name">(⇒I)</span> </div> </div>',
  },
  {
    rule: "nd-tree-ie",
    label: i18n.global.t("rules.implication.elimination.label"),
    desc: `${i18n.global.t("rules.implication.elimination.title")} (⇒E)`,
    tree: '<div class="q-ma-sm rule"> <div class="rule__siblings"> <div><span toInput>ψ</span></div> <div><span toInput>ψ</span> ⇒ <span toReplace>ϕ</span></div> </div> <div class="rule__border-top"> <span toReplace>ϕ</span> <span class="rule__border-top__rule-name">(⇒E)</span> </div> </div>',
  },
];

export default rules;
