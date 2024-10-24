/**
 * 汎用機能クラス
 */
class UtilClass{
    /**
     * 前ゼロ埋め
     * @param {*} num 
     * @param {*} len 
     * @param {*} str 
     * @returns 
     */
    static preStr(num,len,str="0"){
        return ( Array(len).join(str) + num ).slice( -len );
    }
    /**
     * ユニークid
     * @returns 
     */
    static uid(){
        const time = new Date()
        const minSec=time.getTime()
        const rand = Math.floor(Math.random() * 100000000000)
        return minSec.toString(36)+"-"+rand.toString(36)
    }
    /**
     * ミリ秒
     * @returns 
     */
    static ms(){
        const time = new Date()
        const minSec=time.getTime()
        return minSec
    }
    /**
     * ダウンローダー
     * @param {*} fileName 
     * @param {*} content 
     */
    static download(fileName,content){
        let blob = new Blob([ content ], { "type" : "text/plain" })
        if (window.navigator.msSaveBlob) { 
            window.navigator.msSaveBlob(blob, fileName); 
            window.navigator.msSaveOrOpenBlob(blob,fileName)
        } else {
            let elm=document.createElement("a")
            elm.href=window.URL.createObjectURL(blob)
            elm.download = fileName
            elm.click()
        }
    }
    /**
     * 画像ファイルダウンローダー
     * @param {*} fileName 
     * @param {*} image 
     */
    static downloadImg(fileName,image){
        if (window.navigator.msSaveBlob) { 
            window.navigator.msSaveBlob(image, fileName); 
            window.navigator.msSaveOrOpenBlob(image,fileName)
        } else {
            let elm=document.createElement("a")
            elm.href=image
            elm.download = fileName
            elm.click()
        }
    }
    static getDownloadElement(fileName,content){
        let blob = new Blob([ content ], { "type" : "text/plain" })
        if (window.navigator.msSaveBlob) { 
            window.navigator.msSaveBlob(blob, fileName); 
            window.navigator.msSaveOrOpenBlob(blob,fileName)
        } else {
            let elm=document.createElement("a")
            elm.href=window.URL.createObjectURL(blob)
            elm.download = fileName
            elm.innerHTML=fileName
            return elm
        }
    }
    /**
     * #00112233 -> [r,g,b,a]
     * @param {*} str 
     * @returns 
     */
    static colorToArray(str){
        str=str.replace("#","")
        let r=str.substr(0,2)
        r=parseInt(r,16)
        let g=str.substr(2,2)
        g=parseInt(g,16)
        let b=str.substr(4,2)
        b=parseInt(b,16)
        let a=str.substr(6,2)
        a=(a==''||a==null)?1:parseInt(a,16)
        return [r,g,b,a]
    }
    /**
     * [r,g,b,a] ->#00112233
     * @param {*} str 
     * @returns 
     */
    static colorTo16(arr){
        let r=ColorClass.get16(arr[0])
        let g=ColorClass.get16(arr[1])
        let b=ColorClass.get16(arr[2])
        let a=ColorClass.get16(arr[3])
        let str=`${r}${g}${b}${a}`
        return '#'+str.toUpperCase()
    }
    /**
     * 偶数の場合true
     */
    static checkEven(cnt){
        if (cnt % 2 === 0) {
            return true
        }else{
            return false
        }
    }
}