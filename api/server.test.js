// Write your tests here
const request = require('supertest')
const db = require('./../data/dbConfig')
const server = require('./server')

const user = { username: 'Casey', password: '1234'}
beforeAll(async () => {
  await db.migrate.rollback()
  await db.migrate.latest()
})

beforeEach(async () => {
  await db('users').truncate()
})

afterAll(async () => {
  await db.destroy()
})

test('sanity', () => {
  expect(true).toBe(false)
})

describe('server', () => {
  describe('[GET] /jokes', () => {
    it('Returns a 403 if no user', async () => {
      const res = await request(server).get('/api/jokes')
      expect(res.status).toBe(401)
    })
  })

  describe("[POST] /users", () => {
    it('Returns new user', async() => {
      let res
      res = await request(server).post("/api/auth/register").send(user)
      expect(res.status).toEqual(201)
    })
  })

  describe('[POST] /login', () => {
    it('Good stuff', async () => {
      await request(server).post('/api/auth/register').send(user)
      let res
      res = await request(server).post('/api/auth/login').send(user)
      expect(res.status).toEqual(200)
    })
})

})
