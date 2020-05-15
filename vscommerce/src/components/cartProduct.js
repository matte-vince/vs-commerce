import React, { Component } from 'react';
import '../css/cart.css';

export default class CartProduct extends Component {
    state = {}
    render() {
        const {product, qty} = this.props;
        const src = '/images/' + product.pr_copertina;
        const handleButton = this.props.handleCartFunctions;
        return (
            <section id="cart">
                <article className="product">
                    <header>
                        <div className="remove">
                            <img src={src} alt="" />

                            <h3 onClick={
                            () => handleButton(product, 'remove')
                        }>Remove product</h3>
                        </div>
                    </header>

                    <div className="content">

                        <h1>{product.pr_nome}</h1>

                        <span>{product.pr_descrizione}</span>

                    </div>

                    <footer className="content">
                        <span className="qt-minus" onClick={
                            () => handleButton(product, 'decrease')
                        }>-</span>
        <span className="qt">{qty}</span>
                        <span className="qt-plus" onClick={
                            () => handleButton(product, 'add')
                        }>+</span>

                        <h2 className="full-price">
                        {product.pr_prezzo*qty}€
                    </h2>

                        <h2 className="price">
                        {product.pr_prezzo}€
                    </h2>
                    </footer>
                </article>


            </section>);
    }
}
