import React from 'react';

class Display extends React.Component{
    render(){
        return(
            <div className = "display-container">
            <h1 id = "display" >{this.props.currentValue} </h1>
            <h2> {this.props.userTokenStack}</h2>
            </div>
        )
    }
}

export default Display;