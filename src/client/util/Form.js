import React from 'react';

class Form extends React.Component {
    render() {
        
        return (
            <div className="form-container">
                <p className="formTitle">{this.props.formTitle}</p><br/>
                <form onSubmit={this.props.onSubmit}>
                {this.props.children} {/*there must be nested input components passed in*/}
                </form>
            </div>
        )
    };
}

export default Form;