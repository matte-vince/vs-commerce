import React, { Component } from 'react';
import M from 'materialize-css';
import { Redirect } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { authToken } from '../../redux/actions/authActions';
import FloatingMenu from './floatingMenu'
class EditProduct extends Component {
    /*     constructor(props){
            super(props) */
    state = {
        newProduct: true,
        loaded: false
    }
    /*  } */
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
                    if (this.props.match.params.id !== "0") {
                        
                        fetch('/api/product/details/' + this.props.match.params.id).then(res2 => res2.json())
                            .then(result2 => {
                                fetch('/api/brand-categories').then(res3 => res3.json())
                                    .then(result3 => {
                                        this.setState({
                                            product: result2[0],
                                            newProduct: false,
                                            categorie: result3.categorie,
                                            marche: result3.marche,
                                            loaded: true
                                        })
                                        var elems = document.querySelectorAll('select');
                                        M.FormSelect.init(elems);
                                    });

                            })
                    } else {
                        fetch('/api/brand-categories').then(res4 => res4.json())
                            .then(result4 => {
                                console.log(result4.categorie[0])
                                this.setState({
                                    product: {
                                        pr_fk_categoria: result4.categorie[0].ca_pk_id,
                                        pr_fk_marca: result4.marche[0].ma_pk_id,
                                        pr_nome: '',
                                        pr_descrizione: '',
                                        pr_copertina: '',
                                        pr_barcode: ''
                                    },
                                    categorie: result4.categorie,
                                    marche: result4.marche,
                                    loaded: true
                                })
                                var elems = document.querySelectorAll('select');
                                M.FormSelect.init(elems);
                            });
                    }

                }) 
        }

    }

    handleChange = event => {
        let product = this.state.product;
        product[event.target.name] = event.target.value
        this.setState({
            product: product
        });

    }

    submit = event => {
        fetch('/api/post/product', {
            headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json',
            },
            method: 'POST',
            body: JSON.stringify({ product: this.state.product })
        }).then(res => res.json())
            .then(result => {
                console.log(result)
                M.toast({ html: result.message })
                this.props.history.push('/warehouse')
            })

    }
    render() {
        const { loggedIn, isAdmin } = this.props.state;
        const product = this.state.product;
        if (loggedIn && this.state.loaded) {
            if (isAdmin) {
                if (!this.state.newProduct) {


                    return (
                        <div className='container'>
                            <FloatingMenu />
                            <div name='info_clienti' className='col s12'  >
                                <div className='card'>
                                    <div className='card-content white-text'>
                                        <h5>Aggiungi un nuovo prodotto</h5>
                                        <div className='row'>
                                            <div className='input-field col s5 offset-s3'>
                                                <input type='text' name='pr_nome' maxLength='128' required value={product.pr_nome} onChange={this.handleChange} />
                                                <label className='active' htmlFor='icon_prefix'>Nome del prodotto</label>
                                            </div>
                                        </div>
                                        <div className='row'>
                                            <div className='input-field col s5 offset-s3'>
                                                <textarea className='materialize-textarea' name='pr_descrizione' maxLength='1000' value={product.pr_descrizione} onChange={this.handleChange} />
                                                <label className='active' htmlFor='icon_prefix active'>Descrizione</label>
                                            </div>
                                        </div>
                                        <div className='row'>
                                            <div className='input-field col s5 offset-s3'>
                                                <input type='text' name='pr_iva' maxLength='5' value={product.pr_iva} onChange={this.handleChange} />
                                                <label className='active' htmlFor='icon_prefix active'>Iva</label>
                                            </div>
                                        </div>
                                        <div className='row'>
                                            <div className='input-field col s5 offset-s3'>
                                                <input type="text" name="pr_prezzo" maxLength="8" required value={product.pr_prezzo} onChange={this.handleChange} />
                                                <label className='active' htmlFor='icon_prefix'>Prezzo del prodotto</label>
                                            </div>
                                        </div>
                                        <div className='row'>
                                            <div className='input-field col s5 offset-s3'>
                                                <input type="text" name="pr_quantita" required value={product.pr_quantita} onChange={this.handleChange} />
                                                <label className='active' htmlFor='icon_prefix'>Quantita'</label>
                                            </div>
                                        </div>
                                        <div className='row'>
                                            <div className='input-field col s5 offset-s3'>
                                                <input type="text" name="pr_copertina" required value={product.pr_copertina} onChange={this.handleChange} />
                                                <label className='active' htmlFor='icon_prefix'>Nome Immagine</label>
                                            </div>
                                        </div>
                                        <div className='row'>
                                            <div className='input-field col s5 offset-s3'>
                                                <input type="text" name="pr_barcode" value={product.pr_barcode} onChange={this.handleChange} />
                                                <label className='active' htmlFor='icon_prefix'>Barcode</label>
                                            </div>
                                        </div>
                                        <div className='row'>
                                            <div className='col s5 offset-s3'>
                                                <div className="input-field">
                                                    <select name='pr_fk_marca' value={product.pr_fk_marca} onChange={this.handleChange}>
                                                        {this.state.marche.map(marca => {
                                                            return (
                                                                <option key={marca.ma_pk_id} value={marca.ma_pk_id}>{marca.ma_nome}</option>
                                                            )
                                                        })}
                                                    </select>
                                                </div>
                                            </div>
                                        </div>
                                        <div className='row'>
                                            <div className='col s5 offset-s3'>

                                                <div className="input-field">
                                                    <select name='pr_fk_categoria' value={product.pr_fk_categoria} onChange={this.handleChange}>
                                                        {this.state.categorie.map(categoria => {
                                                            return (
                                                                <option key={categoria.ca_pk_id} value={categoria.ca_pk_id}>{categoria.ca_nome}</option>
                                                            )
                                                        })}
                                                    </select>
                                                </div>


                                            </div>
                                        </div>
                                        <div className='row'>
                                            <div className='col s2 offset-s5'>
                                                <button className='btn waves-effect waves-light' onClick={this.submit} value='Invia'>Aggiorna
                                                    <i className='material-icons right'>send</i>
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>);
                } else {

                    return (
                        <div className='container'>
                            <FloatingMenu />
                            <div name='info_clienti' className='col s12'  >
                                <div className='card'>
                                    <div className='card-content white-text'>
                                        <h5>Aggiungi un nuovo prodotto</h5>
                                        <div className='row'>
                                            <div className='input-field col s5 offset-s3'>
                                                <input type='text' name='pr_nome' maxLength='128' required onChange={this.handleChange} />
                                                <label htmlFor='icon_prefix'>Nome del prodotto</label>
                                            </div>
                                        </div>
                                        <div className='row'>
                                            <div className='input-field col s5 offset-s3'>
                                                <textarea className='materialize-textarea' name='pr_descrizione' maxLength='1000' onChange={this.handleChange} />
                                                <label htmlFor='icon_prefix'>Descrizione</label>
                                            </div>
                                        </div>
                                        <div className='row'>
                                            <div className='input-field col s5 offset-s3'>
                                                <input type='text' name='pr_iva' maxLength='5' onChange={this.handleChange} />
                                                <label htmlFor='icon_prefix'>Iva</label>
                                            </div>
                                        </div>
                                        <div className='row'>
                                            <div className='input-field col s5 offset-s3'>
                                                <input type="text" name="pr_prezzo" maxLength="8" required onChange={this.handleChange} />
                                                <label htmlFor='icon_prefix'>Prezzo del prodotto</label>
                                            </div>
                                        </div>
                                        <div className='row'>
                                            <div className='input-field col s5 offset-s3'>
                                                <input type="text" name="pr_quantita" required onChange={this.handleChange} />
                                                <label htmlFor='icon_prefix'>Quantita'</label>
                                            </div>
                                        </div>
                                        <div className='row'>
                                            <div className='input-field col s5 offset-s3'>
                                                <input type="text" name="pr_copertina" required value={product.pr_copertina} onChange={this.handleChange} />
                                                <label className='active' htmlFor='icon_prefix'>Nome Immagine</label>
                                            </div>
                                        </div>
                                        <div className='row'>
                                            <div className='input-field col s5 offset-s3'>
                                                <input type="text" name="pr_barcode" onChange={this.handleChange} />
                                                <label htmlFor='icon_prefix'>Barcode</label>
                                            </div>
                                        </div>
                                        <div className='row'>
                                            <div className='col s5 offset-s3'>
                                                <div className="input-field">
                                                    <div className="input-field">
                                                        <select name='pr_fk_marca' value={product.pr_fk_categoria} onChange={this.handleChange}>
                                                            {this.state.marche.map(marca => {
                                                                return (
                                                                    <option key={marca.ma_pk_id} value={marca.ma_pk_id}>{marca.ma_nome}</option>
                                                                )
                                                            })}
                                                        </select>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className='row'>
                                            <div className='col s5 offset-s3'>

                                                <div className="input-field">
                                                    <select name='pr_fk_categoria' value={product.pr_fk_categoria} onChange={this.handleChange}>
                                                        {this.state.categorie.map(categoria => {
                                                            return (
                                                                <option key={categoria.ca_pk_id} value={categoria.ca_pk_id}>{categoria.ca_nome}</option>
                                                            )
                                                        })}
                                                    </select>
                                                </div>


                                            </div>
                                        </div>
                                        <div className='row'>
                                            <div className='col s2 offset-s5'>
                                                <button className='btn waves-effect waves-light' onClick={this.submit} value='Invia'>Aggiungi
                                                    <i className='material-icons right'>send</i>
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>);
                }

            } else {
                return <Redirect to='/'></Redirect>
            }
        } else {
            return (
                <div>sessione scaduta <Link to='/login'>Riloggarsi</Link></div>
            )
        }

    }
}

const getDataFromState = (state) => {
    return {
        state: state.auth,
    }
}

// dispatch è il metodo che crea un azione in un action creator
// gli vado ad agganciare 1 o piu metodi creati nelle redux/actions
// il metodo che ho messo bindato con il dispatch che spedisce
const mapActionsToProps = (dispatch) => {
    return bindActionCreators({
        authToken: authToken,

    }, dispatch)
}
// connettiamo il nostro component app 
export default connect(getDataFromState, mapActionsToProps)(EditProduct);