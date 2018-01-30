/**
 * Seed users table.
 *
 * @param  {object} knex
 * @param  {object} Promise
 * @return {Promise}
 */
export function seed(knex, Promise) {
  // Deletes all existing entries
  return knex('users')
    .del()
    .then(() => {
      return Promise.all([
        // Inserts seed entries
        knex('users').insert([
          {
            email: 'fcruz@kryptotech.io',
            name: 'Fran',
            surname: 'Cruz',
            password: 'pepe',
            phone: '675219666',
            updated_at: new Date()
          },
          {
            email: 'jdoe@kryptotech.io',
            name: 'John',
            surname: 'Doe',
            password: 'pepe',
            phone: '675666666',
            updated_at: new Date()
          }
        ])
      ]);
    });
}
