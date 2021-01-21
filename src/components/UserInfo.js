export default class UserInfo {
    constructor({nameSelector, infoSelector, avatarSelector}) {
        this._nameProfile = document.querySelector(nameSelector);
        this._infoProfile = document.querySelector(infoSelector);
        this._avatar = document.querySelector(avatarSelector);
    }

    getUserInfo() {
        const obj = {
            nameItem: this._nameProfile.textContent,
            infoItem: this._infoProfile.textContent
        }
        return obj;
    }

    setUserInfo(newName, newInfo) {
        this._nameProfile.textContent = newName;
        this._infoProfile.textContent = newInfo;
    }

    setAvatar(avatar) {
        this._avatar.src = avatar;
    }
}