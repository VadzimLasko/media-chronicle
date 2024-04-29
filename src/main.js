import { createApp } from "vue";
// import { createMetaManager } from "vue-meta";
import App from "./App.vue";
import router from "./router";
import store from "./store";

const app = createApp(App);

// const metaManager = createMetaManager();

app.use(router);
app.use(store);
// app.use(metaManager);
app.mount("#app");
