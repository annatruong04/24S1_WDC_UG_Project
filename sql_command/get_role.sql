select B.Username, B.Password, A.Role_name from Role as A
inner join User as B
on A.RoleID = B.Role_ID
where B.User_ID = 2;