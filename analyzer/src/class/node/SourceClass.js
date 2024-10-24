import KintoneClass from "../KintoneClass.js"
import DbClass from "../DbClass.js"

/**
 * データソース
 */
class SourceClass {
    constructor(){
        this._prima
        this._uniKey=""
        this._name=""
        this._config={
            columns:[]
        }
        this._db = null
    }
/****getter************************************************** */
    get uniKey(){
        return this._uniKey
    }
    set name(name){
        this._name = name
    }
    get name(){
        return this._name
    }
    get config(){
        return this._config
    }
    set config (comfig){
        this._config = config
    }
    get columns(){
        return this._config.columns
    }
    set columns(columns){
        if(this._config['columns']==null){
            return []
        }
        this._config.columns = columns
    }
    get columnsNoPrimary(){
        let columns = JSON.parse(JSON.stringify(this._config.columns))
        columns = columns.filter((a)=>{
            return a !== "++dbid"
        })
        return columns
    }
/****テーブル操作********************************************* */
    /**
     * 新規でテーブル作成
     * @param {*} uniKey 
     * @param {*} name 
     * @param {*} concolufig 
     */
    async createTable(name,columns){
        this._uniKey = UtilClass.uid()
        this._name = name
        this._config={
            columns:columns
        }
        this._db = new DbClass(this._uniKey,columns)
        await this.getRecord()
    }

    /**
     * DBからデータセット
     * @param {*} name 
     * @param {*} columns 
     */
    async setTable(uniKey,name,config){
        this._uniKey = uniKey
        this._name = name
        this._config=JSON.parse(config)
        this._db = new DbClass(uniKey,this._config.columns)
        await this.getRecord()
    }

    /**
     * analyzeNode用のjson取得
     */
    getTableFormat(){
        return {
            type:"source",
            uniKey:this._uniKey,
            name:this._name,
            config:JSON.stringify(this._config)
        }
    }

    /**
     * 要素削除
     */
    async clearSource(){
        this._db.clear()
        await this._db.delteStore()
    }

    /**
     * 登録用のjsonテンプレートを作成
     */
    get templete(){
        const json = {}
        for(let idx in this.columns){
            if(this.columns[idx].indexOf('++')!=-1){
                continue
            }
            json[this.columns[idx]]=""
        }
        return json
    }
/************************************************************ */

/****レコード操作********************************************* */

    /**
     * レコード登録
     * @param {*} data 
     */
    async addRecord(data){
        await this._db.add(data)
    }
    async getRecord(){
        await this._db.get()
        return this._db.list
    }
    get records(){
        return this._db.list
    }
/************************************************************ */
}
export default SourceClass