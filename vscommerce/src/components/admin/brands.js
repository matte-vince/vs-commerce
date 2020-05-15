import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Redirect } from 'react-router-dom';
import M from 'materialize-css';
import FloatingMenu from './floatingMenu';
class Brands extends Component {

    constructor(props) {
        super(props);
        this.state = {
            marche: []
        }
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
                    fetch('/api/brands').then(res2 => res2.json())
                        .then(result2 => {
                            this.setState({
                                marche: result2,
                            })
                        });
                })
        }

    }

    //aggiungo la marca e ricarico la pagina per vederem la nuova marca nella lista. faccio lo stesso per eliminazione e update
    addItem = (marca) => {
        var input = document.getElementById('nuova_marca').value;

        fetch('/api/add/brand', {
            headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json',
            },
            method: 'POST',
            body: JSON.stringify({ nome: input })
        }).then(res => res.json())
            .then(result => {
                window.location.reload();
            })


    }


    updateItem = (marca) => {
        var input = document.getElementById(`${marca.ma_pk_id}`).value;
        fetch('/api/update/brand', {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            },
            method: 'POST',
            body: JSON.stringify({ id: marca.ma_pk_id, nome: input })
        }).then(res => res.text())
            .then(result => {
                window.location.reload();
            })
    }


    deleteItem = (marca) => {
        fetch('/api/delete/brand', {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json; odata=verbose',

            },
            method: 'POST',
            body: JSON.stringify({ id: marca.ma_pk_id })
        }).then(res => res.text())
            .then(result => {
                M.toast({ html: result })
                window.location.reload();

            })
    }


    changeItem = event => {
        let index = -1;
        let brands = this.state.marche;
        for (let i = 0; i < brands.length; i++) {
            if (brands[i].ma_pk_id === parseInt(event.target.id)) {
                index = i;
            }
        }

        brands[index].ma_nome = event.target.calue
        this.setState({
            marche: brands
        });
    }


    render() {
        const { loggedIn, isAdmin } = this.props.auth;
        if (loggedIn) {
            if (!isAdmin) {
                return <Redirect to="/" />
            } else {
                return (
                    <div className="container">
                        <FloatingMenu />
                        <div className="row">
                            <div className='col s12' >
                                <form className='card '>
                                    <div className='card-content white-text'>
                                        <h5>Aggiungi una nuova marca</h5>
                                        <div className='row'>
                                            <div className='input-field col s5 offset-s3'>
                                                <input type='text' id='nuova_marca' name='marca' maxLength='128' required />
                                                <label htmlFor='icon_prefix'>Nuova marca</label>
                                            </div>
                                        </div>
                                        <div className='row'>
                                            <div className='col s2 offset-s5'>
                                                <button className='btn waves-effect waves-light' onClick={this.addItem} value='Invia'>Aggiungi
										<i className='material-icons right'>send</i>
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                        <div className='row' style={{ padding: '7px' }}>
                            <table>
                                <tbody>
                                    {
                                        this.state.marche.map(marca => {
                                            return (
                                                <tr key={marca.ma_pk_id}>
                                                    <td>
                                                        <div className='card row' >
                                                            <div className='card-content white-text col s10'>
                                                                <input type='text' id={marca.ma_pk_id} value={marca.ma_nome} onChange={this.changeItem} />
                                                            </div>
                                                            <div style={{ right: '3%', top: '30%' }} className='btn-floating halfway-fab waves-effect waves-light red' onClick={
                                                                () => this.deleteItem(marca)
                                                            }>
                                                                <i className='material-icons'>delete</i>
                                                            </div>
                                                            <div style={{ right: '7%', top: '30%' }} className='btn-floating halfway-fab waves-effect waves-light green' onClick={
                                                                () => this.updateItem(marca)
                                                            }>
                                                                <i className='material-icons'>edit</i>
                                                            </div>
                                                        </div>
                                                    </td>

                                                </tr>
                                            );
                                        })
                                    }
                                </tbody>
                            </table>
                        </div>
                    </div>
                );
            }
        } else {
            return (
                <div>sessione scaduta <Link to='/login'>Riloggarsi</Link></div>
            )
        }

    }
}

export default Brands;