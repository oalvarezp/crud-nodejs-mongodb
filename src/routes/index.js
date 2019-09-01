const express = require('express');
const router = express.Router();

const Task = require('../models/Task');

router.get('/', async (req, res) => {
	const tasks = await Task.find();
	res.render('index', { tasks });
});

router.post('/add', async (req, res) => {
	const task = new Task(req.body);
	await task.save();
	res.redirect('/');
});

router.get('/state/:done', async (req, res) =>{
	const { done } = req.params;
	const task = await Task.findById(done);
	task.status = !task.status;
	await task.save();
	res.redirect('/');
});

router.route('/edit/:id')
	.get(async (req, res) => {
		const { id } = req.params;
		const task = await Task.findById(id);
		res.render('edit', { task });
	})
	.post(async (req, res) => {
		const { id } = req.params;
		const { title, description } = req.body;
		await Task.findByIdAndUpdate(id, {
			title, description
		});
		res.redirect('/');
	});

router.get('/delete/:id', async (req, res) => {
	const { id } = req.params;
	await Task.findByIdAndDelete(id);
	res.redirect('/');
});

module.exports = router;