// routes/users.js
const express = require('express');
let todoDataEn = require('../data/todo.en');
let todoDataEs = require('../data/todo.es');
let todoDataFran = require('../data/todo.fran');
const router = express.Router();

const defaultLang = 'en';

router.get('/', (req, res) => {
    const { lang } = req.query;
    //const todoData = lang === defaultLang ? todoDataEn : todoDataEs : todoDataFran;
    const todoData = lang === defaultLang ? todoDataEn : (lang === 'es' ? todoDataEs : todoDataFran);

    res.send({data: todoData, totalRecords: todoData.length});
});

router.patch('/:id', (req, res) => {
    const { description } = req.body;
    const id = req.params.id;

    const { lang } = req.query;
    //const todoData = lang === defaultLang ? todoDataEn : todoDataEs : todoDataFran;
    const todoData = lang === defaultLang ? todoDataEn : (lang === 'es' ? todoDataEs : todoDataFran);

    const findIndex = todoData.findIndex(item => item.id === id);
    if (findIndex >= 0) {
        todoData[findIndex] = { ... todoData[findIndex], description};
    }
    res.send(todoData[findIndex] ? todoData[findIndex] : {});
});


router.put('/:id', (req, res) => {
    const body = req.body;
    const id = req.params.id;

    const { lang } = req.query;
    //const todoData = lang === defaultLang ? todoDataEn : todoDataEs : todoDataFran;
    const todoData = lang === defaultLang ? todoDataEn : (lang === 'es' ? todoDataEs : todoDataFran);

    const findIndex = todoData.findIndex(item => item.id === id);
    if (findIndex >= 0) {
        todoData[findIndex] = {...body, id};
    }
    res.send(todoData[findIndex] ? todoData[findIndex] : {});
});

router.post('/', (req, res) => {
    const body = {...req.body, id: crypto.randomUUID()};

    const { lang } = req.query;
    //const todoData = lang === defaultLang ? todoDataEn : todoDataEs : todoDataFran;
    let todoData = lang === defaultLang ? todoDataEn : (lang === 'es' ? todoDataEs : todoDataFran);
    todoData.push(body);
    res.send(body);
});

router.delete('/:id', (req, res) => {
    const id = req.params.id;

    const { lang } = req.query;
    //let todoData = lang === defaultLang ? todoDataEn : todoDataEs : todoDataFran;
    let todoData = lang === defaultLang ? todoDataEn : (lang === 'es' ? todoDataEs : todoDataFran);
    todoData = todoData.filter(item => item.id !== id);
    res.send({data: todoData, totalRecords: todoData.length});
});

module.exports = router;