<template>
  <q-page class="container">
    <p
      class="q-my-xl q-mx-auto text-center text-body1"
      style="max-width: 650px"
    >
      {{ $t("home.introText") }}
    </p>

    <div class="row gap2 justify-center">
      <q-card
        class="my-card col-xs-12 col-sm-12 col-md-3"
        :class="$q.dark.isActive ? 'bg-grey-9' : 'bg-grey-1'"
      >
        <q-card-section>
          <div class="text-h6">{{ $t("labels.propositional") }}</div>
        </q-card-section>

        <q-card-section>
          <div class="text-body1 text-primary">{{ $t("labels.methods") }}</div>
          <div class="text-body1 q-pl-sm">
            {{ $t("labels.naturalDeduction") }}
          </div>
          <div class="text-body1 q-pl-sm">
            {{ $t("labels.sequentCalculus") }}
          </div>
        </q-card-section>

        <q-card-section>
          <div class="text-body1 text-primary">
            {{ $t("labels.notations") }}
          </div>
          <div class="text-body1 q-pl-sm">{{ $t("labels.tree") }}</div>
          <div class="text-body1 q-pl-sm">{{ $t("labels.fitch") }}</div>
        </q-card-section>

        <q-card-actions align="right">
          <q-btn outline to="/propositional-logic">{{
            $t("labels.start")
          }}</q-btn>
        </q-card-actions>
      </q-card>

      <q-card
        class="my-card col-xs-12 col-sm-12 col-md-3"
        :class="$q.dark.isActive ? 'bg-grey-9' : 'bg-grey-1'"
      >
        <q-card-section>
          <div class="text-h6">{{ $t("labels.intuitionistic") }}</div>
        </q-card-section>

        <q-card-section>
          <div class="text-body1 text-primary">{{ $t("labels.methods") }}</div>
          <div class="text-body1 q-pl-sm">
            {{ $t("labels.naturalDeduction") }}
          </div>
          <div class="text-body1 q-pl-sm">
            {{ $t("labels.sequentCalculus") }}
          </div>
        </q-card-section>

        <q-card-section>
          <div class="text-body1 text-primary">
            {{ $t("labels.notations") }}
          </div>
          <div class="text-body1 q-pl-sm">{{ $t("labels.tree") }}</div>
          <div class="text-body1 q-pl-sm">{{ $t("labels.fitch") }}</div>
        </q-card-section>

        <q-card-actions align="right">
          <q-btn outline to="/intuitionistic-logic">{{
            $t("labels.start")
          }}</q-btn>
        </q-card-actions>
      </q-card>

      <q-card
        class="my-card col-xs-12 col-sm-12 col-md-3"
        :class="$q.dark.isActive ? 'bg-grey-9' : 'bg-grey-1'"
      >
        <q-card-section>
          <div class="text-h6">{{ $t("labels.firstorder") }}</div>
        </q-card-section>

        <q-card-section>
          <div class="text-body1 text-primary">{{ $t("labels.methods") }}</div>
          <div class="text-body1 q-pl-sm">
            {{ $t("labels.naturalDeduction") }}
          </div>
          <div class="text-body1 q-pl-sm">
            {{ $t("labels.sequentCalculus") }}
          </div>
        </q-card-section>

        <q-card-section>
          <div class="text-body1 text-primary">
            {{ $t("labels.notations") }}
          </div>
          <div class="text-body1 q-pl-sm">{{ $t("labels.tree") }}</div>
          <div class="text-body1 q-pl-sm">{{ $t("labels.fitch") }}</div>
        </q-card-section>

        <q-card-actions align="right">
          <q-btn outline to="/first-order-logic">{{
            $t("labels.start")
          }}</q-btn>
        </q-card-actions>
      </q-card>
    </div>

    <div class="row gap2 justify-center q-mt-lg">
      <q-card
        class="my-card col-xs-12 col-sm-12 col-md-3"
        :class="$q.dark.isActive ? 'bg-grey-9' : 'bg-grey-1'"
      >
        <q-card-section>
          <div class="text-h6">{{ $t("labels.sat") }}</div>
        </q-card-section>

        <q-card-section>
          <div class="text-body1 q-pl-sm">
            {{ $t("logic.cnf") }}
          </div>
          <div class="text-body1 q-pl-sm">
            {{ $t("logic.dimacs") }}
          </div>
        </q-card-section>

        <q-card-actions align="right">
          <q-btn outline to="/sat-solver">{{ $t("labels.start") }}</q-btn>
        </q-card-actions>
      </q-card>
    </div>

    <div class="row gap2 justify-center q-mt-lg">
      <q-btn color="primary" :label="$t('help.howto')" to="/help" />
    </div>
  </q-page>
</template>

<script setup></script>
