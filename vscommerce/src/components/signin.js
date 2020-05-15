import React, { Component } from 'react';
import M from 'materialize-css';
import md5 from 'md5';
import {Redirect} from 'react-router-dom';

class Signin extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }
    componentDidMount(){
        var elems = document.querySelectorAll('.datepicker');
        M.Datepicker.init(elems,{format: 'yyyy-m-dd'});
    }
    handleChange = event => {
        if(event.target.name === 'cl_password' || event.target.name === 'cl_password2'){
            this.setState({
                [event.target.name]: md5(event.target.value)
            });
        }else{
            this.setState({
                [event.target.name]: event.target.value
            });
        }
        
    }
    signin = (event) =>{
        event.preventDefault();
        if(this.state.cl_password !== this.state.cl_password2){
            alert('Le password inserite non coincidono');
        }else{
            fetch('/api/signin', {
                headers: {
                    'Content-Type': 'application/json',
                    Accept: 'application/json',
                },
                method: 'POST',
                body: JSON.stringify({ customer: this.state})
            }).then(res => res.json())
                .then(result => {
                    if(result==='success'){
                        alert('Registrato con successo')
                        this.setState({
                            toLogin: true,
                        })
                    }else if(result==='mail'){
                        alert('Esiste già un utente con questa email')
                    }else{
                        alert('Errore durante la registrazione')
                    }
                });
        }
    }
    render() {
        if (this.state.toLogin) {
            return <Redirect to='/login' />
        }
        return (
            <div className="container">
                <div className="row">
                    <form name='info_clienti'  className='col s12' onSubmit={this.signin} method='post'>
                        <div className='card'>
                            <div className='card-content'>
                                <h4 className='center' style={{color: '#2196F3'}}>Credenziali di accesso</h4>
                                <div className='row'>
                                    <div className='input-field col s12 m6 offset-m2 l6 offset-l3'>
                                        <i className='mdi-action-account-circle prefix'></i>
                                        <input type='email' name='cl_email' maxLength='256' required onChange={this.handleChange}/>
                                        <label htmlFor='icon_prefix'>Email</label>
                                    </div>
                                </div>
                                <div className='row'>
                                    <div className='input-field col s12 m6 offset-m2 l6 offset-l3'>
                                        <i className='mdi-action-https prefix white-text'></i>
                                        <input type='password' name='cl_password' pattern=".{0}|.{6,32}" required title="Lunghezza minima della password e di 6" onChange={this.handleChange}/>
                                        <label htmlFor='icon_prefix'>Password</label>
                                    </div>
                                </div>
                                <div className='row'>
                                    <div className='input-field col s12 m6 offset-m2 l6 offset-l3'>
                                        <i className='mdi-action-https prefix white-text'></i>
                                        <input type='password' name='cl_password2' pattern=".{0}|.{6,32}" required onChange={this.handleChange}/>
                                        <label htmlFor='icon_prefix'>Ripeti password</label>
                                    </div>
                                </div>
                                <div className='row'>
                                    <div className='input-field col s12 m6 offset-m2 l6 offset-l3'>
                                        <i className='mdi-action-perm-identity prefix white-text'></i>
                                        <input type="text" name="cl_nome" maxLength="256" required onChange={this.handleChange}/>
                                        <label htmlFor='icon_prefix'>Nome</label>
                                    </div>
                                </div>
                                <div className='row'>
                                    <div className='input-field col s12 m6 offset-m2 l6 offset-l3'>
                                        <i className='mdi-action-perm-identity prefix white-text'></i>
                                        <input type="text" name="cl_cognome" maxLength="256" required onChange={this.handleChange}/>
                                        <label htmlFor='icon_prefix'>Cognome</label>
                                    </div>
                                </div>
                                <div className='row'>
                                    <div className='input-field col s12 m6 offset-m2 l6 offset-l3'>
                                        <i className='mdi-action-today prefix white-text'></i>
                                        <input type="date" name="cl_data_nascita" required onChange={this.handleChange}/>
                                    </div>
                                </div>
                                <div className='row'>
                                    <div className='input-field col s12 m6 offset-m2 l6 offset-l3'>
                                        <i className='mdi-action-assignment prefix white-text'></i>
                                        <input type="text" name="cl_codice_fiscale" pattern="^[a-zA-Z]{6}[0-9]{2}[a-zA-Z][0-9]{2}[a-zA-Z][0-9]{3}[a-zA-Z]$" required title="Il codice fiscale deve essere composto da 16 caratteri" onChange={this.handleChange}/>
                                        <label htmlFor='icon_prefix'>Codice fiscale</label>
                                    </div>
                                </div>
                                <div className='row'>
                                    <div className='col s2 offset-s5'>
                                        <button className='btn waves-effect waves-light'  type='submit'>Avanti
                                        <i className='material-icons right'>send</i>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
            </div >
        );
    }
}

export default Signin;