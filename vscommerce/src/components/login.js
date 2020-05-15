import React, { Component } from 'react';
import md5 from 'md5';
import { Redirect } from 'react-router-dom';
var myController = new AbortController();
var mySignal = myController.signal;
class Login extends Component {
    state = {
        email: "",
        password: "",
        loggedIn: false,
        isAdmin: false
    }

    
    handleChange = event => {
        this.setState({
            [event.target.name]: event.target.value
        });
    }

    clickLogin = event => {
        fetch('/api/login', {
            signal: mySignal,
            headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json',
            },
            method: 'POST',
            body: JSON.stringify({ email: this.state.email, password: md5(this.state.password) })
        }).then(res => res.json())
            .then(result => {
                if (result.token) {
                    localStorage.setItem('token', result.token);
                    this.setState({
                        loggedIn: true,
                        isAdmin: result.isAdmin
                    })
                } else {
                    alert(result);
                }

            })
    }

    render() {
        if (this.state.loggedIn) {
            if (this.state.isAdmin) {
                return (<Redirect to="/admin"/>);
            } else {
                return <Redirect to="/" />
            }
        }
        else {

            return (

                <div className='row center'>
                    <div className='card col s6 offset-s3'>
                        <div className='card-content white-text'>
                            <div className='row'>
                                <div className='input-field col s6 offset-s3'>

                                    <input type='email' name='email' onChange={this.handleChange} />
                                    <label htmlFor='icon_prefix'>Email</label>
                                </div>
                            </div>
                            <div className='row'>
                                <div className='input-field col s6 offset-s3'>

                                    <input type='password' name='password' onChange={this.handleChange} />
                                    <label htmlFor='icon_prefix'>Password</label>
                                </div>
                            </div>
                            <div className='row'>
                                <div className='col s6 offset-s3'>
                                    <button className='btn waves-effect waves-light' type='submit' value='Avanti' onClick={this.clickLogin}>LOGIN
                                    <i className='material-icons right'>send</i>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            );
        }
    }
}

export default Login;