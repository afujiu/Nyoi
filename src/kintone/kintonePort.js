/***************************************************
 * フロントへ公開するAPI一覧
 * 
****************************************************/
const kintoneConnect = require("./kintoneConnect.js")
port = (rest) => {

    /** フィールド情報取得
     * 
     * param
     *  domain:kintoneサブドメイン
     *  app:アプリID
     *  token:アプリトークン
     *  query:kintoneの検索条件、並び順
     * response
     *  Kintoneレイアウト
     */
    rest.post(`/kintone/getField`, async (req, res, next) => {
      try{
        const request = kintoneConnect.getParam(req)
        success(res,await kintoneConnect.getField(request))
        return
      }catch (e){
        console.log(e)
        error(res,e.message)
      }
    })

    /** レコード登録
     * param
     *  domain:kintoneサブドメイン
     *  app:アプリID
     *  token:アプリトークン
     *  records:登録データ
     * response
     *  レコード番号付きの登録 records
     */
    rest.post(`/kintone/create`, async (req, res, next) => {
      try{
        const request = kintoneConnect.getParam(req)
        success(res,await kintoneConnect.create(request))
        return
      }catch (e){
        console.log(e)
        error(res,e.message)
      }
    })

    /** レコード取得
     *
     * param
     *  domain:kintoneサブドメイン
     *  app:アプリID
     *  token:アプリトークン
     *  query:kintoneの検索条件、並び順
     * response
     *  records:レコード一覧
     *  totalRows:合計数
     *  fields:フィールド情報
     */
    rest.post(`/kintone/read`, async (req, res, next) => {
      try{
        const request = kintoneConnect.getParam(req)
        success(res,await kintoneConnect.read(request))
        return
      }catch (e){
        console.log(e)
        error(res,e.message)
      }
    })

    /** レコード修正
     * param
     *  domain:kintoneサブドメイン
     *  app:アプリID
     *  token:アプリトークン
     *  records:登録データ
     * response
     *  レコード番号付きの登録 records
     */
    rest.post(`/kintone/update`, async (req, res, next) => {
      try{
        const request = kintoneConnect.getParam(req)
        success(res,await kintoneConnect.update(request))
        return
      }catch (e){
        console.log(e)
        error(res,e.message)
      }
    })

}


/** 正常値を返す
 * @param {*} res 
 * @param {*} json 
 */
const success = (res,json) => {
  res.json(JSON.stringify( {status: true, result: json, err: null}))
  res.end()
}

/** エラーを返す
 * @param {*} res 
 * @param {*} errMsgArray 
 */
const error = (res,err) => {
  res.json(JSON.stringify( {status: false, result: null, err: err}))
  res.end()
}

module.exports = {
  port
}