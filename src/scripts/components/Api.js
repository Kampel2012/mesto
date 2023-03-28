class Api {
  constructor({ baseUrl, headers }) {
    this.baseUrl = baseUrl;
    this.headers = headers;
  }

  _checkResponse(res) {
    return res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`);
  }

  getUserInfoData() {
    return fetch(`${this.baseUrl}/users/me`, { headers: this.headers })
      .then(this._checkResponse)
      .catch(err => console.log(err));
  }

  getInitialCards() {
    return fetch(`${this.baseUrl}/cards`, { headers: this.headers })
      .then(this._checkResponse)
      .catch(err => console.log(err));
  }

  editProfile({ name, job }) {
    return fetch(`${this.baseUrl}/users/me`, {
      method: 'PATCH',
      headers: this.headers,
      body: JSON.stringify({
        name: name,
        about: job,
      }),
    })
      .then(this._checkResponse)
      .catch(err => console.log(err));
  }

  addNewCard({ name, link }) {
    return fetch(`${this.baseUrl}/cards`, {
      method: 'POST',
      headers: this.headers,
      body: JSON.stringify({
        name: name,
        link: link,
      }),
    })
      .then(this._checkResponse)
      .catch(err => console.log(err));
  }

  deleteCard(id) {
    return fetch(`${this.baseUrl}/cards/${id}`, {
      method: 'DELETE',
      headers: this.headers,
    })
      .then(this._checkResponse)
      .catch(err => console.log(err));
  }

  switchStateLike(id, state) {
    return fetch(`${this.baseUrl}/cards/${id}/likes`, {
      method: state,
      headers: this.headers,
    })
      .then(this._checkResponse)
      .catch(err => console.log(err));
  }

  editProfileAvatar({ link }) {
    return fetch(`${this.baseUrl}/users/me/avatar`, {
      method: 'PATCH',
      headers: this.headers,
      body: JSON.stringify({
        avatar: link,
      }),
    })
      .then(this._checkResponse)
      .catch(err => console.log(err));
  }

  // другие методы работы с API
}

export const api = new Api({
  baseUrl: `https://mesto.nomoreparties.co/v1/cohort-63`,
  headers: {
    authorization: '2f3491e1-4e2a-4578-a239-f8abfd519bd8',
    'Content-Type': 'application/json',
  },
});
