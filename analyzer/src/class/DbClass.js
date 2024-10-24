/**
 * dexieからのDB操作
 */
import { Dexie } from "dexie"
class DbClass {
    constructor(stores,columns) {
        this._list = []
        this._stores = stores
        this._columns = []
        this._version = 1
        this.db = new Dexie(this._stores)
        this._columns = columns
        if(this._columns.indexOf("++dbid")==-1){
            this._columns.unshift("++dbid")
        }
        const tableData = {}
        tableData[this._stores] = this._columns.join(',')
        this.db.version(this._version).stores(tableData)
    }
    /**
     * 項目配列取得
     */
    get columns(){
        const stores = this.db[this._stores]
        if(stores==undefined){
            return null
        }
        const schema = stores.schema
        let columns=[]
        for(let key in schema.indexes){
            columns.push(schema.indexes[key].name)
        }
        this._columns=columns
        return columns
    }
    
    /**
     * キャッシュ情報を取得
     * @returns 
     */
    get list(){
        return this._list
    }

    /**
     * 新規登録
     */
    async add(data) {
        try{
            let add = await this.db[this._stores].add(data)
            await this.get()
            return add
        } catch (error) {
            return null
        }
    }

    /**
     * 複数登録
     * @param {*} datas 
     * @returns 
     */
    async bulk(datas){
        return new Promise(resolve=>{
            this.db[this._stores].bulkPut(datas)
            .then(() => {
                resolve()
            })
            .catch((error) =>{
                resolve(null)
            })
        })
    }
    /**
     * 修正
     */
    async update(id,data){
        try {
            return await this.db[this._stores].update(id,data)
        } catch (error) {
            console.log(error)
            return null
        }
    }
    async delete(id){ 
        try {
            return await this.db[this._stores].delete(id)
        } catch (error) {
            console.log(error)
            return null
        }  
    }
    /**
     * 条件で削除
     * @param {*} key 
     * @param {*} val 
     * @returns 
     */
    async deleteWhere(key,val){
        try {
            return await this.db[this._stores].where(key).equals(val).delete()
        } catch (error) {
            console.log(error)
            return null
        }  
        
    }
    /**
     * 取得
     * @returns 
     */
    async get(){
        try{
            this._list =await this.db[this._stores].toArray()
            return this._list
        }catch(error){
            console.log(error)
            return null
        }
    }

    /**
     * クリア
     * @returns 
     */
    clear(){
        return new Promise(resolve=>{
            this.db[this._stores].clear().then(() => {
                resolve()
            })
        })
    }

    /**
     * すべてクリア
     * @returns 
     */
    allClear(){
        return new Promise(resolve=>{
            Promise.all(
                this.db.tables.map(table => table.clear())
            ).then(() => {
                console.log('すべてのテーブルがクリアされました')
                resolve()
            }).catch((error) => {
                console.error('テーブルのクリア中にエラーが発生しました:', error)
                resolve()
            })
        })
    }
    /**
     * テーブルを削除
     */
    async delteStore(){
        await this.db.delete()
    }
}
export default DbClass