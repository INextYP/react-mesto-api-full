// В дальнейшем переделается в класс AuthApi

export const BASE_URL = "https://api.mesto.react.nomoredomains.icu";

function checkResponse(response) {
    if (!response.ok) {
        return Promise.reject(`Ошибка: ${response.status}`);
    }
    return response.json();
}

export const registration = (email, password) => {
    return fetch(`${BASE_URL}/signup`, {
        method: "POST",
        credentials: 'include',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({password: password, email: email}),
    }).then(checkResponse);
};

export const authorization = (email, password) => {
    return fetch(`${BASE_URL}/signin`, {
        method: "POST",
        credentials: 'include',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({password: password, email: email}),
    }).then(checkResponse);
};

export const getContent = () => {
    return fetch(`${BASE_URL}/users/me`, {
        method: "GET",
        credentials: 'include',
        headers: {
            "Content-Type": "application/json",
        },
    }).then(checkResponse);
};
