/**
 * Kintoneアクセス
 */
export class KintoneApi{
    constructor(domain,app,token){
        this._option={
            domain:domain,
            app:app,
            token:token,
            field:null,
            templete:null
        }
    }
    set domain(domain){
        this._option.domain=domain
    }
    get domain(){
        return this._option.domain
    }

    set app(app){
        this._option.app=app
    }
    get app(){
        return this._option.app
    }

    set token(app){
        this._option.token=token
    }
    get token(){
        return this._option.token
    }
    get templete(){
        return JSON.parse(JSON.stringify(this._option.templete))
    }
    /**
     * フィールド情報取得
     */
    async getField(){
        return new Promise(resolve=>{
            fetch("/kintone/getField", 
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(
                    {
                        domain: this.domain,
                        app: this.app,
                        token:this.token
                    })
                }
            ).then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok ' + response.statusText);
                }
                return response.json(); // Parse the JSON response
            }).then(data => {
                const dataJson =JSON.parse(data)
                this._option.field = dataJson.result.origin.properties
                this._option.templete = dataJson.result.templete
                resolve(this._option.field)
            }).catch(error => {
                resolve(null)
            })
        })
    }

    /**
     * 情報取得
     */
    async read(){
        return new Promise(resolve=>{
            fetch("/kintone/read", 
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(
                    {
                        domain: this.domain,
                        app: this.app,
                        token:this.token
                    })
                }
            ).then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok ' + response.statusText);
                }
                return response.json()
            }).then(data => {
                const dataJson =JSON.parse(data)
                if(dataJson.status){
                    resolve(dataJson.result.records)
                }else{
                    resolve(null)
                }
            }).catch(error => {
                resolve(null)
            })
        })
    }

    /**
     * 作成
     */
    async create(records){
        return new Promise(resolve=>{
            fetch("/kintone/create", 
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(
                    {
                        domain: this.domain,
                        app: this.app,
                        token:this.token,
                        records:records
                    })
                }
            ).then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok ' + response.statusText);
                }
                return response.json(); // Parse the JSON response
            }).then(data => {
                const dataJson =JSON.parse(data)
                if(dataJson.status){
                    resolve(dataJson.result.records)
                }else{
                    resolve(null)
                }
            }).catch(error => {
                resolve(null)
            })
        })
    }


    /**
     * 作成
     */
    async update(records){
        return new Promise(resolve=>{
            fetch("/kintone/update", 
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(
                    {
                        domain: this.domain,
                        app: this.app,
                        token:this.token,
                        records:records
                    })
                }
            ).then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok ' + response.statusText);
                }
                return response.json(); // Parse the JSON response
            }).then(data => {
                const dataJson =JSON.parse(data)
                if(dataJson.status){
                    resolve(dataJson.result.records)
                }else{
                    resolve(null)
                }
            }).catch(error => {
                resolve(null)
            })
        })
    }
}