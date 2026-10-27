const express = require('express');
const path = require('path');
const { AppDataSource } = require('./src/database/data-source');
const indexRouter = require('./src/routes/index');
const coursesRouter = require('./src/routes/courses');
const assignmentsRouter = require('./src/routes/assignments');
const studySessionsRouter = require('./src/routes/studySessions');

const app = express();
const PORT = process.env.PORT || 3000;

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'src', 'views'));
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
app.use((req, res, next) => {
  res.locals.currentPath = req.path;
  res.locals.formatDate = (value) => value ? new Date(`${value}T00:00:00`).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) : 'No due date';
  res.locals.inputDate = (value) => value ? String(value).slice(0, 10) : '';
  next();
});

app.use('/', indexRouter);
app.use('/courses', coursesRouter);
app.use('/assignments', assignmentsRouter);
app.use('/study-sessions', studySessionsRouter);

app.use((req, res) => res.status(404).render('error', { title: 'Page not found', message: 'We couldn’t find that page.' }));
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).render('error', {
    title: 'Something went wrong',
    message: 'The app hit an unexpected error. Please try again.',
    details: process.env.NODE_ENV === 'production' ? null : err.message
  });
});

AppDataSource.initialize()
  .then(() => app.listen(PORT, () => console.log(`Student Assignment Tracker running at http://localhost:${PORT}`)))
  .catch((error) => { console.error('Database could not start:', error); process.exit(1); });
