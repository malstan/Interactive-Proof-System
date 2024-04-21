<template>
  <q-layout view="lHh Lpr lFf">
    <q-header>
      <q-toolbar>
        <!-- LEFT HEADER - links -->
        <q-btn round flat padding="0" href="https://tuke.sk">
          <q-avatar>
            <q-img src="~assets/tuke.webp" width="24px" height="24px" />
          </q-avatar>
        </q-btn>
        <q-btn round flat padding="0" href="https://fei.tuke.sk">
          <q-avatar>
            <q-img src="~assets/fei.webp" width="24px" height="24px" />
          </q-avatar>
        </q-btn>
        <q-btn round flat padding="0" href="https://kpi.fei.tuke.sk">
          <q-avatar>
            <q-img src="~assets/kpi.webp" width="24px" height="24px" />
          </q-avatar>
        </q-btn>

        <!-- TITLE -->
        <q-toolbar-title class="cursor-pointer" @click="this.$router.push('/')">
          {{ $t("labels.webapptitle") }}
        </q-toolbar-title>

        <!-- MENU BUTTON -->
        <q-btn
          flat
          dense
          round
          icon="menu"
          aria-label="Menu"
          @click="() => (rightDrawerOpen = !rightDrawerOpen)"
        />
      </q-toolbar>
    </q-header>

    <!-- MENU -->
    <q-drawer v-model="rightDrawerOpen" side="right" overlay bordered>
      <!-- SWITCHES -->
      <div class="flex">
        <select-locale />
        <switch-theme />
      </div>

      <!-- LINKS-->
      <q-list>
        <q-item clickable to="/">
          <q-item-section>{{ $t("labels.home") }}</q-item-section>
        </q-item>
        <q-item clickable to="/propositional-logic">
          <q-item-section>{{ $t("labels.propositional") }}</q-item-section>
        </q-item>
        <q-item clickable to="/intuitionistic-logic">
          <q-item-section>{{ $t("labels.intuitionistic") }}</q-item-section>
        </q-item>
        <q-item clickable to="/first-order-logic">
          <q-item-section>{{ $t("labels.firstorder") }}</q-item-section>
        </q-item>
        <q-item clickable to="/sat-solver">
          <q-item-section>SAT solver</q-item-section>
        </q-item>
        <q-item clickable to="/help">
          <q-item-section>{{ $t("labels.help") }}</q-item-section>
        </q-item>
        <q-item clickable to="/user-testing">
          <q-item-section>Používateľské testovanie</q-item-section>
        </q-item>
      </q-list>
    </q-drawer>

    <!-- VIEW -->
    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script setup>
import { ref } from "vue";
import selectLocale from "src/components/SelectLocale.vue";
import SwitchTheme from "src/components/SwitchTheme.vue";

const rightDrawerOpen = ref(false);
</script>
