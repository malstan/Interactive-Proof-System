<template>
  <q-page class="container">
    <div class="max-w-70 q-mb-xl">
      <p class="text-h3 q-my-lg text-primary">Používateľské testovanie</p>
      <p class="text-body1">
        Táto webová aplikácie je vyvíjaná v rámci diplomovej práce na Technickej
        univerzite v Košisiach.
      </p>
      <p class="text-body1">
        Chcem Vás poprosiť o otestovanie aplikácie a o vyplnenie dotazníka,
        ktorý obsahuje otázky v rámci
      </p>

      <ol class="q-my-xl">
        <li class="q-my-xl">
          <p class="text-body1">Zoznámiť sa s možnosťami aplikácie.</p>
          <q-btn
            to="help"
            target="_blank"
            label="Začať"
            color="primary"
          ></q-btn>
        </li>
        <li class="q-my-xl">
          <p class="text-body1">
            Zadajte sekvent alebo formulu. Vyberte si z navrhovaných alebo
            použite ľubovoľné alternatívy.
          </p>
          <p class="text-body1 text-weight-bold">
            Pre zadávanie nepoužívajte kopírovanie a vkladanie.
          </p>

          <div class="flex q-gutter-lg q-mb-xl">
            <div v-for="(item, index) in examples" :key="index">
              <q-btn
                :label="item.proposition"
                dense
                outline
                :color="item.used ? 'positive' : 'primary'"
                size="lg"
                @click="item.used = !item.used"
                class="btn-proposition q-pa-md"
              >
              </q-btn>
            </div>
          </div>

          <div class="flex gap">
            <q-btn
              to="propositional-logic"
              target="_blank"
              label="Výroková logika"
              color="primary"
            ></q-btn>
            <q-btn
              to="intuitionistic-logic"
              target="_blank"
              label="Intuicionistická logika"
              color="primary"
            ></q-btn>
            <q-btn
              to="first-order-logic"
              target="_blank"
              label="Predikátová logika"
              color="primary"
            ></q-btn>
          </div>
        </li>
        <li class="q-my-xl">
          <p class="text-body1">Vyplnte dotazník.</p>
          <q-btn
            href="https://forms.office.com/Pages/ResponsePage.aspx?id=7yefHOb-9EWaZCVajI4lpWi0EJ6fqKNIox8ZGDyExeFURUJTRUlNNzBaWkNFNDQ0TVU5UE9UV0NGRS4u"
            target="_blank"
            label="Dotazník"
            color="primary"
          ></q-btn>
        </li>
      </ol>

      <p class="text-body1 q-pb-xl">
        <strong>Ďakujem za Váš čas a spätnú väzbu.</strong> Vaše odpovede mi
        pomôžu pri zlepšovaní používateľskej skúsenosti a funkčnosti aplikácie.
      </p>
    </div>
  </q-page>
</template>
<script setup>
import { ref } from "vue";

const examples = ref([
  {
    proposition: "(φ∧ψ)⇒(ψ∧φ)",
    used: false,
  },
  {
    proposition: "(∀x)(φ⇒(P(x)∨φ))",
    used: false,
  },
  {
    proposition: "⊢φ∨(φ∧ψ)⇒φ",
    used: false,
  },
  {
    proposition: "φ∧ψ⊢ψ∧φ",
    used: false,
  },
  {
    proposition: "φ⇒(ω⇒φ)",
    used: false,
  },
  {
    proposition: "(φ⇒(ψ⇒θ))⇒((φ⇒ψ)⇒(φ⇒θ))",
    used: false,
  },
  {
    proposition: "⊢(∀x)P(x)⇒(∀y)P(y)",
    used: false,
  },
]);
</script>

<style lang="sass">
.btn-proposition
  cursor: pointer
  user-select: none
  text-transform: none
.steps
  font-size: 1rem
.max-w-70
  max-width: 70rem
.max-w-30
  max-width: 30rem
</style>
