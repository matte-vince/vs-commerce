import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import md5 from 'md5';
class Account extends Component {

    state = {
        isLoaded: false,
        passRequired: false
    }


    componentDidMount() {

        let token = localStorage.getItem('token');

        if (token) {

            fetch('/api/auth', {

                headers: {
                    'Content-Type': 'application/json',
                    Accept: 'application/json',
                },
                method: 'POST',
                body: JSON.stringify({ token: token })
            }).then(res => res.json())
                .then(result => {
                    this.props.authToken(result)
                    if (result.email) {

                        fetch('/api/customer', {
                            headers: {
                                'Content-Type': 'application/json',
                                Accept: 'application/json',
                            },
                            method: 'POST',
                            body: JSON.stringify({ email: result.email })
                        }).then(res2 => res2.json())
                            .then(result2 => {
                                this.setState({
                                    customer: result2,
                                    isLoaded: true,
                                })
                            })
                    } else {
                        this.setState({
                            toLogin: true
                        })
                    }

                })
        } else {
            this.setState({
                toLogin: true
            })
        }

    }
    handleChange = event => {

        let customer = this.state.customer;
        let passRequired = this.state.passRequired
        if (event.target.name === 'cl_password_new' || event.target.name === 'cl_password_old') {
            if (event.target.value !== '') {
                customer[event.target.name] = md5(event.target.value)
            } else {
                delete customer[event.target.name];
            }


            if (!('cl_password_new' in customer) && !('cl_password_old' in customer)) {
                passRequired = false
            } else {
                passRequired = true
            }
        } else {
            customer[event.target.name] = event.target.value
        }
        this.setState({
            customer: customer,
            passRequired: passRequired
        });

    }

    update = (event) => {
        event.preventDefault();
        fetch('/api/edit/customer', {
            headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json',
            },
            method: 'POST',
            body: JSON.stringify({ customer: this.state.customer })
        }).then(res => res.json())
            .then(result => {
                if (result === 'password') {
                    alert('Non hai inserito la password vecchia corretta')
                } else if (result === 'email') {
                    alert('La nuova mail che hai inserito esite già')
                } else if (result === 'success') {
                    alert('Modifiche eseguite con successo')
                } else {
                    alert('Errore')
                }
            })
    }

    render() {
        if (this.state.toLogin) {
            return <Redirect to='/login' />
        }
        const isAdmin  = this.props.auth.isAdmin;
        if (!isAdmin) {
            if (this.state.isLoaded) {
                const customer = this.state.customer;
                return (
                    <div className="container">
                        <div className="row">
                            <form name='info_clienti' className='col s12' onSubmit={this.update} method='post'>
                                <div className='card'>
                                    <div className='card-content'>
                                        <h4 className='center' style={{ color: '#2196F3' }}>Credenziali di accesso</h4>
                                        <div className='row'>
                                            <div className='input-field col s12 m6 offset-m2 l6 offset-l3'>
                                                <i className='mdi-action-account-circle prefix'></i>
                                                <input type='email' name='cl_email' maxLength='256' disabled onChange={this.handleChange} value={customer.cl_email} />
                                                <label className='active' htmlFor='icon_prefix'>Email</label>
                                            </div>
                                        </div>
                                        <div className='row'>
                                            <div className='input-field col s12 m6 offset-m2 l6 offset-l3'>
                                                <i className='mdi-action-https prefix white-text'></i>
                                                <input type='password' name='cl_password_old' pattern=".{0}|.{6,32}" required={this.state.passRequired} title="Lunghezza minima della password e di 6" onChange={this.handleChange} />
                                                <label htmlFor='icon_prefix'>Password Attuale</label>
                                            </div>
                                        </div>
                                        <div className='row'>
                                            <div className='input-field col s12 m6 offset-m2 l6 offset-l3'>
                                                <i className='mdi-action-https prefix white-text'></i>
                                                <input type='password' name='cl_password_new' pattern=".{0}|.{6,32}" required={this.state.passRequired} onChange={this.handleChange} />
                                                <label htmlFor='icon_prefix'>Nuova password</label>
                                            </div>
                                        </div>
                                        <div className='row'>
                                            <div className='input-field col s12 m6 offset-m2 l6 offset-l3'>
                                                <i className='mdi-action-perm-identity prefix white-text'></i>
                                                <input type="text" name="cl_nome" maxLength="256" required onChange={this.handleChange} value={customer.cl_nome} />
                                                <label className='active' htmlFor='icon_prefix'>Nome</label>
                                            </div>
                                        </div>
                                        <div className='row'>
                                            <div className='input-field col s12 m6 offset-m2 l6 offset-l3'>
                                                <i className='mdi-action-perm-identity prefix white-text'></i>
                                                <input type="text" name="cl_cognome" maxLength="256" required onChange={this.handleChange} value={customer.cl_cognome} />
                                                <label className='active' htmlFor='icon_prefix'>Cognome</label>
                                            </div>
                                        </div>
                                        <div className='row'>
                                            <div className='input-field col s12 m6 offset-m2 l6 offset-l3'>
                                                <i className='mdi-action-today prefix white-text'></i>
                                                <input type="text" name="cl_data_nascita" className='datepicker' required onChange={this.handleChange} value={customer.cl_data_nascita.toString().slice(0, 10)} />
                                            </div>
                                        </div>
                                        <div className='row'>
                                            <div className='input-field col s12 m6 offset-m2 l6 offset-l3'>
                                                <i className='mdi-action-assignment prefix white-text'></i>
                                                <input type="text" name="cl_codice_fiscale" pattern="^[a-zA-Z]{6}[0-9]{2}[a-zA-Z][0-9]{2}[a-zA-Z][0-9]{3}[a-zA-Z]$" required title="Il codice fiscale deve essere composto da 16 caratteri" onChange={this.handleChange} value={customer.cl_codice_fiscale} />
                                                <label className='active' htmlFor='icon_prefix'>Codice fiscale</label>
                                            </div>
                                        </div>
                                        <div className='row'>
                                            <div className='col s2 offset-s5'>
                                                <button className='btn waves-effect waves-light' type='submit'>Avanti
                                        <i className='material-icons right'>send</i>
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div >
                )
            } else {
                return (<div className="progress">
                    <div className="indeterminate"></div>
                </div>)
            }

        } else {
            return <Redirect to='/admin' />
        }


    }
}

export default Account;