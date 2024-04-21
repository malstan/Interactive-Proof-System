import i18n from "src/i18n";

const rules = [
  {
    rule: "gsk-tree-id",
    label: i18n.global.t("rules.identity.label"),
    desc: `${i18n.global.t("rules.identity.title")} (id)`,
    proof:
      '<div class="q-ma-sm rule"> <div class="rule__border-top"> <span>Ω, ϕ ⊢ ϕ</span> <span class="rule__border-top__rule-name">(id)</span> </div> </div>',
  },
  {
    rule: "gsk-tree-nl",
    label: i18n.global.t("rules.negation.left.label"),
    desc: `${i18n.global.t("rules.negation.left.title")} (¬l)`,
    proof:
      ' <div class="q-ma-sm rule"> <div>Ω ⊢ ϕ</div> <div class="rule__border-top"> <span>Ω, ¬ϕ ⊢</span> <span class="rule__border-top__rule-name">(¬l)</span> </div> </div>',
  },
  {
    rule: "gsk-tree-nr",
    label: i18n.global.t("rules.negation.right.label"),
    desc: `${i18n.global.t("rules.negation.right.title")} (¬r)`,
    proof:
      '<div class="q-ma-sm rule"> <div>Ω, ϕ ⊢</div> <div class="rule__border-top"> <span>Ω ⊢ ¬ϕ</span> <span class="rule__border-top__rule-name">(¬r)</span> </div> </div>',
  },
  {
    rule: "gsk-tree-cl1",
    label: i18n.global.t("rules.conjunction.left.label1"),
    desc: `${i18n.global.t("rules.conjunction.left.title")} (∧l1)`,
    proof:
      ' <div class="q-ma-sm rule"> <div>Ω, ϕ ⊢ θ</div> <div class="rule__border-top"> <span>Ω, ϕ ∧ ψ ⊢ θ</span> <span class="rule__border-top__rule-name">(∧l1)</span> </div> </div>',
  },
  {
    rule: "gsk-tree-cl2",
    label: i18n.global.t("rules.conjunction.left.label2"),
    desc: `${i18n.global.t("rules.conjunction.left.title")} (∧l2)`,
    proof:
      ' <div class="q-ma-sm rule"> <div>Ω, ψ ⊢ θ</div> <div class="rule__border-top"> <span>Ω, ϕ ∧ ψ ⊢ θ</span> <span class="rule__border-top__rule-name">(∧l2)</span> </div> </div>',
  },
  {
    rule: "gsk-tree-cr",
    label: i18n.global.t("rules.conjunction.right.label"),
    desc: `${i18n.global.t("rules.conjunction.right.title")} (∧r)`,
    proof:
      ' <div class="q-ma-sm rule"> <div class="rule__siblings"> <div>Ω ⊢ ϕ</div> <div>Ω ⊢ ψ</div> </div> <div class="rule__border-top"> <span>Ω ⊢ ϕ ∧ ψ</span> <span class="rule__border-top__rule-name">(∧r)</span> </div> </div>',
  },
  {
    rule: "gsk-tree-dl",
    label: i18n.global.t("rules.disjunction.left.label"),
    desc: `${i18n.global.t("rules.disjunction.left.title")} (∨l)`,
    proof:
      '  <div class="q-ma-sm rule"> <div class="rule__siblings"> <div>Ω, ϕ ⊢ θ</div> <div>Ω, ψ ⊢ θ</div> </div> <div class="rule__border-top"> <span>Ω, ϕ ∨ ψ ⊢ θ</span> <span class="rule__border-top__rule-name">(∨l)</span> </div> </div>',
  },
  {
    rule: "gsk-tree-dr1",
    label: i18n.global.t("rules.disjunction.right.label1"),
    desc: `${i18n.global.t("rules.disjunction.right.title")} (∨r1)`,
    proof:
      '<div class="q-ma-sm rule"> <div>Ω ⊢ ϕ</div> <div class="rule__border-top"> <span>Ω ⊢ ϕ ∨ ψ</span> <span class="rule__border-top__rule-name">(∨r1)</span> </div> </div>',
  },
  {
    rule: "gsk-tree-dr2",
    label: i18n.global.t("rules.disjunction.right.label2"),
    desc: `${i18n.global.t("rules.disjunction.right.title")} (∨r2)`,
    proof:
      '<div class="q-ma-sm rule"> <div>Ω ⊢ ψ</div> <div class="rule__border-top"> <span>Ω ⊢ ϕ ∨ ψ</span> <span class="rule__border-top__rule-name">(∨r2)</span> </div> </div>',
  },
  {
    rule: "gsk-tree-il",
    label: i18n.global.t("rules.implication.left.label"),
    desc: `${i18n.global.t("rules.implication.left.title")} (⇒l)`,
    proof:
      ' <div class="q-ma-sm rule"> <div class="rule__siblings"> <div>Ω ⊢ ϕ</div> <div>Ω, ψ ⊢ θ</div> </div> <div class="rule__border-top"> <span>Ω, ϕ ⇒ ψ ⊢ θ</span> <span class="rule__border-top__rule-name">(⇒l)</span> </div> </div>',
  },
  {
    rule: "gsk-tree-ir",
    label: i18n.global.t("rules.implication.right.label"),
    desc: `${i18n.global.t("rules.implication.right.title")} (⇒r)`,
    proof:
      '  <div class="q-ma-sm rule"> <div>Ω, ϕ ⊢ ψ</div> <div class="rule__border-top"> <span>Ω ⊢ ϕ ⇒ ψ</span> <span class="rule__border-top__rule-name">(⇒r)</span> </div> </div>',
  },
  {
    rule: "gsk-tree-wl",
    label: i18n.global.t("rules.weakening.left.label"),
    desc: `${i18n.global.t("rules.weakening.left.title")} (wl)`,
    proof:
      ' <div class="q-ma-sm rule"> <div>Ω ⊢ θ</div> <div class="rule__border-top"> <span>Ω, ϕ ⊢ θ</span> <span class="rule__border-top__rule-name">(wl)</span> </div> </div>',
  },
  {
    rule: "gsk-tree-col",
    label: i18n.global.t("rules.contraction.left.label"),
    desc: `${i18n.global.t("rules.contraction.left.title")} (cl)`,
    proof:
      '<div class="q-ma-sm rule"> <div>Ω, ϕ, ϕ ⊢ θ</div> <div class="rule__border-top"> <span>Ω, ϕ ⊢ θ </span> <span class="rule__border-top__rule-name">(cl)</span> </div> </div>',
  },
  {
    rule: "gsk-tree-cut",
    label: i18n.global.t("rules.cut.label"),
    desc: `${i18n.global.t("rules.cut.title")} (cut)`,
    proof:
      '<div class="q-ma-sm rule"> <div class="rule__siblings"> <div><span toReplace1>Ω, Λ ⊢ ψ, </span><span toInput>ϕ</span></div> <div><span toInput>ϕ</span><span toReplace>Ω, Λ ⊢ ψ</span></div> </div> <div class="rule__border-top"> <span><span toReplace>Ω, Λ ⊢ ψ</span></span> <span class="rule__border-top__rule-name">(cut)</span> </div> </div>',
  },
  {
    rule: "gsk-tree-exl",
    label: i18n.global.t("rules.exchange.left.label"),
    desc: `${i18n.global.t("rules.exchange.left.title")} (exl)`,
    proof:
      ' <div class="q-ma-sm rule"> <div>Ω, ϕ, ψ ⊢ θ</div> <div class="rule__border-top"> <span>Ω, ψ, ϕ ⊢ θ</span> <span class="rule__border-top__rule-name">(exl)</span> </div> </div>',
  },
];

export default rules;
