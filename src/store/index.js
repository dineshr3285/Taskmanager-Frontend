import { createApp } from 'vue'
import App from '../App.vue'
import Vuex from "vuex";

const app = createApp(App)

app.use(Vuex);

import state from "./state";
import * as mutations from "./mutations";
import * as actions from "./actions";

export default new Vuex.Store({
    state,
    mutations,
    actions
})