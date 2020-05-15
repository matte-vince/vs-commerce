import React, { Component } from 'react';

class Footer extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }
    render() {
        return (<footer style={{marginTop:'200px'}} id="contact" className="page-footer default_color scrollspy">
            <div className="container">
                <div className="row">

                    <div className="col l6 s12">
                        <h5 className="white-text">vs-commerce.com</h5>
                    </div>

                </div>
            </div>
            <div className="footer-copyright default_color">
                <div className="container">
                    Made with love by <a className="white-text" href="https://www.facebook.com/karanveer.singh.7"> Singh karanveer  </a> &
                    <a className="white-text" href="https://www.matteovincenzi.com/"> Vincenzi Matteo </a>.
                    Thanks to <a className="white-text" href="http://materializecss.com/">materializecss</a>
                </div>
            </div>
        </footer>);
    }
}

export default Footer;
