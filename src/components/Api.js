export default class Api {
    constructor({authorization,cardsUrl,userUrl}) {
        this._authorization = authorization;
        this._cardsUrl = cardsUrl;
        this._userUrl = userUrl;
    }
    _handleResponse(response){
        if (response.ok) {
            return response.json();
        } else {
            console.log('_handleResponse rejection')
            return Promise.reject(response.statusText)
        }
    }
    _handleResponseError(err){
        console.log('_handleResponseError')
        return Promise.reject(err.message)
    }
    addCardToServer(obj){
        return fetch(this._cardsUrl,{
            method: 'POST',
            headers: {
                authorization: this._authorization,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: obj.name,
                link: obj.link
            })
        }).then(this._handleResponse).catch(this._handleResponseError)
    }
    removeLike(cardId){
        return fetch(`${this._cardsUrl}likes/${cardId}`,{
            headers: {authorization: this._authorization},
            method: 'DELETE'
        }).then(this._handleResponse).catch(this._handleResponseError)
    }
    setLike(cardId){
        return fetch(`${this._cardsUrl}likes/${cardId}`,{
            headers: {authorization: this._authorization},
            method: 'PUT'
        }).then(this._handleResponse).catch(this._handleResponseError)
    }
    deleteCard(cardId){
        return fetch(`${this._cardsUrl}${cardId}`,{
            headers: {authorization: this._authorization},
            method: 'DELETE'
        }).then(this._handleResponse).catch(this._handleResponseError)
    }
    getUser(){
        return fetch(this._userUrl,{
            headers: {authorization: this._authorization}
        }).then(this._handleResponse).catch(this._handleResponseError)
    }
    getInitialCards(){
        return fetch(this._cardsUrl,{
            headers: {authorization: this._authorization}
        }).then(this._handleResponse).catch(this._handleResponseError)
    }
    editProfile(obj){
        return fetch(this._userUrl,{
            method: 'PATCH',
            headers: {
                authorization: this._authorization,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: obj.name,
                about: obj.about
            })
        }).then(this._handleResponse).catch(this._handleResponseError)
    }
    setAvatar(obj){
        return fetch(`${this._userUrl}/avatar`,{
            method: 'PATCH',
            headers: {
                authorization: this._authorization,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                avatar: obj.avatar
            })
        }).then(this._handleResponse).catch(this._handleResponseError)
    }
}