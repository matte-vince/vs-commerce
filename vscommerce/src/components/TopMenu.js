import React, { Component } from 'react';
import { Link } from 'react-router-dom';
/* var myController2 = new AbortController();
var mySignal = myController2.signal; */

class TopMenu extends Component {

    logout = (event) => {
        localStorage.removeItem('token');
        this.props.authToken({ message: "sloggato" });
    }
    render() {
        if (this.props.auth.loggedIn && this.props.auth.isAdmin) {
            return (
                <div className="navbar-fixed">
                    <nav id="nav_f" className="default_color" role="navigation">
                        <div className="container">
                            <div className="nav-wrapper">
                                <Link to='/admin'><div id="logo-container" className="brand-logo">VS - Commerce</div></Link>
                                <div data-target="slide-out" className="hamburger"><i className="material-icons">menu</i></div>
                                <ul className="right hide-on-med-and-down">
                                    <li><Link to='/categories'>Categorie</Link></li>
                                    <li><Link to='/brands'>Marche</Link></li>
                                    <li onClick={this.logout}><Link to='/'>logout</Link></li>
                                </ul>
                            </div>
                        </div>
                    </nav>
                    <ul id="slide-out" className="sidenav">
                        <li><a href="#item1">Item 1</a></li>
                        <li><a href="#item2">Item 2</a></li>
                        <li><a href="#item3">Item 3</a></li>
                    </ul>
                </div>
            );
        } else if (this.props.auth.loggedIn && !this.props.auth.isAdmin) {
            return (
                <div className="navbar-fixed">
                    <nav id="nav_f" className="default_color" role="navigation">
                        <div className="container">
                            <div className="nav-wrapper">
                                <Link to='/'><div id="logo-container" className="brand-logo">VS - Commerce</div></Link>
                                <div data-target="slide-out" className="hamburger"><i className="material-icons">menu</i></div>
                                <ul className="right hide-on-med-and-down">
                                    <li><Link to='/'>Prodotti</Link></li>
                                    <li><Link to='/cart'>Carrello</Link></li>
                                    <li><Link to='/orders'>Ordini</Link></li>
                                    <li><Link to='/account'>Account</Link></li>
                                    <li onClick={this.logout}><Link to='/login'>Logout</Link></li>
                                </ul>
                            </div>
                        </div>
                    </nav>
                    <ul id="slide-out" className="sidenav">
                        <li><a href="#item1">Item 1</a></li>
                        <li><a href="#item2">Item 2</a></li>
                        <li><a href="#item3">Item 3</a></li>
                    </ul>
                </div>
            );

        } else {
            return (
                <div className="navbar-fixed">
                    <nav id="nav_f" className="default_color" role="navigation">
                        <div className="container">
                            <div className="nav-wrapper">
                                <Link to='/'><div id="logo-container" className="brand-logo">VS - Commerce</div></Link>
                                <div data-target="slide-out" className="hamburger"><i className="material-icons">menu</i></div>
                                <ul className="right hide-on-med-and-down">
                                    <li><Link to='/'>Prodotti</Link></li>
                                    <li><Link to='/cart'>Carrello</Link></li>
                                    <li><Link to='/login'>Login</Link></li>
                                    <li><Link to='/signIn'>Sign In</Link></li>
                                </ul>
                            </div>
                        </div>
                    </nav>
                    <ul id="slide-out" className="sidenav">
                        <li><a href="#item1">Item 1</a></li>
                        <li><a href="#item2">Item 2</a></li>
                        <li><a href="#item3">Item 3</a></li>
                    </ul>
                </div>
            );
        }


    }
}

export default TopMenu;