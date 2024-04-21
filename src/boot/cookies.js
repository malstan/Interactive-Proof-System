import { boot } from "quasar/wrappers";
import { Cookies } from "quasar";

import { PLStore } from "src/stores/propositionalLogicStore";
import { ILStore } from "src/stores/intuitionisticLogicStore";
import { FOLStore } from "src/stores/firstOrderLogicStore";

export default boot(({ app }) => {
  // language
  Cookies.has("language") || Cookies.set("language", "sk");

  // theme
  Cookies.has("theme") || Cookies.set("theme", "dark");

  // logic stores
  PLStore().setFromCookies();
  ILStore().setFromCookies();
  FOLStore().setFromCookies();
});
