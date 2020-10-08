import express = require('express');
import * as cors from 'cors';
import * as controller from './controller';

//Creamos una nueva instancia para nuestra aplicacion
const app =  express();

//configuraciones
app.set('port',3000);

//middlewares
app.use(cors());
app.use(express.urlencoded({extended: false}));
app.use(express.json());

//rutas
app.get('/', (req, res) => {
    res.send(`Compiladores 1 - Sección B, http://localhost:${app.get('port')}`);
});

app.get('/analisis', controller.analizar);
app.post('/miAuxiliar', controller.miAuxiliar);

export default app;