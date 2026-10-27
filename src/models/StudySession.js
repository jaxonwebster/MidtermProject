const { EntitySchema } = require('typeorm');

module.exports = new EntitySchema({
  name: 'StudySession',
  tableName: 'study_sessions',
  columns: {
    id: { primary: true, type: 'integer', generated: true },
    date: { type: 'date' },
    minutes: { type: 'integer' },
    createdAt: { type: 'datetime', createDate: true }
  },
  relations: {
    assignment: { type: 'many-to-one', target: 'Assignment', inverseSide: 'studySessions', nullable: true, onDelete: 'SET NULL' }
  }
});
