import {Request, Response, Router} from "express";
import {v4 as uuid} from 'uuid';


import {ClientRecord} from "../records/client-record";
import {NotFoundError} from "../utils/errors";


export const clientRouter = Router();


clientRouter

    .get('/', async (req: Request, res: Response) => {
        res.render('client/list-all', {
            clients: await ClientRecord.getAll() as ClientRecord[],
        })
    })
    .get('/:id', async (req: Request, res: Response) => {
        const client = await ClientRecord.getOne(req.params.id) as ClientRecord;
        if (!client) {
            throw new NotFoundError()
        }
        res.render('client/one', {
            client,
        })

    })
    .get('/form/add-form/', (req: Request, res: Response) => {
        res.render('client/form/add-form', {})
    })
    .get('/form/edit-form/:id', async (req: Request, res: Response) => {
        const client = await ClientRecord.getOne(req.params.id) as ClientRecord;
        if (!client) {
            throw new NotFoundError()
        }
        res.render('client/form/edit-form', {
            client,
        })
    })
    .post('/', async (req: Request, res: Response) => {
        const id: string = uuid();
        const newClient = new ClientRecord({...req.body, id});
        await newClient.create();

        res
            .status(201)
            .render('client/added', {
                id: newClient.id,
            })
    })
    .put('/:id', async (req: Request, res: Response) => {
        const id = req.params.id

        new ClientRecord({...req.body, id});
        const client = await ClientRecord.getOne(req.params.id) as ClientRecord;
        if (client === null) {
            throw new NotFoundError()
        }

        await client.update(req.body);


        res.render('client/eddited', {
            name: req.body.name,
            id: req.params.id,
        })

    })
    .delete('/:id', async (req: Request, res: Response) => {

        const client = await ClientRecord.getOne(req.params.id) as ClientRecord;
        if (client === null) {
            throw new NotFoundError()
        }

        await client.delete()
        res.render('client/delete', {
            client,

        })
    })

