select B.Username, B.Password, A.Role_name from Role as A
inner join User as B
on A.RoleID = B.Role_ID
where B.User_ID = 2;

Update User
set Role_ID = 1
where User_ID = 4;

Update Role
set Role_name = "Administrator"
where RoleID = 1;