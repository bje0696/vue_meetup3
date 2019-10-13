/**
 * First we will load all of this project's JavaScript dependencies which
 * includes Vue and other libraries. It is a great starting point when
 * building robust, powerful web applications using Vue and Laravel.
 */

require("./bootstrap");

window.Vue = require("vue");
window.vuex = require("vuex");
window._ = require("lodash");
window.luxon = require("luxon");
luxon.Settings.defaultLocale = "ja";
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

/**
 * The following block of code may be used to automatically register your
 * Vue components. It will recursively scan this directory for the Vue
 * components and automatically register them with their "basename".
 *
 * Eg. ./components/ExampleComponent.vue -> <example-component></example-component>
 */

const files = require.context("./", true, /\.vue$/i);
files.keys().map(key =>
  Vue.component(
    key
      .split("/")
      .pop()
      .split(".")[0],
    files(key).default
  )
);

/**
 * Next, we will create a fresh Vue application instance and attach it to
 * the page. Then, you may begin adding components to this application
 * or customize the JavaScript scaffolding to fit your unique needs.
 */
import store from "./vuex/";
Vue.prototype.$eb = new Vue();

// 日付のフィルター
Vue.filter("date", $v => {
  return moment($v).format("M月D日(ddd)");
});

Vue.filter("time", $v => {
  let time = [];

  if ($v) {
    time = $v.split(":");
  }

  return time[0] + ":" + time[1];
});

// スクロールの箱の幅をセット
Vue.directive("scrollwidth", {
  inserted: el => {
    let width = 0;
    const count = el.childNodes.length - 1;
    _.forEach(el.childNodes, o => {
      width += o.clientWidth;
    });

    el.childNodes.length === 0
      ? (el.style.width = "100%")
      : (el.style.width = `calc(${width}px + (5vw * ${count} + 30vw))`);
  },

  componentUpdated: el => {
    let width = 0;
    const count = el.childNodes.length - 1;
    _.forEach(el.childNodes, o => {
      width += o.clientWidth;
    });

    el.childNodes.length === 0
      ? (el.style.width = "100%")
      : (el.style.width = `calc(${width}px + (5vw * ${count} + 30vw))`);
  }
});

// ワーカー募集情報写真のmatchHeight
Vue.directive("matchheight", {
  bind: el => {
    el.childNodes[0].style.height = el.childNodes[2].scrollHeight + "px";
  },

  inserted: el => {
    el.childNodes[0].style.height = el.childNodes[2].scrollHeight + "px";
  }
});

const app = new Vue({
  el: "#app",
  store,

  created() {
    // グロナビ用モーダル
    this.$eb.$on("open-modal", $modalName => {
      this.$store.commit("page/SET_MODAL_NAME", $modalName);
    });

    this.$eb.$on("close-modal", () => {
      this.$store.commit("page/RESET_MODAL");
    });
  },

  mounted() {
    window.addEventListener("scroll", this.handleScroll);

    setTimeout(() => {
      // グロナビが先に表示されてしまうのを防ぐ
      this.$el.style.display = "initial";
    });
  },

  methods: {
    handleScroll(e) {
      // 最後までスクロール
      const pageHeight = document.documentElement.scrollHeight;
      const windowHeight = window.innerHeight;
      const bottomPosition = pageHeight - windowHeight;
      bottomPosition <= window.scrollY && pageHeight !== window.innerHeight
        ? this.$store.commit("page/TOGGLE_IS_SCROLLED_TO_END_FLAG", true)
        : this.$store.commit("page/TOGGLE_IS_SCROLLED_TO_END_FLAG", false);
    }
  }
});
