import React, { Component } from 'react';
import { Link } from 'react-router-dom';
class WarehouseProduct extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }

    render() {
        const product = this.props.product;
        const src = '/images/' + product.pr_copertina;
        const deleteProduct = this.props.deleteProduct;
        const editUrl = '/edit/product/' + product.pr_pk_id;
        let stato = 'Tutto OK';
        if(product.pr_quantita <=3){
            stato = 'In esaurimento';
        }
        return (
            <div className='col s12 m4'>
                <div className='card'>
                    <div className='card-image' style={{ padding: '30px' }}>
                        <img src={src} style={{ height: '280px' }} alt='immagine' />
                        <Link to={editUrl}>
                            <div style={{ right: '70px' }} className='btn-floating halfway-fab waves-effect waves-light green'>
                                <i className='material-icons'>mode_edit</i>
                            </div>
                        </Link>
                        <div className='btn-floating halfway-fab waves-effect waves-light red' onClick={
                            () => deleteProduct(product)
                        }>
                            <i className='material-icons'>delete</i>
                        </div>
                    </div>
                    <div className='card-content'>
                        <p>{product.pr_nome}</p>
                        <p>Euro: {product.pr_prezzo}<br />Iva: {product.pr_iva}<br />Quantita': {product.pr_quantita}</p>
                        <p>Barcode:{product.pr_barcode}</p>
                    </div>
                    <div className='card-action'>
                    {stato}</div>
                </div>
            </div>
        );
    }
}

export default WarehouseProduct;