const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');
const  UserService  = require('../lib/services/UserService');

const registerAndLogin = async (userProps = {}) => {
  const password = userProps.password ?? fakeUser.password;
  const agent = request.agent(app);
  const user = await UserService.create({ ...fakeUser, ...userProps });
  const { email } = user;
  await agent.post('/api/v1/users/me').send({ email, password });
  return [agent, user];
};

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

  it('get returns the current user', async () => {
    const [agent, user] = await registerAndLogin();
    const me = await agent.get('/api/v1/users/me');
    expect(me.status).toBe(200);
    expect(me.body).toEqual({
      ...user,
      exp: expect.any(Number),
      iat: expect.any(Number),
    });
  });
  afterAll(() => {
    pool.end();
  });
});
