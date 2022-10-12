class Api {
    constructor(setting) {
        this._address = setting.baseUrl;
        this._headers = setting.headers;
    }

    _checkResponse(response) {
        if (!response.ok) {
            return Promise.reject(`Ошибка: ${response.status}`);
        }
        return response.json();
    }

    getInitialCards() {
        return fetch(`${this._address}/cards`, {
            method: "GET",
            credentials: 'include',
            headers: this._headers,
        }).then((response) => {
            return this._checkResponse(response);
        });
    }

    getUserInfo() {
        return fetch(`${this._address}/users/me`, {
            method: "GET",
            credentials: 'include',
            headers: this._headers,
        }).then((response) => {
            return this._checkResponse(response);
        });
    }

    setUserInfo(profileData) {
        return fetch(`${this._address}/users/me`, {
            method: "PATCH",
            credentials: 'include',
            headers: this._headers,
            body: JSON.stringify({
                name: profileData.name, about: profileData.about,
            }),
        }).then((response) => {
            return this._checkResponse(response);
        });
    }

    addNewCard(cardData) {
        return fetch(`${this._address}/cards`, {
            method: "POST",
            credentials: 'include',
            headers: this._headers,
            body: JSON.stringify({
                name: cardData.title, link: cardData.link,
            }),
        }).then((response) => {
            return this._checkResponse(response);
        });
    }

    deleteCard(id) {
        return fetch(`${this._address}/cards/${id}`, {
            method: "DELETE",
            credentials: 'include',
            headers: this._headers,
        }).then((response) => {
            return this._checkResponse(response);
        });
    }

    changeLikeCardStatus(id, state) {
        return state ? this.addLike(id) : this.deleteLike(id);
    }

    addLike(id) {
        return fetch(`${this._address}/cards/${id}/likes`, {
            method: "PUT",
            credentials: 'include',
            headers: this._headers,
        }).then((response) => {
            return this._checkResponse(response);
        });
    }

    deleteLike(id) {
        return fetch(`${this._address}/cards/${id}/likes`, {
            method: "DELETE",
            credentials: 'include',
            headers: this._headers,
        }).then((response) => {
            return this._checkResponse(response);
        });
    }

    editProfileAvatar(data) {
        return fetch(`${this._address}/users/me/avatar`, {
            method: "PATCH",
            credentials: 'include',
            headers: this._headers,
            body: JSON.stringify({
                avatar: data.avatar,
            }),
        }).then((response) => {
            return this._checkResponse(response);
        });
    }
}

const api = new Api({
    baseUrl: "https://api.mesto.react.nomoredomains.icu",
    headers: {
        "Content-Type": "application/json",
    },
});

export default api;
