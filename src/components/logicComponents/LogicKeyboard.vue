<template>
  <div
    class="q-my-lg q-py-sm q-px-md rounded-borders keyboard"
    :class="$q.dark.isActive ? 'bg-grey-9' : 'bg-grey-1'"
  >
    <!-- LOGIC SYMBOLS -->
    <div class="keyboard__row">
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
        @click="addSymbol('⇒')"
        @mousedown="handleMouseDown"
        label="⇒"
      >
        <q-tooltip :delay="500">{{ $t("logic.implication") }}</q-tooltip>
      </q-btn>
      <q-btn
        outline
        @click="addSymbol('∀')"
        @mousedown="handleMouseDown"
        label="∀"
      >
        <q-tooltip :delay="500">{{
          $t("logic.universalQuantifier")
        }}</q-tooltip>
      </q-btn>
      <q-btn
        outline
        @click="addSymbol('∃')"
        @mousedown="handleMouseDown"
        label="∃"
      >
        <q-tooltip :delay="500">{{
          $t("logic.existentionalQuantifier")
        }}</q-tooltip>
      </q-btn>
    </div>

    <div class="keyboard__row">
      <q-btn
        outline
        @click="addSymbol('⊢')"
        @mousedown="handleMouseDown"
        label="⊢"
      >
        <q-tooltip :delay="500">{{ $t("logic.turniket") }}</q-tooltip>
      </q-btn>
      <q-btn
        outline
        @click="addSymbol('⊤')"
        @mousedown="handleMouseDown"
        label="⊤"
      >
        <q-tooltip :delay="500">{{ $t("logic.verum") }}</q-tooltip>
      </q-btn>
      <q-btn
        outline
        @click="addSymbol('⊥')"
        @mousedown="handleMouseDown"
        label="⊥"
      >
        <q-tooltip :delay="500">{{ $t("logic.absurdum") }}</q-tooltip>
      </q-btn>

      <q-btn
        outline
        @click="addSymbol(',')"
        @mousedown="handleMouseDown"
        label=","
      >
        <q-tooltip :delay="500">{{ $t("logic.comma") }}</q-tooltip>
      </q-btn>
      <q-btn
        outline
        @click="removeSymbol()"
        @mousedown="handleMouseDown"
        label="←"
        class="keyboard__row--double"
      >
        <q-tooltip :delay="500">{{ $t("labels.remove") }}</q-tooltip>
      </q-btn>
    </div>

    <!-- OTHER SYMBOLS -->
    <div class="keyboard__row">
      <q-btn
        class="keyboard__row--double"
        outline
        @click="addSymbol('(')"
        @mousedown="handleMouseDown"
        label="("
      >
        <q-tooltip :delay="500">{{ $t("logic.leftBracket") }}</q-tooltip>
      </q-btn>
      <q-btn
        class="keyboard__row--double"
        outline
        @click="addSymbol(')')"
        @mousedown="handleMouseDown"
        label=")"
      >
        <q-tooltip :delay="500">{{ $t("logic.rightBracket") }}</q-tooltip>
      </q-btn>
      <q-btn
        class="keyboard__row--double"
        outline
        @click="addSymbol(' ')"
        @mousedown="handleMouseDown"
        label="  "
      >
        <q-tooltip :delay="500">{{ $t("logic.space") }}</q-tooltip>
      </q-btn>
    </div>

    <!-- VARIABLE SYMBOLS - GREEK -->
    <div class="keyboard__row q-pt-md">
      <q-btn
        outline
        @click="addSymbol('γ')"
        @mousedown="handleMouseDown"
        label="γ"
        style="text-transform: none"
      />
      <q-btn
        outline
        @click="addSymbol('δ')"
        @mousedown="handleMouseDown"
        label="δ"
        style="text-transform: none"
      />
      <q-btn
        outline
        @click="addSymbol('θ')"
        @mousedown="handleMouseDown"
        label="θ"
        style="text-transform: none"
      />
      <q-btn
        outline
        @click="addSymbol('φ')"
        @mousedown="handleMouseDown"
        label="φ"
        style="text-transform: none"
      />
      <q-btn
        outline
        @click="addSymbol('ψ')"
        @mousedown="handleMouseDown"
        label="ψ"
        style="text-transform: none"
      />
      <q-btn
        outline
        @click="addSymbol('ω')"
        @mousedown="handleMouseDown"
        label="ω"
        style="text-transform: none"
      />
    </div>

    <!-- VARIABLE SYMBOLS - UPPERCASE -->
    <div v-if="route.name == 'firstorder'" class="keyboard__row">
      <q-btn
        outline
        @click="addSymbol('P')"
        @mousedown="handleMouseDown"
        label="P"
      />
      <q-btn
        outline
        @click="addSymbol('Q')"
        @mousedown="handleMouseDown"
        label="Q"
      />
      <q-btn
        outline
        @click="addSymbol('R')"
        @mousedown="handleMouseDown"
        label="R"
      />
      <q-btn
        outline
        @click="addSymbol('S')"
        @mousedown="handleMouseDown"
        label="S"
      />
      <q-btn
        outline
        @click="addSymbol('T')"
        @mousedown="handleMouseDown"
        label="T"
      />
      <q-btn
        outline
        @click="addSymbol('U')"
        @mousedown="handleMouseDown"
        label="U"
      />
    </div>

    <!-- VARIABLE SYMBOLS - LOWERCASE -->
    <div v-if="route.name == 'firstorder'" class="keyboard__row">
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
        @click="addSymbol('x')"
        @mousedown="handleMouseDown"
        label="x"
        style="text-transform: none"
      />
      <q-btn
        outline
        @click="addSymbol('y')"
        @mousedown="handleMouseDown"
        label="y"
        style="text-transform: none"
      />
      <q-btn
        outline
        @click="addSymbol('z')"
        @mousedown="handleMouseDown"
        label="z"
        style="text-transform: none"
      />
    </div>
  </div>
</template>

<script setup>
import { useRoute } from "vue-router";

const route = useRoute();

const emits = defineEmits(["add:symbol", "remove"]);

function addSymbol(symbol) {
  emits("add:symbol", symbol);
}

function removeSymbol() {
  emits("remove");
}

function handleMouseDown(event) {
  event.preventDefault();
}
</script>

<style lang="sass">
.keyboard
  max-width: 400px
  margin: 1rem auto
  @media only screen and (max-width: 400px)
    max-width: 375px
  &__row
    display: grid
    margin: 0.5rem 0
    gap: 0.5rem
    grid-template-columns: repeat(6, 1fr)
    &--double
      grid-column: span 2
</style>
