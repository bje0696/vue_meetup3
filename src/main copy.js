import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";

Vue.config.productionTip = false;
const requireComponent = require.context("./", true, /\.vue$/i);
requireComponent.keys().map(key =>
  Vue.component(
    key
      .split("/")
      .pop()
      .split(".")[0],
    requireComponent(key).default
  )
);

window._ = require("lodash");

window.moment = require("moment");
// 曜日表記をグローバルに設定
window.moment.locale("ja", {
  weekdays: [
    "日曜日",
    "月曜日",
    "火曜日",
    "水曜日",
    "木曜日",
    "金曜日",
    "土曜日"
  ],
  weekdaysShort: ["日", "月", "火", "水", "木", "金", "土"]
});

Vue.prototype.$eb = new Vue();

Vue.filter("date", $v => {
  return moment($v).format("M月D日(ddd)");
});

Vue.directive("changeFont", {
  inserted: el => {
    el.style.padding = "20px";
    el.style.backgroundColor = "yellow";
    el.style.display = "block";
  }
});

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
