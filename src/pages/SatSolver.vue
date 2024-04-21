<template>
  <q-page style="min-height: 100%">
    <h6 class="q-my-sm text-center">{{ $t("labels.sat") }}</h6>
    <div class="container">
      <div class="q-mx-auto q-my-lg" style="max-width: 800px">
        <q-tabs
          v-model="sat"
          dense
          class="text-grey"
          active-color="primary"
          indicator-color="primary"
          align="justify"
          narrow-indicator
        >
          <q-tab name="cnf" :label="$t('logic.cnf')" />
          <q-tab name="dimacs-text" :label="$t('logic.dimacs')" />
        </q-tabs>

        <q-separator class="q-mb-lg" />

        <q-tab-panels v-model="sat" animated>
          <q-tab-panel name="cnf">
            <CnfInput />
          </q-tab-panel>

          <q-tab-panel name="dimacs-text">
            <DimacsText />
          </q-tab-panel>
        </q-tab-panels>
      </div>
    </div>
  </q-page>
</template>
<script setup>
import { ref } from "vue";

import CnfInput from "src/components/SatComponents/CnfInput.vue";
import DimacsText from "src/components/SatComponents/DimacsText.vue";

const sat = ref("cnf");
</script>
