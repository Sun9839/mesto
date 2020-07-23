export default class Api {
    constructor({ url,method, headers = {} }) {
        this._url = url;
        this._headers = headers;
        this._method = method;
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
    getTasks() {
        return fetch(this._url, { headers: this._headers })
            .then(this._handleResponse)
            .catch(this._handleResponseError)
    }
}