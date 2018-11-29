const initialState = {
    currentUser: {
        id: 1,
        username: "default"
    },
    question: {},
    questionLoading: false,
    tokenValues: [],
    tokenValuesLoading: false
}

// "identity" reducer. we don't have user functionality but we're laying the groundwork
    // for it
export const currentUser = (state=initialState.currentUser, action) => {
    switch (action.type) {
        default: 
            return state
    }
}

export const question = (state=initialState.question, action) => {
    switch (action.type) {
        case "QUESTION_LOADED": 
            return action.payload 
        default: 
            return state
    }
}

export const questionLoading = (state=initialState.questionLoading, action) => {
    switch (action.type) {
        case "QUESTION_LOADING":
            return true 
        case "QUESTION_LOADED":
            return false 
        default: 
            return state
    }
}

export const tokenValues = (state=initialState.tokenValues, action) => {
    switch (action.type) {
        case "TOKEN_VALUES_LOADED": 
            return action.payload 
        case "TOKEN_VALUES_UPDATED": 
            const TVsByIds = {}
            for (var tokenValue of action.payload) {
                TVsByIds[tokenValue.id] = tokenValue
            }
            const newTokenValues = JSON.parse(JSON.stringify(state))
            // for any token values from state that have updates, 
                // replace with the updates
            return newTokenValues.map(TV => TVsByIds[TV.id] ? TVsByIds[TV.id] : TV)
        default: 
            return state
    }
}

export const tokenValuesLoading = (state=initialState.tokenValuesLoading, action) => {
    switch (action.type) {
        case "TOKEN_VALUES_LOADING":
            return true 
        case "TOKEN_VALUES_LOADED":
            return false 
        default: 
            return state
    }
}