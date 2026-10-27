const { validationResult } = require('express-validator');
const { AppDataSource } = require('../database/data-source');

exports.listCourses = async (req, res, next) => {
  try {
    const courses = await AppDataSource.getRepository('Course').find({ relations: { assignments: true }, order: { name: 'ASC' } });
    res.render('courses/index', { title: 'My courses', courses });
  } catch (error) { next(error); }
};

exports.createCourse = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).render('error', { title: 'Check the course details', message: errors.array()[0].msg });
  try {
    const repo = AppDataSource.getRepository('Course');
    await repo.save(repo.create({ name: req.body.name }));
    res.redirect('/courses');
  } catch (error) { next(error); }
};

exports.deleteCourse = async (req, res, next) => {
  try {
    await AppDataSource.getRepository('Course').delete(Number(req.params.id));
    res.redirect('/courses');
  } catch (error) { next(error); }
};
