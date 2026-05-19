DROP TABLE IF EXISTS student;
DROP TABLE IF EXISTS teacher;
DROP TABLE IF EXISTS outcome;
DROP TABLE IF EXISTS subject;
DROP TABLE IF EXISTS results;
DROP TABLE IF EXISTS challenges;
DROP TABLE IF EXISTS questions;
DROP TABLE IF EXISTS answers;
DROP TABLE IF EXISTS score;

CREATE TABLE student (
    id INT GENERATED ALWAYS AS IDENTITY,
    name VARCHAR(100) NOT NULL,
    username VARCHAR(20) NOT NULL UNIQUE,
    form VARCHAR(10),
    password VARCHAR(30) NOT NULL,
    PRIMARY KEY (id)
);

CREATE TABLE challenges (
    id INT GENERATED ALWAYS AS IDENTITY,
    name VARCHAR(100) NOT NULL,
    subject_id INT NOT NULL,
    PRIMARY KEY (id),
    FOREIGN KEY (subject_id) REFERENCES subject(id)
)

CREATE TABLE outcome (
    id INT GENERATED ALWAYS AS IDENTITY,
    challenge_id INT NOT NULL,
    student_id INT NOT NULL,
    score INT NOT NULL,
    PRIMARY KEY (id),
    FOREIGN KEY (challenge_id) REFERENCES challenges(id),
    FOREIGN KEY (student_id) REFERENCES student(id)
)

CREATE TABLE results (
    id INT GENERATED ALWAYS AS IDENTITY,
    student_id INT NOT NULL,
    teacher_id INT NOT NULL,
    outcome_id INT NOT NULL,
    subject_id INT NOT NULL,
    PRIMARY KEY (id),
    FOREIGN KEY (student_id) REFERENCES student(id),
    FOREIGN KEY (teacher_id) REFERENCES teacher(id),
    FOREIGN KEY (outcome_id) REFERENCES outcome(id),
    FOREIGN KEY (subject_id) REFERENCES subject(id)
)

CREATE TABLE questions (
    id INT GENERATED ALWAYS AS IDENTITY,
    challenge_id INT NOT NULL,
    text VARCHAR(500) NOT NULL,
    image_url VARCHAR(200),
    PRIMARY KEY (id),
    FOREIGN KEY (challenge_id) REFERENCES challenges(id)
)

CREATE TABLE answers (
    id INT GENERATED ALWAYS AS IDENTITY,
    text VARCHAR(500) NOT NULL,
    score_id INT NOT NULL,
    question_id INT NOT NULL,
    PRIMARY KEY (id),
    FOREIGN KEY (score_id) REFERENCES score(id)
)

CREATE TABLE score (
    id INT GENERATED ALWAYS AS IDENTITY,
    text VARCHAR(50) NOT NULL,
    score_value INT NOT NULL,
    PRIMARY KEY (id)
)

CREATE TABLE subject (
    id INT GENERATED ALWAYS AS IDENTITY,
    name VARCHAR(100) NOT NULL,
    PRIMARY KEY (id)
)

CREATE TABLE teacher (
    id INT GENERATED ALWAYS AS IDENTITY,
    name VARCHAR(100) NOT NULL,
    username VARCHAR(20) NOT NULL UNIQUE,
    subject_id INT NOT NULL,
    head BOOLEAN NOT NULL,
    password VARCHAR(30) NOT NULL,
    PRIMARY KEY (id),
    FOREIGN KEY (subject_id) REFERENCES subject(id)
)
