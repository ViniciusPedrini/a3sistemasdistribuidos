import express from 'express';
import pool from '../pool.js';

const routes = express.Router();


routes.get("/login", (req, res, error) => {
    const sql = 'SELECT * from login';
    pool.query(sql, (error, results, fields) => {
        if(!error){
            res.status(200).json(results);
        } else {
            res.status(404).end();
        }
    });
});

routes.get("/login/:id", (req, res, error) => {
    const sql = 'SELECT * FROM login WHERE login.id = ' + req.params.id;
    pool.query(sql, (error, results, fields) => {
        if(!error){
            res.status(200).json(results);
        } else {
            res.status(404).json({msg: "sem dados"});
        }
    })
});

routes.get("/login/email/:email", (req, res, error) => {
    const sql = 'SELECT * FROM login WHERE login.email =?';
    const email = req.params.email;
    pool.query(sql, [email], (error, results, fields) => {
        if(!error){
            res.status(200).json(results);
        } else {
            res.status(404).json({msg: "sem dados"});
        }
    })
});

routes.post("/login", (req, res, error) => {
    const sql = 'INSERT INTO login(email, senha, nome, tipoUsuario)' + 
                'VALUES           (    ?,     ?,    ?,           ?)';
    const {email, senha, nome, tipoUsuario} = req.body;            
       pool.query(sql, [email, senha, nome, tipoUsuario], (error, results, fields) => {
        if(!error){
            res.status(200).json(results);
        } else {
            res.status(404).json({msg: "login cadastrado"});
        }
    })
});

routes.put("/login", (req, res, error) => {
    const sql = 'UPDATE login SET email=?, senha=?, nome=?, tipoUsuario=? WHERE id=?';
    const {email, senha, nome, tipoUsuario, id} = req.body;
    pool.query(sql, [email, senha, nome, tipoUsuario, id], (error, results, fields) => {
        if(!error){
            res.status(200).json(results);
        } else {
            res.status(404).json({msg: "login cadastrado"});
        }
    })
});

routes.put("/login/id/:id", (req, res, error) => {
    const sql = 'UPDATE login SET email=?, senha=?, nome=?, tipoUsuario=? WHERE id=?';
    const {email, senha, nome, tipoUsuario} = req.body;
    const id = req.params.id;
    pool.query(sql, [email, senha, nome, tipoUsuario, id], (error, results, fields) => {
        if(!error){
            res.status(200).json(results);
        } else {
            res.status(404).json({msg: "login cadastrado"});
        }
    })
});

routes.delete("/login/:id", (req, res, error) => {
    const sql = 'DELETE FROM login WHERE id=?';
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