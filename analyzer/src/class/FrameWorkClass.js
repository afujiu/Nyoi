
import DbClass from "./DbClass.js"
import SourceClass from "./node/SourceClass.js"

/**
 * 
 * フレームワーク
 */
class FrameWork {
    constructor(){
        // 分析用カードの保存
        this._analyzeNode = new DbClass("analyzeNode",['type','uniKey','name','config'])
        this._analyzeNodeList=[]
        this.initAnalyzeNode()
    }

    /** ソースノード******************************************************************************* */
    /**
     * ソースノード取得
     */
    async initAnalyzeNode(){
        const nodeList = await this._analyzeNode.get()
        for(const idx in nodeList){
            const node = nodeList[idx]
            const newSource = new SourceClass()
            await newSource.setTable(node.uniKey,node.name,node.config)
            this._analyzeNodeList.push(newSource)
        }
    }
    /**
     * ソースノード追加
     */
    async addSourceNode(name,columns){
        const newSource = new SourceClass()
        await newSource.createTable(name,columns)
        await this._analyzeNode.add(newSource.getTableFormat())
        this._analyzeNodeList.push(newSource)
    }
    /**
     * ソースノード削除
     * @param {*} uniKey 
     */
    async deleteSourceNode(uniKey){
        const idx = this._analyzeNodeList.findIndex(v=>v.uniKey == uniKey)
        if(idx==-1){
            return
        }
        await this._analyzeNode.deleteWhere("uniKey",uniKey)
        this._analyzeNodeList[idx].clearSource()
        this._analyzeNodeList.splice(idx, 1)
    }
    /**
     * ノード一覧
     */
    get nodeList(){
        return this._analyzeNodeList
    }
   /** ソースノード******************************************************************************* */
}

export default FrameWork