require ('dotenv').config()
const express = require ('express');
const bodyParser = require('body-parser');
const app = express();
const mysql = require('mysql2')
const axios = require("axios");
app.use(bodyParser.json());
const lembretes = {};
const {DB_USER, DB_PASSWORD, DB_HOST, DB_DATABASE} = process.env

const pool = mysql.createPool({
    host: DB_HOST,
    user: DB_USER,
    password: DB_PASSWORD,
    database: DB_DATABASE,

    waitForConnections: true,

    connectionLimit: 10,

    queueLimit: 0
})

contador = 0;

app.get ('/lembretes', (req, res) => {
    res.send(lembretes);
});

app.put('/lembretes', async (req, res) => {
    contador++;
    const { cpf } = req.body;
    const { nome } = req.body;
    const { idade } = req.body;
    const { ano } = req.body;
    const { stats } = req.body;
    const { observacoes } = req.body;
    lembretes[contador] = {
        contador, cpf ,nome, idade, ano, stats, observacoes
    }
    await axios.post("http://localhost:6000/eventos", {
            tipo: "LembreteCriado",
            dados: {
            contador,
            cpf, nome, idade, ano, stats, observacoes
        },
    });
    res.status(201).send(lembretes[contador]);
    });

app.get('/lembretes', (req, res) => {
    const connection = mysql.createConnection({
        host: 'DB_HOST',
        user: 'DB_USER',
        database: 'DB_DATABASE',
        password: 'DB_PASSWORD'
})
        connection.query('SELECT * FROM tb_paciente', (err, results, fields) =>
{
        res.json(results)
    })
})

app.get('/consultas', (req, res) => {
    const connection = mysql.createConnection({
        host: DB_HOST,
        user: DB_USER,
        database: DB_DATABASE,
        password: DB_PASSWORD
    })
    const sql = `
        SELECT
            c.data_hora, p.nome as nome_paciente
        FROM
            tb_consulta c, tb_paciente p
        WHERE
            c.cpf = p.cpf
    `
    connection.query(
        sql,
        (err, results, fields) => {
            res.json(results)
        }
    )
})

app.post("/eventos", (req, res) => {
    console.log(req.body);
    res.status(200).send({ msg: "ok" });
});

app.listen(4000, () => {
console.log('Lembretes. Porta 4000');
});