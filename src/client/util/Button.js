import React from 'react';

class Button extends React.Component {

    render() {
        let clss;
        if(this.props.className){
            clss = this.props.className
        }else{
            clss = "submit";
        }
        
        return (
            <input className={clss} 
            type="submit" 
            name="submit"
            id={this.props.id} 
            value={this.props.value}
            onClick={this.props.onClick}
            />   
        )
    };
}

export default Button;