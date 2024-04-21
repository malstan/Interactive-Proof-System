<template>
  <div class="cursor-pointer">
    <q-btn flat round icon="translate">
      <q-menu>
        <q-list style="min-width: 100px">
          <q-item
            v-for="(item, key) of localeOptions()"
            :key="key"
            clickable
            v-close-popup
          >
            <q-item-section>
              <q-radio
                size="xs"
                v-model="$i18n.locale"
                :val="item.value"
                :label="item.label"
                color="primary"
                @update:model-value="
                  (value, evt) => {
                    Cookies.set('language', value);
                  }
                "
              />
            </q-item-section>
          </q-item>
        </q-list>
      </q-menu>
    </q-btn>
  </div>
</template>

<script setup>
import { localeOptions } from "src/i18n";
import { Cookies } from "quasar";
</script>
