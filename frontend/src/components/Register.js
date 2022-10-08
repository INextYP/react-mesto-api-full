import React, {useState} from "react";
import {Link} from "react-router-dom";

function Register({handleRegister}) {
    const [authParams, setAuthParams] = useState({
        email: "", password: "",
    });

    const handleChange = (evt) => {
        const {name, value} = evt.target;
        setAuthParams((prev) => ({
            ...prev, [name]: value,
        }));
    };

    const handleSubmit = (evt) => {
        evt.preventDefault();
        let {email, password} = authParams;
        handleRegister({email, password});
    };
    return (<>
        <div className="auth">
            <div className="auth__container">
                <form method="GET" name="registrationForm" className="form form__type_auth" onSubmit={handleSubmit}>
                    <h2 className="form__heading form__heading_place_auth-form">Регистрация</h2>
                    <label className="form__label">
                        <input className="form__item form__item_type_auth"
                               name="email"
                               type="text"
                               placeholder="Email"
                               minLength="7"
                               maxLength="30"
                               value={authParams.email}
                               onChange={handleChange}
                               required/>
                        <span className="form__item-error"></span>
                    </label>
                    <label className="form__label">
                        <input className="form__item form__item_type_auth"
                               name="password"
                               type="password"
                               placeholder="Пароль"
                               minLength="5"
                               maxLength="20"
                               value={authParams.password}
                               onChange={handleChange}
                               required/>
                        <span className="form__item-error"></span>
                    </label>
                    <button type="submit"
                            className="form__submit-button form__submit-button_place_auth">Зарегистрироваться
                    </button>
                </form>
                <Link to="login" className="auth__link">
                    Уже зарегистрированы? Войти
                </Link>
            </div>
        </div>
    </>);
}

export default Register;