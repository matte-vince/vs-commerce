import React, { Component } from 'react';
import M from 'materialize-css';
import { Link } from 'react-router-dom';
class FloatingMenu extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }
    componentDidMount() {
        var elems = document.querySelectorAll('.fixed-action-btn');
        M.FloatingActionButton.init(elems, { toolbarEnabled: true, direction: 'top' });
    }
    render() {
        return (
            <div className="fixed-action-btn toolbar">
                <a href='#region ' className="btn-floating btn-large red" >
                    <i className="material-icons">menu</i>
                </a>
                <ul>
                    <li><Link to="/admin" className="btn-floating red"><i className="material-icons">equalizer</i>statistiche</Link></li>
                    <li><Link to="/edit/product/0" className="btn-floating red"><i className="material-icons">add</i></Link></li>
                    <li><Link to="/warehouse" className="btn-floating red"><i className="material-icons">store</i></Link></li>
                </ul>
            </div>
        );
    }
}

export default FloatingMenu;