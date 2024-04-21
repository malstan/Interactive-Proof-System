<template>
  <q-btn
    round
    flat
    :icon="Dark.isActive ? 'dark_mode' : 'light_mode'"
    @click="
      {
        Dark.toggle();
        Cookies.set('theme', Dark.isActive ? 'dark' : 'light');
      }
    "
  />
</template>

<script setup>
import { Dark } from "quasar";
import { Cookies } from "quasar";

Dark.set(Cookies.get("theme") == "dark");
</script>
