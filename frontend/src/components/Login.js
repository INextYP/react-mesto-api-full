import React, {useState} from "react";

function Login({handleLogin}) {
    const [authParams, setAuthParams] = useState({
        email: "", password: "",
    });

    const handleChange = (evt) => {
        const {name, value} = evt.target;
        setAuthParams({
            ...authParams,
            [name]: value,
        });
    };

    const handleSubmit = (evt) => {
        evt.preventDefault();
        debugger;
        handleLogin(authParams);
    };
    return (<>
            <div className="auth">
                <div className="auth__container">

                    <form method="GET" name="authForm" className="form form__type_auth" onSubmit={handleSubmit}>
                        <h2 className="form__heading form__heading_place_auth-form">Вход</h2>
                        <label className="form__label">
                            <input className="form__item form__item_type_auth"
                                   name="email"
                                   type="text"
                                   placeholder="Email"
                                   minLength="7"
                                   maxLength="30"
                                   value={authParams.email || ""}
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
                                   value={authParams.password || ""}
                                   onChange={handleChange}
                                   autoComplete="off"
                                   required/>
                            <span className="form__item-error"></span>
                        </label>
                        <button type="submit" className="form__submit-button form__submit-button_place_auth">Войти
                        </button>
                    </form>
                </div>
            </div>
        </>);
}

export default Login;
