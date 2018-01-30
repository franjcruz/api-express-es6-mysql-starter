/**
 * Create users table.
 *
 * @param  {object} knex
 * @return {Promise}
 */
export function up(knex) {
  return knex.schema.createTable('users', table => {
    table.increments();
    table.string('email').notNullable();
    table.string('password').notNullable();
    table
      .timestamp('created_at')
      .notNullable()
      .defaultTo(knex.raw('now()'));
    table.timestamp('updated_at').nullable();
    table.string('name').notNullable();
    table.string('surname').notNullable();
    table.string('phone').notNullable();
  });
}

/**
 * Drop users table.
 *
 * @param  {object} knex
 * @return {Promise}
 */
export function down(knex) {
  return knex.schema.dropTable('users');
}
