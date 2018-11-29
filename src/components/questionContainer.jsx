import React from 'react'
import { connect } from 'react-redux'
import request from 'superagent'
import { DragDropContextProvider } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';

import { apiRoot } from '../constants'
import DragAvatar from "./dragAvatar"
import AnswerZone from "./answerZone" 

class QuestionContainer extends React.Component {
    componentDidMount() {
        this.props.fetchQuestion()
    }

    handleClick = e => {
        this.props.submitAnswer(this.props.question.id, e.target.value, this.props.currentUser)
            .then(this.props.fetchQuestion)
    }

    render() {
        return (
            <div className="page-section question-section">
                <p className="question">{this.props.question.text}</p>
                <div className="buttons-container">
                    <button value="yes" onClick={this.handleClick}>yes</button>
                    <button value="no" onClick={this.handleClick}>no</button>
                </div>
                <DragDropContextProvider backend={HTML5Backend}>
                    <DragAvatar />
                    <div className="answer-zones-wrapper">
                        <AnswerZone 
                            currentUser={this.props.currentUser}
                            question={this.props.question} 
                            side="left"
                            submitAnswer={this.props.submitAnswer}
                            value="yes" />
                        <AnswerZone 
                            currentUser={this.props.currentUser}
                            question={this.props.question} 
                            side="right"
                            submitAnswer={this.props.submitAnswer}
                            value="no" />
                    </div>
                </DragDropContextProvider>
            </div>
        )
    }
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        fetchQuestion: () => {
            dispatch({ type: "QUESTION_LOADING" })
            request
                .get(apiRoot + 'questions/random')
                .then(
                    resp => {
                        dispatch({
                            type: "QUESTION_LOADED",
                            payload: resp.body
                        })
                    },
                    err => {
                        console.log(err)
                    }
                )
        },
        submitAnswer: (questionId, answer, currentUser) => {
            return request
                .post(apiRoot + 'token_values')
                .send({
                    answer, 
                    user_id: currentUser.id,
                    question_id: questionId
                })
            .then(resp => {
                dispatch({
                    type: "TOKEN_VALUES_UPDATED",
                    payload: resp.body
                })
            })
        }
    }
}

const mapStateToProps = ( { currentUser, question } ) => ( { currentUser, question } )

export default connect(mapStateToProps, mapDispatchToProps)(QuestionContainer)