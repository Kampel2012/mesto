export default class UserInfo {
  constructor({ selectorName, selectorJob, selectorAvatar }) {
    this.name = document.querySelector(selectorName);
    this.job = document.querySelector(selectorJob);
    this.avatar = document.querySelector(selectorAvatar);
  }

  getUserInfo() {
    return {
      name: this.name.textContent,
      job: this.job.textContent,
      avatar: this.avatar.src,
    };
  }

  setUserInfo({ name, job, avatar = this.avatar.src }) {
    this.name.textContent = name;
    this.job.textContent = job;
    this.avatar.src = avatar;
  }
}
