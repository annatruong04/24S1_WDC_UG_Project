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