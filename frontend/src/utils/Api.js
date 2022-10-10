class Api {
    constructor(setting) {
        this._address = setting.baseUrl;
        this._headers = setting.headers;
    }

    // _getHeaders() {
    //     const jwt = localStorage.getItem('jwt');
    //     debugger;
    //     return {
    //         'Authorization': `Bearer ${jwt}`,
    //         ...this._headers,
    //     };
    // }

    _checkResponse(response) {
        if (!response.ok) {
            return Promise.reject(`Ошибка: ${response.status}`);
        }
        return response.json();
    }

    getInitialCards(jwt) {
        return fetch(`${this._address}/cards`, {
            method: "GET",
            credentials: 'include',
            headers: {
                'Accept': 'application/json',
                Authorization: `Bearer ${jwt}`,
            },
        }).then((response) => {
            return this._checkResponse(response);
        });
    }

    getUserInfo(jwt) {
        return fetch(`${this._address}/users/me`, {
            method: "GET",
            headers: {
                'Accept': 'application/json',
                Authorization: `Bearer ${jwt}`,
            },
            credentials: 'include',
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
                name: profileData.name,
                about: profileData.about,
            }),
        }).then((response) => {
            return this._checkResponse(response);
        });
    }

    addNewCard(cardData) {
        return fetch(`${this._address}/cards`, {
            method: "POST",
            headers: this._headers,
            credentials: 'include',
            body: JSON.stringify({
                name: cardData.title,
                link: cardData.link,
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
    baseUrl: "http://api.mesto.react.nomoredomains.icu" || 'http://localhost:3000',
    headers: {
        'Accept': 'application/json',
        authorization: `Bearer ${localStorage.getItem('jwt')}`,

    },
});

export default api;
