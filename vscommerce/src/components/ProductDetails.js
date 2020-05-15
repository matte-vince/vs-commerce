import React, { Component } from 'react';
import { connect } from 'react-redux';
import M from 'materialize-css';
import { bindActionCreators } from 'redux';
import { addToCartAction, decreaseQty, removeProduct } from '../redux/actions/cartActions';

class ProductDetails extends Component {
    state = {
        product: null,
        addToCart: null,
        loaded: false,
    }
    componentDidMount() {

        fetch('/api/product/details/' + this.props.location.state.id).then(res => res.json())
            .then(result => {
                this.setState({
                    product: result[0],
                    loaded: true,
                })
            })

    }
    addToCart = (product) => {
        this.props.addToCartAction(product);
        M.toast({ html: product.pr_nome + ' aggiunto al carrello' });
    };
    render() {
        if (this.state.loaded) {


            const product = this.state.product;
            const src = '/images/' + product.pr_copertina;

            // const addToCart = this.props.dispatch((product) => addToCartAction(product));
            return (
                <div className='section white'>
                    <div className='container'>
                        <div className='row detail-hero'>
                            <div className='col m6 s12'>
                                <img width='100%' src={src} alt={product.pr_nome} />
                            </div>
                            <div className='col m6 s12'>
                                <h1>{product.pr_nome}</h1>
                                <p><span className='manufacturer'>Marca: <span>{product.ma_nome}</span></span></p>
                                <p><span className='detail-reviews'>Categoria: {product.ca_nome}</span></p>
                                <p><span ><strong><span className='underline' rel='nofollow' >prezzo EUR {product.pr_prezzo}</span></strong></span></p>
                                <p><span className='product-summary'>{product.pr_descrizione}</span></p>
                                <p><span className='product-summary'>Magazzino {product.pr_quantita} unità</span></p>
                                <p><span className='product-summary'>Codice Prodotto: {product.pr_barcode}</span></p>
                                <p>
                                    <span style={{ backgroundColor: '#2196F3' }} className='btn waves-effect waves-light' onClick={
                                        () => this.addToCart(product)
                                    }>
                                        Aggiungi carrello
                                    </span>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>);


        } else {

            return (<div className="progress">
                <div className="indeterminate"></div>
            </div>)


        }
    }
}


// connettiamo il nostro component app 
const getDataFromState = (state) => {
    return {
        cart: state.cart,
    }
}

// dispatch è il metodo che crea un azione in un action creator
// gli vado ad agganciare 1 o piu metodi creati nelle redux/actions
// il metodo che ho messo bindato con il dispatch che spedisce
const mapActionsToProps = (dispatch) => {
    return bindActionCreators({
        addToCartAction: addToCartAction,
        decreaseQty: decreaseQty,
        removeProduct: removeProduct,
    }, dispatch)
}
// connettiamo il nostro component app 
export default connect(getDataFromState, mapActionsToProps)(ProductDetails);