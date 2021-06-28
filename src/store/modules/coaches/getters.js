export default {
    coaches(state) {
        return state.coaches;
    },
    hasCochaes(state) {
        return state.coaches && state.coaches.length > 0;
    }
};