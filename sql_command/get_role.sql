select B.Username, B.Password, A.Role_name from Role as A
inner join User as B
on A.RoleID = B.Role_ID
where B.User_ID = 2;

Update Branch
set Branch_name = "asd", Description = "asdf", Location = "asdf"
where BranchID = 9;

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

insert into UpdateTable(Title, Message, Manager, BranchID)
values ("Exciting News: Launch of Our New Environmental Education Program", "Dear Members,

We are thrilled to announce the launch of our new Environmental Education Program! This initiative features interactive workshops, online courses, and community events designed to empower individuals with the knowledge and tools needed to protect our planet. From practical tips on composting and water conservation to in-depth courses on climate change and renewable energy, there's something for everyone. Join us in making a tangible impact through local clean-ups, tree planting, and youth engagement activities. Visit our website to learn more and get involved today!

Warm regards,
Khanh Le", 6, 3);

CREATE DATABASE IF NOT EXISTS `volunteer` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci;

USE `volunteer`;

mysqldump --routines --triggers --single-transaction --quick --lock-tables=false --hex-blob volunteer > db_secondVer.sql
DELIMITER //

CREATE PROCEDURE DeleteUser(IN p_UserID INT)
BEGIN
    -- Start a transaction
    START TRANSACTION;

    -- Delete from related tables
    DELETE FROM `Comment` WHERE `UserID` = p_UserID;
    DELETE FROM `UpdateTable` WHERE `Manager` = p_UserID;
    DELETE FROM `User_Event` WHERE `User_ID` = p_UserID;
    DELETE FROM `JoinRequest` WHERE `UserID` = p_UserID;
    DELETE FROM `JoinRequest` WHERE `ManagerID` = p_UserID;
    DELETE FROM `User_Branch` WHERE `User_ID` = p_UserID;

    -- Finally, delete from the User table
    DELETE FROM `User` WHERE `User_ID` = p_UserID;

    -- Commit the transaction
    COMMIT;
END //

DELIMITER ;



insert into Type(Type_name) value("Private"),("Public");
update Type set TypeID = 2 where Type_name = "Public";
update UpdateTable set TypeID = 1 where UpdateID = 4;

delete from JoinRequest where UserID = ? and BranchID = ?

SELECT
    u.UpdateID,
    u.Time_stamp,
    u.Message,
    u.Title,
    u.Manager_ID,
    u.BranchID,
    u.TypeID,
    t.Type_name,
    b.Branch_name
FROM
    UpdateTable u
    JOIN User_Branch ub ON u.BranchID = ub.BranchID
    JOIN Branch b ON u.BranchID = b.BranchID
    JOIN Type t ON u.TypeID = t.TypeID
WHERE
    ub.User_ID = ? AND ub.BranchID = ? AND
    (t.Type_name = 'public' OR t.Type_name = 'private')
ORDER BY
    u.Time_stamp DESC;


Select U.Time_stamp, U.Title, U.Message, T.Type_name  from UpdateTable U join Type T on U.TypeID = T.TypeID join Branch B on B.BranchID = U.BranchID where B.Manager_ID = ?;