import React from 'react';
import * as ReactForm from 'reactform-appco'


const Form = ReactForm.Form;
const Input = ReactForm.Input;
const TextArea = ReactForm.TextArea;
const Button = ReactForm.Button;

class User extends React.Component {
    constructor(props) {
        super(props);
    }

    response = (res) => {
        console.log('res: ', res);
    }

    

    render() {
        const extraData = {
            postid: sessionStorage.getItem('thinkfree-postid'),
            username: sessionStorage.getItem('thinkfree-username')
          }

        return (
            <Form formTitle="Comment" action="http://localhost:8080/newComment" response={this.response} extraData={extraData}>
            <TextArea name="comment" label="" />
            <div className="buttondiv">
                <Button id="submit" value="Enter Comment" />
            </div>
            </Form>
    )}

}   

export default User;