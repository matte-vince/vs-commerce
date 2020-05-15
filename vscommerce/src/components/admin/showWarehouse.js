import React, { Component } from 'react';
import FloatingMenu from './floatingMenu';
import WarehouseProduct from './warehouseProduct'
import { Redirect } from 'react-router-dom';
import { Link } from 'react-router-dom';

class ShowWareHouse extends Component {
    state = {
        products: []
    }

    //controllo sempre che il mio token sia valido
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
                    fetch('/api/products').then(res2 => res2.json())
                        .then(result2 => {
                            this.setState({
                                products: result2,
                            })

                        })
                })
        }

    }

    //elimina prodotto
    deleteProduct = (product) => {
        fetch(`/api/delete/product`, {
            headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json',
            },
            method: 'POST',
            body: JSON.stringify({ id: product.pr_pk_id })
        }).then(res => res.json())
            .then(result => {
                this.setState({
                    products: result,
                })

            })
    }

    render() {
        const { loggedIn, isAdmin } = this.props.auth;
        if (loggedIn) {
            if (!isAdmin) {
                return <Redirect to="/" />
            } else {
                if (this.state.products) {
                    return (
                        <div className='container'>
                            <FloatingMenu />
                            <div className='row'>
                                {
                                    this.state.products.map(product => {
                                        return (
                                            <WarehouseProduct key={product.pr_pk_id} product={product} deleteProduct={this.deleteProduct} auth={this.props} authToken={this.props.authToken} />
                                        )
                                    })
                                }
                            </div>
                        </div>
                    );
                } else {
                    return (
                        <div className="progress">
                            <div className="indeterminate"></div>
                        </div>
                    )
                }
            }
        } else {
            return (
                <div>sessione scaduta <Link to='/login'>Riloggarsi</Link></div>
            )
        }
    }

}

export default ShowWareHouse;