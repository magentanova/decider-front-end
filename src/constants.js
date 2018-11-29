export const apiRoot = process.env.REACT_APP_STAGE === 'dev' ? 'http://localhost:5000/api/' : ''

export const ItemTypes = {
    DRAG_AVATAR: "dragAvatar"
}