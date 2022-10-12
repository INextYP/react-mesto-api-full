import React from "react";
import {Link} from "react-router-dom";
import logo from '../image/logo.svg';


function Header(props) {

    return (<header className="header">
        <Link to='/' className="header__link-logo" title="Место">
            <img className="header__logo" src={logo} alt="Логотип"/>
        </Link>
        <div className="header__login-panel">
            <p>{props.userData}</p>
            <Link to={props.link} className="header__login-panel-link" onClick={props.onClick}>
                {props.linkText}
            </Link>
        </div>
    </header>)
}

export default Header;
