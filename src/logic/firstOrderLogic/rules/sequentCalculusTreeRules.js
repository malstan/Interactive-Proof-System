import i18n from "src/i18n";

const rules = [
  {
    rule: "gsk-tree-id",
    label: i18n.global.t("rules.identity.label"),
    desc: `${i18n.global.t("rules.identity.title")} (id)`,
    proof:
      '<div class="q-ma-sm rule"> <div class="rule__border-top"> <span>Ω, ϕ ⊢ Λ, ϕ</span> <span class="rule__border-top__rule-name">(id)</span> </div> </div>',
  },
  {
    rule: "gsk-tree-uql",
    label: i18n.global.t("rules.universalQuantifier.left.label"),
    desc: `${i18n.global.t("rules.universalQuantifier.left.title")} (∀l)`,
    proof:
      '<div class="q-ma-sm rule"> <div>Ω, ϕ[t/x] ⊢ Λ</div> <div class="rule__border-top"> <span>Ω, (∀x)ϕ ⊢ Λ</span> <span class="rule__border-top__rule-name">(∀l)</span> </div> </div>',
  },
  {
    rule: "gsk-tree-uqr",
    label: i18n.global.t("rules.universalQuantifier.right.label"),
    desc: `${i18n.global.t("rules.universalQuantifier.right.title")} (∀r)`,
    proof:
      '<div class="q-ma-sm rule"> <div>Ω, ⊢ ϕ[y/x], Λ</div> <div class="rule__border-top"> <span>Ω, ⊢ (∀x)ϕ, Λ</span> <span class="rule__border-top__rule-name">(∀r)</span> </div> </div>',
  },
  {
    rule: "gsk-tree-eql",
    label: i18n.global.t("rules.existentionalQuantifier.left.label"),
    desc: `${i18n.global.t("rules.existentionalQuantifier.left.title")} (∃l)`,
    proof:
      ' <div class="q-ma-sm rule"> <div>Ω, ϕ[y/x] ⊢ Λ</div> <div class="rule__border-top"> <span>Ω, (∃x)ϕ ⊢ Λ</span> <span class="rule__border-top__rule-name">(∃l)</span> </div> </div>',
  },
  {
    rule: "gsk-tree-eqr",
    label: i18n.global.t("rules.existentionalQuantifier.right.label"),
    desc: `${i18n.global.t("rules.existentionalQuantifier.right.title")} (∃r)`,
    proof:
      '<div class="q-ma-sm rule"> <div>Ω, ⊢ ϕ[t/x], Λ</div> <div class="rule__border-top"> <span>Ω, ⊢ (∃x)ϕ, Λ</span> <span class="rule__border-top__rule-name">(∃r)</span> </div> </div>',
  },
  {
    rule: "gsk-tree-nl",
    label: i18n.global.t("rules.negation.left.label"),
    desc: `${i18n.global.t("rules.negation.left.title")} (¬l)`,
    proof:
      '<div class="q-ma-sm rule"> <div>Ω ⊢ Λ, ϕ</div> <div class="rule__border-top"> <span>Ω, ¬ϕ ⊢ Λ</span> <span class="rule__border-top__rule-name">(¬l)</span> </div> </div>',
  },
  {
    rule: "gsk-tree-nr",
    label: i18n.global.t("rules.negation.right.label"),
    desc: `${i18n.global.t("rules.negation.right.title")} (¬r)`,
    proof:
      '<div class="q-ma-sm rule"> <div>Ω, ϕ ⊢ Λ</div> <div class="rule__border-top"> <span>Ω ⊢ Λ, ¬ϕ</span> <span class="rule__border-top__rule-name">(¬r)</span> </div> </div>',
  },
  {
    rule: "gsk-tree-cl1",
    label: i18n.global.t("rules.conjunction.left.label1"),
    desc: `${i18n.global.t("rules.conjunction.left.title")} (∧l1)`,
    proof:
      ' <div class="q-ma-sm rule"> <div>Ω, ϕ ⊢ Λ</div> <div class="rule__border-top"> <span>Ω, ϕ ∧ ψ ⊢ Λ</span> <span class="rule__border-top__rule-name">(∧l1)</span> </div> </div>',
  },
  {
    rule: "gsk-tree-cl2",
    label: i18n.global.t("rules.conjunction.left.label2"),
    desc: `${i18n.global.t("rules.conjunction.left.title")} (∧l2)`,
    proof:
      '<div class="q-ma-sm rule"> <div>Ω, ψ ⊢ Λ</div> <div class="rule__border-top"> <span>Ω, ϕ ∧ ψ ⊢ Λ</span> <span class="rule__border-top__rule-name">(∧l2)</span> </div> </div>',
  },
  {
    rule: "gsk-tree-cr",
    label: i18n.global.t("rules.conjunction.right.label"),
    desc: `${i18n.global.t("rules.conjunction.right.title")} (∧r)`,
    proof:
      ' <div class="q-ma-sm rule"> <div class="rule__siblings"> <div>Ω ⊢ Λ, ϕ</div> <div>Ω ⊢ Λ, ψ</div> </div> <div class="rule__border-top"> <span>Ω ⊢ Λ, ϕ ∧ ψ</span> <span class="rule__border-top__rule-name">(∧r)</span> </div> </div>',
  },
  {
    rule: "gsk-tree-dl",
    label: i18n.global.t("rules.disjunction.left.label"),
    desc: `${i18n.global.t("rules.disjunction.left.title")} (∨l)`,
    proof:
      '     <div class="q-ma-sm rule"> <div class="rule__siblings"> <div>Ω, ϕ ⊢ Λ</div> <div>Ω, ψ ⊢ Λ</div> </div> <div class="rule__border-top"> <span>Ω, ϕ ∨ ψ ⊢ Λ</span> <span class="rule__border-top__rule-name">(∨l)</span> </div> </div>',
  },
  {
    rule: "gsk-tree-dr1",
    label: i18n.global.t("rules.disjunction.right.label1"),
    desc: `${i18n.global.t("rules.disjunction.right.title")} (∨r1)`,
    proof:
      ' <div class="q-ma-sm rule"> <div>Ω ⊢ Λ, ϕ</div> <div class="rule__border-top"> <span>Ω ⊢ Λ, ϕ ∨ ψ</span> <span class="rule__border-top__rule-name">(∨r1)</span> </div> </div>',
  },
  {
    rule: "gsk-tree-dr2",
    label: i18n.global.t("rules.disjunction.right.label2"),
    desc: `${i18n.global.t("rules.disjunction.right.title")} (∨r2)`,
    proof:
      ' <div class="q-ma-sm rule"> <div>Ω ⊢ Λ, ψ</div> <div class="rule__border-top"> <span>Ω ⊢ Λ, ϕ ∨ ψ</span> <span class="rule__border-top__rule-name">(∨r2)</span> </div> </div>',
  },
  {
    rule: "gsk-tree-il",
    label: i18n.global.t("rules.implication.left.label"),
    desc: `${i18n.global.t("rules.implication.left.title")} (⇒l)`,
    proof: `<div class="q-ma-sm rule"> <div class="rule__siblings"> <div>Ω ⊢ Λ, ϕ</div> <div>Ω' , ψ ⊢ Λ'</div> </div> <div class="rule__border-top"> <span>Ω, Ω' , ϕ ⇒ ψ ⊢ Λ, Λ'</span> <span class="rule__border-top__rule-name">(⇒l)</span> </div> </div>`,
  },
  {
    rule: "gsk-tree-ir",
    label: i18n.global.t("rules.implication.right.label"),
    desc: `${i18n.global.t("rules.implication.right.title")} (⇒r)`,
    proof:
      ' <div class="q-ma-sm rule"> <div>Ω, ϕ ⊢ Λ, ψ</div> <div class="rule__border-top"> <span>Ω ⊢ Λ, ϕ ⇒ ψ</span> <span class="rule__border-top__rule-name">(⇒r)</span> </div> </div>',
  },
  {
    rule: "gsk-tree-wl",
    label: i18n.global.t("rules.weakening.left.label"),
    desc: `${i18n.global.t("rules.weakening.left.title")} (wl)`,
    proof:
      ' <div class="q-ma-sm rule"> <div>Ω ⊢ Λ</div> <div class="rule__border-top"> <span>Ω, ϕ ⊢ Λ</span> <span class="rule__border-top__rule-name">(wl)</span> </div> </div>',
  },
  {
    rule: "gsk-tree-wr",
    label: i18n.global.t("rules.weakening.right.label"),
    desc: `${i18n.global.t("rules.weakening.right.title")} (wr)`,
    proof:
      '  <div class="q-ma-sm rule"> <div>Ω ⊢ Λ</div> <div class="rule__border-top"> <span>Ω ⊢ Λ, ϕ </span> <span class="rule__border-top__rule-name">(wr)</span> </div> </div>',
  },
  {
    rule: "gsk-tree-col",
    label: i18n.global.t("rules.contraction.left.label"),
    desc: `${i18n.global.t("rules.contraction.left.title")} (cl)`,
    proof:
      '   <div class="q-ma-sm rule"> <div>Ω, ϕ, ϕ ⊢ Λ</div> <div class="rule__border-top"> <span>Ω, ϕ ⊢ Λ </span> <span class="rule__border-top__rule-name">(cl)</span> </div> </div>',
  },
  {
    rule: "gsk-tree-cor",
    label: i18n.global.t("rules.contraction.right.label"),
    desc: `${i18n.global.t("rules.contraction.right.title")} (cr)`,
    proof:
      ' <div class="q-ma-sm rule"> <div>Ω ⊢ ϕ, ϕ,Λ</div> <div class="rule__border-top"> <span>Ω ⊢ ϕ,Λ</span> <span class="rule__border-top__rule-name">(cr)</span> </div> </div>',
  },
  {
    rule: "gsk-tree-cut",
    label: i18n.global.t("rules.cut.label"),
    desc: `${i18n.global.t("rules.cut.title")} (cut)`,
    proof: `<div class="q-ma-sm rule"> <div class="rule__siblings"> <div><span toReplace>Ω ⊢ Λ, </span> <span toInput>ϕ</span></div> <div><span toInput>ϕ</span> <span toReplace>Ω', ϕ ⊢ Λ'</span></div> </div> <div class="rule__border-top"> <span toReplace>Ω, Ω' ⊢ Λ, Λ'</span> <span class="rule__border-top__rule-name">(cut)</span> </div> </div>`,
  },
  {
    rule: "gsk-tree-exl",
    label: i18n.global.t("rules.exchange.left.label"),
    desc: `${i18n.global.t("rules.exchange.left.title")} (exl)`,
    proof:
      ' <div class="q-ma-sm rule"> <div>Ω, ϕ, ψ, Ω 0 ⊢ Λ</div> <div class="rule__border-top"> <span>Ω, ψ, ϕ, Ω 0 ⊢ Λ</span> <span class="rule__border-top__rule-name">(exl)</span> </div> </div>',
  },
  {
    rule: "gsk-tree-exr",
    label: i18n.global.t("rules.exchange.right.label"),
    desc: `${i18n.global.t("rules.exchange.right.title")} (exr)`,
    proof:
      ' <div class="q-ma-sm rule"> <div>Ω ⊢ Λ, ϕ, ψ,Λ 0</div> <div class="rule__border-top"> <span>Ω ⊢ Λ, ψ, ϕ,Λ 0 </span> <span class="rule__border-top__rule-name">(exr)</span> </div> </div>',
  },
];

export default rules;
