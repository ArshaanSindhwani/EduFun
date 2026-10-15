# EduFun

A team project developed at La Fosse Academy: an educational gaming platform with a Node.js and Express backend, PostgreSQL storage, a REST API and automated tests.

EduFun makes learning more engaging through interactive, scenario-based challenges. Students can register, complete quizzes by subject, and review their results and average scores.

## Overview

The project combines a web frontend with a RESTful backend built on Node.js and Express. PostgreSQL stores students, teachers, subjects, challenges, questions, answers, scores and results. Jest and Supertest cover the backend with unit tests and API tests.

## At a glance

| Item | Detail |
| - | - |
| Backend tests | 37 passing across 7 suites (32 unit tests, 5 API tests) |
| Line coverage | 87.71% |
| API routes | 9 |
| Database tables | 9 |

## Technologies

| Area | Technologies |
| - | - |
| Backend | Node.js, Express, JavaScript |
| Database | PostgreSQL |
| Authentication | bcrypt, JSON Web Tokens |
| API | REST |
| Testing | Jest, Supertest |
| Frontend testing | JSDOM |
| Development | Git, GitHub, Agile methodologies |

## Key features

- User registration and login, with password hashing and JWT issuance
- Interactive educational quiz challenges
- Scenario-based learning
- Results, average scores and average scores by subject
- RESTful API with an MVC backend structure
- Unit tests and Supertest API tests

## Architecture

```text
Frontend
    ↓
REST API (Express)
    ↓
PostgreSQL
```

The backend is organised into models, controllers, routers and middleware, with a separate module for the database connection and setup.

## API endpoints

The backend exposes 9 routes. Routers are mounted at `/game`, `/results` and `/login`.

| Method | Path | Purpose |
| - | - | - |
| GET | / | API welcome message |
| GET | /game | List all games |
| GET | /game/:id | Questions and answers for a challenge |
| GET | /results/:id | Results for a student |
| GET | /results/:id/average | Average score for a student |
| GET | /results/:id/subject/:subjectId | Average score for a student in one subject |
| GET | /login/:name | Find a user by name |
| POST | /login/register | Register a new user |
| POST | /login/login | Log in and receive a token |

## Database

The schema in `backend/server/DB/eduFun.sql` defines 9 tables. Run `npm run setup-db` from the `backend` folder to create them.

## Screenshots

### Login and registration

| Login | Registration |
| - | - |
| ![EduFun login screen](screenshots/login.png) | ![EduFun registration screen](screenshots/register.png) |
| User sign-in interface. | New-user registration interface. |

### Learning experience

| Home | Game |
| - | - |
| ![EduFun home screen](screenshots/home.png) | ![EduFun game screen](screenshots/game.png) |
| Entry point for accessing learning activities. | Interactive educational challenge interface. |

### Results and progress

![EduFun results screen](screenshots/results.png)

## My contribution

This was a team project and I worked on the backend. My work covered:

- Developing REST API functionality with Node.js and Express
- Integrating PostgreSQL for application data
- Registration and login, including JWT issuance
- Writing and maintaining automated tests with Jest and Supertest
- Fixing a failing model test, replacing an empty integration test stub with five working API tests, and extending test reporting so that coverage reflects every backend source file
- Collaborating through Git, feature branches and pull requests

## Testing and coverage

The backend has 37 tests across 7 test suites, and all of them pass: 32 unit tests across 6 suites covering the models and controllers, and 5 Supertest API tests for the game endpoints.

From the repository root:

```bash
cd backend
npm install
npm test
```

Run the unit tests on their own:

```bash
npm run unitTests
```

Run the API tests on their own:

```bash
npm run integrationTests
```

Generate the coverage report:

```bash
npm run coverage
```

| Metric | Coverage |
| - | -: |
| Statements | 87.86% |
| Branches | 64.10% |
| Functions | 85.18% |
| Lines | 87.71% |

Coverage is collected from every backend source file except the tests, the server entry point and the database setup script, so untested files count against the figures.

The API tests use Supertest against the Express app with the model layer mocked. They check routing, status codes and response bodies without needing a live database. The `config.js` and `reset.sql` files in `server/__tests__/integration` are kept for future tests that run against a real test database.

## Installation and setup

### Clone the repository

```bash
git clone https://github.com/ArshaanSindhwani/EduFun.git
cd EduFun
```

### Backend

```bash
cd backend
npm install
```

Create a `.env` file in `backend` with your PostgreSQL connection details and JWT secret, then create the tables and start the server:

```bash
npm run setup-db
npm start
```

For development with automatic restarts:

```bash
npm run dev
```

### Frontend

From the repository root, in a separate terminal:

```bash
cd frontend
npm install
npm run dev
```

Run the frontend tests:

```bash
npm test
```

The frontend test script runs Jest in watch mode.

## What I learned

- Designing RESTful APIs with Express
- Integrating PostgreSQL with a Node.js application
- Structuring backend code with MVC principles
- Implementing registration, login and token issuance
- Writing unit tests and API tests, and mocking the data layer
- Measuring test coverage and finding code that tests do not reach
- Working in a team with Git branches and pull requests

## Future improvements

- Apply the existing authentication middleware to protected routes
- Add tests that run against a real test database
- Expand coverage for middleware and error handling
- Strengthen API validation and error messages
- Extend the educational content and challenge types
- Improve progress reporting
- Add cloud deployment and a CI pipeline
