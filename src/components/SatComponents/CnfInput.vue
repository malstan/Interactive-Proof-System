<template>
  <div class="sat">
    <!-- INPUT -->
    <div class="sat__input">
      <q-input
        class="ls-formula-i"
        ref="inputRef"
        v-model="cnf"
        outlined
        clearable
        autogrow
        spellcheck="false"
        :label="$t('logic.cnf')"
        :rules="[
          (val) => val.length > 0 || $t('messages.inputFormula'),
          (val) =>
            isFormulaValid(val) != false || $t('messages.formulaIsNotOK'),
        ]"
        @clear="(cnf = ''), (resultSAT = null), (assignments = [])"
      />
      <q-btn
        outline
        @click="processSolve(true)"
        :label="$t('labels.start')"
        :disable="cnf.length < 1 || inputRef.hasError"
        style="margin-bottom: 20px"
      />
    </div>

    <!-- KEYBOARD -->
    <div class="q-my-md sat__keyboard--cnf">
      <!-- letters -->
      <q-btn
        outline
        @click="addSymbol('a')"
        @mousedown="handleMouseDown"
        label="a"
        style="text-transform: none"
      />
      <q-btn
        outline
        @click="addSymbol('b')"
        @mousedown="handleMouseDown"
        label="b"
        style="text-transform: none"
      />
      <q-btn
        outline
        @click="addSymbol('c')"
        @mousedown="handleMouseDown"
        label="c"
        style="text-transform: none"
      />
      <q-btn
        outline
        @click="addSymbol('d')"
        @mousedown="handleMouseDown"
        label="d"
        style="text-transform: none"
      />
      <q-btn
        outline
        @click="addSymbol('e')"
        @mousedown="handleMouseDown"
        label="e"
        style="text-transform: none"
      />
      <q-btn
        outline
        @click="addSymbol('f')"
        @mousedown="handleMouseDown"
        label="f"
        style="text-transform: none"
      />

      <!-- logic symbols -->
      <q-btn
        outline
        @click="addSymbol('∧')"
        @mousedown="handleMouseDown"
        label="∧"
      >
        <q-tooltip :delay="500">{{ $t("logic.conjunction") }}</q-tooltip>
      </q-btn>
      <q-btn
        outline
        @click="addSymbol('∨')"
        @mousedown="handleMouseDown"
        label="∨"
      >
        <q-tooltip :delay="500">{{ $t("logic.disjunction") }}</q-tooltip>
      </q-btn>
      <q-btn
        outline
        @click="addSymbol('¬')"
        @mousedown="handleMouseDown"
        label="¬"
      >
        <q-tooltip :delay="500">{{ $t("logic.negation") }}</q-tooltip>
      </q-btn>
      <q-btn
        outline
        @click="addSymbol('(')"
        @mousedown="handleMouseDown"
        label="("
      >
        <q-tooltip :delay="500">{{ $t("logic.leftBracket") }}</q-tooltip>
      </q-btn>
      <q-btn
        outline
        @click="addSymbol(')')"
        @mousedown="handleMouseDown"
        label=")"
      >
        <q-tooltip :delay="500">{{ $t("logic.rightBracket") }}</q-tooltip>
      </q-btn>
      <q-btn
        outline
        @click="removeSymbol()"
        @mousedown="handleMouseDown"
        label="←"
      >
        <q-tooltip :delay="500">{{ $t("labels.remove") }}</q-tooltip>
      </q-btn>
    </div>
    <!--
    <div class="q-my-lg">
     
      <div class="flex">
        <q-chip
          class="ls-formula"
          outline
          square
          color="primary"
          text-color="white"
          v-for="(clausule, index) in assignments"
          :key="index"
        >
          {{ clausule }}
        </q-chip>
      </div>

       more assignments 
      <div class="flex justify-end q-mt-lg">
        <q-btn
          class="flex-end"
          outline
          @click="getAnotherAssignments()"
          :label="$t('labels.getAssignments')"
          v-if="
            resultSAT !== null && resultSAT != 'UNSAT' && resultSAT != 'NOMORE'
          "
        />
      </div>
    </div>-->

    <!-- loader -->
    <q-linear-progress indeterminate v-if="loading" />

    <!-- POSITIVE -->
    <q-banner
      class="bg-positive q-mx-xl q-my-lg text-white"
      rounded
      v-if="resultSAT !== null && resultSAT != 'UNSAT' && resultSAT != 'NOMORE'"
    >
      <template v-slot:avatar>
        <q-icon name="check" color="white" />
      </template>
      {{ $t("messages.sat") }}
    </q-banner>

    <!-- NO MORE ASSIGNMENTS -->
    <q-banner
      class="bg-primary q-mx-xl q-my-lg text-white"
      rounded
      v-if="resultSAT == 'NOMORE'"
    >
      <template v-slot:avatar>
        <q-icon name="block" color="white" />
      </template>
      {{ $t("messages.nomore") }}
    </q-banner>

    <!-- NEGATIVE -->
    <q-banner
      class="bg-negative q-mx-xl q-my-lg text-white"
      rounded
      v-if="resultSAT == 'UNSAT'"
    >
      <template v-slot:avatar>
        <q-icon name="close" color="white" />
      </template>
      {{ $t("messages.unsat") }}
    </q-banner>
  </div>
</template>
<script setup>
import { ref } from "vue";
import nearley from "nearley";
import grammar from "/src/logic/satSolver/cnfGrammar";
import i18n from "src/i18n";
import { Notify } from "quasar";
import { DPLL } from "src/logic/satSolver/DPLL";

const cnf = ref("");
const inputRef = ref();

const loading = ref(false);

const resultSAT = ref(null);
const assignments = ref([]);

/**
 * handles solving process
 */
async function processSolve(isNew) {
  isNew && (assignments.value = []);

  loading.value = true;
  resultSAT.value = null;

  const parser = new nearley.Parser(nearley.Grammar.fromCompiled(grammar));
  // check
  try {
    parser.feed(cnf.value.replaceAll(" ", ""));
    if (parser.results.length === 0) throw new Error("Formula is not valid.");
  } catch (error) {
    //error
    loading.value = false;
    return;
  }
  Notify.create({
    type: "positive",
    message: i18n.global.t("messages.formulaIsOK"),
  });

  // prepare formula
  const formula = [];
  let clausules = cnf.value.replaceAll(" ", "").split("∧");

  clausules.forEach((clausule) => {
    let temp = clausule.replaceAll("(", "");
    temp = temp.replaceAll(")", "");

    formula.push(temp.split("∨"));
  });

  // solve
  const result = await DPLL(formula, {});

  // add assignment
  typeof result === "object" && addAssignments(result);

  loading.value = false;

  if (!isNew && result == "UNSAT") resultSAT.value = "NOMORE";
  else resultSAT.value = result;
}

/**
 * transforms object to string to show it to user
 * pushes string to assignments array
 * @param {Object} clausuleObject
 */
function addAssignments(clausuleObject) {
  let clausule = "";
  for (let [key, value] of Object.entries(clausuleObject)) {
    !value && (clausule += "¬");
    clausule += key + "∨";
  }
  clausule = clausule.slice(0, -1);

  assignments.value.push(clausule);
}

/**
 * appends existing formula with last assignments of variables
 */
function getAnotherAssignments() {
  let lastClausule = "";
  for (let [key, value] of Object.entries(resultSAT.value)) {
    value && (lastClausule += "¬");
    lastClausule += key + "∨";
  }
  lastClausule = lastClausule.slice(0, -1);

  cnf.value += "∧(" + lastClausule + ")";

  processSolve(false);
}

/**
 * check formula
 */
function isFormulaValid(formula) {
  const parser = new nearley.Parser(nearley.Grammar.fromCompiled(grammar));
  // check
  try {
    parser.feed(formula.replaceAll(" ", ""));
    if (parser.results.length === 0) throw new Error("Formula is not valid.");
  } catch (error) {
    //error
    return false;
  }
  return true;
}

function handleMouseDown(event) {
  event.preventDefault();
}

/**
 * add symbol to input on cursor position or to the end
 */
function addSymbol(symbol) {
  const cursorPosition = inputRef.value.nativeEl.selectionStart;

  cnf.value =
    cnf.value.slice(0, cursorPosition) +
    symbol +
    cnf.value.slice(cursorPosition);

  setTimeout(() => {
    document
      .getElementById(inputRef.value.nativeEl.id)
      .setSelectionRange(cursorPosition + 1, cursorPosition + 1);
  }, 1);
}

/**
 * remove symbol from input on cursor position or from the end
 */
function removeSymbol() {
  const cursorPosition = inputRef.value.nativeEl.selectionStart;

  cnf.value =
    cnf.value.slice(0, cursorPosition - 1) + cnf.value.slice(cursorPosition);

  setTimeout(() => {
    document
      .getElementById(inputRef.value.nativeEl.id)
      .setSelectionRange(cursorPosition - 1, cursorPosition - 1);
  }, 1);
}
</script>
