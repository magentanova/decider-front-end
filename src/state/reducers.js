const initialState = {
    canvasShowing: false,
    currentAnswer: null,
    currentUser: {
        id: 1,
        username: "default"
    },
    photoCaptureShowing: false,
    photoCaptureCountdown: null,
    imageSaving: false,
    question: {},
    questionLoading: false,
    tokenValues: [],
    tokenValuesLoading: false
}

export const canvasShowing = (state=initialState.canvasShowing, action) => {
    switch (action.type) {
        case "SHOW_CANVAS": 
            return true 
        case "HIDE_CANVAS": 
            return false
        default: 
            return state
    }
}


export const currentAnswer = (state=initialState.currentAnswer, action) => {
    switch (action.type) {
        case "SET_CURRENT_ANSWER": 
            return action.payload 
        default: 
            return state
    }
}

// "identity" reducer. we don't have user functionality but we're laying the groundwork
    // for it
export const currentUser = (state=initialState.currentUser, action) => {
    switch (action.type) {
        default: 
            return state
    }
}

export const photoCaptureShowing = (state=initialState.photoCaptureShowing, action) => {
    switch (action.type) {
        case "SHOW_PHOTO_CAPTURE": 
            return true 
        case "HIDE_PHOTO_CAPTURE": 
            return false
        default: 
            return state
    }
}

export const photoCaptureCountdown = (state=initialState.photoCaptureCountdown, action) => {
    switch (action.type) {
        case "UPDATE_CAPTURE_COUNTDOWN": 
            return action.payload 
        case "HIDE_PHOTO_CAPTURE": 
            return null
        default: 
            return state
    }
}

export const imageSaving = (state=initialState.imageSaving, action) => {
    switch (action.type) {
        case "IMAGE_SAVING": 
            return true 
        case "IMAGE_SAVED": 
            return false
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