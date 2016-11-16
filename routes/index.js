var express = require('express');
var router = express.Router();
var db = require("./db.js");

/* 列表页. */
router.get('/', function (req, res, next) {

    db.query("select * from test2", function (err, rows) {
        if (err) {
            console.log(err);
            res.render('index', {title: 'Express', users: []});
        } else {
            res.render('index', {title: 'Express', users: rows});
        }
    });

});

/**
 *删除
 */
router.get("/del/:id", function (req, res) {
    var id = req.params.id;
    db.query("delete from test2 where id=" + id, function (err, rows) {
        if (err) {
            res.end("删除失败：" + err);
        } else {
            res.redirect("/");      //请求重定向
        }
    });
});

/**
 * 修改页面跳转
 */
router.get("/toUpdate/:id", function (req, res) {
    var id = req.params.id;
    db.query("select * from test2 where id=" + id, function (err, rows) {
        console.log(rows);
        if (err) {
            res.end("修改页面跳转失败：" + err);
        } else {
            res.render("update",{users:rows});       //直接跳转
        }
    });
});

/**
 * 修改
 */
router.post("/update",function(req,res){
     var id = req.body.id;      //post、get请求区别
     var name = req.body.name;
     var age = req.body.age;
     var sex = req.body.sex;

    db.query("update test2 set name='"+name+"',age="+age+",sex='"+sex+"' where id=" + id, function (err, rows) {
        console.log(rows);
        if (err) {
            res.end("修改失败：" + err);
        } else {
            res.redirect("/");      //请求重定向
        }
    });
});

/**
 * 新增页面跳转
 */
router.get("/toAdd", function (req,res) {
     res.render("add");
});

/**
 * 新增
 */
router.post("/add",function(req,res){
    var name = req.body.name;
    var age = req.body.age;
    var sex = req.body.sex;

    db.query("insert into test2(name,sex,age) values('"+name+"','"+sex+"',"+age+")", function (err, rows) {
        console.log(rows);
        if (err) {
            res.end("新增失败：" + err);
        } else {
            res.redirect("/");      //请求重定向
        }
    });
});

/**
 * 查询
 */
router.post("/search",function(req,res){
    var name = req.body.s_name;
    var sex = req.body.s_sex;

    var sql = "select * from test2";
    if(name){
        sql += " and name='"+name+"' ";
    }
    if(sex){
        sql += " and sex='"+sex+"' ";
    }

    sql = sql.replace(/and/,"where");

    db.query(sql, function (err, rows) {
        console.log(rows);
        if (err) {
            res.end("查询失败：" + err);
        } else {
            res.render('index', {title: 'Express', users: rows,s_name:name,s_sex:sex});
        }
    });
});
module.exports = router;
