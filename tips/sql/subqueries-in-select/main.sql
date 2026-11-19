CREATE TABLE Scores (Student TEXT, Score INT);
INSERT INTO Scores VALUES ('Alice', 85);
INSERT INTO Scores VALUES ('Bob', 92);
INSERT INTO Scores VALUES ('Charlie', 78);
INSERT INTO Scores VALUES ('Diana', 95);
SELECT Student FROM Scores WHERE Score > (SELECT AVG(Score) FROM Scores);
