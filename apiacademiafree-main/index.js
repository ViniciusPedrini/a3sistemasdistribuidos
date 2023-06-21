import express from "express";
import pool from './pool.js';
import routeLogin from './routes/login.js';
import routeCategoria from './routes/categoriaexercicios.js';
import routeExercicios from './routes/exercicios.js';

const app = express();
app.use(express.json());
app.use(routeLogin);
app.use(routeCategoria);
app.use(routeExercicios);


const port = 3000;

app.listen(port, () => {
    console.log("Servidor ativo na porta", port);
});
