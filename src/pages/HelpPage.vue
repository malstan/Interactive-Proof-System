<template>
  <q-page class="container">
    <div class="max-w-70">
      <p class="text-h3 q-my-lg text-primary">{{ $t("help.title1") }}</p>
      <p class="text-body1">{{ $t("help.desc1") }}</p>

      <p class="text-h6 text-primary">{{ $t("help.title2") }}</p>
      <ul>
        <li class="text-body1">{{ $t("labels.propositional") }}</li>
        <li class="text-body1">{{ $t("labels.intuitionistic") }}</li>
        <li class="text-body1">{{ $t("labels.firstorder") }}</li>
      </ul>

      <p class="text-h6 text-primary">{{ $t("help.title3") }}</p>
      <ul>
        <li class="text-body1">{{ $t("labels.sequentCalculus") }}</li>
        <li class="text-body1">{{ $t("labels.naturalDeduction") }}</li>
      </ul>

      <p class="text-body1">
        {{ $t("help.desc2") }}
      </p>

      <p class="text-h6 text-primary">{{ $t("help.title4") }}</p>
      <ul>
        <li class="text-body1">{{ $t("labels.tree") }}</li>
        <li class="text-body1">{{ $t("labels.fitch") }}</li>
      </ul>

      <p class="text-body1">
        {{ $t("help.desc3") }}
      </p>

      <p class="text-h6 text-primary">{{ $t("help.title8") }}</p>

      <p class="text-body1">
        {{ $t("help.desc11") }}
      </p>
      <ul>
        <li class="text-body1">{{ $t("help.cookies.lang") }}</li>
        <li class="text-body1">{{ $t("help.cookies.theme") }}</li>
        <li class="text-body1">{{ $t("help.cookies.formula") }}</li>
        <li class="text-body1">{{ $t("help.cookies.method") }}</li>
        <li class="text-body1">{{ $t("help.cookies.notation") }}</li>
        <li class="text-body1">{{ $t("help.cookies.proof") }}</li>
        <li class="text-body1">{{ $t("help.cookies.history") }}</li>
        <li class="text-body1">{{ $t("help.cookies.hypo") }}</li>
      </ul>

      <p class="text-body1">
        <strong> {{ $t("help.desc12") }}</strong>
      </p>
    </div>

    <p class="text-h4 q-mt-xl text-primary">{{ $t("help.title5") }}</p>

    <p class="text-h5 q-mt-lg text-primary">
      {{ $t("help.title6") }}
    </p>
    <div class="q-pl-md max-w-70">
      <p class="text-body1">
        {{ $t("help.desc4") }}
      </p>

      <p class="text-body1">
        {{ $t("help.desc5") }}
      </p>

      <FormulaInput
        v-model="formula"
        :validateFormula="checkFormula"
        class="max-w-30 q-mt-xl"
      />
    </div>

    <p class="text-h5 q-mt-lg text-primary">
      {{ $t("help.title7") }}
    </p>
    <div class="q-pl-md max-w-70">
      <p class="text-body1">
        {{ $t("help.desc6") }}
      </p>
      <p class="text-body1">
        {{ $t("help.desc7") }}
      </p>

      <p class="text-body1">
        {{ $t("help.desc8") }}
      </p>
    </div>

    <p class="text-h5 q-mt-lg text-primary" id="export">
      {{ $t("help.title9") }}
    </p>
    <div class="q-pl-md max-w-70">
      <p class="text-body1">
        {{ $t("help.desc13") }}
        <q-btn icon="download" color="primary" outline size="md" padding="xs">
          <q-tooltip :delay="500">{{
            $t("labels.downloadPNG")
          }}</q-tooltip> </q-btn
        >.
      </p>
    </div>

    <div class="q-pl-md max-w-70">
      <p class="text-body1">
        {{ $t("help.desc14") }}
        <q-btn icon="code" color="primary" outline size="md" padding="xs">
          <q-tooltip :delay="500">{{
            $t("labels.copyLatex")
          }}</q-tooltip> </q-btn
        >.
      </p>
      <p class="text-body1">
        {{ $t("help.desc15") }}
        <a href="https://ctan.org/pkg/ebproof" target="_blank">ebproof</a>.
        {{ $t("help.desc16") }}
        <a href="https://ctan.org/pkg/fitch" target="_blank">fitch</a>.
      </p>
    </div>

    <p class="text-h4 q-mt-xl text-primary">SAT solver</p>
    <div class="q-pl-md max-w-70 q-mb-xl">
      <p class="text-body1">
        {{ $t("help.desc9") }}
      </p>

      <p class="text-body1">
        {{ $t("help.desc10") }}
      </p>
    </div>
  </q-page>
</template>
<script setup>
import { ref } from "vue";

import FormulaInput from "src/components/logicComponents/FormulaInput.vue";
import { validateFormula } from "src/logic/propositionalLogic/propositionalFormulaProcessor";

const formula = ref("");
function checkFormula() {
  return validateFormula(formula.value, "GSK");
}
</script>

<style lang="sass">
.max-w-70
  max-width: 70rem
.max-w-30
  max-width: 30rem
</style>
