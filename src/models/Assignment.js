const { EntitySchema } = require('typeorm');

module.exports = new EntitySchema({
  name: 'Assignment',
  tableName: 'assignments',
  columns: {
    id: { primary: true, type: 'integer', generated: true },
    title: { type: 'varchar', length: 160 },
    dueDate: { type: 'date', nullable: true },
    status: { type: 'varchar', length: 20, default: 'Not started' },
    createdAt: { type: 'datetime', createDate: true }
  },
  relations: {
    course: { type: 'many-to-one', target: 'Course', inverseSide: 'assignments', nullable: false, onDelete: 'CASCADE' },
    studySessions: { type: 'one-to-many', target: 'StudySession', inverseSide: 'assignment' }
  }
});
