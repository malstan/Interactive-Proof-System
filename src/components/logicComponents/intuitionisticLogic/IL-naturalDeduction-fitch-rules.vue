<template>
  <div class="text-h6 q-mb-md">
    {{ $t("rules.ndFitch") }}
  </div>

  <!-- user input -->
  <q-card class="my-card q-my-lg" v-if="userInput">
    <q-card-section>
      <p class="text-body1">
        {{ $t("rules.inputFormulaFitch") }}
        <strong>{{ currentRule.label }}</strong
        >.
      </p>
    </q-card-section>
    <q-card-section v-if="rulesWithNeed.includes(currentRule.value)">
      <FormulaInput v-model="choosenFormula" :validateFormula="checkFormula" />
    </q-card-section>
    <q-card-section v-if="currentMask">
      <q-input
        class="ls-formula-i"
        outlined
        clearable
        autogrow
        spellcheck="false"
        v-model="choosenRows"
        ref="rowsInputElm"
        :label="$t('logic.chooseRows') + ' (' + currentPlaceholder + ')'"
        :rules="[(val) => currentMask.test(val) || $t('logic.badRowFormat')]"
      />

      <div class="fitch-keyboard">
        <q-btn
          outline
          @click="addToRows('1')"
          @mousedown="handleMouseDown"
          label="1"
        />
        <q-btn
          outline
          @click="addToRows('2')"
          @mousedown="handleMouseDown"
          label="2"
        />
        <q-btn
          outline
          @click="addToRows('3')"
          @mousedown="handleMouseDown"
          label="3"
        />
        <q-btn
          outline
          @click="addToRows('4')"
          @mousedown="handleMouseDown"
          label="4"
        />
        <q-btn
          outline
          @click="addToRows('5')"
          @mousedown="handleMouseDown"
          label="5"
        />
        <q-btn
          outline
          @click="addToRows('6')"
          @mousedown="handleMouseDown"
          label="6"
        />
        <q-btn
          outline
          @click="addToRows('-')"
          @mousedown="handleMouseDown"
          label="-"
          class="fitch-keyboard__double"
        />
        <q-btn
          outline
          @click="addToRows(',')"
          @mousedown="handleMouseDown"
          label=","
          class="fitch-keyboard__double"
        />
        <q-btn
          class="fitch-keyboard__remove fitch-keyboard__double"
          outline
          @click="removeFromRows()"
          @mousedown="handleMouseDown"
          label="←"
        />
      </div>
    </q-card-section>
    <q-card-actions align="right">
      <q-btn
        :label="$t('labels.cancel')"
        @click="
          () => {
            isApplying = false;
            inputSubmited = false;
          }
        "
      />
      <q-btn :label="$t('labels.use')" @click="inputSubmited = true" />
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
          applyRule(
            {
              value: rule.rule,
              label: rule.label,
            },
            rule.forInput
          )
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
</template>

<script setup>
import { ref, watch } from "vue";
import { Notify, Cookies } from "quasar";

import { ILStore } from "src/stores/intuitionisticLogicStore";

import nearley from "nearley";
import i18n from "src/i18n";

import grammar from "src/logic/intuitionisticLogic/intuitionisticGrammar";
import { applyNdFitchRule } from "src/logic/intuitionisticLogic/intuitionisticFormulaProcessor";

import rules from "src/logic/intuitionisticLogic/rules/naturalDeductionFitchRules";
import FormulaInput from "../FormulaInput.vue";

const store = ILStore();

const currentRule = ref("");
const isApplying = ref(false);

const rulesWithNeed = [
  "nd-fitch-as",
  "nd-fitch-ae1",
  "nd-fitch-di1",
  "nd-fitch-di2",
];

// formula
const userInput = ref(false);
const inputSubmited = ref(undefined);
const choosenFormula = ref("");

// rows
const choosenRows = ref("");
const currentMask = ref(undefined);
const currentPlaceholder = ref("");
const rowsInputElm = ref();

/**
 * apply rule
 */
async function applyRule(rule, forInput) {
  isApplying.value = true;
  currentRule.value = rule;

  currentMask.value = forInput?.mask;
  currentPlaceholder.value = forInput?.placeholder;

  // wait for user input - formula, rows
  let userInputs = await getUserInput();

  if (userInputs == false) {
    clearValues();
    return;
  }

  if (!isUserInputValid(userInputs)) {
    clearValues();
    Notify.create({
      type: "negative",
      message: i18n.global.t("messages.invalidInput") + rule.label + ".",
    });
    return;
  }

  const result = await applyNdFitchRule(
    rule.value,
    userInputs.formula,
    userInputs.rows,
    JSON.parse(JSON.stringify(store.proof))
  );

  if (result) {
    Notify.create({
      type: "positive",
      message:
        i18n.global.t("messages.rule") +
        rule.label +
        i18n.global.t("messages.applyedFitch"),
    });

    // save after rule apply
    store.addToHistory();
    store.addRowToProof(result);
    Cookies.set("pl-proof", store.getProof);
  } else {
    Notify.create({
      type: "negative",
      message:
        i18n.global.t("messages.rule") +
        rule.label +
        i18n.global.t("messages.notApplyedFitch"),
    });
  }
  clearValues();
}

function clearValues() {
  isApplying.value = false;
  currentRule.value = "";
  choosenFormula.value = "";
  choosenRows.value = "";
  currentMask.value = undefined;
}

function isUserInputValid(userInputs) {
  // check if rule that needs formula has formula
  if (
    rulesWithNeed.includes(currentRule.value.value) &&
    userInputs.formula == ""
  )
    return false;
  // check if rule is assupmtion and formula exists
  if (currentRule.value.value == "nd-fitch-as" && userInputs.formula != "")
    return true;
  // check if rule that needs row has row
  if (userInputs.rows == "" || userInputs.rows == undefined) return false;

  return true;
}

async function getUserInput() {
  userInput.value = true;

  const result = await new Promise((resolve, reject) => {
    const unwatch = watch(inputSubmited, (input) => {
      // submited
      if (input) {
        inputSubmited.value = undefined;
        userInput.value = false;
        resolve({ formula: choosenFormula.value, rows: choosenRows.value });
        unwatch();
      }
      // canceled
      if (input == false) {
        inputSubmited.value = undefined;
        userInput.value = false;
        resolve(false);
        unwatch();
      }
    });
  });

  if (result && !result.formula.includes(",")) {
    // check syntax
    const parser = new nearley.Parser(nearley.Grammar.fromCompiled(grammar));
    try {
      parser.feed(result.formula.replace(" ", ""));
    } catch (error) {
      Notify.create({
        type: "negative",
        message: i18n.global.t("messages.formulaIsNotOK"),
      });
      return false;
    }
    return { formula: result.formula, rows: result.rows };
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

/**
 * keyboard functions
 */
function handleMouseDown(event) {
  event.preventDefault();
}

/**
 * keyboard functions for row input
 */
function addToRows(symbol) {
  const cursorPosition = rowsInputElm.value.nativeEl.selectionStart;

  choosenRows.value =
    choosenRows.value.slice(0, cursorPosition) +
    symbol +
    choosenRows.value.slice(cursorPosition);

  setTimeout(() => {
    document
      .getElementById(rowsInputElm.value.nativeEl.id)
      .setSelectionRange(cursorPosition + 1, cursorPosition + 1);
  }, 1);
}
function removeFromRows() {
  const cursorPosition = rowsInputElm.value.nativeEl.selectionStart;

  choosenRows.value =
    choosenRows.value.slice(0, cursorPosition - 1) +
    choosenRows.value.slice(cursorPosition);

  setTimeout(() => {
    document
      .getElementById(rowsInputElm.value.nativeEl.id)
      .setSelectionRange(cursorPosition - 1, cursorPosition - 1);
  }, 1);
}
</script>
