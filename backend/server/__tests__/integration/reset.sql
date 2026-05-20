TRUNCATE answers, questions, results, outcome, challenge, score, teacher, subject, student RESTART IDENTITY CASCADE;

INSERT INTO student (name, username, form, password)
VALUES
('John Smith', 'john', '7A', 'password123'),
('Emily Johnson', 'emily', '8B', 'password456'),
('Michael Brown', 'michael', '9C', 'password789');

INSERT INTO subject (subject_name)
VALUES
('History'),
('Geography'),
('English');

INSERT INTO challenge (challenge_name, subject_id)
VALUES
('History Challenge 1', 1),
('Geography Challenge 1', 2),
('English Challenge 1', 3);

INSERT INTO score (score_text, score_value)
VALUES
('Excellent', 90),
('Good', 75),
('Needs Improvement', 50);

INSERT INTO outcome (challenge_id, student_id, score)
VALUES
(1, 1, 90),
(2, 2, 75),
(3, 3, 50);

INSERT INTO teacher (teacher_name, username, subject_id, head, password)
VALUES
('Mr. Porter', 'porter', 1, true, 'password123'),
('Ms. Davis', 'davis', 2, false, 'password456'),
('Mrs. Wilson', 'wilson', 3, false, 'password789');

INSERT INTO results (student_id, teacher_id, outcome_id, subject_id)
VALUES
(1, 1, 1, 1),
(2, 2, 2, 2),
(3, 3, 3, 3);

INSERT INTO questions (challenge_id, questions_text, image_url, question_number)
VALUES
(1, 'What year did World War II end?', NULL, 1),
(2, 'What is the capital of France?', NULL, 1),
(3, 'Which continent is the Sahara Desert located in?', NULL, 1);

INSERT INTO answers (answer_text, score_id, questions_id, answer_option)
VALUES
('1945', 1, 1, 'A'),
('Paris', 1, 2, 'A'),
('Africa', 1, 3, 'A');