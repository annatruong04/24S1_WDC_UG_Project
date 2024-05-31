/* Update data of a row */
update Role
set Role_name = 'User'
where RoleID = 3;

/* delete a row */
delete from Role
where RoleID = 4;

INSERT INTO User_Event (User_ID, EventID) VALUES
(4, 1),
(4, 2);

INSERT INTO User_Branch (User_ID, BranchID) VALUES
(4, 1),
(4, 2);

