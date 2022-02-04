import * as express from 'express';
import 'express-async-errors';
import * as methodOverride from 'method-override';
import {engine} from "express-handlebars";


import {clientRouter} from "./routers/client";
import {homeRouter} from "./routers/home";
import {handleError} from "./utils/errors";
import './utils/database';


const app = express();


app.use(express.urlencoded({
    extended: true,
}));

app.use(express.static('public'));
app.use(express.json());

app.engine('.hbs', engine({
    extname: '.hbs',
    // helpers: handlebarsHelpers,
}));
app.set('view engine', '.hbs');

app.use(methodOverride('_method'))


app.use('/', homeRouter);
app.use('/client', clientRouter);


app.use(handleError)

app.listen(3000, '0.0.0.0', () => {
    console.log('listening on http://localhost:3000')
});