import express, { NextFunction, Request, Response } from 'express';
import path from 'path';
import createError, { HttpError } from 'http-errors';
import logger from 'morgan';
import dotenv from 'dotenv';
import dbConnect from './config/dbconnect';

const indexRouter = require('./routes/index');

dotenv.config();

dbConnect();

const app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/', indexRouter);


app.use(function(req: Request, res: Response, next: NextFunction) {
    next(createError(404));
});


app.use(function(err: HttpError, req: Request, res: Response, next: NextFunction) {
    console.log(err.message);
    res.status(err.status || 500);
    res.render('error');
});


const port = process.env.PORT || 3000;

app.listen(port, () => console.log(`Listening on port ${port}.....`));

module.exports = app;