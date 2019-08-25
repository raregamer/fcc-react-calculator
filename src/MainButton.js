import React from 'react';

class MainButton extends React.Component{


    render(){
        return(
            <button id = {this.props.idName} className ="main-button" value= {this.props.value} onClick = {this.props.action}>
                {this.props.innerName}
            </button>

        );
    }

}

export default MainButton;