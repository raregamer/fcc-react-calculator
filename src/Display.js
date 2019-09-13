import React from 'react';

class Display extends React.Component{
    
    render(){
        return(
            <div className = "display-container">
            <div className="display-split">
            <h3 id = "current-equation">{this.props.currentValue}</h3>
            <h2 id="display">{this.props.currentInput}</h2>
            </div>
            </div>
        )
    }
}

export default Display;