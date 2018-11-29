import React from 'react'
import { connect } from 'react-redux'

import { ItemTypes } from './Constants';
import { DropTarget } from 'react-dnd';

function collect(connect, monitor) {
    return {
      connectDropTarget: connect.dropTarget(),
      isOver: monitor.isOver()
    };
  }
  
class AnswerZone extends React.Component {
    render() {
        return this.props.connectDropTarget(
            <div 
                style={{opacity: this.props.isOver ? 1 : .5}} 
                className={"answer-zone " + this.props.side}>
                {this.props.value}
            </div>
        )
    }
}

export default AnswerZone