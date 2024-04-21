<template>
  <div class="row q-mb-lg justify-md-start justify-sm-center justify-xs-center">
    <div class="col-7 q-pr-xs">
      <q-select
        outlined
        v-model="localMethod"
        :options="methodOptions"
        :label="$t('labels.methods')"
      />
    </div>
    <div class="col-5">
      <q-select
        outlined
        v-model="localNotation"
        :options="notationOptions"
        :label="$t('labels.notations')"
      />
    </div>
  </div>
</template>

<script setup>
import { ref, watch } from "vue";
import { Cookies } from "quasar";
import i18n from "src/i18n";

const methodOptions = ref([
  { label: i18n.global.t("labels.sequentCalculus"), value: "GSK" },
  { label: i18n.global.t("labels.naturalDeduction"), value: "ND" },
]);
const notationOptions = ref([
  { label: i18n.global.t("labels.tree"), value: "tree" },
  { label: i18n.global.t("labels.fitch"), value: "fitch" },
]);

// get props
const { logic } = defineProps(["logic"]);
const emits = defineEmits(["update:method", "update:notation"]);

// handle method
const localMethod = ref(
  methodOptions.value.find(
    (method) => method.value == Cookies.get(logic + "-method")
  ) || methodOptions.value[0]
);

watch(localMethod, (method) => {
  // if GSK then disable fitch else enable fitch
  method.value == "GSK"
    ? (notationOptions.value.find(
        (item) => item.value == "fitch"
      ).disable = true)
    : (notationOptions.value.find(
        (item) => item.value == "fitch"
      ).disable = false);

  // if GSK and fitch then tree
  if (method.value == "GSK" && localNotation.value.value == "fitch") {
    const tree = notationOptions.value.find((item) => item.value == "tree");
    emits("update:notation", tree);
    localNotation.value = tree;
  }

  emits("update:method", method.value);
});

// handle notation
const localNotation = ref(
  notationOptions.value.find(
    (notation) => notation.value == Cookies.get(logic + "-notation")
  ) || notationOptions.value[0]
);
watch(localNotation, (notation) => {
  emits("update:notation", notation.value);
});

if (Cookies.get(logic + "-method") == "GSK")
  notationOptions.value.find((item) => item.value == "fitch").disable = true;
</script>
