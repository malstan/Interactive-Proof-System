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
          v-model="term"
          :validateFormula="checkTerm"
          :term="true"
        />
      </q-card-section>
      <q-card-actions align="right">
        <q-btn
          :label="$t('labels.cancel')"
          @click="
            () => {
              termSubmited = false;
              isApplying = false;
            }
          "
        />
        <q-btn :label="$t('labels.use')" @click="termSubmited = true" />
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

import nearley from "nearley";
import i18n from "src/i18n";

import { FOLStore } from "src/stores/firstOrderLogicStore";

import grammar from "src/logic/firstOrderLogic/firstOrderGrammar";
import termGrammar from "src/logic/firstOrderLogic/firstOrderTermGrammar";
import { applyGskTreeRule } from "src/logic/firstOrderLogic/firstOrderFormulaProcessor";

import FormulaInput from "src/components/logicComponents/FormulaInput.vue";
import rules from "src/logic/firstOrderLogic/rules/sequentCalculusTreeRules";

const store = FOLStore();

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

// cut rule variables
const term = ref("");
const termSubmited = ref(undefined);

// show/hide sections
const leafSelection = ref(false);
const formulaSelection = ref(false);
const cutFormulaInput = ref(false);
const exchangeSelection = ref(false);
const termInput = ref(false);

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
  let termForSubstitution;

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
  // get term or variable
  if (rule.value.includes("q")) {
    termForSubstitution = await chooseTerm();
    if (termForSubstitution == false) {
      clearValues();
      return;
    }
    if (rule.value == "gsk-tree-uqr" || rule.value == "gsk-tree-eql") {
      if (termForSubstitution.length > 1) {
        Notify.create({
          type: "negative",
          message: i18n.global.t("messages.termIsNotOK"),
        });
        clearValues();
        return;
      }
      if (checkBonds(leafForProof, termForSubstitution)) {
        Notify.create({
          type: "negative",
          message:
            i18n.global.t("messages.rule") +
            rule.label +
            i18n.global.t("messages.notApplyed") +
            leafForProof +
            i18n.global.t("messages.notApplyedBonding") +
            ".",
        });
        clearValues();
        return;
      }
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
    exchangeFormulas,
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

    store.setSameLeaves(
      store.getLeaves.length != new Set(store.getLeaves).size
    );

    // save after rule apply
    store.addToHistory();
    store.spliceLeaves(leafForProof);
    store.addFormulaToProof(store.proof, result);
    Cookies.set("fol-proof", store.getProof);

    result[1].forEach((item) => {
      if (item != "") store.pushLeaf(item);
    });
    Cookies.set("fol-leaves", store.getLeaves);

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

/**
 * clear variables after rule apply
 */
function clearValues() {
  choosenLeaf.value = "";
  choosenFormula.value = "";
  cutFormula.value = "";
  term.value = "";
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

  if (formulasFromLeaf == "") return 0;
  // check number of formulas
  const parser = new nearley.Parser(nearley.Grammar.fromCompiled(grammar));
  let ast = parser.feed(formulasFromLeaf.replace(" ", "")).results[0];

  if (checkFormulas(ast)) {
    if (!Array.isArray(ast)) return 0;

    formulaSelection.value = true;
    formulaOptions.value = [];

    // get options
    ast.forEach((item, index) => {
      formulaOptions.value.push({ value: index, label: arrayToString(item) });
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
  let formulas =
    rule.value == "gsk-tree-exl" ? leaf.split("⊢")[0] : leaf.split("⊢")[1];

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
 * handle quantificator rules
 */
async function chooseTerm() {
  termInput.value = true;
  // user input
  const result = await new Promise((resolve, reject) => {
    const unwatch = watch(termSubmited, (termInputed) => {
      // submited
      if (termInputed) {
        termSubmited.value = undefined;
        termInput.value = false;
        resolve(term.value);
        unwatch();
      }
      // canceled
      if (termInputed == false) {
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
  } else return false;
}

/**
 * check if ( ) are needed
 */
function checkFormulas(ast) {
  return !(
    ast.includes("¬") ||
    ast.includes("∧") ||
    ast.includes("∨") ||
    ast.includes("⇒") ||
    ast[0].includes("∀") ||
    ast[0].includes("∃") ||
    /^([A-Z]\()$/.test(ast[0])
  );
}

/**
 * first order formula to string
 */
function arrayToString(array) {
  if (array[0] == "(" && array[2] == ")") array = array[1];

  const itemToString = (item) => {
    if (Array.isArray(item)) {
      if (Array.isArray(item[0])) {
        return item.flatMap(itemToString).join("");
      } else {
        if (item[0] == "¬") {
          return `${item[0]}${itemToString(item[1])}`;
        } else if (item[0].match(/[A-Z]\(/g) || item[0].match(/[a-z]\(/g)) {
          return `${item[0]}${item[1]
            .flatMap(itemToString)
            .join(",")
            .replaceAll("(,", "(")
            .replaceAll(",)", ")")}${item[2]}`;
        } else if (item.length == 2 && Array.isArray(item[1])) {
          return `${item[0]}${item[1].flatMap(itemToString).join("")}${
            item[2] != null ? item[2] : ""
          }`;
        } else {
          return item.flatMap(itemToString).join("");
        }
      }
    } else return item.toString();
  };

  return itemToString(array);
}

/**
 * check variable bonding
 */
function checkBonds(sequent, term) {
  let allLowercaseLetters = sequent.match(/[a-z]/g) || [];
  let functionNames = sequent.match(/[a-z](?=\()/g) || [];

  let notAllowed = functionNames.toString();

  allLowercaseLetters = allLowercaseLetters.filter(
    (item) => !notAllowed.includes(item)
  );

  if (sequent.match(new RegExp(`([∀∃])(${term})`, "g")))
    allLowercaseLetters = allLowercaseLetters.filter((item) => item != term);

  return allLowercaseLetters.includes(term);
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
