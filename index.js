const express = require('express');
const app = express();
const path = require('path')
const http = require('http');
const mysql = require('mysql');
const port = 3000;
const bodyparser = require('body-parser');

const con = mysql.createConnection({
    host: 'sqldemo.softmetrixgroup.com',
    port: '3306',
    user: 'root',
    password: 'smx1111',
    database: 'moneyTracker',
    multipleStatements: true
});

// Body Parser Middleware
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: true }));

// View Engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Set Static Path
app.use(express.static(path.join(__dirname, 'public')));

app.use('js', express.static('js'))

app.get('/', function(req, res) {
    con.query('SELECT main_id, main_date, main_cat, main_sum, main_com FROM main', function(err, result) {
        if (err) {
            throw err;
        } else {
            main = result;
            //console.log(main);
            res.render('index', main);
        }
    })
})

app.post('/delete',(req, res)=> {
    let delete_id = Number(req.body.main_id); 
    console.log(req.params);
    con.query('DELETE FROM main where main_id= ?', [delete_id],(err, rows,fields)=> {
        if (!err) {
            data = {
                deleted: true
            }
            res.send('Deleted successfully.');
        } else {
          console.log(err);
            console.log(main);
           
       }
   })
})

// con.connect(function(err) {
//     if (err) throw err;
//     console.log("Connected!");

//     var sql = "INSERT INTO main (main_id, 'main_date', main_cat, main_sum, main_com) VALUES (DEFAULT,'"+ main_date +"', '"+ main_cat +"','"+ main_sum +"','"+ main_com +"')";
//     con.query(sql, function (err, result) {
//         if (err) throw err;
//         console.log("1 record inserted");
//     });
// });

app.listen(port, function() {
    console.log(`Example app listening on port ${port}!`);
});

