// 初始化firebase
// FIREBASE NODE.JS初始化文件
// https://firebase.google.com/docs/admin/setup
const admin = require("firebase-admin");

// TODO: 初始化FIREBASE
const serviceAccount = require("./key.json");
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://csie-325-shiya.firebaseio.com"
})

module.exports = admin;