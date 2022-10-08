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
        method: "POST", headers: {"Content-Type": "application/json"}, body: JSON.stringify({email, password}),
    }).then(checkResponse);
};

export const authorization = (email, password) => {
    return fetch(`${BASE_URL}/signin`, {
        method: "POST", headers: {"Content-Type": "application/json"}, body: JSON.stringify({email, password}),
    }).then(checkResponse);
};

export const getContent = (jwt) => {
    return fetch(`${BASE_URL}/users/me`, {
        method: "GET", headers: {
            "Content-Type": "application/json", Authorization: `Bearer ${jwt}`,
        },
    }).then(checkResponse);
};
