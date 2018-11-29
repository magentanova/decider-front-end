import React from "react"
import { connect } from "react-redux"
import request from "superagent"

import { apiRoot } from "../constants"
import FactionMeter from "./factionMeter"

class FactionsContainer extends React.Component {
    componentDidMount() {
        this.props.fetchTokenValues(this.props.currentUser)
    }

    handleClick = () => {
        console.log('clicking')
        this.props.resetTokenValues(this.props.currentUser)
    }

    render() {
        return (
            <div className="page-section factions-section">  
                <div className="factions-container">
                {this.props.tokenValues.map(tokenValue => 
                    <FactionMeter tokenValue={tokenValue} />)}
                </div>
                <div className="dividing-line" />
                <button 
                    className="button reset-button"
                    onClick={this.handleClick} 
                    value="reset">
                        reset
                </button>
            </div>
        )
    }
}

export default connect(
    ({ currentUser, tokenValues }) => ({ currentUser, tokenValues }),
    dispatch => {
        return {
            fetchTokenValues: currentUser => {
                dispatch({ type: "TOKEN_VALUES_LOADING"})
                request
                    .get(apiRoot + "token_values")
                    .query({
                        user_id: currentUser.id
                    })
                    .then(resp => {
                        dispatch({ 
                            type: "TOKEN_VALUES_LOADED",
                            payload: resp.body
                        })
                    })
            },
            resetTokenValues: (currentUser) => {
                dispatch({ type: "TOKEN_VALUES_LOADING "})
                console.log('sending token values reset request')
                request
                    .post(apiRoot + "token_values/reset")
                    .query({
                        user_id: currentUser.id
                    })
                    .then(resp => {
                        dispatch({
                            type: "TOKEN_VALUES_LOADED",
                            payload: resp.body
                        })
                    })
            }
        }
    })(FactionsContainer)