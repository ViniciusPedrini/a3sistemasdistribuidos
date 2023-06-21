import express from 'express';
import pool from '../pool.js';

const routes = express.Router();

routes.get("/exercicios", (req, res, error) => {
    const sql = 'SELECT * from exercicios';
    pool.query(sql, (error, results, fields) => {
        if(!error){
            res.status(200).json(results);
        } else {
            res.status(404).end();
        }
    });
});

routes.get("/exercicios/:id", (req, res, error) => {
    const sql = 'SELECT * FROM exercicios WHERE exercicios.id = ' + req.params.id;
    pool.query(sql, (error, results, fields) => {
        if(!error){
            res.status(200).json(results);
        } else {
            res.status(404).json({msg: "sem dados"});
        }
    })
});

routes.get("/exercicios/categoria/:grupo", (req, res, error) => {
    const sql = 'SELECT * FROM exercicios WHERE exercicios.grupo =?';
    const grupo = req.params.grupo;
    pool.query(sql, [grupo], (error, results, fields) => {
        if(!error){
            res.status(200).json(results);
        } else {
            res.status(404).json({msg: "sem dados"});
        }
    })
});

routes.post("/exercicios", (req, res, error) => {
    const sql = 'INSERT INTO exercicios(grupo, nomeExercicio, descricao, duracao, link) VALUES(?, ?, ?, ?, ?)';
    const {grupo, nomeExercicio, descricao, duracao, link} = req.body;            
       pool.query(sql, [grupo, nomeExercicio, descricao, duracao, link], (error, results, fields) => {
        if(!error){
            res.status(200).json(results);
        } else {
            res.status(404).json({msg: "Exercício não Cadastrado"});
        }
    })
});

routes.put("/exercicios", (req, res, error) => {
    const sql = 'UPDATE exercicios SET grupo=?, nomeExercicio=?, descricao=?, duracao=?, link=? WHERE id=?';
    const {grupo, nomeExercicio, descricao, duracao, link, id} = req.body;
    pool.query(sql, [grupo, nomeExercicio, descricao, duracao, link, id], (error, results, fields) => {
        if(!error){
            res.status(200).json(results);
        } else {
            res.status(404).json({msg: "Exercício não atualizado"});
        }
    })
});

routes.put("/exercicios/id/:id", (req, res, error) => {
    const sql = 'UPDATE exercicios SET grupo=?, nomeExercicio=?, descricao=?, duracao=?, link=?, WHERE id=?';
    const {grupo, nomeExercicio, descricao, duracao, link} = req.body;
    const id = req.params.id;
    pool.query(sql, [grupo, nomeExercicio, descricao, duracao, link, id], (error, results, fields) => {
        if(!error){
            res.status(200).json(results);
        } else {
            res.status(404).json({msg: "Exercício não atualizado"});
        }
    })
});

routes.delete("/exercicios/:id", (req, res, error) => {
    const sql = 'DELETE FROM exercicios WHERE id=?';
    const id = req.params.id;
    pool.query(sql, [id], (error, results, fields) => {
        if(!error){
            res.status(200).json(results);
        } else {
            res.status(404).json({msg: error});
        }
    })
});


export default routes;