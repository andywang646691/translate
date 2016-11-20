#!/usr/bin/env node

var request = require("request")
var chalk = require("chalk")
var word = process.argv[2] || ""
var queryUrl = "http://fanyi.youdao.com/openapi.do?keyfrom=node-translator&key=2058911035&type=data&doctype=json&version=1.1&q=" + word

var bold = chalk.bold.bgWhite.black
var blue = chalk.bgBlue

request(queryUrl, function(error, response, body) {
    var data = JSON.parse(body)
    if (!error && response.statusCode === 200) {
        console.log("\n" + bold(word))
        console.log("英 " + "[" + data.basic["uk-phonetic"] + "]", "美 " + "[" + data.basic["us-phonetic"] + "]" )
        data.basic.explains.forEach(function(curValue){
            console.log(curValue)
        })
        console.log(bold("网络释义：")  )
        data.web[0].value.forEach(function(curValue){
            console.log(curValue)
        })
        console.log(bold("短语："))
        data.web.slice(1).forEach(function(curValue){
            console.log(blue(curValue.key)  + "  " +  curValue.value.join(";"))
        })
    }
})
