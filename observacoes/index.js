require ('dotenv').config()
const express = require ('express');
const bodyParser = require('body-parser');
const mysql = require('mysql2')
const app = express();
const axios = require ('axios');

app.use(bodyParser.json());
const {DB_USER, DB_PASSWORD, DB_HOST, DB_DATABASE} = process.env

const observacoesPorLembreteId = {};

const { v4: uuidv4 } = require('uuid');

const pool = mysql.createPool({
    host: DB_HOST,
    user: DB_USER,
    password: DB_PASSWORD,
    database: DB_DATABASE,

    waitForConnections: true,

    connectionLimit: 10,

    queueLimit: 0
    })


app.put('/lembretes/:id/observacoes', async (req, res) => {
    const idObs = uuidv4();
    const { observacao } = req.body;
    const { data_hora } = req.body;

    const observacoesDoLembrete =
        observacoesPorLembreteId[req.params.id] || [];
    observacoesDoLembrete.push({ id: idObs, observacao, data_hora });
    observacoesPorLembreteId[req.params.id] =
        observacoesDoLembrete;
    await axios.post('http://localhost:6000/eventos', {
            tipo: "ObservacaoCriada",
            dados: {
            id: idObs, observacao, data_hora, lembreteId: req.params.id
        }
    })
    res.status(201).send(observacoesDoLembrete);
});

app.get('/lembretes/:id/observacoes', (req, res) => {
    res.send(observacoesPorLembreteId[req.params.id] || []);
});

app.get('/pacientes', (req, res) => {
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

app.post("/eventos", (req, res) => {
    console.log(req.body);
    res.status(200).send({ msg: "ok" });
});

app.listen(5000, (() => {
console.log('Observacoes. Porta 5000');
}));