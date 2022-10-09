// В дальнейшем переделается в класс AuthApi

export const BASE_URL = "http://api.mesto.react.nomoredomains.icu";

function checkResponse(response) {
    if (!response.ok) {
        return Promise.reject(`Ошибка: ${response.status}`);
    }
    return response.json();
}

export const registration = (data) => {
    return fetch(`${BASE_URL}/signup`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            'Accept': 'application/json',
        },
        credentials: "include",
        body: JSON.stringify({email: data.email, password: data.password}),
    }).then(checkResponse);
};

export const authorization = (data) => {
    return fetch(`${BASE_URL}/signin`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            'Accept': 'application/json',
        },
        credentials: "include",
        body: JSON.stringify({email: data.email, password: data.password}),
    }).then(checkResponse);
};

export const getContent = (jwt) => {
    return fetch(`${BASE_URL}/users/me`, {
        method: "GET", headers: {
            'Accept': 'application/json',
            "Content-Type": "application/json",
            'Authorization': `Bearer ${jwt}`,
        },
        credentials: "include",
    }).then(checkResponse);
};
