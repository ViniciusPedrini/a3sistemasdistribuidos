import express from 'express';
import pool from '../pool.js';

const routes = express.Router();

routes.get("/categoriaexercicios", (req, res, error) => {
    const sql = 'SELECT * from categoriaexercicios';
    pool.query(sql, (error, results, fields) => {
        if(!error){
            res.status(200).json(results);
        } else {
            res.status(404).end();
        }
    });
});

routes.get("/categoriaexercicios/:id", (req, res, error) => {
    const sql = 'SELECT * FROM categoriaexercicios WHERE categoriaexercicios.id = ' + req.params.id;
    pool.query(sql, (error, results, fields) => {
        if(!error){
            res.status(200).json(results);
        } else {
            res.status(404).json({msg: "sem dados"});
        }
    })
});

routes.get("/categoriaexercicios/categoria/:grupo", (req, res, error) => {
    const sql = 'SELECT * FROM categoriaexercicios WHERE categoriaexercicios.grupo =?';
    const grupo = req.params.grupo;
    pool.query(sql, [grupo], (error, results, fields) => {
        if(!error){
            res.status(200).json(results);
        } else {
            res.status(404).json({msg: "sem dados"});
        }
    })
});

routes.post("/categoriaexercicios", (req, res, error) => {
    const sql = 'INSERT INTO categoriaexercicios(grupo) VALUES(?)';
    const {grupo} = req.body;            
       pool.query(sql, [grupo], (error, results, fields) => {
        if(!error){
            res.status(200).json(results);
        } else {
            res.status(404).json({msg: "Grupo não Cadastrado"});
        }
    })
});

routes.put("/categoriaexercicios", (req, res, error) => {
    const sql = 'UPDATE categoriaexercicios SET grupo=? WHERE id=?';
    const {grupo, id} = req.body;
    pool.query(sql, [grupo, id], (error, results, fields) => {
        if(!error){
            res.status(200).json(results);
        } else {
            res.status(404).json({msg: "grupo não atualizado"});
        }
    })
});

routes.put("/categoriaexercicios/id/:id", (req, res, error) => {
    const sql = 'UPDATE categoriaexercicios SET grupo=?, WHERE id=?';
    const {grupo} = req.body;
    const id = req.params.id;
    pool.query(sql, [grupo, id], (error, results, fields) => {
        if(!error){
            res.status(200).json(results);
        } else {
            res.status(404).json({msg: "grupo não atualizado"});
        }
    })
});

routes.delete("/categoriaexercicios/:id", (req, res, error) => {
    const sql = 'DELETE FROM categoriaexercicios WHERE id=?';
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