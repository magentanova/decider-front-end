import React from "react"
import { connect } from "react-redux"
import request from "superagent"
import { DragDropContextProvider } from "react-dnd";
import HTML5Backend from "react-dnd-html5-backend";

import { apiRoot } from "../constants"
import DragAvatar from "./dragAvatar"
import AnswerZone from "./answerZone" 
import PictureTaker from "./pictureTaker"

class QuestionContainer extends React.Component {
    componentDidMount() {
        this.props.fetchQuestion()
    }

    render() {
        return (
            <div className="page-section question-section">
                <p className="question">{this.props.question.text}</p>
                <DragDropContextProvider backend={HTML5Backend}>
                    <DragAvatar />
                    <div className="answer-zones-wrapper">
                        <AnswerZone 
                            {...this.props}
                            side="left"
                            value="yes" />
                        <AnswerZone 
                            {...this.props}
                            side="right"
                            value="no" />
                    </div>
                </DragDropContextProvider>
                <PictureTaker {...this.props} />
            </div>
        )
    }
}

const mapStateToProps = ( { canvasShowing, currentAnswer, currentUser, imageSaving, question } ) => 
    ( { canvasShowing, currentAnswer, currentUser, imageSaving, question } )

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        fetchQuestion: () => {
            dispatch({ type: "QUESTION_LOADING" })
            request
                .get(apiRoot + "questions/random?nocache=" + parseInt(Math.random() * 100000))
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
        hideCanvas: () => {
            dispatch({
                type: "HIDE_CANVAS",
            })
        },
        hidePhotoCapture: () => {
            dispatch({
                type: "HIDE_PHOTO_CAPTURE"
            })
        },
        saveImage: canvasData => {
            console.log('SAVING IMAGE')
            dispatch({
                type: "IMAGE_SAVING"
            })
            return request 
                .post(apiRoot + "portraits")
                .send({
                    data: canvasData
                })
                .then(
                    resp => {
                        dispatch({
                            type: "IMAGE_SAVED"
                        })
                    },
                    err => {
                        console.log('dispatching photo saved')
                        dispatch({
                            type: "IMAGE_SAVED"
                        })
                    }
                )
        },
        setAnswer: answerVal => {
            dispatch({
                type: "SET_CURRENT_ANSWER",
                payload: answerVal,
            })
        },
        showCanvas: () => {
            dispatch({
                type: "SHOW_CANVAS",
            })
        },
        submitAnswer: (questionId, answer, currentUser) => {
            return request
                .post(apiRoot + "token_values")
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
        },
        takePhoto: () => {
            // this feature is where it becomes sensible to use thunk
                // with more time, i would refactor to incorporate async dispatches
                // current approach is not ideal
            dispatch({
                type: "SHOW_PHOTO_CAPTURE"
            })
            let countdown = 3
            const incrementPhotoCountdown = () => {
                dispatch({
                    type: "UPDATE_CAPTURE_COUNTDOWN",
                    payload: countdown
                })
                --countdown
                if (countdown >= 0) {
                    setTimeout(incrementPhotoCountdown, 500)
                }
            }
            incrementPhotoCountdown()

            // IN PICTURE TAKER 
                // if countdown is 0,
                    // take photo
                    // resize, shade and send to back end
                    // dispatch new photo url

            // IN ANSWER ZONE
                // if you got a new photo URL
                    // submit answer
        },
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(QuestionContainer)