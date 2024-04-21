<template>
  <div>
    <div class="row gap2 justify-md-start justify-sm-center">
      <div class="col">
        <q-input
          class="ls-formula-i"
          ref="inputRef"
          outlined
          v-model="input"
          :label="props.term ? $t('labels.term') : $t('labels.formula')"
          clearable
          autogrow
          spellcheck="false"
          @clear="input = ''"
          :rules="[
            (val) =>
              val.length > 0 ||
              (props.term
                ? $t('rules.termForInput')
                : $t('messages.inputFormula')),
            (val) =>
              props.validateFormula(val) != false ||
              (props.term
                ? $t('messages.termIsNotOK')
                : $t('messages.formulaIsNotOK')),
          ]"
        >
        </q-input>
      </div>

      <div
        class="row gap items-center justify-xs-end justify-sm-start"
        :class="props.submit && 'col'"
      >
        <q-btn
          outline
          icon="keyboard"
          @click="showKeyboard()"
          :color="keyboard ? 'primary' : ''"
        />

        <q-btn
          v-if="props.submit"
          outline
          :label="$t('labels.start')"
          @click="props.submit(), (keyboard = false)"
          :disable="input.length < 1 || inputRef?.hasError"
        />
      </div>
    </div>

    <Transition>
      <LogicKeyboard
        v-if="keyboard"
        @add:symbol="addToFormula"
        @remove="removeFromFormula"
      />
    </Transition>
  </div>
</template>

<script setup>
import LogicKeyboard from "./LogicKeyboard.vue";
import { defineModel, ref, watch } from "vue";

const input = defineModel();
const inputRef = ref();

const props = defineProps(["validateFormula", "submit", "term"]);

const keyboard = ref(false);

function showKeyboard() {
  keyboard.value = !keyboard.value;
  inputRef.value.focus();
}

// autofill latex
watch(input, (newValue, oldValue) => {
  input.value = newValue.replace(
    regex,
    (match) => latexSymbols[match] || match
  );
});

/**
 * add symbol to input on cursor position or to the end
 */
function addToFormula(symbol) {
  const cursorPosition = inputRef.value.nativeEl.selectionStart;

  input.value =
    input.value.slice(0, cursorPosition) +
    symbol +
    input.value.slice(cursorPosition);

  setTimeout(() => {
    document
      .getElementById(inputRef.value.nativeEl.id)
      .setSelectionRange(cursorPosition + 1, cursorPosition + 1);
  }, 1);
}

/**
 * remove symbol from input on cursor position or from the end
 */
function removeFromFormula() {
  const cursorPosition = inputRef.value.nativeEl.selectionStart;

  input.value =
    input.value.slice(0, cursorPosition - 1) +
    input.value.slice(cursorPosition);

  setTimeout(() => {
    document
      .getElementById(inputRef.value.nativeEl.id)
      .setSelectionRange(cursorPosition - 1, cursorPosition - 1);
  }, 1);
}

// latex codes and symbols
const latexSymbols = {
  "\\land": "∧",
  "\\lor": "∨",
  "\\neg": "¬",
  "\\Rightarrow": "⇒",
  "\\rightarrow": "⇒",
  "\\forall": "∀",
  "\\exists": "∃",
  "\\top": "⊤",
  "\\bot": "⊥",
  "\\vdash": "⊢",
  "\\alpha": "α",
  "\\beta": "β",
  "\\gamma": "γ",
  "\\delta": "δ",
  "\\epsilon": "ε",
  "\\zeta": "ζ",
  "\\eta": "η",
  "\\theta": "θ",
  "\\iota": "ι",
  "\\kappa": "κ",
  "\\lambda": "λ",
  "\\mu": "μ",
  "\\nu": "ν",
  "\\xi": "ξ",
  "\\omicron": "ο",
  "\\pi": "π",
  "\\rho": "ρ",
  "\\sigma": "σ",
  "\\tau": "τ",
  "\\upsilon": "υ",
  "\\phi": "φ",
  "\\chi": "χ",
  "\\psi": "ψ",
  "\\omega": "ω",
};
// regex for latex
const regex = new RegExp("\\" + Object.keys(latexSymbols).join("|\\"), "g");
</script>
