import React from 'react';
import CartProduct from '../components/cartProduct';
import CartTotal from './cartTotal'
export default class CartList extends React.PureComponent {

    handleCartFunctions = (product, type) => {

        if (type === 'add') {
            this.props.addToCartAction(product);
        }
        if (type === 'decrease') {
            this.props.decreaseQty(product);
        }
        if (type === 'remove') {
            this.props.removeProduct(product);
        }

    };

    render() {
        const { cart } = this.props;
        let total = 0;
        for (let i = 0; i < cart.length; i++) {
            const {product, qty} = cart[i] ;

            total = total + (product.pr_prezzo*qty);
        }

        return (
            <div className="container">
                {
                    cart.map(product => <CartProduct key={product.pr_pk_id} handleCartFunctions={this.handleCartFunctions}
                        {...product}  qty={product.qty} />)
                }

                <CartTotal total={total} cart={cart} />
            </div>
            

        )
    }
}
