import enUS from "./en-US";
import sk from "./sk";
import { createI18n } from "vue-i18n";
import { Cookies } from "quasar";

// variable for locale switch
export const localeOptions = () => [
  { label: "SK", value: "sk" },
  { label: "EN", value: "en-US" },
];

const messages = {
  sk: sk,
  "en-US": enUS,
};

const i18n = createI18n({
  locale: Cookies.get("language"),
  globalInjection: true,
  messages,
});

export default i18n;
