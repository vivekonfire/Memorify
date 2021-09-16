import {
    GET_MEMORIES,
    ERROR_MEMORIES,
    GET_MEMORY,
    FILTER_MEMORY,
    CLEAR_FILTER,
    SET_CURRENT,
    CLEAR_CURRENT,
    CLEAR_MEMORIES,
} from "../types";

const MemoryReducer = (state, action) => {
    switch (action.type) {
        case GET_MEMORIES:
            return {
                ...state,
                memories: action.payload,
            };
        case ERROR_MEMORIES:
            return {
                ...state,
                error: action.payload,
            };
        case GET_MEMORY:
            return {
                ...state,
                memory: action.payload,
            };
        case FILTER_MEMORY:
            return {
                ...state,
                filter: state.memories.filter((memo) => {
                    const regex = new RegExp(`${action.payload}`, "gi");
                    return memo.title.match(regex);
                }),
            };
        case CLEAR_FILTER:
            return {
                ...state,
                filter: [],
            };
        case SET_CURRENT:
            return {
                ...state,
                current: action.payload,
            };
        case CLEAR_CURRENT:
            return {
                ...state,
                current: {},
            };
        case CLEAR_MEMORIES:
            return {
                ...state,
                current: {},
                memories: [],
                memory: {},
                filter: [],
            };
        default:
            return state;
    }
};

export default MemoryReducer;
