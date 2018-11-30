export const apiRoot = process.env.REACT_APP_STAGE === 'dev' ? 'http://localhost:5000/api/' : 'http://18.220.245.85/api'

console.log('api root: ', apiRoot)

export const ItemTypes = {
    DRAG_AVATAR: "dragAvatar"
}