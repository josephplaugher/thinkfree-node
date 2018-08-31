import React from 'react';
  
class Input extends React.Component {

  render() {
    
      return (
        <div className="input-container">
        <p className="label">{this.props.label} </p>
        <p className='input-error'>{this.props.error} </p>
        <input className="textinput" 
          type= "text"
          id= {this.props.name} 
          name= {this.props.name} 
          value= {this.props.value}
          onChange={this.props.onChange}
          autoComplete="off"
        />
        </div>
      );
    }
  }  

export default Input;