import React from 'react'
import Ajax from './util/Ajax'
import Form from './util/Form'
import Input from './util/Input'
import Button from './util/Button'
import './css/form.css'
import './css/lightbox.css'

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.onSubmit = this.onSubmit.bind(this);
    this.onChange = this.onChange.bind(this);
    this.submitData = this.submitData.bind(this);
  }
  state = {'email':'','username': '', 'userNotify': {}};

  onChange = (event) => {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;
    let clEr = Object.assign({}, this.state.userNotify);
    clEr[name] = '';
    this.setState({
      userNotify: clEr
    });
    //place updated data into state
    this.rebuildFormData(name, value);
  }

  rebuildFormData = (name, value) => {
    //place updated data into state
    let newVals = Object.assign({}, this.state.formData);
    newVals[name] = value;
    this.setState({
      [name]: value,
      formData: newVals
    });
  }

  onSubmit = (event) => {
    event.preventDefault();
    let val = new validate(this.state.formData);
    let prom = val.getPromise();
    prom.then((error) => {
      console.log('the error: ', error);
      if (error.hasError) {
        this.setState({
          userNotify: error,
          validForm: false
        })
      }
      if (!error.hasError) {
        this.setState({
          validForm: true
        })
        console.log('about to submit...');
        this.submitData();
      }
    })
  }

  submitData = () => {
    console.log('submitting now...');
    Ajax.post("http://localhost:8080/login", this.state.formData)
      .then((res) => {
        if (res.data.success) {
          this.setState({
            success: res.data.success,
            userNotify: res.data.userNotify
          })
        }
      })
  }

  render() {

    return (
      <div className="lightbox-background">
        <div className="lighbox">
          <Form formTitle="Log in to comment" onSubmit={this.onSubmit}  >
            <Input name="email" label="Email" value={this.state.email} onChange={this.onChange} error={this.state.userNotify.email} />
            <Input name="username" label="User Name" value={this.state.username} onChange={this.onChange} error={this.state.userNotify.username} />
            <div className="buttondiv">
              <Button id="submit" value="Submit" />
            </div>
          </Form>
        </div>
      </div>
    )
  }
}

export default Login;