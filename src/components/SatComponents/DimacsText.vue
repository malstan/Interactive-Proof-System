<template>
  <div class="sat">
    <!-- INPUT -->
    <div class="sat__input">
      <q-input
        ref="inputRef"
        v-model="dimacs"
        outlined
        clearable
        autogrow
        spellcheck="false"
        :label="$t('logic.dimacs')"
        :error="error"
        :error-message="errorMessage"
        :rules="[(val) => val.length > 0 || $t('messages.inputDimacs')]"
        @clear="
          (error = false),
            (errorMessage = ''),
            (dimacs = 'p cnf '),
            (resultSAT = null)
        "
      >
        <template v-slot:after>
          <q-icon name="help">
            <q-tooltip
              anchor="bottom middle"
              self="top middle"
              style="font-size: 1rem"
            >
              p cnf 4 { {{ $t("logic.dimacsVariables") }} } 3 {
              {{ $t("logic.dimacsClauses") }} } <br />
              1 3 -4 0 <br />4 0 <br />2 -3 0
            </q-tooltip>
          </q-icon>
        </template>
      </q-input>
      <q-btn
        outline
        @click="processSolve()"
        :label="$t('labels.start')"
        :disabled="dimacs.length < 10"
        style="margin-bottom: 20px"
      />
    </div>

    <!-- KEYBOARD -->
    <div class="q-my-md sat__keyboard--dimacs">
      <!-- letters -->
      <q-btn
        outline
        @click="addSymbol('1')"
        @mousedown="handleMouseDown"
        label="1"
      />
      <q-btn
        outline
        @click="addSymbol('2')"
        @mousedown="handleMouseDown"
        label="2"
      />
      <q-btn
        outline
        @click="addSymbol('3')"
        @mousedown="handleMouseDown"
        label="3"
      />
      <q-btn
        outline
        @click="addSymbol('4')"
        @mousedown="handleMouseDown"
        label="4"
      />
      <q-btn
        outline
        @click="addSymbol('5')"
        @mousedown="handleMouseDown"
        label="5"
      />
      <q-btn
        outline
        @click="addSymbol('6')"
        @mousedown="handleMouseDown"
        label="6"
      />
      <q-btn
        outline
        @click="addSymbol('7')"
        @mousedown="handleMouseDown"
        label="7"
      />
      <q-btn
        outline
        @click="addSymbol('8')"
        @mousedown="handleMouseDown"
        label="8"
      />
      <q-btn
        outline
        @click="addSymbol('9')"
        @mousedown="handleMouseDown"
        label="9"
      />

      <!-- other symbols -->
      <q-btn
        outline
        @click="addSymbol('-')"
        @mousedown="handleMouseDown"
        label="-"
      />
      <q-btn
        outline
        @click="addSymbol('0')"
        @mousedown="handleMouseDown"
        label="0"
      />
      <q-btn
        outline
        @click="removeSymbol()"
        @mousedown="handleMouseDown"
        label="←"
      >
        <q-tooltip :delay="500">{{ $t("labels.remove") }}</q-tooltip>
      </q-btn>
      <q-btn
        class="sat__keyboard__double"
        outline
        @click="addSymbol(' ')"
        @mousedown="handleMouseDown"
        label=""
      />

      <q-btn
        outline
        @click="addSymbol('\n')"
        @mousedown="handleMouseDown"
        label="↩"
      >
        <q-tooltip :delay="500">Enter</q-tooltip>
      </q-btn>
    </div>
    <!-- loader -->
    <q-linear-progress indeterminate v-if="loading" />

    <!-- POSITIVE -->
    <q-banner
      class="bg-positive q-mx-xl q-my-lg text-white"
      rounded
      v-if="resultSAT !== null && resultSAT != 'UNSAT'"
    >
      <template v-slot:avatar>
        <q-icon name="check" color="white" />
      </template>
      {{ $t("messages.sat") }}
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
import i18n from "src/i18n";
import { DPLL, dimacsToCnf } from "src/logic/satSolver/DPLL";

const dimacs = ref("p cnf ");
const inputRef = ref();
const loading = ref(false);
const resultSAT = ref(null);

// handle input error
const error = ref(false);
const errorMessage = ref("");

async function processSolve() {
  loading.value = true;

  error.value = false;
  errorMessage.value = "";
  resultSAT.value = null;

  // check and convert to cnf
  const checked = dimacsToCnf(dimacs.value);

  if (!checked.status) {
    error.value = true;
    errorMessage.value = i18n.global.t("messages.inputDimacs");
    loading.value = false;
    return;
  }

  // solve
  const result = await DPLL(checked.formula, {});

  loading.value = false;

  resultSAT.value = result;
}

function handleMouseDown(event) {
  event.preventDefault();
}

/**
 * add symbol to input on cursor position or to the end
 */
function addSymbol(symbol) {
  const cursorPosition = inputRef.value.nativeEl.selectionStart;

  dimacs.value =
    dimacs.value.slice(0, cursorPosition) +
    symbol +
    dimacs.value.slice(cursorPosition);

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

  dimacs.value =
    dimacs.value.slice(0, cursorPosition - 1) +
    dimacs.value.slice(cursorPosition);

  setTimeout(() => {
    document
      .getElementById(inputRef.value.nativeEl.id)
      .setSelectionRange(cursorPosition - 1, cursorPosition - 1);
  }, 1);
}
</script>
