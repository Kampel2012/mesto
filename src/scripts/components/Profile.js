import { api } from './Api';

export default class Profile {
  constructor() {
    this.prom = api.getUserInfoData();
    this.profileName = document.querySelector('.profile__name');
    this.profileAbout = document.querySelector('.profile__subtitle');
    this.profileAvatar = document.querySelector('.profile__avatar');
  }

  setProfileName() {
    this.prom.then(data => {
      this.profileName.textContent = data.name;
    });
  }

  setProfileAbout() {
    this.prom.then(data => {
      this.profileAbout.textContent = data.about;
    });
  }

  setProfileAvatar() {
    this.prom.then(data => {
      this.profileAvatar.src = data.avatar;
    });
  }
}

export const user = new Profile();

// TODO перенести в конструктор? Приватные методы? Создание экземпляра должно быть наверное в индексе
user.setProfileName();
user.setProfileAbout();
user.setProfileAvatar();
