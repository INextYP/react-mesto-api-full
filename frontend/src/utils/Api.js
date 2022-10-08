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
            headers: this._headers,
            credentials: "include",
        }).then((response) => {
            return this._checkResponse(response);
        });
    }

    getUserInfo() {
        return fetch(`${this._address}/users/me`, {
            method: "GET",
            headers: this._headers,
            credentials: "include",
        }).then((response) => {
            return this._checkResponse(response);
        });
    }

    setUserInfo(profileData) {
        return fetch(`${this._address}/users/me`, {
            method: "PATCH",
            headers: this._headers,
            body: JSON.stringify({
                name: profileData.name, about: profileData.about,
            }),
            credentials: "include",
        }).then((response) => {
            return this._checkResponse(response);
        });
    }

    addNewCard(cardData) {
        return fetch(`${this._address}/cards`, {
            method: "POST",
            headers: this._headers,
            body: JSON.stringify({
                name: cardData.title, link: cardData.link,
            }),
            credentials: "include",
        }).then((response) => {
            return this._checkResponse(response);
        });
    }

    deleteCard(id) {
        return fetch(`${this._address}/cards/${id}`, {
            method: "DELETE",
            headers: this._headers,
            credentials: "include",
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
            headers: this._headers,
            credentials: "include",
        }).then((response) => {
            return this._checkResponse(response);
        });
    }

    deleteLike(id) {
        return fetch(`${this._address}/cards/${id}/likes`, {
            method: "DELETE",
            headers: this._headers,
            credentials: "include",
        }).then((response) => {
            return this._checkResponse(response);
        });
    }

    editProfileAvatar(data) {
        return fetch(`${this._address}/users/me/avatar`, {
            method: "PATCH",
            headers: this._headers,
            body: JSON.stringify({
                avatar: data.avatar,
            }),
            credentials: "include",
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
