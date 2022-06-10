import { Request, Response } from "express";
import shortid from 'shortid';
import config from '../config/Constants';
import { URLModel } from "../models/URL";

class URLController {
    public async shorten(req: Request, res: Response): Promise<void>{
        const { originURL } = req.body;

        //verifica se a URL já existe
        const url = await URLModel.findOne({originURL})
        if(url){
            res.json(url)
            return
        }

        //criando hash para url
        const hash = shortid.generate();
        const shortURL = `${config.API_URL}/${hash}`

        //salvar url no banco
        const newURL = await URLModel.create({hash, shortURL, originURL})

        res.json(newURL)
    }

    public async redirect(req: Request, res: Response): Promise<void>{
        const { hash } = req.params;
        const url = await URLModel.findOne({hash})

        if(url){
            res.redirect(url.originURL)
            return
        }

        res.status(400).json({error: "URL não encontrada"})
    }

    public async listURL(req: Request, res: Response): Promise<void>{
        const listUrl = await URLModel.find()

        res.json(listUrl);
    }
}

export default new URLController();