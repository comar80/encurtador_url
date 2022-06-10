import express, { Request, Response } from 'express';
import URLController from './controller/URLController';
import MongoConnection from './database/MongoConnection';

const api = express();
const port = 3000;

api.use(express.json());

const database = MongoConnection;
database.connect();

api.get('/', (req: Request, res: Response) => {
    res.json({message: "Ok"})
})
api.get('/listar', URLController.listURL)
api.post('/shorten', URLController.shorten)
api.get('/:hash', URLController.redirect)


api.listen(port, () => {
    console.log('Iniciando em localhost:3000')
})
