export default class UserInfo {
    constructor({userNameSelector,userActivitySelector,avatarSelector}) {
        this._userName = document.querySelector(userNameSelector);
        this._userActivity = document.querySelector(userActivitySelector);
        this._avatar = document.querySelector(avatarSelector);
    }
    getUserInfo(){
        const user = {
            name: this._userName.textContent,
            activity: this._userActivity.textContent
        }
        return user;
    }
    setUserInfo(inputs){
        this._userName.textContent = inputs.name;
        this._userActivity.textContent = inputs.about;
        this._avatar.src = inputs.avatar
    }
}