"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const URLController_1 = __importDefault(require("./controller/URLController"));
const MongoConnection_1 = __importDefault(require("./database/MongoConnection"));
const api = (0, express_1.default)();
const port = 3000;
api.use(express_1.default.json());
const database = MongoConnection_1.default;
database.connect();
api.get('/', (req, res) => {
    res.json({ message: "Ok" });
});
api.get('/listar', URLController_1.default.listURL);
api.post('/shorten', URLController_1.default.shorten);
api.get('/:hash', URLController_1.default.redirect);
api.listen(port, () => {
    console.log('Iniciando em localhost:3000');
});
