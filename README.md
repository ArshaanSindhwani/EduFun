
# EduFun

> A team project developed at La Fosse Academy, focused on building an educational gaming platform with a Node.js and Express backend, PostgreSQL integration, REST APIs and automated testing.

EduFun is a full-stack educational gaming platform designed to make learning more engaging through interactive, scenario-based challenges. Users can register, complete educational quizzes, track their progress and review their results.

## Overview

The project combines a web frontend with a RESTful backend built using Node.js and Express. PostgreSQL provides database integration, while Jest and Supertest support automated unit and API integration testing.

## Technologies

| Area | Technologies |
|---|---|
| Backend | Node.js, Express, JavaScript |
| Database | PostgreSQL |
| API | REST |
| Testing | Jest, Supertest |
| Frontend testing | JSDOM |
| Development | Git, GitHub, Agile methodologies |

## Key Features

- User registration and authentication
- Interactive educational quiz challenges
- Scenario-based learning
- Progress tracking and results management
- RESTful API architecture
- MVC backend structure
- Automated unit and API integration tests

## Screenshots

### Login and Registration

| Login | Registration |
|---|---|
| ![EduFun login screen](screenshots/login.png) | ![EduFun registration screen](screenshots/register.png) |
| User sign-in interface. | New-user registration interface. |

### Learning Experience

| Home | Game |
|---|---|
| ![EduFun home screen](screenshots/home.png) | ![EduFun game screen](screenshots/game.png) |
| Entry point for accessing learning activities. | Interactive educational challenge interface. |

### Results and Progress

![EduFun results screen](screenshots/results.png)

The results screen supports reviewing outcomes from completed learning activities.

## My Contribution

My contributions focused on backend development and included work across API design, database integration, authentication and automated testing.

- REST API endpoint development
- PostgreSQL database integration
- Authentication functionality
- MVC application structure
- Unit testing with Jest
- API integration testing with Supertest
- Database schema development
- Collaborative Git workflow and Agile delivery

## Testing and Coverage

The backend test suite uses Jest for unit tests and Supertest for API integration tests. The API integration tests use a mocked model layer.

Run the backend tests:

```bash
cd backend
npm test
```

Generate the coverage report:

```bash
npm run coverage
```

Latest recorded test results:

| Metric | Result |
|---|---:|
| Test suites passed | 7 of 7 |
| Tests passed | 37 of 37 |
| Statement coverage | 87.86% |
| Branch coverage | 64.10% |
| Function coverage | 85.18% |
| Line coverage | 87.71% |

Coverage is collected from backend source files, excluding test files, the server entry point and database setup.

## Installation and Setup

Clone the repository:

```bash
git clone https://github.com/ArshaanSindhwani/EduFun.git
cd EduFun
```

Install backend dependencies:

```bash
cd backend
npm install
```

Start the backend:

```bash
npm start
```

For development:

```bash
npm run dev
```

Install and run the frontend using the scripts configured in `frontend/package.json`.

## What I Learned

- Designing RESTful APIs with Express
- Integrating a PostgreSQL database with a Node.js application
- Structuring backend code using MVC principles
- Implementing authentication functionality
- Writing unit and API integration tests
- Measuring test coverage and identifying untested code
- Collaborating through Git, feature branches and Agile practices

## Future Improvements

- Expand automated test coverage, particularly for middleware and error-handling paths
- Strengthen API validation and error handling
- Extend educational content and challenge types
- Improve progress reporting and learning analytics