/* Update data of a row */
update Role
set Role_name = 'User'
where RoleID = 3;

/* delete a row */
delete from Role
where RoleID = 4;

INSERT INTO User_Branch (User_ID, BranchID) VALUES
(1, 3),
(2, 3),
(3, 3);

INSERT INTO User_Branch (User_ID, BranchID) VALUES
(4, 1),
(4, 2);

INSERT INTO User_Branch (User_ID, BranchID) VALUES
(5, 2),
(6, 3);

Select BranchID from User_Branch where User_ID = 4;

SELECT
    u.User_ID,
    u.Username,
    u.First_name,
    u.Last_name,
    u.Email,
    u.Phone_number
FROM
    User u
JOIN
    User_Branch ub ON u.User_ID = ub.User_ID
JOIN
    Branch b ON ub.BranchID = b.BranchID
WHERE
    b.Manager_ID = 6;

Select E.EventID, E.Name, E.Description, E.Date, E.Location, E.Participant, E.BranchID
from Event E join Branch B on B.BranchID = E.BranchID where B.Manager_ID = 6;

INSERT INTO Event(name, location, date, description, BranchID) VALUES ("asfds", "asfds", "2024-08-25", "asfds", (select BranchID from Branch where Manager_ID = 4));

delete from Event where Name = asdf;

select EventID, Name, Description, BranchID, Location from Event;

update Branch set Manager_ID = 7 where BranchID = 1;


DELIMITER //

CREATE PROCEDURE deleteBranch(IN branch_id INT)
BEGIN
    -- Disable foreign key checks
    SET FOREIGN_KEY_CHECKS = 0;

    -- Delete related records from dependent tables
    DELETE FROM UpdateTable WHERE BranchID = branch_id;
    DELETE FROM Event WHERE BranchID = branch_id;
    DELETE FROM User_Branch WHERE BranchID = branch_id;
    DELETE FROM JoinRequest WHERE BranchID = branch_id;
    -- Delete the branch record
    DELETE FROM Branch WHERE BranchID = branch_id;

    -- Re-enable foreign key checks
    SET FOREIGN_KEY_CHECKS = 1;
END //

DELIMITER ;
