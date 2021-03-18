"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const path_1 = __importDefault(require("path"));
const http_errors_1 = __importDefault(require("http-errors"));
const morgan_1 = __importDefault(require("morgan"));
const dotenv_1 = __importDefault(require("dotenv"));
const dbconnect_1 = __importDefault(require("./config/dbconnect"));
const indexRouter = require('./routes/index');
dotenv_1.default.config();
dbconnect_1.default();
const app = express_1.default();
app.set('views', path_1.default.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(morgan_1.default('dev'));
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.use('/', indexRouter);
app.use(function (req, res, next) {
    next(http_errors_1.default(404));
});
app.use(function (err, req, res, next) {
    console.log(err.message);
    res.status(err.status || 500);
    res.render('error');
});
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}.....`));
module.exports = app;
