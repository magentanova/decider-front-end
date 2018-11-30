export const apiRoot = process.env.REACT_APP_STAGE === 'dev' ? 'http://localhost:5000/api/' : 'https://d1cb24c6v2hp4p.cloudfront.net/api/'

console.log('api root: ', apiRoot)

export const ItemTypes = {
    DRAG_AVATAR: "dragAvatar"
}