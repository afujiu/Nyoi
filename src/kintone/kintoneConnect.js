/***************************************************
 * Kintoneへアクセスするメソッド一覧
 * 
****************************************************/
const request = require(`request`)

/**
 * Requestパラメータをチェック、取得
 * @param {*} req 
 * @returns 
 */
getParam = (req) => {
  let request = {}
  if(req.body!=null){
    if(req.body['domain'] != null){request['domain'] = req.body['domain']}else{throw new Error('ドメインは必須')}
    if(req.body['app'] != null){request['app'] = req.body['app']}else{throw new Error('APPIDは必須')}
    if(req.body['token'] != null){request['token'] = req.body['token']}else{throw new Error('アプリトークンは必須')}
    if(req.body['query'] != null){request['query'] = req.body['query']}else{request['query'] = ''}
    if(req.body['records'] != null){request['records'] = req.body['records']}else{request['records'] = []}
  }else{
    throw new Error('リクエストデータ不正')
  }
  return request
}

/**
 * フィールド情報
 * response
 *  kintoneのレイアウトそのまま
 */
 getField = (req) => {
  const domain = req.domain
  const app = req.app
  const token = req.token
  const query = req.query
  return new Promise(resolve=>{
    request(
      {
        url: `https://${domain}.cybozu.com/k/v1/app/form/fields.json`,
        method: 'GET',
        headers: {
          'Content-type': `application/json`,
          "X-Cybozu-API-Token": token,
        },
        json: true,
        body: {
          'app': app,
        }
      }, (err, req, data) => {
        let templete={}
        // data.properties
        const funcInitialByType=(type)=>{
          switch(type){
            case'CHECK_BOX':
            case'USER_SELECT':
            case'FILE':
            case'MULTI_SELECT':
            return []
            default:
            return ''
          }
        }
        for(const columnName in data.properties){
          const column = data.properties[columnName]
          if(column.type=='SUBTABLE'){
            const fields ={}
            for(const tableColumnName in column.fields){
              if(tableColumnName==undefined){
                continue
              }
              fields[tableColumnName]=funcInitialByType(column.fields[tableColumnName].type)
            }
            templete[columnName] = [fields]
          }else{
            if(column==undefined){
              continue
            }
            templete[columnName] = funcInitialByType(column.type)
          }
        }
        resolve({origin:data,templete:templete})
      }
    )
  })
}

/**
 * 作成
 */
create = async(req) => {
  const domain = req.domain
  const app = req.app
  const token = req.token
  const records = req.records
  if(!Array.isArray(records)){
    return {status:false,data:null,err:'No Array'}
  }
  const body ={
    'records': createKintoneFormat(records),
    'app': app,
  }
  //return
  return new Promise(resolve=>{
    request(
      {
        url: `https://${domain}.cybozu.com/k/v1/records.json`,
        method: 'POST',
        headers: {
          'Content-type': `application/json`,
          "X-Cybozu-API-Token": token,
        },
        json: true,
        body: body
      }, async(err, resultReq, data) => {
        if (err == null) {
          if (data['message']==undefined) {
            req.query = `レコード番号 in(${data['ids'].join(',')})`
            resolve(await read(req))
          }else{
            resolve({status:false,data:null,err:data['message']})
          }
        }else{
          resolve({status:false,data:null,err:err})
        }
      }
    )
  })
}

/**
 * データ取得
 *response
 * records:レコード一覧
 * totalrows:合計数
 */
read = async(req) => {
  const limit = 500
  const domain = req.domain
  const app = req.app
  const token = req.token
  const query = req.query
  let func = (offset, list) => {
    return new Promise(resolve=>{
      request(
        {
          url: `https://${domain}.cybozu.com/k/v1/records.json`,
          method: 'GET',
          headers: {
            'Content-type': `application/json`,
            "X-Cybozu-API-Token": token,
          },
          json: true,
          body: {
            'query': `${query} limit ${limit} offset ${(offset * limit)}`,
            'app': app,
          }
        }, (err, resultReq, data) => {
          if(data==null){
            resolve({status:false,data:null,err:err})
            return
          }
          if(data.records==null){
            resolve({status:false,data:null,err:err})
            return
          }
          list = list.concat(data.records)
          if (data.records.length != limit || offset > 20) {
            resolve({status:true,data:list,err:null})
            return
          } else {
            func(offset + 1, list)
          }
        }
      )
    })
  }
  const result= await func(0, [])
  if(!result.status){
    throw new Error(result.err)
  }
  let records = result.data
  // kintoneの配列攻勢をフラット化
  let flattening = flatteningKintoneFormat(records)
  let totalRows=result.data.length
  // await getField(req)
  return {records:flattening.records,totalRows:totalRows,fields:flattening.fields}
}

/**
 * 
 */
update = async(req) => {
  const domain = req.domain
  const app = req.app
  const token = req.token
  const records = req.records
  if(!Array.isArray(records)){
    return {status:false,data:null,err:'No Array'}
  }
  const body ={
    'records': updateKintoneFormat(records),
    'app': app,
  }
  //return
  return new Promise(resolve=>{
    request(
      {
        url: `https://${domain}.cybozu.com/k/v1/records.json`,
        method: 'PUT',
        headers: {
          'Content-type': `application/json`,
          "X-Cybozu-API-Token": token,
        },
        json: true,
        body: body
      }, async(err, resultReq, data) => {
        if (err == null) {
          if (data['message']==undefined) {
            let ids = []
            for(const resultData of data.records){
              ids.push(resultData.id)
            }
            req.query = `レコード番号 in(${ids.join(',')})`
            resolve(await read(req))
          }else{
            resolve({status:false,data:null,err:data['message']})
          }
        }else{
          resolve({status:false,data:null,err:err})
        }
      }
    )
  })
}

/**
 * 
 */
del = async(req) => {

}

module.exports = {
  getParam,
  getField,
  create,
  read,
  update,
  del
}

/** kintoneのフォーマットに変換
 * @param {*} preList 
 * @returns 
 */
const createKintoneFormat=(preList)=>{
  let list=[]
  for(const idx in preList){
    const one = preList[idx]
    let oneData={}
    for(const key in one){
      // 登録時不要項目
      if(key=='$id'||key=='$revision'||key=='レコード番号'||key=='更新者'||key=='作業者'
        ||key=='作成者'||key=='更新日時'||key=='作成日時'||key=='ステータス'||key=='カテゴリー'){
        continue
      }
      oneData[key]={value:one[key]}
    }
    list.push(oneData)
  }
  return list
}

/** kintoneのフォーマットに変換
 * @param {*} preList 
 * @returns 
 */
const updateKintoneFormat=(preList)=>{
  let list=[]
  for(const idx in preList){
    const one = preList[idx]
    let oneData={}
    const id = one.$id
    const revision = one.$revision
    for(const key in one){
      // 登録時不要項目
      if(key=='$id'||key=='$revision'||key=='レコード番号'||key=='更新者'||key=='作業者'||key=='作成者'||key=='更新日時'||key=='作成日時'||key=='ステータス'||key=='カテゴリー'){
        continue
      }
      oneData[key]={value:one[key]}
    }
    const data = {id:id,revision:revision,record:oneData}
    list.push(data)
  }
  return list
}


/** kintoneのフォーマットをkey:valueにする
 * 途中のvalueを抜く
 * @param {*} preList 
 * @returns 
 */
const flatteningKintoneFormat=(preList)=>{
  let list=[]
  let fields={}
  for(const one of preList){
    let oneData={}
    for(const key in one){
      if(one[key].type=='USER_SELECT'){
        oneData[key] = ''
        const users = one[key].value
        let userList=[]
        for(const user of users){
          userList.push({code:user.code,name:user.name})
        }
        oneData[key] = userList
        fields[key] = one[key].type
      }
      else if(one[key].type=='SUBTABLE'){
        let table = one[key].value
        let valTable=[]
        for(let oneLine of table){
          let colmns={}
          for(let colName in oneLine.value){
            colmns[colName] = oneLine.value[colName]
          }
          valTable.push(colmns)
        }
        const tableResult = flatteningKintoneFormat(valTable)
        oneData[key] =tableResult.records
        fields[key] = tableResult.fields
      }else{
        oneData[key] = one[key].value
        fields[key] = one[key].type
      }
    }
    list.push(oneData)
  }
  return {records:list,fields:fields}
}