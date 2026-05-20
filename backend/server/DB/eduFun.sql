DROP TABLE IF EXISTS student;
DROP TABLE IF EXISTS teacher;
DROP TABLE IF EXISTS outcome;
DROP TABLE IF EXISTS subject;
DROP TABLE IF EXISTS results;
DROP TABLE IF EXISTS challenge;
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

CREATE TABLE subject (
    subject_id INT GENERATED ALWAYS AS IDENTITY,
    subject_name VARCHAR(100) NOT NULL,
    PRIMARY KEY (subject_id)
);

CREATE TABLE challenge (
    challenge_id INT GENERATED ALWAYS AS IDENTITY,
    challenge_name VARCHAR(100) NOT NULL,
    subject_id INT NOT NULL,
    PRIMARY KEY (challenge_id),
    FOREIGN KEY (subject_id) REFERENCES subject(subject_id)
);

CREATE TABLE score (
    score_id INT GENERATED ALWAYS AS IDENTITY,
    score_text VARCHAR(50) NOT NULL,
    score_value INT NOT NULL,
    PRIMARY KEY (score_id)
);

CREATE TABLE outcome (
    outcome_id INT GENERATED ALWAYS AS IDENTITY,
    challenge_id INT NOT NULL,
    student_id INT NOT NULL,
    score INT NOT NULL,
    PRIMARY KEY (outcome_id),
    FOREIGN KEY (challenge_id) REFERENCES challenge(challenge_id),
    FOREIGN KEY (student_id) REFERENCES student(id)
);

CREATE TABLE teacher (
    teacher_id INT GENERATED ALWAYS AS IDENTITY,
    teacher_name VARCHAR(100) NOT NULL,
    username VARCHAR(20) NOT NULL UNIQUE,
    subject_id INT NOT NULL,
    head BOOLEAN NOT NULL,
    password VARCHAR(30) NOT NULL,
    PRIMARY KEY (teacher_id),
    FOREIGN KEY (subject_id) REFERENCES subject(subject_id)
);

CREATE TABLE results (
    results_id INT GENERATED ALWAYS AS IDENTITY,
    student_id INT NOT NULL,
    teacher_id INT NOT NULL,
    outcome_id INT NOT NULL,
    subject_id INT NOT NULL,
    PRIMARY KEY (results_id),
    FOREIGN KEY (student_id) REFERENCES student(id),
    FOREIGN KEY (teacher_id) REFERENCES teacher(teacher_id),
    FOREIGN KEY (outcome_id) REFERENCES outcome(outcome_id),
    FOREIGN KEY (subject_id) REFERENCES subject(subject_id)
);

CREATE TABLE questions (
    questions_id INT GENERATED ALWAYS AS IDENTITY,
    challenge_id INT NOT NULL,
    questions_text VARCHAR(500) NOT NULL,
    image_url VARCHAR(200),
    question_number INT NOT NULL,
    PRIMARY KEY (questions_id),
    FOREIGN KEY (challenge_id) REFERENCES challenge(challenge_id)
);

CREATE TABLE answers (
    answers_id INT GENERATED ALWAYS AS IDENTITY,
    answer_text VARCHAR(500) NOT NULL,
    score_id INT NOT NULL,
    questions_id INT NOT NULL,
    answer_option VARCHAR(1) NOT NULL,
    PRIMARY KEY (answers_id),
    FOREIGN KEY (score_id) REFERENCES score(score_id),
    FOREIGN KEY (questions_id) REFERENCES questions(questions_id)
);

