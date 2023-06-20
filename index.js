const express = require('express')
const app = express()
const exphbs = require('express-handlebars')
const db = require('./connection')


app.engine('handlebars', exphbs.engine());
app.set('view engine', 'handlebars');
app.set('views', './views');

require('./connection')



// middleware for json when data came from mobile
app.use(express.json())
// below middleware for form when data came from form
app.use(express.urlencoded({ extended: true }))



app.post("/employee", (req, res) => {
    console.log(req.body)

    const user = { name: req.body.fullName, email: req.body.email, phone: req.body.phone, city: req.body.city }
    let sql = "INSERT INTO `user` SET ?"
    db.query(sql, user, (err, result) => {
        if (err) console.log(err)
        else
            //tricky point
            res.redirect('employee')
    })
})

//fetch(read) by id

app.get("/employee/:id", (req, res) => {
    console.log("Id", req.params.id)
    let sql = "SELECT* FROM`user` WHERE id=" + req.params.id
    db.query(sql, (err, result) => {
        if (err) console.log(err)
        res.status(200).json(result)

    })

})

//fetch  all

app.get("/employee", (req, res) => {

    let sql = "SELECT * FROM `user`"
    db.query(sql, (err, result) => {
        if (err) console.log(err)
        res.render('show', { data: result })
    })

    //delete

})

// 62 to 85 are only for sql (xampp) not for views and handlebars
app.delete("/employee/:id", (req, res) => {
    let sql = "DELETE FROM `user` WHERE id=" + req.params.id
    db.query(sql, (err, result) => {
        if (err) console.log(err)
        res.status(200).json({ msg: "USER DELETED", result })
    })


})


app.put("/employee/:email", (req, res) => {

    let sql = `UPDATE user SET name = '${req.body.name}' Where email= '${req.params.email}'`;
    console.log(sql)
    db.query = (sql, (err, result) => {
        if (err) console.log(err)
        else
            res.status(200).json({ msg: "USER UPDATED", result })
    })


})

app.get("/add-emp", (req, res) => {
    res.render('home')
})

app.get("/del/:id", (req, res) => {
    // console.log("jjj",req.params.id)
    let sql = "DELETE FROM `user` WHERE id=" + req.params.id
    db.query(sql, (err, result) => {
        if (err) console.log(err)
        else
            // render always goes inside views
            res.redirect('/employee')
    })
})

app.get("/update/:id", (req, res) => {
    let sql = "SELECT * FROM `user` WHERE id=" + req.params.id
    db.query(sql, (err, result) => {
        if (err) console.log(err)
        else
            res.render('update', { data: result[0],id:req.params.id })
    })
})


app.post("/finalupdate", (req,res)=>{
    console.log(req.body)
    let name=req.body.fullName
    let email=req.body.email
    let phone=req.body.phone
    let city=req.body.city
    let sql= `UPDATE user SET name='${name}',email='${email}',phone='${phone}', city='${city}' where id=${req.body.id}`
    db.query(sql,(err,result)=>{
        if(err)console.log(err)
        else{
            res.redirect('/employee')
        }
    })
})







app.listen(4000, () => console.log(`server is running`))