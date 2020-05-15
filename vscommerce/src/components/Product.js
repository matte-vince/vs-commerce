import React, { Component } from 'react';
import { Link } from 'react-router-dom';
class Product extends Component {

    render() {
        const product = this.props.product;
        const src = '/images/' + product.pr_copertina;
        const addToCart = this.props.addProduct;
        return (
            <div className='col s12 m4 l4'>
                <div className='card'>
                    <div className='card-image waves-effect waves-block waves-light'>
                        <img className='activator' src={src} height="280" alt={product.pr_nome} />
                    </div>
                    <div className='card-content'>
                        <span className='card-title activator grey-text text-darken-4'>
                            {product.pr_nome}{/* <i className='material-icons right'>mdi-navigation-more-vert</i> */}</span>
                    </div>

                    <div id='cart-button' className='waves-effect waves-light btn cart-button' onClick={
                        () => addToCart(product)
                    }>
                        <span><i className='material-icons center' style={{ fontSize: '2em' }}>add_shopping_cart</i></span>
                    </div>

                    <div className='card-reveal'>
                        <span className='card-title grey-text text-darken-4'>{product.pr_prezzo} euro<i className='material-icons right'>close</i></span>
                        <p>{product.pr_descrizione}</p>
                        <Link to={{
                            pathname: '/product/details',
                            state: {
                                id: product.pr_pk_id,
                                
                            }
                        }}>
                            <span style={{ color: '#2196F3' }} >Dettagli</span>
                        </Link>

                    </div>
                </div>
            </div>


        );
    }
}

export default Product;