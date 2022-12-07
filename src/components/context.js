import React, { createContext, useContext, useReducer, useEffect } from "react";
import reducer from "./reducer";
import {
    SET_LOADING,
    SET_STORIES,
    REMOVE_STORY,
    HANDLE_PAGE,
    HANDLE_SEARCH,
} from './actions'

const AppContext = createContext();
const initialState = {
    isLoading: true,
    query: "React",
    nbPages: 0,
    page: 0,
    hits: []
}
const API_URL = 'http://hn.algolia.com/api/v1/search?';

const AppProvider = ({ children }) => {

    const [state, dispatch] = useReducer(reducer, initialState)
    const fetchNewApi = async (url) => {
        dispatch({ type: SET_LOADING })
        try {
            const response = await fetch(url);
            const data = await response.json();
            dispatch({ type: SET_STORIES, payload: { page: data.page, hits: data.hits, nbPages: data.nbPages } })
        } catch (error) {
            console.log(error)
        }
    }
    const remove_story = (id) => {
        dispatch({ type: REMOVE_STORY, payload: id })
    }

    const handle_search = (query) => {
        dispatch({ type: HANDLE_SEARCH, payload: query })
    }

    const handle_page = (arg) => {
        dispatch({ type: HANDLE_PAGE, payload: arg })
    }
    useEffect(() => {
        fetchNewApi(`${API_URL}query=${state.query}&page=${state.page}`)
    }, [state.query, state.page]);

    return (
        <AppContext.Provider value={{ ...state, remove_story, handle_search, handle_page }}>
            {children}
        </AppContext.Provider>
    )

}

export const GlobleContext = () => {
    return useContext(AppContext)
}

export { AppProvider, AppContext }