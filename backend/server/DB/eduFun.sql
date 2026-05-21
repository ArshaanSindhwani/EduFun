DROP TABLE IF EXISTS answers;
DROP TABLE IF EXISTS questions;
DROP TABLE IF EXISTS results;
DROP TABLE IF EXISTS teacher;
DROP TABLE IF EXISTS outcome;
DROP TABLE IF EXISTS score;
DROP TABLE IF EXISTS challenge;
DROP TABLE IF EXISTS subject;
DROP TABLE IF EXISTS student;

CREATE TABLE student (
    id INT GENERATED ALWAYS AS IDENTITY,
    name VARCHAR(100) NOT NULL,
    username VARCHAR(20) NOT NULL UNIQUE,
    form VARCHAR(10),
    password VARCHAR(255) NOT NULL,
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
    answer_option INT NOT NULL,
    PRIMARY KEY (answers_id),
    FOREIGN KEY (score_id) REFERENCES score(score_id),
    FOREIGN KEY (questions_id) REFERENCES questions(questions_id)
);

INSERT INTO subject (subject_name) 
VALUES ('History'), ('Geography'), ('English');

INSERT INTO score (score_text, score_value) VALUES ('very good', 20), ('okay', 10), ('bad', 0);

INSERT INTO challenge (challenge_name, subject_id) VALUES ('WW2', 1), ('Romans', 1), ('Shakespeare', 3), ('Geo Quiz', 2);

INSERT INTO questions (challenge_id, question_number, questions_text, image_url) 
VALUES
(1,1, 'Which department will you focus on', '/Assets/image1.png'),
(1,2, 'Who will you help', '/assest/image2.png'),
(1,3, 'Which department will you focus on', '/assest/image3.png'),
(1,4, 'Where will you focus your troops', '/assest/image4.png'),
(1,5, 'How much of your troops will you use for the final charge', '/assest/image5.png');

INSERT INTO answers (questions_id, answer_option, answer_text, score_id)
VALUES
-- Question 1 
(1, 1, 'RAF', 1),
(1, 2, 'NAVY', 2),
(1, 3, 'ARMY', 2),
(1, 4, 'MI5', 3),

-- Question 2
(2, 1, 'India', 2),
(2, 2, 'North Africa', 1),
(2, 3, 'Burma', 3),
(2, 4, 'Pacific Islands', 2),

--  Question 3
(3, 1, 'RAF', 2),
(3, 2, 'NAVY', 3),
(3, 3, 'ARMY', 1),
(3, 4, 'MI5', 2),

-- Question 4
(4, 1, 'France', 1),
(4, 2, 'Italy', 1),
(4, 3, 'Netherlands', 2),
(4, 4, 'Norway', 3),

-- Question 5
(5, 1, '100%', 1),
(5, 2, '75%', 2),
(5, 3, '50%', 2),
(5, 4, '25%', 3);

INSERT INTO teacher (teacher_name, username, subject_id, head, password)
VALUES
-- Teacher 1
('Miss McGonagall', 'Cat', 3, TRUE, 'Griffindor'),
-- Teacher 2
('Mr Snape', 'SectumpSempra', 2, FALSE, 'Slytherin'),
-- Teacher 3
('Mr Lupin', 'Werewolf', 2, FALSE, 'Marauders');

INSERT INTO student (name, username, form, password)
VALUES
-- Student 1
('Harry', 'boywholived', '1a', 'harry123'),
-- Student 2
('Hermoine', 'knowitall', '1b', 'hermoine123'),
-- Student 3
('Ron', 'quiditch', '1c', 'ron123');
