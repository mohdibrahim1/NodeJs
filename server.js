const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser');
const env = require('./env');
const db = require('./helper/db');
const res = require('express/lib/response');
const app = express();
const Dish = db.Dish;
// const { Client } = require('pg');
// const { send } = require('express/lib/response');
// const { response } = require('express');


// const client = new Client({
//     connectionString: env.connectionString
// })
// client.connect();
app.use(bodyParser.json());
app.use(cors());
// app.use(function (req, res, next) {
//     res.header('cache-control', 'private', 'no-cache,no-StorageEvent,must-revalidate');
//     res.header("Expires", '-1');
//     res.header("pragma", 'no-cache');
//     next();
// })

// client.query(`SELECT * FROM dish."Dish"`, (err, res) => {
//     console.log(res.rows);
//     client.end;
// })

// app.use(bodyParser.json())

// const port = 3002;
var stdRecord = [{ id: 1, Name: "ibrahim", Email: 'ibrahim@teckraft.com' },
{ id: 2, Name: "ahmed", Email: 'ahmed@teckraft.com' },
{ id: 3, Name: "faiz", Email: 'faiz@teckraft.com' },
{ id: 4, Name: "zakir", Email: 'zakir@teckraft.com' }]
app.get('/', (req, res) => {
    console.log("starting and endpoint")
    res.send("Hello world")
})
app.get('/Dish', async (req, response) => {
    await Dish.findAll().then(list => {
        //    response.sendStatus(200);
        response.send(list);
    }).catch(err => console.log(err))
    // console.log(record);
    // response.send(record);
    // response.send("dish record")
    // client.query(`SELECT * FROM dish."Dish"`, (err, res) => {
    //     console.log(res.rows);
    //     response.send(res.rows);
    //     client.end;
    // })
})
app.post('/dishPost', async (req, response) => {
    console.log(req.body);
    const { id } = req.body;
    const { dishName } = req.body;
    const { price } = req.body;
    console.log(req.body);
    // insert into dish."Dish"(id, "dishName", price)values(11, 'seekh', 100)
    // client.query(`insert into dish."Dish"(id,"dishName",price) values (${id},'${dishName}',${price})`)
    await Dish.create({
        id,
        dishName,
        price
    }).then(() => {
        response.send('Data Added')
    }).catch(err => console.log(err))
})
app.delete('/dishDelete/:id', async (req, res) => {
    // console.log(req.body);
    const { id } = req.params;
    console.log("id ", id)
    await Dish.destroy({
        where: {
            id: id
        }
    }).then(() => {
        res.send('Data Deleted')
    }).catch(err => console.log(err))
    // client.query(`delete from dish."Dish" where id =${id}`)
})
app.put('/dishUpdate/:id', async (req, res) => {
    const { id } = req.params;
    const { dishName } = req.body;
    const { price } = req.body;
    await Dish.update({ dishName, price }, {
        where: {
            id: id
        }
    }).then(()=>{
        res.send('data updated')
    }).catch(err =>console.log(err))
})


    app.put('/dishUpdate/:id', (req, res) => {
        console.log(req.bod);
        const { id } = req.body;
        const { dishName } = req.body;
        const { price } = req.body;
        // client.query(`update dish."Dish" SET $price =${price} where id=${id}`)


    })
    app.get('/home', (req, res) => {
        res.send("HomeController")
    })
    app.get('/student', (req, res) => {
        res.send(stdRecord)
    })
    app.post('/studentAdd', (req, res) => {
        stdRecord.push(req.body);
        res.send(stdRecord);
        console.log(req.body);
    })
    app.put('/student/:id', (req, res) => {
        const { id } = req.params;
        stdRecord = stdRecord.map((records) => records.id == id ? req.body : records);
        console.log("student records", stdRecord);
        res.send(stdRecord);

    })
    app.delete('/student/:id', (req, res) => {
        const { id } = req.params;
        stdRecord = stdRecord.filter((x) => x.id != id);
        res.send(stdRecord);
    })
    app.listen(env.port, () => {
        console.log('server started', env.port)
    })