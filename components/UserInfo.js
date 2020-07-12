export default class UserInfo {
    constructor({userNameSelector,userActivitySelector}) {
        this._userName = document.querySelector(userNameSelector);
        this._userActivity = document.querySelector(userActivitySelector);
    }
    getUserInfo(){
        const user = {
            name: this._userName.textContent,
            activity: this._userActivity.textContent
        }
    }
    setUserInfo(inputs){
        this._userName.textContent = inputs.name;
        this._userActivity.textContent = inputs.activity;
    }
}