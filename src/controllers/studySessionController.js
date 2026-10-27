const { validationResult } = require('express-validator');
const { AppDataSource } = require('../database/data-source');

exports.listSessions = async (req, res, next) => {
  try {
    const sessions = await AppDataSource.getRepository('StudySession').find({ relations: { assignment: true }, order: { date: 'DESC', createdAt: 'DESC' } });
    const assignments = await AppDataSource.getRepository('Assignment').find({ order: { title: 'ASC' } });
    res.render('study-sessions/index', { title: 'Study sessions', sessions, assignments, totalMinutes: sessions.reduce((sum, session) => sum + session.minutes, 0) });
  } catch (error) { next(error); }
};

exports.createSession = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).render('error', { title: 'Check the study session', message: errors.array()[0].msg });
  try {
    const repo = AppDataSource.getRepository('StudySession');
    const assignment = req.body.assignmentId ? await AppDataSource.getRepository('Assignment').findOneBy({ id: Number(req.body.assignmentId) }) : null;
    await repo.save(repo.create({ date: req.body.date, minutes: Number(req.body.minutes), assignment }));
    res.redirect('/study-sessions');
  } catch (error) { next(error); }
};

exports.deleteSession = async (req, res, next) => {
  try {
    await AppDataSource.getRepository('StudySession').delete(Number(req.params.id));
    res.redirect('/study-sessions');
  } catch (error) { next(error); }
};
