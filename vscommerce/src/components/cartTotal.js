import React, { Component } from 'react';
import M from 'materialize-css';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { deleteCart } from '../redux/actions/cartActions';
class CartTotal extends Component {
    state = {

    }

    componentDidMount() {
        var elems = document.querySelectorAll('.modal');
        M.Modal.init(elems);
    }
    ordina = (event) => {
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

                    if (result.email) {


                        fetch('/api/confirm/order', {
                            headers: {
                                'Content-Type': 'application/json',
                                Accept: 'application/json',
                            },
                            method: 'POST',
                            body: JSON.stringify({ cart: this.props.cart, customer: result.email, total: this.props.total})
                        }).then(res2 => res2.json())
                            .then(result2 => {
                                if(result2==='success'){
                                    this.props.deleteCart();
                                    this.setState({
                                        toOrders: true
                                    })
                                }
                            })
                    }else{
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
        if (this.state.toOrders) {
            return <Redirect to='/orders' />
        }
        return (
            <div id="site-footer">
                <div className="container clearfix">

                    <div className="right">
                        <h1 className="total">Total: <span>{this.props.total}</span>€</h1>
                        <button data-target="modal-order" className="btn modal-trigger">Checkout</button>


                        <div id="modal-order" className="modal">
                            <div className="modal-content">
                                <h4>Conferma Ordine</h4>
                                <p>Procedere al pagamento e conferma dell'ordine</p>
                            </div>
                            <div className="modal-footer">
                                <div className="modal-close btn-flat">Annulla</div>
                                <div className="modal-close btn" onClick={this.ordina}>Conferma</div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>);
    }
}
const mapActionsToProps = (dispatch) => {
    return bindActionCreators({
        deleteCart: deleteCart,

    }, dispatch)
}
// connettiamo il nostro component app 
export default connect(undefined,mapActionsToProps)(CartTotal);
