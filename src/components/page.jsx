import React from 'react';

import FactionsContainer from './factionsContainer'
import QuestionContainer from './questionContainer'

class Page extends React.Component {
    render() {
        return (
            <div className="page">
                <FactionsContainer />
                <QuestionContainer />
            </div>
        )
    }
}

export default Page