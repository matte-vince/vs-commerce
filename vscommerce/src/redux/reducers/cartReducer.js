import { ADD_TO_CART, DECREASE_QTY, REMOVE_PRODUCT, DELETE_CART } from '../actions/cartActions';



const findProductIndex = (cart, productID) => {
    return cart.findIndex(p => p.product.pr_pk_id === productID);
};

const updateProductQty = (cart, product, qty) => {
    const productIndex = findProductIndex(cart, product.pr_pk_id);

    const updatedCart = [...cart];
    const existingProduct = updatedCart[productIndex];
    let updatedUnitsProduct;
    console.log(existingProduct)
    if(existingProduct.product.pr_quantita >= existingProduct.qty + qty){

    
        updatedUnitsProduct = {
            ...existingProduct,
            qty: existingProduct.qty + qty
        };
    }else{
        alert('Articolo Esaurito')
         updatedUnitsProduct = {
            ...existingProduct,
            qty: existingProduct.qty
        };
    }

    updatedCart[productIndex] = updatedUnitsProduct;
    if(updatedCart[productIndex].qty === 0){
        return updatedCart.filter(item => item.product.pr_pk_id !== product.pr_pk_id);
    }
    return updatedCart;
};
export default function cartReducer(state = [], action = {}) {

    switch (action.type) {
        case ADD_TO_CART: {
            
            const product = action.payload;
            const cart = state;

            const existingProductIndex = findProductIndex(cart, product.pr_pk_id);

            let updatedCart;
            if(existingProductIndex>=0){
                updatedCart = updateProductQty(cart, product, 1);
            }else{
                if(product.pr_quantita >= 1){
                    updatedCart = [...cart, {product, qty:1}];
                }else{
                    alert('Articolo Esaurito')
                    updatedCart = cart;
                }
            }
            return updatedCart;
        }
        case DECREASE_QTY: {
            const product = action.payload;
            const cart = state;

            const existingProductIndex = findProductIndex(cart, product.pr_pk_id);

            const updatedCart = existingProductIndex >= 0
                ? updateProductQty(cart, product, -1)
                : [...cart, {product, qty:1}];

            return updatedCart;
        }
        case REMOVE_PRODUCT: {
            const product = action.payload;
            const cart = state;

            const existingProductIndex = findProductIndex(cart, product.pr_pk_id);
            const deleteQty = -cart[existingProductIndex].qty;
            const updatedCart = existingProductIndex >= 0
                ? updateProductQty(cart, product, deleteQty)
                : [...cart, {product, qty:1}];

            return updatedCart;
        }
        case DELETE_CART: {
            return [];
        }
        default: {}
    }
    return state;
}