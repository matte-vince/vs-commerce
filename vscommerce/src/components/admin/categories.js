import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Redirect } from 'react-router-dom';
import M from 'materialize-css';
import FloatingMenu from './floatingMenu';
class Categories extends Component {
    constructor(props) {
        super(props);
        this.state = {
            categorie: []
        }
    }

    //controllo token e get categorie
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
                    fetch('/api/categories').then(res2 => res2.json())
                        .then(result2 => {
                            this.setState({
                                categorie: result2,
                            })

                        });
                })
        }

    }

    //aggiornameto, creazione e eliminazione categoria e ricarica della pagina per vedere i dati aggiornati
    addItem = (categoria) => {
        var input = document.getElementById('nuova_categoria').value;
        
        fetch('/api/add/category', {
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
    updateItem = (categoria) => {
        var input = document.getElementById(`${categoria.ca_pk_id}`).value;
        fetch('/api/update/category', {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            },
            method: 'POST',
            body: JSON.stringify({ id: categoria.ca_pk_id, nome: input })
        }).then(res => res.text())
            .then(result => {
                window.location.reload();
            })
    }

    deleteItem = (categoria) => {
        fetch('/api/delete/category', {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json; odata=verbose',

            },
            method: 'POST',
            body: JSON.stringify({ id: categoria.ca_pk_id })
        }).then(res => res.text())
            .then(result => {
                M.toast({ html: result })
                window.location.reload();

            })
    }

    changeItem = event => {

        let index = -1;

        let categories = this.state.categorie;
        for (let i = 0; i < categories.length; i++) {
            if (categories[i].ca_pk_id === parseInt(event.target.id)) {
                index = i;
            }
        }

        categories[index].ca_nome = event.target.calue
        this.setState({
            categorie: categories
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
                        <FloatingMenu/>
                        <div className="row">
                            <div className='col s12' >
                                <form className='card '>
                                    <div className='card-content white-text'>
                                        <h5>Aggiungi una nuova categoria</h5>
                                        <div className='row'>
                                            <div className='input-field col s5 offset-s3'>
                                                <input type='text' id='nuova_categoria' name='categoria' maxLength='128' required />
                                                <label htmlFor='icon_prefix'>Nuova categoria</label>
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
                                        this.state.categorie.map(categoria => {
                                            return (
                                                <tr key={categoria.ca_pk_id}>
                                                    <td>
                                                        <div className='card row' >
                                                            <div className='card-content white-text col s10'>
                                                                <input type='text' id={categoria.ca_pk_id} value={categoria.ca_nome} onChange={this.changeItem} />
                                                            </div>
                                                            <div style={{ right: '3%', top: '30%' }} className='btn-floating halfway-fab waves-effect waves-light red' onClick={
                                                                () => this.deleteItem(categoria)
                                                            }>
                                                                <i className='material-icons'>delete</i>
                                                            </div>
                                                            <div style={{ right: '7%', top: '30%' }} className='btn-floating halfway-fab waves-effect waves-light green' onClick={
                                                                () => this.updateItem(categoria)
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

export default Categories;