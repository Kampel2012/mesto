import { gallerySection } from '../../pages';

class Api {
  constructor({ baseUrl, headers }) {
    this.baseUrl = baseUrl;
    this.headers = headers;
  }

  getUserInfoData() {
    return fetch(`${this.baseUrl}/users/me`, { headers: this.headers })
      .then(res => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(`Ошибка: ${res.status}`);
      })
      .catch(err => {
        console.log(err); // "Что-то пошло не так: ..."
      });
  }

  getInitialCards() {
    return fetch(`${this.baseUrl}/cards`, { headers: this.headers })
      .then(res => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(`Ошибка: ${res.status}`);
      })
      .catch(err => {
        console.log(err); // "Что-то пошло не так: ..."
      });
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
      .then(res => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(`Ошибка: ${res.status}`);
      })
      .catch(err => {
        console.log(err); // "Что-то пошло не так: ..."
      });
  }

  addNewCard({ name, link }) {
    return fetch(`${this.baseUrl}/users/me`, {
      method: 'PATCH',
      headers: this.headers,
      body: JSON.stringify({
        name: 'Джоли',
        link: 'https://images.squarespace-cdn.com/content/v1/50e8a6a2e4b0955e45ff0e82/1550117721846-7FX46IKK71RHWJQXOF7X/AngelinaJolie_8bit_240.jpg',
      }),
    })
      .then(res => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(`Ошибка: ${res.status}`);
      })
      .catch(err => {
        console.log(err); // "Что-то пошло не так: ..."
      });
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
