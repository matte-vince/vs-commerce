import React, { Component } from 'react';

class AdminStatistics extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }
    componentDidMount() {

        fetch('/api/admin/statistics').then(res => res.json())
            .then(result => {
                this.setState({
                    ordini: result.ordini,
                    totale: result.totale,
                    bestSeller: result.bestSeller
                })

            })

    }
    render() {
        return (
            <div className="row">
                <div id='intro' className='section scrollspy'>
                    <div className='container'>
                        <div className='row'>
                            <div className='col s12 m4'>
                                <div className='icon-block'>
                                    <h2 className='center light-blue-text'>
                                        <i className='material-icons' style={{ fontSize: '7rem' }}>add_shopping_cart</i>
                                    </h2>
                                    <h5 className='center'>Ordini effettuati: {this.state.ordini}</h5>
                                </div>
                            </div>
                            <div className='col s12 m4'>
                                <div className='icon-block'>
                                    <h2 className='center light-blue-text'>
                                        <i className='material-icons' style={{ fontSize: '7rem' }}>euro_symbol</i>
                                    </h2>
                                    <h5 className='center'>Profitto totale: {this.state.totale} &euro;
                                    </h5>
                                </div>
                            </div>
                            <div className='col s12 m4'>
                                <div className='icon-block'>
                                    <h2 className='center light-blue-text'>
                                        <i className='material-icons' style={{ fontSize: '7rem' }}>store_mall_directory</i>
                                    </h2>
                                    <h5 className='center'>Prodotto piu venduto:  {this.state.bestSeller}</h5>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default AdminStatistics;