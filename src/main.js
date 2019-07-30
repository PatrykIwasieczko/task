import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import vuetify from "./plugins/vuetify";

Vue.config.productionTip = false;

import Swal from "sweetalert2";

window.Swal = Swal;

const Toast = Swal.mixin({
    toast: true,
    position: "top",
    showConfirmButton: false,
    timer: 3000
});

window.Toast = Toast;

new Vue({
    router,
    vuetify,
    render: h => h(App)
}).$mount("#app");
