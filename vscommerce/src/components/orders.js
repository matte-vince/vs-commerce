import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import M from 'materialize-css';
import { Link } from 'react-router-dom';
class Orders extends Component {

    state = {
        loaded: false
    }
    componentDidMount() {
        const token = localStorage.getItem('token')
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
                    this.props.authToken(result);
                    if (this.props.auth.loggedIn && !this.props.auth.isAdmin) {
                        fetch('/api/orders', {
                            headers: {
                                'Content-Type': 'application/json',
                                Accept: 'application/json',
                            },
                            method: 'POST',
                            body: JSON.stringify({ customer: result.email })
                        }).then(res2 => res2.json())
                            .then(result2 => {
                                if (result2 !== "errore") {
                                    console.log('ordini', result2)
                                    this.setState({
                                        orders: result2,
                                        loaded: true
                                    })
                                    var elems = document.querySelectorAll('.collapsible');
                                    M.Collapsible.init(elems);
                                }
                            })
                    } else if (this.props.auth.loggedIn && this.props.auth.isAdmin) {
                        this.setState({
                            toAdmin: true
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
    render() {
        if (this.state.toLogin) {
            return <Redirect to='/login' />
        }
        if (this.state.toAdmin) {
            return <Redirect to='/admin' />
        }
        if (this.state.loaded) {
            const orders = this.state.orders;
            return (
                <div className="section scrollspy">
                    <div className="container">
                        <div className="row">
                            <div className="col s12 center">
                                <h3 style={{ color: '#2196f3', marginLeft: '5px' }} className='header'>Ordini</h3>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col s12">
                                <ul className='collapsible'>
                                    <li>
                                        <div style={{ paddingTop: '10px', paddingBottom: '10px' }}>
                                            <b style={{ marginLeft: '20px' }}>Id Ordine</b>
                                            <span style={{ marginLeft: '40%', position: 'relative', float: 'center' }}><b>Data Ordine</b></span>
                                            <span className='badge' style={{ marginRight: '15px', marginLeft: 'auto', position: 'relative', float: 'right', right: '0' }}><b>Totale</b></span>
                                        </div>
                                    </li>
                                    {
                                        orders.map(order =>
                                            <li key={order.or_pk_id}>
                                                <div className='collapsible-header'>
                                                    
                                                    <i className='material-icons'>shopping_cart</i>{order.or_pk_id}
                                                    <span style={{ marginLeft: 'auto', position: 'relative', float: 'center' }}>{new Date(order.data_ordine).toString().slice(4,24)}</span>
                                                    <span className='badge' style={{  position: 'relative', float: 'right', right: '0' }}>{order.totale} &euro;</span></div>
                                                <div className='collapsible-body'>
                                                    <div style={{ margin: '30px' }}>
                                                        <table>
                                                            <thead>
                                                                <tr>
                                                                    <th>Prodotto</th>
                                                                    <th>Descrizione</th>
                                                                    <th>Quantita</th>
                                                                    <th>Prezzo</th>
                                                                </tr>
                                                            </thead>
                                                            <tbody>
                                                                {
                                                                    order.righe_ordine.map(orderLine =>
                                                                        <tr key={orderLine.id_riga}>
                                                                            <td>
                                                                                <Link to={{
                                                                                    pathname: '/product/details',
                                                                                    state: { id: orderLine.pr_pk_id }
                                                                                }}>{orderLine.pr_nome}</Link>
                                                                            </td>
                                                                            <td>{orderLine.pr_descrizione}</td>
                                                                            <td>{orderLine.quantita}</td>
                                                                            <td>{orderLine.prezzo} &euro;</td>
                                                                        </tr>
                                                                    )
                                                                }

                                                            </tbody>
                                                        </table>
                                                    </div>
                                                </div>
                                            </li>
                                        )
                                    }
                                </ul>

                            </div>
                        </div>
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
}

export default Orders;