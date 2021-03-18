"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const todoModel_1 = __importDefault(require("../models/todoModel"));
const router = express_1.default.Router();
router.get('/', (req, res) => {
    todoModel_1.default.find({}).then((result) => {
        res.render('index', {
            todos: result
        });
    });
});
router.post('/add', (req, res) => {
    const todo = req.body.newtodo;
    if (todo !== '') {
        const date = new Date().toDateString();
        const newTodo = new todoModel_1.default({
            todo: todo,
            time: date
        });
        newTodo.save().then(result => console.log('todo added successfully'));
        res.redirect('/');
    }
    else {
        res.redirect('/');
    }
});
router.post('/delete/:id', (req, res) => {
    const id = req.params.id;
    todoModel_1.default.deleteOne({ _id: id }, (err) => {
        if (err) {
            res.render('error');
        }
        else {
            res.redirect('/');
        }
    });
});
router.post('/copy/:id', (req, res) => {
    const id = req.params.id;
    todoModel_1.default.findById(id, (err, docs) => {
        if (err) {
            res.render('error');
        }
        else {
            res.redirect('/');
        }
    });
});
router.post('/edit/:id', (req, res) => {
    const id = req.params.id;
    const newtodo = req.body.newtodo;
    const date = new Date().toDateString();
    todoModel_1.default.updateOne({ _id: id }, { todo: newtodo, time: date }, (err, res) => {
        if (err) {
            res.render('error');
        }
    });
    res.redirect('/');
});
module.exports = router;
