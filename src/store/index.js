import { createStore } from "vuex";
import action from "./actionApi/action";

const store = createStore({
    modules: {
        action,
    },
});

export default store;