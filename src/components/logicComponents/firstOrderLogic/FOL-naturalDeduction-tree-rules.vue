<template>
  <div>
    <div class="text-h6 q-mb-md">
      {{ $t("rules.ndTree") }}
    </div>

    <!-- leaf selection -->
    <q-card class="my-card q-my-lg" v-if="leafSelection">
      <q-card-section>
        <p class="text-body1">
          {{ $t("rules.chooseLeaf") }} <strong>{{ currentRule }}</strong
          >.
        </p>
      </q-card-section>
      <q-card-section>
        <q-select
          v-model="choosenLeaf"
          :options="store.getLeaves"
          :label="$t('rules.leaves')"
        />
      </q-card-section>
      <q-card-actions align="right">
        <q-btn :label="$t('labels.cancel')" @click="isApplying = false" />
      </q-card-actions>
    </q-card>

    <!-- formula input -->
    <q-card class="my-card q-my-lg" v-if="formulaInput">
      <q-card-section>
        <p class="text-body1">
          {{ $t("rules.inputFormula") }} <strong>{{ currentRule }}</strong
          >.
        </p>
      </q-card-section>
      <q-card-section> <div v-html="treeForRule"></div></q-card-section>
      <q-card-section>
        <FormulaInput
          v-model="choosenFormula"
          :validateFormula="checkFormula"
        />
      </q-card-section>
      <q-card-actions align="right">
        <q-btn
          :label="$t('labels.cancel')"
          @click="
            () => {
              isApplying = false;
              formulaSubmited = false;
            }
          "
        />
        <q-btn :label="$t('labels.use')" @click="formulaSubmited = true" />
      </q-card-actions>
    </q-card>

    <!-- term input -->
    <q-card class="my-card q-my-lg" v-if="termInput">
      <q-card-section>
        <p class="text-body1">
          {{ $t("rules.inputTerm") }}
          <strong>{{ currentRule }}</strong
          >.
        </p>
      </q-card-section>
      <q-card-section>
        <FormulaInput
          v-model="choosenTerm"
          :validateFormula="checkTerm"
          :term="true"
        />
      </q-card-section>
      <q-card-actions align="right">
        <q-btn
          :label="$t('labels.cancel')"
          @click="
            () => {
              isApplying = false;
              termSubmited = false;
            }
          "
        />
        <q-btn :label="$t('labels.use')" @click="termSubmited = true" />
      </q-card-actions>
    </q-card>

    <q-scroll-area class="q-mx-auto" style="height: 600px; max-width: 500px">
      <q-list bordered separator style="border-radius: 4px">
        <q-item
          v-for="rule in rules"
          :key="rule.rule"
          clickable
          v-ripple
          class="q-py-md"
          @click="
            applyRule({
              value: rule.rule,
              label: rule.label,
              tree: rule.proof,
            })
          "
          :disable="!store.isProving || isApplying"
        >
          <q-item-section top>
            <q-item-label class="text-body1 text-primary">
              {{ rule.desc }}
            </q-item-label>
            <div class="flex" v-html="rule.proof"></div>
          </q-item-section>
        </q-item>
      </q-list>
    </q-scroll-area>
  </div>
</template>

<script setup>
import { ref, watch } from "vue";
import { Notify, Cookies } from "quasar";

import nearley from "nearley";
import i18n from "src/i18n";

import { FOLStore } from "src/stores/firstOrderLogicStore";

import grammar from "src/logic/firstOrderLogic/firstOrderGrammar";
import { applyNdTreeRule } from "src/logic/firstOrderLogic/firstOrderFormulaProcessor";
import termGrammar from "src/logic/firstOrderLogic/firstOrderTermGrammar";

import FormulaInput from "src/components/logicComponents/FormulaInput.vue";
import rules from "src/logic/firstOrderLogic/rules/naturalDeductionTreeRules";

const store = FOLStore();

const currentRule = ref("");
const isApplying = ref(false);

// choose leaf variables
const choosenLeaf = ref("");
const leafSelection = ref(false);

// input formula variables
const formulaInput = ref(false);
const formulaSubmited = ref(undefined);
const choosenFormula = ref("");
const treeForRule = ref("");

const rulesWithNeed = [
  "nd-tree-ne",
  "nd-tree-ce1",
  "nd-tree-ce2",
  "nd-tree-de",
  "nd-tree-ie",
  "nd-tree-eqe",
];
const checkHypoForTerm = ["nd-tree-uqi", "nd-tree-eqe"];

// term input variables
const termInput = ref(false);
const termSubmited = ref(undefined);
const choosenTerm = ref("");

/**
 * apply rule
 */
async function applyRule(rule) {
  isApplying.value = true;
  currentRule.value = rule.label;

  // get leaf
  let leafForProof = await chooseLeaf();
  if (!leafForProof) {
    clearValues();
    return;
  }

  let formulaForInput;
  // input formula
  if (rulesWithNeed.includes(rule.value)) {
    formulaForInput = await chooseInputFormula(
      leafForProof,
      rule.tree,
      rule.value
    );
    if (!formulaForInput) {
      clearValues();
      Notify.create({
        type: "negative",
        message: i18n.global.t("messages.invalidInput") + rule.label + ".",
      });
      return;
    }
  }

  // get term
  let termForSubstitution;
  if (rule.value.includes("q")) {
    termForSubstitution = await chooseInputTerm();
    if (!termForSubstitution) {
      Notify.create({
        type: "negative",
        message: i18n.global.t("messages.invalidInput") + rule.label + ".",
      });
      clearValues();
      return;
    }
    // check hypos
    if (
      checkHypoForTerm.includes(rule.value) &&
      store.checkHypotesisForTerm(termForSubstitution)
    ) {
      Notify.create({
        type: "negative",
        message:
          i18n.global.t("messages.rule") +
          rule.label +
          i18n.global.t("messages.termInHyp") +
          ".",
      });
      clearValues();
      return;
    }
  }

  const parser = new nearley.Parser(nearley.Grammar.fromCompiled(grammar));

  // apply rule
  const result = await applyNdTreeRule(
    rule.value,
    leafForProof,
    parser.feed(leafForProof.replace(" ", "")).results[0],
    formulaForInput,
    termForSubstitution
  );

  if (Array.isArray(result)) {
    Notify.create({
      type: "positive",
      message:
        i18n.global.t("messages.rule") +
        rule.label +
        i18n.global.t("messages.applyed") +
        leafForProof +
        ".",
    });

    // assign letter to hypothesis
    if (result[3]) {
      let hypoCount = store.getHypotesis.length;
      let hypoNames = [];

      for (let i = 0; i < result[3].length; i++) {
        hypoNames.push(String.fromCharCode("a".charCodeAt(0) + hypoCount));
        hypoCount++;
      }

      result[2] = `${result[2]}${hypoNames.join(",")}`;
    }

    store.setSameLeaves(
      store.getLeaves.length != new Set(store.getLeaves).size
    );

    // save after rule apply
    store.addToHistory();
    store.spliceLeaves(leafForProof);
    // add hypothesis
    if (result[3]) {
      store.addHypotesis(result[3]);
      Cookies.set("fol-hypo", store.getHypotesis);
    }

    // check hypothesis and update leaves
    result[1].forEach((item) => {
      let isHypo = store.checkHypotesis(item, result[0]);
      let isNewHypo = result[3]?.includes(item);
      if (isNewHypo) {
        store.hypotesis = store.hypotesis.map((hypo) =>
          hypo.hypo == item ? { hypo: hypo.hypo, used: true } : hypo
        );
      }

      if (item != "" && !(isHypo || isNewHypo)) store.pushLeaf(item);
    });
    Cookies.set("fol-leaves", store.getLeaves);
    Cookies.set("fol-hypo", store.getHypotesis);

    store.addFormulaToProof(store.proof, result);
    Cookies.set("fol-proof", store.getProof);

    store.resetSameLeaves();

    // error
  } else {
    Notify.create({
      type: "negative",
      message:
        i18n.global.t("messages.rule") +
        rule.label +
        i18n.global.t("messages.notApplyed") +
        leafForProof +
        ".",
    });
  }
  clearValues();
}

/**
 * clear values after rule apply
 */
function clearValues() {
  choosenLeaf.value = "";
  choosenFormula.value = "";
  choosenTerm.value = "";
  isApplying.value = false;
}

/**
 * handle choose of leaf
 */
function chooseLeaf() {
  const leaves = store.getLeaves;
  if (leaves.length > 1) {
    leafSelection.value = true;
    return new Promise((resolve, reject) => {
      const unwatch = watch([choosenLeaf, isApplying], ([leafValue, apply]) => {
        // leaf choosen
        if (leafValue !== "") {
          leafSelection.value = false;
          resolve(leafValue);
          unwatch();
        }
        // canceled
        if (apply == false) {
          leafSelection.value = false;
          resolve(false);
          unwatch();
        }
      });
    });
  } else {
    return leaves[0];
  }
}

function renderRule(ruleTree, formula, input) {
  return ruleTree
    .replace(/<span toReplace>(.*?)<\/span>/g, formula)
    .replace(
      /<span toInput>(.*?)<\/span>/g,
      `<span class="rule__input">${input}</span>`
    )
    .replace(/<span toDelete>(.*?)<\/span>/g, "");
}

/**
 * handle input formula
 */
async function chooseInputFormula(leaf, tree, rule) {
  formulaInput.value = true;

  const leafForTree = leaf.length > 1 ? `(${leaf})` : leaf;
  treeForRule.value = renderRule(
    tree,
    leafForTree,
    rule == "nd-tree-de" ? "∨" : ""
  );

  watch(choosenFormula, (newFormula) => {
    treeForRule.value = renderRule(
      tree,
      leafForTree,
      newFormula.length > 1 ? `(${newFormula})` : newFormula
    );
  });
  // user input
  const result = await new Promise((resolve, reject) => {
    const unwatch = watch(formulaSubmited, (input) => {
      // submited
      if (input) {
        formulaSubmited.value = undefined;
        formulaInput.value = false;
        resolve(choosenFormula.value);
        unwatch();
      }
      // canceled
      if (input == false) {
        formulaSubmited.value = undefined;
        formulaInput.value = false;
        resolve(false);
        unwatch();
      }
    });
  });
  if (result) {
    // check syntax
    const parser = new nearley.Parser(nearley.Grammar.fromCompiled(grammar));
    try {
      parser.feed(result.replace(" ", ""));
    } catch (error) {
      Notify.create({
        type: "negative",
        message: i18n.global.t("messages.formulaIsNotOK"),
      });
      return false;
    }
    return { asString: result, asAst: parser.results[0] };
  } else {
    if (result != false)
      Notify.create({
        type: "negative",
        message: i18n.global.t("messages.formulaIsNotOK"),
      });
    return false;
  }
}

/**
 * handle input term
 */
async function chooseInputTerm() {
  termInput.value = true;
  // user input
  const result = await new Promise((resolve, reject) => {
    const unwatch = watch(termSubmited, (input) => {
      // submited
      if (input) {
        termSubmited.value = undefined;
        termInput.value = false;
        resolve(choosenTerm.value);
        unwatch();
      }
      // canceled
      if (input == false) {
        termSubmited.value = undefined;
        termInput.value = false;
        resolve(false);
        unwatch();
      }
    });
  });

  if (result) {
    // check syntax
    const parser = new nearley.Parser(
      nearley.Grammar.fromCompiled(termGrammar)
    );
    try {
      parser.feed(result.replace(" ", ""));
    } catch (error) {
      Notify.create({
        type: "negative",
        message: i18n.global.t("messages.termIsNotOK"),
      });
      return false;
    }
    return result;
  } else {
    return false;
  }
}

/**
 * check syntax of formula
 */
function checkFormula(formula) {
  const parser = new nearley.Parser(nearley.Grammar.fromCompiled(grammar));
  try {
    parser.feed(formula.replace(" ", ""));
    if (parser.results.length === 0) throw new Error("Formula is not valid.");
  } catch (error) {
    //console.log(error);
    return false;
  }
  return parser.results;
}

function checkTerm(term) {
  const parser = new nearley.Parser(nearley.Grammar.fromCompiled(termGrammar));
  try {
    parser.feed(term.replace(" ", ""));
    if (parser.results.length === 0) throw new Error("Term is not valid.");
  } catch (error) {
    //console.log(error);
    return false;
  }
  return parser.results;
}
</script>
