import React, { Component } from 'react';
import './App.css';
import './css/style.css';
import { Switch, Route } from 'react-router-dom';

import TopMenu from './components/TopMenu';
import Products from './components/Products';
import ProductDetails from './components/ProductDetails';
import CartList from './components/cart';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { addToCartAction, decreaseQty, removeProduct } from '../src/redux/actions/cartActions';
import { authToken } from '../src/redux/actions/authActions';
import Login from './components/login';
import Admin from './components/admin/admin';
import ShowWareHouse from './components/admin/showWarehouse';
import EditProduct from './components/admin/editProduct';
import Categories from './components/admin/categories';
import Brands from './components/admin/brands';
import Orders from './components/orders';
import Signin from './components/signin';
import Account from './components/account';
import Footer from './components/footer';
class App extends Component {

	render() {

		const { cart } = this.props;
		const auth = this.props.auth;
		return (
			<React.Fragment>
				<TopMenu auth={this.props.auth} authToken={this.props.authToken}
				/>
				<Switch>
					<Route exact path='/'>
						<Products addToCartAction={this.props.addToCartAction} auth={this.props.auth} authToken={this.props.authToken} />
					</Route>
					{/* <Route path='/login' component={Cart} /> */}
					<Route path='/product/details' component={ProductDetails} cart={this.props} />

					<Route path='/cart' >
						<CartList cart={cart}
							removeProduct={this.props.removeProduct}
							decreaseQty={this.props.decreaseQty}
							addToCartAction={this.props.addToCartAction} />
					</Route>
					<Route path='/login'>
						<Login />
					</Route>
					<Route path='/admin'>
						<Admin auth={auth} authToken={this.props.authToken} />
					</Route>
					<Route path='/warehouse'>
						<ShowWareHouse auth={auth} authToken={this.props.authToken} />
					</Route>
					<Route path='/edit/product/:id' component={EditProduct} />

					<Route path='/categories'>
						<Categories auth={auth} authToken={this.props.authToken} />
					</Route>

					<Route path='/brands'>
						<Brands auth={auth} authToken={this.props.authToken} />
					</Route>
					<Route path='/orders'>
						<Orders auth={auth} authToken={this.props.authToken} />
					</Route>
					<Route path='/signIn'>
						<Signin />
					</Route>
					<Route path='/account'>
						<Account auth={auth} authToken={this.props.authToken} />
					</Route>

				</Switch>
				<Footer />
			</React.Fragment>
		);


	};

}
const getDataFromState = (state) => {

	return {
		cart: state.cart,
		auth: state.auth
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
		authToken: authToken,
	}, dispatch)
}
// connettiamo il nostro component app 
export default connect(getDataFromState, mapActionsToProps)(App);
