import express from 'express';
import Todo from '../models/todoModel';
import fs from 'fs';
const router = express.Router();

type todoObj = {
    id: number;
    todo: string;
    time: string;
}

router.get('/', (req, res) => {
    Todo.find({}).then((result) => {
        res.render('index', {
            todos: result
        });
    })
})

router.post('/add', (req, res) => {
    const todo = req.body.newtodo;
    if (todo !== '') {
        const date = new Date().toDateString();

        const newTodo = new Todo({
            todo: todo,
            time: date
        })

        newTodo.save().then(result => console.log('todo added successfully'));
        res.redirect('/');
    } else {
        res.redirect('/')
    }
})

router.post('/delete/:id', (req, res) => {
    const id = req.params.id;
    Todo.deleteOne({ _id: id }, (err) => {
        if (err) {
            res.render('error');
        } else {
            res.redirect('/');
        }
    })
})

router.post('/copy/:id', (req, res) => {
    const id = req.params.id;
    Todo.findById(id, (err, docs) => {
        if (err) {
            res.render('error');
        } else {
            res.redirect('/');
        }
    })
})


router.post('/edit/:id', (req, res) => {
    const id = req.params.id;
    const newtodo = req.body.newtodo;
    const date = new Date().toDateString();
    Todo.updateOne({ _id: id }, { todo: newtodo, time: date }, (err, res) => {
        if (err) {
            res.render('error')
        }
    });
    res.redirect('/');
})



module.exports = router;