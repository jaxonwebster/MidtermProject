const { DataSource } = require('typeorm');
const Course = require('../models/Course');
const Assignment = require('../models/Assignment');
const StudySession = require('../models/StudySession');

const AppDataSource = new DataSource({
  type: 'sqljs',
  location: 'database.sqlite',
  autoSave: true,
  synchronize: true,
  logging: false,
  entities: [Course, Assignment, StudySession]
});

module.exports = { AppDataSource };
