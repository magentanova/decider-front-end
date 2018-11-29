import React from 'react'
import { connect } from 'react-redux'

class FactionMeter extends React.Component {
    render() {
        // constrain value between 0 and 100
        const value = Math.max(Math.min(parseInt(this.props.tokenValue.value), 100), 0)
        const height = value + "px"
        const green = value / 100 * 255
        const red = (100 - value) / 100 * 255
        const backgroundColor = `rgba(${red},${green},0,.5)`
        return (
            <div className="faction-meter">
                <div className="faction-meter-content">
                    <p className="faction-meter-name">
                        {this.props.tokenValue.token.name}
                    </p>
                    <div 
                        className="faction-meter-mercury" 
                        style={{
                            height,
                            backgroundColor
                        }}/>
                </div>
            </div>
        )
    }
}

export default FactionMeter