<template>
  <div>
    <div class="text-h6 q-mb-md">
      {{ $t("rules.scTree") }}
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

    <!-- formula selection -->
    <q-card class="my-card q-my-lg" v-if="formulaSelection">
      <q-card-section>
        <p class="text-body1">
          {{ $t("rules.chooseFormula") }} <strong>{{ choosenLeaf }}</strong>
          {{ $t("rules.chooseFormulaFor") }} <strong>{{ currentRule }}</strong
          >.
        </p>
      </q-card-section>
      <q-card-section>
        <q-select
          v-model="choosenFormula"
          :options="formulaOptions"
          :option-label="(item) => item.label"
          :label="`${$t('rules.formulasInLeaf')} ${choosenLeaf}`"
        />
      </q-card-section>
      <q-card-actions align="right">
        <q-btn :label="$t('labels.cancel')" @click="isApplying = false" />
      </q-card-actions>
    </q-card>

    <!-- cut formula input -->
    <q-card class="my-card q-my-lg" v-if="cutFormulaInput">
      <q-card-section>
        <p class="text-body1">
          {{ $t("inputFormula") }} <strong>{{ currentRule }}</strong
          >.
        </p>
      </q-card-section>
      <q-card-section><div v-html="treeForRule"></div></q-card-section>
      <q-card-section>
        <FormulaInput v-model="cutFormula" :validateFormula="checkFormula" />
      </q-card-section>
      <q-card-actions align="right">
        <q-btn
          :label="$t('labels.cancel')"
          @click="
            () => {
              cutSubmited = false;
              isApplying = false;
            }
          "
        />
        <q-btn :label="$t('labels.use')" @click="cutSubmited = true" />
      </q-card-actions>
    </q-card>

    <!-- exchange formulas selection -->
    <q-card class="my-card q-my-lg" v-if="exchangeSelection">
      <q-card-section>
        <p class="text-body1">
          {{ $t("rules.chooseFormula") }} <strong>{{ choosenLeaf }}</strong>
          {{ $t("rules.chooseFormulaFor") }} <strong>{{ currentRule }}</strong
          >.
        </p>
        <p class="text-body1">
          {{ $t("rules.formula") }} {{ exchangeFirst?.label || "__" }}
          {{ $t("rules.exchang") }} {{ exchangeSecond?.label || "__" }}.
        </p>
      </q-card-section>
      <q-card-section>
        <q-select
          v-model="exchangeFirst"
          :options="formulaOptions"
          :label="`${$t('rules.formulasInLeaf')} ${choosenLeaf}`"
          @update:model-value="
            (value) => {
              formulaOptions.forEach((option) => (option.disable = false));
              value.disable = true;
            }
          "
        />
        <q-select
          v-model="exchangeSecond"
          :options="formulaOptions"
          :label="`${$t('rules.formulasInLeaf')} ${choosenLeaf}`"
        />
      </q-card-section>
      <q-card-actions align="right">
        <q-btn :label="$t('labels.cancel')" @click="isApplying = false" />
      </q-card-actions>
    </q-card>

    <!-- rules -->
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

import { ILStore } from "src/stores/intuitionisticLogicStore";

import nearley from "nearley";
import i18n from "src/i18n";

import grammar from "src/logic/intuitionisticLogic/intuitionisticGrammar";
import { applyGskTreeRule } from "src/logic/intuitionisticLogic/intuitionisticFormulaProcessor";

import FormulaInput from "src/components/logicComponents/FormulaInput.vue";
import rules from "src/logic/intuitionisticLogic/rules/sequentCalculusTreeRules";

const store = ILStore();

const currentRule = ref("");
const isApplying = ref(false);

// choose leaf and formula variables
const choosenLeaf = ref("");
const choosenFormula = ref("");

const formulaOptions = ref([]);

// cut rule variables
const cutFormula = ref("");
const cutSubmited = ref(undefined);
const treeForRule = ref("");

// exchange rules variables
const exchangeFirst = ref(null);
const exchangeSecond = ref(null);

// show/hide sections
const leafSelection = ref(false);
const formulaSelection = ref(false);
const cutFormulaInput = ref(false);
const exchangeSelection = ref(false);

/**
 * apply rule
 */
async function applyRule(rule) {
  // set rule
  isApplying.value = true;
  currentRule.value = rule.label;

  // get leaf
  let leafForProof = await chooseLeaf();
  if (!leafForProof) {
    clearValues();
    return;
  }

  let cutRuleFormula;
  let exchangeFormulas;
  let formulaForProof;

  // check cut rule
  if (rule.value == "gsk-tree-cut") {
    cutRuleFormula = await chooseCutFormula(leafForProof, rule.tree);
    if (cutRuleFormula == false) {
      clearValues();
      Notify.create({
        type: "negative",
        message: i18n.global.t("messages.invalidInput") + rule.label + ".",
      });
      return;
    }
    // check exchange rules
  } else if (rule.value == "gsk-tree-exl" || rule.value == "gsk-tree-exr") {
    exchangeFormulas = await chooseExchangeFormulas(leafForProof, rule);
    if (exchangeFormulas == false) {
      clearValues();
      return;
    }
  } else {
    // get formula from leaf
    formulaForProof = await chooseFormula(leafForProof, rule.value);
    if (!Number.isInteger(formulaForProof) || formulaForProof === false) {
      clearValues();
      return;
    }
  }

  const parser = new nearley.Parser(nearley.Grammar.fromCompiled(grammar));

  // apply
  const result = await applyGskTreeRule(
    rule.value,
    leafForProof,
    parser.feed(leafForProof.replace(" ", "")).results[0],
    formulaForProof,
    cutRuleFormula,
    exchangeFormulas
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

    store.setSameLeaves(
      store.getLeaves.length != new Set(store.getLeaves).size
    );

    // save after rule apply
    store.addToHistory();
    store.spliceLeaves(leafForProof);
    store.addFormulaToProof(store.proof, result);
    Cookies.set("il-proof", store.getProof);
    result[1].forEach((item) => {
      if (item != "") store.pushLeaf(item);
    });
    Cookies.set("il-leaves", store.getLeaves);

    store.resetSameLeaves();
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

function clearValues() {
  choosenLeaf.value = "";
  choosenFormula.value = "";
  cutFormula.value = "";
  isApplying.value = false;
}

/**
 * handle choose of leafe
 */
function chooseLeaf() {
  const leaves = store.getLeaves;

  if (leaves.length > 1) {
    leafSelection.value = true;

    // user choice
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

/**
 * handle choose of formula from leafe
 */
function chooseFormula(leaf, rule) {
  let formulasFromLeaf;
  // get formulas from sides for right, left rules
  if (rule.split("-")[2].includes("r")) formulasFromLeaf = leaf.split("⊢")[1];
  else formulasFromLeaf = leaf.split("⊢")[0];

  if (formulasFromLeaf.includes(",")) {
    formulaSelection.value = true;

    formulaOptions.value = [];
    // get options
    formulasFromLeaf
      .split(",")
      .filter((item) => item != "")
      .forEach((item, index) => {
        formulaOptions.value.push({ value: index, label: item });
      });

    if (choosenLeaf.value == "") choosenLeaf.value = store.getLeaves[0];
    // user choice
    return new Promise((resolve, reject) => {
      const unwatch = watch(
        [choosenFormula, isApplying],
        ([formulaValue, apply]) => {
          // formula choosen
          if (formulaValue !== "") {
            formulaSelection.value = false;
            resolve(formulaValue.value);
            unwatch();
          }
          // canceled
          if (apply == false) {
            formulaSelection.value = false;
            resolve(false);
            unwatch();
          }
        }
      );
    });
  } else {
    return 0;
  }
}

function renderRule(ruleTree, formula, input) {
  return ruleTree
    .replace(
      /<span toReplace1>(.*?)<\/span>/g,
      formula.slice(0, formula.indexOf("⊢") + 1)
    )
    .replace(/<span toReplace>(.*?)<\/span>/g, formula)
    .replace(
      /<span toInput>(.*?)<\/span>/g,
      `<span class="rule__input">${input}</span>`
    )
    .replace(/<span toDelete>(.*?)<\/span>/g, "");
}

/**
 * handle cut rule input
 */
async function chooseCutFormula(leaf, tree) {
  cutFormulaInput.value = true;

  treeForRule.value = renderRule(tree, leaf, "");

  watch(cutFormula, (newFormula) => {
    treeForRule.value = renderRule(
      tree,
      leaf,
      newFormula.length > 1 ? `(${newFormula})` : newFormula
    );
  });

  // user input
  const result = await new Promise((resolve, reject) => {
    const unwatch = watch(cutSubmited, (cutInput) => {
      // submited
      if (cutInput) {
        cutSubmited.value = undefined;
        cutFormulaInput.value = false;
        resolve(cutFormula.value);
        unwatch();
      }
      // canceled
      if (cutInput == false) {
        cutSubmited.value = undefined;
        cutFormulaInput.value = false;
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
    return result;
  } else return false;
}

/**
 * handle exchange rules
 */
function chooseExchangeFormulas(leaf, rule) {
  let formulas = leaf.split("⊢")[0];

  formulas = formulas.split(",").filter((item) => item != "");

  if (formulas.length < 2) {
    Notify.create({
      type: "negative",
      message: i18n.global.t("messages.nothingToExchange") + rule.label + ".",
    });
    return false;
  }

  formulas = formulas.map((item) => ({ label: item, disable: false }));
  formulaOptions.value = [];
  formulaOptions.value = formulas;

  return new Promise((resolve, reject) => {
    exchangeSelection.value = true;

    const unwatch = watch(
      [exchangeFirst, exchangeSecond, isApplying],
      ([first, second, apply]) => {
        if (first && second) {
          const selectedFormulas = { first: first.label, second: second.label };

          exchangeFirst.value = null;
          exchangeSecond.value = null;

          exchangeSelection.value = false;
          resolve(selectedFormulas);
          unwatch();
        }
        if (apply == false) {
          exchangeFirst.value = null;
          exchangeSecond.value = null;

          exchangeSelection.value = false;
          resolve(false);
          unwatch();
        }
      }
    );
  });
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
</script>
