const express = require('express');
const moment = require('moment');
const axios = require('axios');
//Firestore
const db = require("../db");
const router = express.Router();

// /api/test post
router.post("/test", function (req, res, next) {
    //console.log("req: ", req);//使用者的所有資訊
    //取得前端的物件
    const obj = req.body
    console.log("obj", obj);
    const myString = obj.myString;
    //回傳資料給前端
    res.status(200).json({
        msg: `你剛才說的是: ${myString}`
    });

});

// 取得伺服器正確與錯誤訊息範例
router.post('/success-or-error', function (req, res, next) {
    // 取得傳遞進來的物件.isSuccess
    console.log("前端傳來了資料 ", req.body);
    const isSuccess = req.body.isSuccess;
    console.log('[isSuccess]', isSuccess);
    if (isSuccess === '1') {
        // 回傳成功狀態200與資料給前端
        res.status(200).json({
            msg: '請求成功'
        })
    } else {
        // 回傳錯誤狀態400與資料給前端
        res.status(400).send({
            msg: '請求失敗'
        })
    }
});

// 取得當下時間
router.get('/time/current', function (req, res, next) {
    // 取得當下時間戳記
    const timestamp = new Date().getTime();
    console.log('[timestamp]', timestamp);
    // 回傳成功狀態200與資料給前端
    res.status(200).json({
        timestamp: timestamp
    })
});

// 取得特定時間格式
router.post('/time/format', function (req, res, next) {
    // 取得:formatString的值
    console.log('[req.body]', req.body);
    const formatString = req.body.format;
    // 取得當下時間戳記
    const timestamp = new Date().getTime();
    console.log('[formatString]', formatString);
    console.log('[timestamp]', timestamp);
    // 將時間格式處理為前端指定格式
    const date = moment(timestamp).format(formatString)
    // 回傳成功狀態200與資料給前端
    res.status(200).json({
        timestamp: timestamp,
        formatString: formatString,
        date: date
    })
});

// 登入
router.post('/login', function (req, res, next) {

});

// 登出
router.post('/logout', function (req, res, next) {

});

// 取得商品列表
router.get('/product/list', function (req, res, next) {

});

// 新增商品
router.post('/product/create', function (req, res, next) {
    const product = req.body;
    console.log("product", product);
    //把商品加到資料庫

    db
        .collection("products")
        .add(product)
        //成功
        .then(r => {
            console.log("資料寫入成功", r);
            //通知前端
            res.status(200).json({
                msg: "OK"
            })
        })
        //失敗
        .catch(err => {
            console.log("資料寫入失敗", err);
            //通知前端
            res.status(500).json({
                error: err
            })
        })

});

// 更新商品
router.put('/product/:pid', function (req, res, next) {

});

// 刪除商品
router.delete('/product/:pid', function (req, res, next) {

});

module.exports = router;
