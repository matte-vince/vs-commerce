import React, { Component } from 'react';
import Product from './Product';
import M from 'materialize-css';
import { Redirect } from 'react-router-dom'
class Products extends Component {

    state = {
        products: [],
        isLoaded: false,
        filters: {
            categoria: 0,
            marca: 0,
            prezzoDa:0,
            prezzoA:0
        }
    }


    componentDidMount() {
        // vado a prendere i dati dal backend/db e la response che ottengo e la vado ad
        // assegnare allo state tramite la funzione di base setState
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
                    fetch('/api/products').then(res2 => res2.json())
                        .then(result2 => {
                            if (this.props.auth.loggedIn) {
                                fetch('/api/brand-categories').then(res3 => res3.json())
                                    .then(result3 => {


                                        this.setState({
                                            products: result2,
                                            categorie: result3.categorie,
                                            marche: result3.marche,
                                            isLoaded: true

                                        })
                                        /* var elems = document.querySelectorAll('select');
                                        M.htmlFormSelect.init(elems); */
                                    });
                            } else {
                                this.setState({
                                    products: result2,
                                    isLoaded: true
                                })
                            }


                        })


                })
        } else {


            fetch('/api/products').then(res => res.json())
                .then(result => {
                    this.setState({
                        products: result,
                        isLoaded: true
                    })

                })
        }

    }

    addToCart = (product) => {
        this.props.addToCartAction(product);
        M.toast({ html: product.pr_nome + ' aggiunto al carrello' });
    };

    // handle change per filtri
    handleChange = event => {
        let filters = this.state.filters;
        filters[event.target.name] = event.target.value
        this.setState({
            filters: filters
        });

    }

    // alla submit vado a fare una post sui prodotti dando in pasto i filter in modo da fare la query esatta
    submit = event => {

        fetch('/api/product', {
            headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json',
            },
            method: 'POST',
            body: JSON.stringify({ filters: this.state.filters })
        }).then(res => res.json())
            .then(result => {
                this.setState({
                    products: result,
                })

            })

    }
    render() {
        const { loggedIn, isAdmin } = this.props.auth;
        if (!loggedIn && this.state.products && this.state.isLoaded) {
            return (
                <div className='container'>
                    <div className='row'>
                        {
                            this.state.products.map(product => {
                                return (
                                    <Product key={product.pr_pk_id} product={product} addProduct={this.addToCart} />
                                )
                            })
                        }
                    </div>
                </div>
            );
        } else if (loggedIn && !isAdmin && this.state.products && this.state.isLoaded) {
            return (
                <div className='row' style={{ margin: "0 10% 0 10%" }}>
                    <div className="col s2" style={{ position: "fixed" }}>
                        <div style={{ margin: "23px 10px" }}>

                            <div className='card white darken-1'>
                                <div className='card-content ' >
                                    <div className='row'>
                                        <select style={{ display: "block", color: "white", width: "100%" }} value={this.state.filters.marca} name='marca' className='dropdown-button btn' onChange={this.handleChange}>
                                            <option type='text' value={0}>marca</option>
                                            {this.state.marche.map(marca => {
                                                return (
                                                    <option key={marca.ma_pk_id} value={marca.ma_pk_id}>{marca.ma_nome}</option>
                                                )
                                            })}
                                        </select>
                                    </div>
                                    <div className='row'>
                                        <div className='input-field '>
                                            <input type='number' name='prezzoDa' min="0" max="10000" onChange={this.handleChange} />
                                            <label htmlFor='icon_prefix'>prezzo da</label>
                                        </div>
                                    </div>
                                    <div className='row'>
                                        <div className='input-field '>
                                            <input type='number' name='prezzoA' min="1" max="10001" onChange={this.handleChange} />
                                            <label htmlFor='icon_prefix'>fino a</label>
                                        </div>
                                    </div>
                                    <div className='row'>
                                        <select style={{ display: "block", color: "white", width: "100%" }} value={this.state.filters.categoria} name='categoria' className='dropdown-button btn' onChange={this.handleChange}>
                                            <option type='text' value={0} >categoria</option>
                                            {this.state.categorie.map(categoria => {
                                                return (
                                                    <option key={categoria.ca_pk_id} value={categoria.ca_pk_id}>{categoria.ca_nome}</option>
                                                )
                                            })}
                                        </select>
                                    </div>
                                    <div className='row'>

                                        <button style={{ width: "100%" }} className='btn' onClick={this.submit}>Avanti
											</button>

                                    </div>
                                </div>
                            </div>


                        </div>
                    </div>
                    <div className="col s9 offset-s3">
                        <div className='row'>

                            {
                                this.state.products.map(product => {
                                    return (
                                        <Product key={product.pr_pk_id} product={product} addProduct={this.addToCart} />
                                    )
                                })
                            }
                        </div>
                    </div>

                </div >
            );
        } else if (loggedIn && isAdmin) {
            return <Redirect to="/admin" />
        } else {
            return (<div className="progress">
                <div className="indeterminate"></div>
            </div>)

        }


    }
}

export default Products;