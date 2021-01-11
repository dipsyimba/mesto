export default class UserInfo {
    constructor({nameSelector, infoSelector}) {
        this._nameProfile = document.querySelector(nameSelector);
        this._infoProfile = document.querySelector(infoSelector);
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
}