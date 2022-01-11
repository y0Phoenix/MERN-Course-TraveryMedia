import store from "./store";

export default function getState() {
    const state = store.getState();
    return state;
}