<template>
  <q-page style="min-height: 100%">
    <h6 class="q-my-sm text-center">{{ $t("labels.firstorder") }}</h6>

    <div class="container">
      <div class="row justify-center items-stretch gap">
        <div class="col-md-7 col-sm-12">
          <!-- INPUT FORMULA -->
          <FormulaInput
            v-model="store.inputFormula"
            :validateFormula="checkFormula"
            :submit="startProving"
          />

          <!-- BACK -->
          <div class="flex justify-end gap back-button q-my-md">
            <q-btn
              v-if="store.isProving || store.isProven"
              outline
              :label="$t('labels.remove')"
              @click="store.clearTree()"
            />
            <q-btn
              v-if="store.history.length"
              outline
              :label="$t('labels.back')"
              @click="store.retrieveFromHistory()"
            />
          </div>

          <!-- PROVEN -->
          <q-banner
            class="bg-positive q-mx-xl q-my-md text-white"
            rounded
            v-if="store.isProven"
          >
            <template v-slot:avatar>
              <q-icon name="check" color="white" />
            </template>
            {{ $t("messages.isProven") }}
          </q-banner>

          <!-- HypoTESIS -->
          <div
            v-if="
              store.getMethod == 'ND' &&
              store.getHypotesis?.length > 0 &&
              store.getHypotesis != 'undefined'
            "
          >
            <div class="text-h6 q-my-md">{{ $t("labels.hypos") }}</div>
            <div class="flex gap">
              <div v-for="(hypo, index) in store.getHypotesis" :key="hypo.hypo">
                <span
                  >{{ String.fromCharCode("a".charCodeAt(0) + index) }}:</span
                >
                <q-chip
                  :label="hypo.hypo"
                  dense
                  outline
                  square
                  :color="hypo.used ? 'positive' : 'primary'"
                  size="lg"
                >
                </q-chip>
              </div>
            </div>
          </div>

          <!-- PROOF -->
          <TreeNotation
            :proof="store.getProof"
            v-if="store.getNotation == 'tree'"
          />
          <FitchNotation
            :proof="store.getProof"
            :conclusion="store.getConclusion"
            v-if="store.getNotation == 'fitch'"
          />
        </div>
        <div class="col-md-4 col-sm-12">
          <!-- SWITCHES -->
          <SelectMethodAndNotation
            logic="fol"
            @update:method="store.setMethod"
            @update:notation="store.setNotation"
          />
          <!-- RULES -->
          <FOLSequentCalculusTreeRules
            v-if="store.getMethod == 'GSK' && store.getNotation == 'tree'"
          />
          <FOLNaturalDeductionTreeRules
            v-if="store.getMethod == 'ND' && store.getNotation == 'tree'"
          />
          <FOLNaturalDeductionFitchRules
            v-if="store.getMethod == 'ND' && store.getNotation == 'fitch'"
          />
        </div>
      </div>
    </div>
  </q-page>
</template>

<script setup>
import SelectMethodAndNotation from "src/components/logicComponents/SelectMethodAndNotation.vue";
import TreeNotation from "src/components/logicComponents/TreeNotation.vue";
import FormulaInput from "src/components/logicComponents/FormulaInput.vue";
import FitchNotation from "src/components/logicComponents/FitchNotation.vue";

import { FOLStore } from "src/stores/firstOrderLogicStore";
import { validateFormula } from "src/logic/firstOrderLogic/firstOrderFormulaProcessor";

import { Notify, Cookies } from "quasar";
import i18n from "src/i18n";

// show rules
import FOLSequentCalculusTreeRules from "src/components/logicComponents/firstOrderLogic/FOL-sequentCalculus-tree-rules.vue";
import FOLNaturalDeductionTreeRules from "src/components/logicComponents/firstOrderLogic/FOL-naturalDeduction-tree-rules.vue";
import FOLNaturalDeductionFitchRules from "src/components/logicComponents/firstOrderLogic/FOL-naturalDeduction-fitch-rules.vue";

const store = FOLStore();

function checkFormula() {
  return validateFormula(store.getInputFormula, store.getMethod);
}

function startProving() {
  let result = validateFormula(store.getInputFormula, store.getMethod);

  if (result) {
    store.clearTree();

    // hypothesis
    if (store.getMethod == "ND" && result.hypothesis) {
      if (store.getNotation == "tree") {
        if (result.hypothesis[0] != "") {
          store.addHypotesis(result.hypothesis);
          Cookies.set("fol-hypo", store.getHypotesis);
        }

        result = result.formula;
      } else {
        result.hypothesis.forEach((hypo) => {
          store.addRowToProof({
            depth: 1,
            formula: hypo,
            rule: "AS",
          });
        });
      }
    }

    // notation
    if (store.getNotation == "tree") {
      store.setProof(result);
      Cookies.set("fol-proof", store.getProof);

      store.pushLeaf(result);
      Cookies.set("fol-leaves", store.getLeaves);
    } else {
      store.setFitchProoving();
      Cookies.set("fol-fitch", store.getConclusion);
    }

    Cookies.set("fol-formula", store.getInputFormula);

    Notify.create({
      type: "positive",
      message: i18n.global.t("messages.formulaIsOK"),
    });
  }
}
</script>
