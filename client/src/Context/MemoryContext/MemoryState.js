import React, { useReducer } from "react";
import MemoryContext from "./memoryContext";
import MemoryReducer from "./memoryReducer";
import axios from "axios";
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

const MemoryState = (props) => {
    const State = {
        memories: [],
        memory: {},
        error: null,
        filter: [],
        current: {},
    };

    const [state, dispatch] = useReducer(MemoryReducer, State);

    const getMemories = async () => {
        try {
            const res = await axios.get("/api/memo");

            dispatch({ type: GET_MEMORIES, payload: res.data });
        } catch (err) {
            dispatch({ type: ERROR_MEMORIES, payload: err.response.data.msg });
        }
    };

    const getMemory = async (id) => {
        try {
            const res = await axios.get(`/api/memo/${id}`);

            dispatch({ type: GET_MEMORY, payload: res.data });
        } catch (err) {
            dispatch({ type: ERROR_MEMORIES, payload: err.response.data.msg });
        }
    };

    const deleteMemory = async (id) => {
        try {
            await axios.delete(`/api/memo/${id}`);
            getMemories();
        } catch (err) {
            dispatch({ type: ERROR_MEMORIES, payload: err.response.data.msg });
        }
    };

    const updateMemory = async (memory) => {
        const config = {
            headers: {
                "Content-Type": "application/json",
            },
        };

        try {
            await axios.put(`/api/memo/${memory._id}`, memory, config);
            getMemories();
        } catch (err) {
            dispatch({ type: ERROR_MEMORIES, payload: err.response.data.msg });
        }
    };

    const addMemory = async (memory) => {
        const config = {
            headers: {
                "Content-Type": "application/json",
            },
        };

        try {
            await axios.post("/api/memo", memory, config);
            getMemories();
        } catch (err) {
            dispatch({
                type: ERROR_MEMORIES,
            });
        }
    };

    const filterMemory = (text) => {
        dispatch({ type: FILTER_MEMORY, payload: text });
    };

    const clearFilter = () => {
        dispatch({ type: CLEAR_FILTER });
    };

    const clearMemories = () => {
        dispatch({ type: CLEAR_MEMORIES });
    };

    const setCurrent = (memory) => {
        dispatch({ type: SET_CURRENT, payload: memory });
    };

    const clearCurrent = () => {
        dispatch({ type: CLEAR_CURRENT });
    };

    return (
        <MemoryContext.Provider
            value={{
                memories: state.memories,
                memory: state.memory,
                error: state.error,
                filter: state.filter,
                current: state.current,
                getMemories,
                getMemory,
                deleteMemory,
                updateMemory,
                addMemory,
                filterMemory,
                clearFilter,
                clearMemories,
                setCurrent,
                clearCurrent,
            }}
        >
            {props.children}
        </MemoryContext.Provider>
    );
};

export default MemoryState;
