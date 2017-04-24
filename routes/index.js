var express = require('express');
var router = express.Router();
var db = require("./db.js");

/* 列表页. */
router.get('/', function (req, res, next) {

    db.query("select * from users", function (err, rows) {
        if (err) {
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
    db.query("delete from users where id=" + id, function (err, rows) {
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
    db.query("select * from users where id=" + id, function (err, rows) {
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

    db.query("update users set name='"+name+"',age="+age+",sex='"+sex+"' where id=" + id, function (err, rows) {
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

    db.query("insert into users(name,sex,age) values('"+name+"','"+sex+"',"+age+")", function (err, rows) {
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
router.post("/search",function(req,res) {
    var name = req.body.s_name;
    var sex = req.body.s_sex;
    var age = req.body.s_age;

    var sql = "select * from users";
    if(name){
        sql += " and name like "+"'"+"%"+name+"%"+"'";
    }
    if(sex){
        sql += " and sex='"+sex+"' ";
    }
    if(age){
        sql += " and age='"+age+"' ";
    }
    sql = sql.replace(/and/,"where");

    db.query(sql, function (err, rows) {
        if (err) {
            res.end("查询失败：" + err);
        } else {
            res.render('index', {title: 'Express', users: rows,s_name:name,s_sex:sex,s_age:age});
        }
    });
});
module.exports = router;
