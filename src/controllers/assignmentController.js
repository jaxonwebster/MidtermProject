const { validationResult } = require('express-validator');
const { AppDataSource } = require('../database/data-source');

async function formData() {
  return AppDataSource.getRepository('Course').find({ order: { name: 'ASC' } });
}

exports.listAssignments = async (req, res, next) => {
  try {
    const assignments = await AppDataSource.getRepository('Assignment').find({ relations: { course: true }, order: { dueDate: 'ASC', createdAt: 'DESC' } });
    res.render('assignments/index', { title: 'Assignments', assignments });
  } catch (error) { next(error); }
};

exports.newAssignmentForm = async (req, res, next) => {
  try { res.render('assignments/form', { title: 'Add assignment', assignment: null, courses: await formData(), errors: [] }); }
  catch (error) { next(error); }
};

exports.createAssignment = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).render('error', { title: 'Check the assignment details', message: errors.array()[0].msg });
  try {
    const repo = AppDataSource.getRepository('Assignment');
    const course = await AppDataSource.getRepository('Course').findOneBy({ id: Number(req.body.courseId) });
    if (!course) return res.status(400).render('error', { title: 'Choose a course', message: 'Add a course before creating an assignment.' });
    await repo.save(repo.create({ title: req.body.title, dueDate: req.body.dueDate || null, status: req.body.status, course }));
    res.redirect('/assignments');
  } catch (error) { next(error); }
};

exports.showAssignment = async (req, res, next) => {
  try {
    const assignment = await AppDataSource.getRepository('Assignment').findOne({ where: { id: Number(req.params.id) }, relations: { course: true, studySessions: true } });
    if (!assignment) return res.status(404).render('error', { title: 'Assignment not found', message: 'This assignment may have been deleted.' });
    res.render('assignments/show', { title: assignment.title, assignment });
  } catch (error) { next(error); }
};

exports.editAssignmentForm = async (req, res, next) => {
  try {
    const assignment = await AppDataSource.getRepository('Assignment').findOne({ where: { id: Number(req.params.id) }, relations: { course: true } });
    if (!assignment) return res.status(404).render('error', { title: 'Assignment not found', message: 'This assignment may have been deleted.' });
    res.render('assignments/form', { title: 'Edit assignment', assignment, courses: await formData(), errors: [] });
  } catch (error) { next(error); }
};

exports.updateAssignment = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).render('error', { title: 'Check the assignment details', message: errors.array()[0].msg });
  try {
    const repo = AppDataSource.getRepository('Assignment');
    const assignment = await repo.findOne({ where: { id: Number(req.params.id) }, relations: { course: true } });
    const course = await AppDataSource.getRepository('Course').findOneBy({ id: Number(req.body.courseId) });
    if (!assignment || !course) return res.status(404).render('error', { title: 'Assignment not found', message: 'The assignment or course could not be found.' });
    Object.assign(assignment, { title: req.body.title, dueDate: req.body.dueDate || null, status: req.body.status, course });
    await repo.save(assignment);
    res.redirect(`/assignments/${assignment.id}`);
  } catch (error) { next(error); }
};

exports.toggleComplete = async (req, res, next) => {
  try {
    const repo = AppDataSource.getRepository('Assignment');
    const item = await repo.findOneBy({ id: Number(req.params.id) });
    if (!item) return res.status(404).render('error', { title: 'Assignment not found', message: 'This assignment may have been deleted.' });
    item.status = item.status === 'Completed' ? 'Not started' : 'Completed';
    await repo.save(item);
    res.redirect(req.get('referer') || '/assignments');
  } catch (error) { next(error); }
};

exports.deleteAssignment = async (req, res, next) => {
  try {
    await AppDataSource.getRepository('Assignment').delete(Number(req.params.id));
    res.redirect('/assignments');
  } catch (error) { next(error); }
};
