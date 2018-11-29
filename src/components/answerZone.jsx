import React from 'react'

import { ItemTypes } from '../constants';
import { DropTarget } from 'react-dnd';
import { dispatch } from 'rxjs/internal/observable/range';

const answerZoneTarget = {
    drop(props) {
      props.setAnswer(props.value)
      props.takePhoto()
        // .then(() => {
        //     return props.submitAnswer(props.question.id, props.value, props.currentUser)
        // })
        // .then(props.fetchQuestion)
    }
  };
  
const collect = (connect, monitor) => {
    return {
      connectDropTarget: connect.dropTarget(),
      isOver: monitor.isOver()
    };
  }
  
class AnswerZone extends React.Component {
    componentDidUpdate(prevProps) {
        console.log(prevProps.imageSaving, this.props.imageSaving, this.props.currentAnswer, this.props.value)
        if (prevProps.imageSaving && !this.props.imageSaving && this.props.currentAnswer == this.props.value) {
            console.log("SUBMITTING ANSWER")
            this.props.submitAnswer(this.props.question.id, this.props.value, this.props.currentUser)
                .then(this.props.fetchQuestion)
        }
    }

    render() {
        const opacity = this.props.isOver ? .5 : 0
        const backgroundPartial = this.props.value === "yes" ? 'rgba(0,255,0' : 'rgba(255,0,0'
        const backgroundColor = `${backgroundPartial},${opacity})`
        return this.props.connectDropTarget(
            <div 
                style={{ backgroundColor }} 
                className={"answer-zone " + this.props.side}>
                <p>{this.props.value === "yes" ? "Be it so decreed." : "The crown declines."}</p>
            </div>
        )
    }
}

export default DropTarget(ItemTypes.DRAG_AVATAR, answerZoneTarget, collect)(AnswerZone)