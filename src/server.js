/******************************
 * node.jsの基本設定
 */
const express = require(`express`)
const rest = express()
const cors = require(`cors`)
const kintonePort = require("./kintone/kintonePort.js")

rest.listen(8080, () => {
    console.log('8080 started')
})
rest.use(express.urlencoded({ extended: true, limit: `1000mb` }))
rest.use(express.json({ extended: true, limit: `1000mb` }))
rest.use(cors())
kintonePort.port(rest)
