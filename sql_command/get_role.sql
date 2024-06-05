select B.Username, B.Password, A.Role_name from Role as A
inner join User as B
on A.RoleID = B.Role_ID
where B.User_ID = 2;

Update User
set Password = "$argon2id$v=19$m=65536,t=3,p=4$SA2BmoNzIfHtYzIEX1CSZg$LD2nFmBiAnoq/O6TDkpjyUaJ1AnQoz7qB+fSvD3D5NI"
where User_ID = 6;

Update Branch
set Manager_ID = 6
where BranchID = 3;

Update Role
set Role_name = "Administrator"
where RoleID = 1;

Select E.EventID, E.Name, E.Description, E.Date, E.Location, E.Participant, E.BranchID from
                      Event E where E.EventID = 5;

INSERT INTO `Comment` (`ParentID`, `EventID`, `UserID`, `CommentText`)
VALUES
(4, 5, 5, 'Love this event !!');


SELECT c1.CommentID AS ParentCommentID, c1.CommentText AS ParentCommentText,
                    c2.CommentID AS ReplyCommentID, c2.CommentText AS ReplyCommentText,
                    c1.Timestamp AS ParentTimestamp, c2.Timestamp AS ReplyTimestamp,
                    u1.First_name AS ParentFirstName, u1.Last_name AS ParentLastName,
                    u2.First_name AS ReplyFirstName, u2.Last_name AS ReplyLastName
                    FROM Comment c1
                    LEFT JOIN Comment c2 ON c1.CommentID = c2.ParentID
                    LEFT JOIN User u1 ON c1.UserID = u1.User_ID
                    LEFT JOIN User u2 ON c2.UserID = u2.User_ID
                    WHERE c1.EventID = ?
                    ORDER BY c1.Timestamp, c2.Timestamp;


CREATE DATABASE IF NOT EXISTS `volunteer` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci;

USE `volunteer`;