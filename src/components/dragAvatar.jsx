import React from 'react'
import { DragSource } from 'react-dnd'

import { ItemTypes } from "../constants"

const avatarSource = {
    beginDrag(props) {
      return {};
    }
}

const collect = (connect, monitor) => {
    return {
        connectDragSource: connect.dragSource(),
        isDragging: monitor.isDragging()
    }
}
  
  
class DragAvatar extends React.Component {
    render() {
        return this.props.connectDragSource(
            <img 
                className="drag-avatar"
                src="/crown-solid.svg" 
                style={{opacity: this.props.isDragging ? 0 : 1}} />
        )
    }
}

export default DragSource( ItemTypes.DRAG_AVATAR, avatarSource, collect )( DragAvatar )