import { csrfFetch } from "./csrf";

//CONSTANTS
const GET_LINKS = "links/getLinks";
const GET_LINK = "links/getLink";
const ADD_LINK = "links/addLink";
const EDIT_LINK = "links/editLink";
const DELETE_LINK = "links/deleteLink";

//ACTION CREATORS
const getLinks = (links) => {
    return {
        type: GET_LINKS,
        payload: links
    }
}

const getLink = (link) => {
    return {
        type: GET_LINK,
        payload: link
    }
}

const addLink = (link) => {
    return {
        type: ADD_LINK,
        payload: link
    }
}

const editLink = (link) => {
    return {
        type: EDIT_LINK,
        payload: link
    }
}

const deleteLink = (link) => {
    return {
        type: DELETE_LINK,
        payload: link
    }
}

//THUNKS
export const getAllLinksThunk = () => async (dispatch) => {
    const response = await csrfFetch("/api/links");
    const data = await response.json();
    dispatch(getLinks(data.links));
}

export const getLinkThunk = (id) => async (dispatch) => {
    const response = await csrfFetch(`/api/links/${id}`);
    const data = await response.json();
    dispatch(getLink(data.link));
}

export const addLinkThunk = (link) => async (dispatch) => {
    const response = await csrfFetch("/api/links", {
        method: "POST",
        body: JSON.stringify(link)
    });
    const data = await response.json();
    dispatch(addLink(data.link));
    return response;
}

export const editLinkThunk = (link) => async (dispatch) => {
    const response = await csrfFetch(`/api/links/${link.id}`, {
        method: "PUT",
        body: JSON.stringify(link)
    });
    const data = await response.json();
    dispatch(editLink(data.link));
    return response;
}

export const deleteLinkThunk = (id) => async (dispatch) => {
    const response = await csrfFetch(`/api/links/${id}`, {
        method: "DELETE"
    });
    const data = await response.json();
    dispatch(deleteLink(data.link));
    return response;
}

//REDUCER
const initialState = { allLinks: {}, currentLink: null };

const linksReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_LINKS: {
            return { ...state, allLinks: action.payload };
        }
        case GET_LINK: {
            return { ...state, currentLink: action.payload };
        }
        case ADD_LINK: {
            return { ...state, allLinks: { ...state.allLinks, [action.payload.id]: action.payload } };
        }
        case EDIT_LINK: {
            return { ...state, allLinks: { ...state.allLinks, [action.payload.id]: action.payload } };
        }
        case DELETE_LINK: {
            const newState = { ...state };
            delete newState.allLinks[action.payload.id];
            return newState;
        }
        default: {
            return state;
        }
    }
}

export default linksReducer;