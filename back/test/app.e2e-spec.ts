import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';

let pollId: string;

describe('AuthController (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();
    app = moduleFixture.createNestApplication();
    await app.init();
  });

  const username = `user_${Math.random().toString(36).substring(2, 10)}`;
  const password = `pass_${Math.random().toString(36).substring(2, 10)}`;

  it('/auth/register (POST) - should register a new user', async () => {
    const res = await request(app.getHttpServer())
      .post('/auth/register')
      .send({ username: username, password: password });
    expect(res.status).toBe(201);
    expect(res.body).toHaveProperty('id');
  });

  it('/auth/login (POST) - should login and return a token', async () => {
    await request(app.getHttpServer())
      .post('/auth/register')
      .send({ username: username, password: password });
    const res = await request(app.getHttpServer())
      .post('/auth/login')
      .send({ username: 'testlogin', password: 'testpass' });
    expect(res.status).toBe(201);
    expect(res.body).toHaveProperty('access_token');
  });

  afterAll(async () => {
    await app.close();
  });
});



// POLL CONTROLLER ADMIN TESTS


describe('PollController (e2e)', () => {
  let app: INestApplication;
  let token: string;


  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();
    app = moduleFixture.createNestApplication();
    await app.init();
    // Register and login a user
    const res = await request(app.getHttpServer())
      .post('/auth/login')
      .send({ username: 'admin', password: 'admin' });
    token = res.body.access_token;
  });

  it('/polls (POST) - should create a poll', async () => {
    const res = await request(app.getHttpServer())
      .post('/polls')
      .set('Authorization', `Bearer ${token}`)
      .send({
        title: 'Test Poll',
        description: 'This is a test poll',
        singleChoice: true,
        options: [
          { text: 'Option 1' },
          { text: 'Option 2' }
        ]
      });
    expect(res.status).toBe(201);
    expect(res.body).toHaveProperty('id');
    pollId = res.body.id;
  });

  afterAll(async () => {
    await app.close();
  });
});


// POLL CONTROLLER NORMAL USER TESTS

describe('PollController (e2e)', () => {
  let app: INestApplication;
  let token: string;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();
    app = moduleFixture.createNestApplication();
    await app.init();
    // Register and login a user
    const res = await request(app.getHttpServer())
      .post('/auth/login')
      .send({ username: 'azerty', password: 'azerty' });
    token = res.body.access_token;
  });

  it('/polls (GET) - should get all polls', async () => {
    const res = await request(app.getHttpServer())
      .get('/polls')
      .set('Authorization', `Bearer ${token}`);
    expect(res.status).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  it('/polls/:id (GET) - should get poll by id', async () => {
    const res = await request(app.getHttpServer())
      .get(`/polls/${pollId}`)
      .set('Authorization', `Bearer ${token}`);
    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty('id', pollId);
  });

  it('/polls/:id/vote (POST) - should vote for a poll option', async () => {
    // Get poll to retrieve optionIds
    const pollRes = await request(app.getHttpServer())
      .get(`/polls/${pollId}`)
      .set('Authorization', `Bearer ${token}`);

    const optionId = pollRes.body.options[0]?.id;

    const votePayload = {
      pollId: pollId,
      optionIds: [optionId]
    };

    // Premier vote (doit réussir)
    const res = await request(app.getHttpServer())
      .post(`/polls/${pollId}/vote`)
      .set('Authorization', `Bearer ${token}`)
      .send(votePayload);
    expect([200, 201]).toContain(res.status);

    // Deuxième vote (doit échouer)
    const res2 = await request(app.getHttpServer())
      .post(`/polls/${pollId}/vote`)
      .set('Authorization', `Bearer ${token}`)
      .send(votePayload);
    expect(res2.status).toBe(400);

  });

  it('/polls/:id/results (GET) - should get poll results', async () => {
    const res = await request(app.getHttpServer())
      .get(`/polls/${pollId}/results`)
      .set('Authorization', `Bearer ${token}`);
    expect(res.status).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  afterAll(async () => {
    await app.close();
  });
});
