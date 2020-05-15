export const ADD_TO_CART = "ADD_TO_CART";
export const DECREASE_QTY = "DECREASE_QTY";
export const REMOVE_PRODUCT = "REMOVE_PRODUCT";
export const DELETE_CART = "DELETE_CART";

export function addToCartAction({pr_pk_id, pr_nome, pr_descrizione,pr_iva,pr_prezzo, pr_quantita, pr_copertina, pr_barcode, pr_fk_marca, pr_fk_categoria}){
    return {
        type: ADD_TO_CART,
        payload: {pr_pk_id, pr_nome, pr_descrizione,pr_iva,pr_prezzo, pr_quantita, pr_copertina, pr_barcode, pr_fk_marca, pr_fk_categoria}       
    }
};

export function decreaseQty({pr_pk_id, pr_nome, pr_descrizione,pr_iva,pr_prezzo, pr_quantita, pr_copertina, pr_barcode, pr_fk_marca, pr_fk_categoria}){
    return {
        type: DECREASE_QTY,
        payload: {pr_pk_id, pr_nome, pr_descrizione,pr_iva,pr_prezzo, pr_quantita, pr_copertina, pr_barcode, pr_fk_marca, pr_fk_categoria}     
    }
};

export function removeProduct({pr_pk_id, pr_nome, pr_descrizione,pr_iva,pr_prezzo, pr_quantita, pr_copertina, pr_barcode, pr_fk_marca, pr_fk_categoria}){
    return {
        type: REMOVE_PRODUCT,
        payload: {pr_pk_id, pr_nome, pr_descrizione,pr_iva,pr_prezzo, pr_quantita, pr_copertina, pr_barcode, pr_fk_marca, pr_fk_categoria}       
    }
};

export function deleteCart(){
    return {
        type: DELETE_CART,
        payload: {}       
    }
};