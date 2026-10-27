const { AppDataSource } = require('../database/data-source');

exports.showDashboard = async (req, res, next) => {
  try {
    const assignments = await AppDataSource.getRepository('Assignment').find({ relations: { course: true }, order: { dueDate: 'ASC' } });
    const courses = await AppDataSource.getRepository('Course').find({ order: { name: 'ASC' } });
    const sessions = await AppDataSource.getRepository('StudySession').find({ relations: { assignment: true }, order: { date: 'DESC' }, take: 4 });
    const active = assignments.filter((item) => item.status !== 'Completed');
    const today = new Date().toISOString().slice(0, 10);
    const upcoming = active.filter((item) => item.dueDate && String(item.dueDate).slice(0, 10) >= today).slice(0, 5);
    res.render('dashboard', {
      title: 'Dashboard', assignments, courses, sessions, upcoming,
      stats: { open: active.length, completed: assignments.length - active.length, courses: courses.length, minutes: sessions.reduce((sum, session) => sum + session.minutes, 0) }
    });
  } catch (error) { next(error); }
};
