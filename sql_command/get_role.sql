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