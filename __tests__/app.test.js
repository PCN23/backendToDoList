const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');

const fakeUser = {
  firstName: 'Harrison',
  lastName: 'James',
  email: 'popcorn1@hello.com',
  password: 'asdfgh',
};

describe('user routes', () => {
  beforeEach(() => {
    return setup(pool);
  });
  it('creates a new user', async () => {
    const res = await request(app).post('/api/v1/users').send(fakeUser);
    const { firstName, lastName, email } = fakeUser;

    expect(res.body).toEqual({
      id: expect.any(String),
      email,
      firstName,
      lastName,
    });
  });
  afterAll(() => {
    pool.end();
  });
});
