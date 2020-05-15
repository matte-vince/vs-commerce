import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { Link } from 'react-router-dom';
import AdminStatistics from './adminStatistics'
import FloatingMenu from './floatingMenu';
class Admin extends Component {

    state = {
        loggedIn: false,
        isAdmin: false
    }

    componentDidMount() {

        let token = localStorage.getItem('token');

        if (token) {
            
            
            fetch('/api/auth', {

                headers: {
                    'Content-Type': 'application/json',
                    Accept: 'application/json',
                },
                method: 'POST',
                body: JSON.stringify({ token: token })
            }).then(res => res.json())
                .then(result => {
                    this.props.authToken(result)                    
                })
        }

    }
    render() {
        const { loggedIn, isAdmin } = this.props.auth;
        if (loggedIn) {
            if (!isAdmin) {
                return <Redirect to="/" />
            } else {
                return (
                    <div>
                        <FloatingMenu/>
                        <AdminStatistics />
                    </div>
                )
            }
        } else {
            return (
                <div>sessione scaduta <Link to='/login'>Riloggarsi</Link></div>
            )
        }
    }
}

export default Admin;