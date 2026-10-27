const { EntitySchema } = require('typeorm');

module.exports = new EntitySchema({
  name: 'Course',
  tableName: 'courses',
  columns: {
    id: { primary: true, type: 'integer', generated: true },
    name: { type: 'varchar', length: 100 },
    createdAt: { type: 'datetime', createDate: true }
  },
  relations: {
    assignments: {
      type: 'one-to-many',
      target: 'Assignment',
      inverseSide: 'course'
    }
  }
});
