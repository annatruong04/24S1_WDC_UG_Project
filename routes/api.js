const express = require('express');
const path = require('path');
const router = express.Router();
const { isAuthenticated, hasRole } = require('../middleware/auth');
const multer = require('multer');



const storage = multer.memoryStorage();
const upload = multer({ storage: storage });
//route for api

function guessImageContentType(imageBuffer) {
  if (!imageBuffer || imageBuffer.length < 4) {
    return 'application/octet-stream';
  }

  // Check the first few bytes for known image file signatures
  if (imageBuffer[0] === 0xff && imageBuffer[1] === 0xd8 && imageBuffer[2] === 0xff) {
    return 'image/jpeg';
  } else if (imageBuffer[0] === 0x89 && imageBuffer[1] === 0x50 && imageBuffer[2] === 0x4e && imageBuffer[3] === 0x47) {
    return 'image/png';
  } else if (imageBuffer[0] === 0x47 && imageBuffer[1] === 0x49 && imageBuffer[2] === 0x46) {
    return 'image/gif';
  } else if (imageBuffer[0] === 0x42 && imageBuffer[1] === 0x4d) {
    return 'image/bmp';
  }

  return 'image/jpeg';
}

router.get('/read/events', (req, res) => {
  req.pool.getConnection(function (err, connection) {
    if (err) {
      res.sendStatus(500);
      return;
    }

    connection.query(`SELECT Event.*, Branch.Branch_name FROM Event INNER JOIN Branch ON Event.BranchID = Branch.BranchID
    `, (error, results) => {
      connection.release();
      if (error) {
        return res.status(500).send(error);
      }

      results.forEach(event => {
        if (event.Image) {
          const imageBuffer = event.Image;
          const guessedContentType = guessImageContentType(imageBuffer);
          event.Image = `data:${guessedContentType};base64,${imageBuffer.toString('base64')}`;
        }
        if (event.Date) {
          const date = new Date(event.Date);
          const year = date.getUTCFullYear();
          const month = String(date.getUTCMonth() + 1).padStart(2, '0'); // Months are zero-indexed
          const day = String(date.getUTCDate()).padStart(2, '0');

          event.Date = `${year}-${month}-${day}`;
        }
      });

      res.json(results);
    });
  });
});

router.get('/read/branches/events/:id', isAuthenticated, (req, res) => {
  req.pool.getConnection(function (err, connection) {
    if (err) {
      res.sendStatus(500);
      return;
    }

    connection.query(`SELECT * FROM Event where BranchID = ?`, [req.params.id], (error, results) => {
      connection.release();
      if (error) {
        console.log(error);
        return res.status(500).send(error);
      }

      results.forEach(event => {
        if (event.Image) {
          event.Image = `data:${event.contentType};base64,${event.Image.toString('base64')}`;
        }
        if (event.Date) {
          const date = new Date(event.Date);
          const year = date.getUTCFullYear();
          const month = String(date.getUTCMonth() + 1).padStart(2, '0'); // Months are zero-indexed
          const day = String(date.getUTCDate()).padStart(2, '0');

          event.Date = `${year}-${month}-${day}`;
        }
      });

      res.json(results);
    });
  });
});

router.get('/read/events/:id', (req, res) => {
  req.pool.getConnection(function (err, connection) {
    if (err) {
      res.sendStatus(500);
      return;
    }

    connection.query(`Select E.EventID, E.Name, E.Description, E.Date, E.Location, E.Participant, E.Image, E.BranchID from
                      Event E where E.EventID = ?;`,
      [req.params.id], (error, results) => {
        connection.release();
        if (error) {
          return res.status(500).send(error);
        }

        results.forEach(event => {
          if (event.Image) {
            event.Image = `data:${event.contentType};base64,${event.Image.toString('base64')}`;
          }
          if (event.Date) {
            const date = new Date(event.Date);
            const year = date.getUTCFullYear();
            const month = String(date.getUTCMonth() + 1).padStart(2, '0'); // Months are zero-indexed
            const day = String(date.getUTCDate()).padStart(2, '0');

            event.Date = `${year}-${month}-${day}`;
          }
        });

        console.log(req.params.id);

        res.json(results);
      });
  });
});

router.get('/read/branches/:id', (req, res) => {
  req.pool.getConnection(function (err, connection) {
    if (err) {
      res.sendStatus(500);
      return;
    }

    connection.query(`select BranchID, Branch_name, Location, Description, MemberCount from Branch where BranchID = ?`,
      [req.params.id], (error, results) => {
        connection.release();
        if (error) {
          return res.status(500).send(error);
        }
        console.log(req.params.id);

        res.json(results);
      });
  });
});

// Route to get user events
router.get('/read/User_Events', isAuthenticated, (req, res) => {
  req.pool.getConnection(function (err, connection) {
    if (err) {
      res.sendStatus(500);
      return;
    }

    connection.query('SELECT * FROM User_Event WHERE User_ID = ?', [req.session.userID], (error, results) => {
      connection.release();
      if (error) {
        return res.status(500).send(error);
      }
      res.json(results);
    });
  });
});

// Route to join an event
router.get('/join/events/:id', isAuthenticated, (req, res) => {
  req.pool.getConnection(function (err, connection) {
    if (err) {
      res.sendStatus(500);
      return;
    }

    connection.query('INSERT INTO User_Event (User_ID, EventID) VALUES (?, ?)', [req.session.userID, req.params.id], (error, results) => {
      connection.release();
      if (error) {
        return res.status(500).send(error);
      }
      res.json(results);
    });
  });
});

// Route to leave an event
router.get('/leave/events/:id', isAuthenticated, (req, res) => {
  req.pool.getConnection(function (err, connection) {
    if (err) {
      res.sendStatus(500);
      return;
    }

    connection.query('DELETE FROM User_Event WHERE User_ID = ? AND EventID = ?', [req.session.userID, req.params.id], (error, results) => {
      connection.release();
      if (error) {
        return res.status(500).send(error);
      }
      res.json(results);
    });
  });
});



router.get('/read/branches', (req, res) => {
  req.pool.getConnection(function (err, connection) {
    if (err) {
      res.sendStatus(500);
      return;
    }

    connection.query(`SELECT * FROM Branch`, (error, results) => {
      connection.release();
      if (error) {
        return res.status(500).send(error);
      }
      res.json(results);
    });
  });
});

router.get('/read/User_Branch', isAuthenticated, (req, res) => {
  req.pool.getConnection(function (err, connection) {
    if (err) {
      res.sendStatus(500);
      return;
    }

    connection.query(`SELECT * FROM User_Branch WHERE User_ID = ?
    `,[req.session.userID], (error, results) => {
        connection.release();
        if (error) {
          return res.status(500).send(error);
        }


        res.json(results);
      });
  });
});

router.get('/read/BranchRequest', isAuthenticated, (req, res) => {
  req.pool.getConnection(function (err, connection) {
    if (err) {
      res.sendStatus(500);
      return;
    }

    connection.query(`SELECT * FROM JoinRequest WHERE UserID = ? and Status = "Pending"
    `,[req.session.userID], (error, results) => {
        connection.release();
        if (error) {
          console.log(error);
          return res.status(500).send(error);
        }


        res.json(results);
      });
  });
});


router.get('/join/branches/:id', isAuthenticated, (req, res) => {
  req.pool.getConnection(function (err, connection) {
    if (err) {
      res.sendStatus(500);
      return;
    }

    connection.query(`INSERT INTO JoinRequest (UserID, BranchID, RequestDate, Status, ManagerID)
                    VALUES (?, ?, NOW(), 'Pending', (SELECT ManagerID FROM Branch WHERE BranchID = ?));`,
      [req.session.userID, req.params.id, req.params.id], (error, results) => {
        connection.release();
        if (error) {
          console.log(error);
          return res.status(500).send(error);
        }

        console.log('hello');

        console.log(req.params.id);

        res.json(results);
      });
  });
});

router.post('/cancel/BranchRequest/', isAuthenticated, (req, res) => {
  req.pool.getConnection(function (err, connection) {
    if (err) {
      res.sendStatus(500);
      return;
    }

    const data = req.body;

    connection.query(`delete from JoinRequest where UserID = ? and BranchID = ?`,
      [req.session.userID, data.Branch_ID], (error, results) => {
        connection.release();
        if (error) {
          console.log(error);
          return res.status(500).send(error);
        }

        console.log("Cancel successfully");

        res.json(results);
      });
  });
});


router.get('/leave/branches/:id', isAuthenticated, (req, res) => {
  req.pool.getConnection(function (err, connection) {
    if (err) {
      res.sendStatus(500);
      return;
    }

    connection.query('DELETE FROM User_Branch WHERE User_ID = ? AND BranchID = ?'
      ,
      [req.session.userID, req.params.id], (error, results) => {
        connection.release();
        if (error) {
          return res.status(500).send(error);
        }

        console.log('hello');

        console.log(req.params.id);

        res.json(results);
      });
  });
});

router.get('/leave/event/:id', isAuthenticated, (req, res) => {
  req.pool.getConnection(function (err, connection) {
    if (err) {
      res.sendStatus(500);
      return;
    }

    connection.query(
      'DELETE FROM User_Event WHERE User_ID = ? AND EventID = ?',
      [req.session.userID, req.params.id],
      (error, results) => {
        connection.release();
        if (error) {
          return res.status(500).send(error);
        }

        console.log('RSVP cancelled for event:', req.params.id);
        res.json(results);
      }
    );
  });
});

router.get('/read/your_events', isAuthenticated, (req, res) => {
  req.pool.getConnection(function (err, connection) {
    if (err) {
      res.sendStatus(500);
      return;
    }

    const userID = req.session.userID;

    connection.query(`
      SELECT E.EventID, E.Name, E.Description, E.Date, E.Location, E.Participant, E.Image, E.BranchID
      FROM Event E
      JOIN User_Event UE ON E.EventID = UE.EventID
      WHERE UE.User_ID = ?
    `, [userID], (error, results) => {
      connection.release();
      if (error) {
        return res.status(500).send(error);
      }

      results.forEach(event => {
        if (event.Image) {
          event.Image = `data:image/jpeg;base64,${event.Image.toString('base64')}`;
        }
        if (event.Date) {
          const date = new Date(event.Date);
          const year = date.getUTCFullYear();
          const month = String(date.getUTCMonth() + 1).padStart(2, '0'); // Months are zero-indexed
          const day = String(date.getUTCDate()).padStart(2, '0');
          event.Date = `${year}-${month}-${day}`;
        }
      });

      res.json(results);
    });
  });
});

router.get('/read/your_branches', isAuthenticated, (req, res) => {
  req.pool.getConnection(function (err, connection) {
    if (err) {
      res.sendStatus(500);
      return;
    }

    const userID = req.session.userID;

    connection.query(`
      SELECT B.*
      FROM Branch B
      JOIN User_Branch UB ON B.BranchID = UB.BranchID
      WHERE UB.User_ID = ?
    `, [userID], (error, results) => {
      connection.release();
      if (error) {
        return res.status(500).send(error);
      }
      res.json(results);
    });
  });
});


router.get('/manager/read/events/', isAuthenticated, hasRole("Manager"), (req, res) => {
  req.pool.getConnection(function (err, connection) {
    if (err) {
      res.sendStatus(500);
      return;
    }

    connection.query(`Select E.EventID, E.Name, E.Description, E.Date, E.Location, E.Participant, E.Image, E.BranchID from Event E join Branch B on B.BranchID = E.BranchID where B.Manager_ID = ?;`, [req.session.userID], (error, results) => {
      connection.release();
      if (error) {
        return res.status(500).send(error);
      }

      results.forEach(event => {
        if (event.Image) {
          event.Image = `data:${event.contentType};base64,${event.Image.toString('base64')}`;
        }
        if (event.Date) {
          const date = new Date(event.Date);
          const year = date.getUTCFullYear();
          const month = String(date.getUTCMonth() + 1).padStart(2, '0'); // Months are zero-indexed
          const day = String(date.getUTCDate()).padStart(2, '0');

          event.Date = `${year}-${month}-${day}`;
        }
      });



      res.json(results);
    });
  });
});

router.get('/manager/read/events/:id', isAuthenticated, hasRole("Manager"),  (req, res) => {
  req.pool.getConnection(function (err, connection) {
    if (err) {
      res.sendStatus(500);
      return;
    }

    connection.query(`Select E.EventID, E.Name, E.Description, E.Date, E.Location, E.Participant, E.Image, E.BranchID from
                      Event E where E.EventID = ?;`,
      [req.params.id], (error, results) => {
        connection.release();
        if (error) {
          return res.status(500).send(error);
        }

        results.forEach(event => {
          if (event.Image) {
            event.Image = `data:${event.contentType};base64,${event.Image.toString('base64')}`;
          }
          if (event.Date) {
            const date = new Date(event.Date);
            const year = date.getUTCFullYear();
            const month = String(date.getUTCMonth() + 1).padStart(2, '0'); // Months are zero-indexed
            const day = String(date.getUTCDate()).padStart(2, '0');

            event.Date = `${year}-${month}-${day}`;
          }
        });

        console.log(req.params.id);

        res.json(results);
      });
  });
});

router.get('/manager/read/comments/:id', isAuthenticated, (req, res) => {
  req.pool.getConnection(function (err, connection) {
    if (err) {
      res.sendStatus(500);
      return;
    }

    const query = `SELECT c1.CommentID AS ParentCommentID, c1.CommentText AS ParentCommentText,
                    c2.CommentID AS ReplyCommentID, c2.CommentText AS ReplyCommentText,
                    c1.Timestamp AS ParentTimestamp, c2.Timestamp AS ReplyTimestamp,
                    u1.First_name AS ParentFirstName, u1.Last_name AS ParentLastName,
                    u2.First_name AS ReplyFirstName, u2.Last_name AS ReplyLastName
                    FROM Comment c1
                    LEFT JOIN Comment c2 ON c1.CommentID = c2.ParentID
                    LEFT JOIN User u1 ON c1.UserID = u1.User_ID
                    LEFT JOIN User u2 ON c2.UserID = u2.User_ID
                    WHERE c1.EventID = ?
                    ORDER BY c1.Timestamp, c2.Timestamp;`;

    connection.query(query,
      [req.params.id], (error, results) => {
        connection.release();
        if (error) {
          console.log(error);
          return res.status(500).send(error);
        }
        res.json(results);
      });
  });
});


router.post('/manager/post/comments/', isAuthenticated, (req, res) => {
  req.pool.getConnection(function(err,connection) {
    if (err) {
      res.sendStatus(500);
      return;
    }

    const query = `INSERT INTO Comment (ParentID, EventID, UserID, CommentText) VALUES(NULL, ?, ?, ?)`;

    connection.query(query,
                [req.body.EventID, req.session.userID, req.body.CommentText], (error, results) => {
        connection.release();
        if (error) {
          console.log(error);
          return res.status(500).send(error);
        }
        const newCommentID = results.insertId;
        req.pool.getConnection(function(err,connection2) {
          if (err) {
              console.log("Database connection error" + error);
              return res.sendStatus(401);
          }
          var query2 = `SELECT c.CommentID, c.CommentText, c.Timestamp, u.First_name, u.Last_name FROM Comment c JOIN User u ON c.UserID = u.User_ID WHERE c.CommentID = ?`;
          connection2.query(query2, [newCommentID], (error, results2) => {
              connection.release();
              if (error){
                  console.log("Query error" + error);
                  return res.sendStatus(401);
              }

              res.json(results2[0]);
          });

          return ;
      });
    });
  });
});

router.post('/manager/post/comments/reply/', isAuthenticated, (req, res) => {
  req.pool.getConnection(function(err,connection) {
    if (err) {
    res.sendStatus(500);
    return;
    }

    const query = `INSERT INTO Comment (ParentID, EventID, UserID, CommentText) VALUES(?, ?, ?, ?)`;

    connection.query(query,
                [req.body.ParentID, req.body.EventID, req.session.userID, req.body.CommentText], (error, results) => {
        connection.release();
        if (error) {
          console.log(error);
          return res.status(500).send(error);
        }

        const newCommentID = results.insertId;
        req.pool.getConnection(function(err,connection2) {
          if (err) {
              console.log("Database connection error" + error);
              return res.sendStatus(401);
          }
          var query2 = `SELECT c.CommentID, c.CommentText, c.Timestamp, u.First_name, u.Last_name FROM Comment c JOIN User u ON c.UserID = u.User_ID WHERE c.CommentID = ?`;
          connection2.query(query2, [newCommentID], (error, results2) => {
              connection.release();
              if (error){
                  console.log("Query error" + error);
                  return res.sendStatus(401);
              }

              res.json(results2[0]);
          });
          return;
        });
    });
  });
});


router.get('/manager/read/users', isAuthenticated, hasRole("Manager"),  (req, res) => {
  req.pool.getConnection(function (err, connection) {
    if (err) {
      res.sendStatus(500);
      return;
    }
    connection.query(`SELECT u.User_ID, u.Username, u.First_name, u.Last_name, u.Email, R.Role_name, u.Phone_number FROM User u inner join Role R on u.Role_ID = R.RoleID JOIN User_Branch ub ON u.User_ID = ub.User_ID JOIN Branch b ON ub.BranchID = b.BranchID WHERE b.Manager_ID = ?;`, [req.session.userID], (error, results) => {
      connection.release();
      if (error) {
        return res.status(500).send(error);
    }
    res.json(results);
    });
  });
});


router.post('/manager/create/events', isAuthenticated, upload.single('image'), hasRole("Manager"),  (req, res) => {
  console.log('File:', req.file); // Log the file data

  req.pool.getConnection(function (err, connection) {
    if (err) {
      res.sendStatus(500);
      return;
    }

    const data = req.body;
    const image = req.file ? req.file.buffer : null; // Get the uploaded file buffer

    console.log('Image Buffer:', image); // Log the buffer data to verify

    if (!image) {
      return res.status(400).send('No image uploaded');
    }

    const sql = `INSERT INTO Event (name, location, date, description, BranchID, Image)
                   VALUES (?, ?, ?, ?, (SELECT BranchID FROM Branch WHERE Manager_ID = ?), ?)`;
    connection.query(sql, [data.name, data.location, data.date, data.description, req.session.userID, image], (error, results, fields) => {
      connection.release();
      if (error) return res.status(500).send(error);
      res.send('Data inserted');
    });
  });
});

router.post('/admin/create/branches', isAuthenticated, hasRole("Administrator"), upload.none(), (req, res) => {

  req.pool.getConnection(function (err, connection) {
    if (err) {
      res.sendStatus(500);
      return;
    }

    const data = req.body;

    const sql = `INSERT INTO Branch (Branch_name, Location, Description, Manager_ID)
                   VALUES (?, ?, ?, (SELECT User_ID FROM User WHERE Email = ?))`;
    connection.query(sql, [data.name, data.location, data.description, data.email], (error, results, fields) => {
      connection.release();
      if (error) return res.status(500).send(error);
      res.send('Data inserted');
    });
  });
});

router.post('/admin/delete/branches', isAuthenticated, hasRole("Administator"),  (req, res) => {
  req.pool.getConnection(function (err, connection) {
    if (err) {
      res.sendStatus(500);
      return;
    }

    const sql = `CALL deleteBranch(?)`;
    connection.query(sql, [req.body.branchID], (error, results, fields) => {
      connection.release();
      if (error) return res.status(500).send(error);
      res.sendStatus(200);
    });
  });
});

router.post('/admin/edit/branches', isAuthenticated, upload.none(), hasRole("Administrator"),  (req, res) => {
  req.pool.getConnection(function (err, connection) {
    if (err) {
      res.sendStatus(500);
      return;
    }

    const data = req.body;

    const sql = `Update Branch
                  set Branch_name = ?, Description = ?, Location = ?
                  where BranchID = ?`;
    connection.query(sql, [data.name, data.description, data.location, data.id], (error, results, fields) => {
      connection.release();
      if (error) {
        console.log(error);
        return res.status(500).send(error);
      }
      res.send('Update branch Successfully');
    });

  });
});



router.post('/manager/edit/events', isAuthenticated, upload.single('image'), hasRole("Manager"),  (req, res) => {
  console.log('File:', req.file); // Log the file data

  req.pool.getConnection(function (err, connection) {
    if (err) {
      res.sendStatus(500);
      return;
    }

    const data = req.body;
    const image = req.file ? req.file.buffer : null; // Get the uploaded file buffer

    console.log('Image Buffer:', image); // Log the buffer data to verify

    if (!image) {
      const sql = `Update Event
                   set Name = ?, Description = ?, Date = ?, Location = ?
                   where EventID = ?`;
      connection.query(sql, [data.name, data.description, data.date, data.location, data.id], (error, results, fields) => {
        connection.release();
        if (error) return res.status(500).send(error);
        res.send('Update event Successfully');
      });
    }
    else {
      const sql = `Update Event
                    set Name = ?, Description = ?, Date = ?, Location = ?, Image = ?
                    where EventID = ?`;
      connection.query(sql, [data.name, data.description, data.date, data.location, image, data.id], (error, results, fields) => {
        connection.release();
        if (error) return res.status(500).send(error);
        res.send('Update event Successfully');
      });
    }
  });
});

router.post('/manager/delete/events', isAuthenticated, hasRole("Manager"),  (req, res) => {
  req.pool.getConnection(function (err, connection) {
    if (err) {
      res.sendStatus(500);
      return;
    }

    const sql = `delete from Event where EventID = ?;`;
    connection.query(sql, [req.body.eventID], (error, results, fields) => {
      connection.release();
      if (error) return res.status(500).send(error);
      res.sendStatus(200);
    });
  });
});


router.get('/manager/get/user', isAuthenticated, hasRole("Manager"),  (req, res) => {
  req.pool.getConnection(function (err, connection) {
    if (err) {
      res.sendStatus(500);
      return;
    }
    connection.query(`SELECT * FROM USER`, (error, results) => {
      connection.release();
      if (error) {
        return res.status(500).send(error);
      }
      res.json(results);
    });
  });
});

router.post('/manager/delete/user', isAuthenticated, hasRole("Manager"),  (req, res) => {
  req.pool.getConnection(function (err, connection) {
    if (err) {
      console.log(err);
      res.sendStatus(500);
      return;
    }
    connection.query(`Delete from User_Branch where User_ID = ?`, [req.body.userID], (error, results) => {
      connection.release();
      if (error) {
        console.log(error);
        return res.status(500).send(error);
      }
      res.sendStatus(200);
    });
  });
});

router.post('/manager/add/user', isAuthenticated, hasRole("Manager"),  (req, res) => {
  req.pool.getConnection(function (err, connection) {
    if (err) {
      console.log(err);
      res.sendStatus(500);
      return;
    }
    connection.query(`select BranchID from Branch where Manager_ID = ?`, [req.session.userID], (error, results) => {
      connection.release();
      if (error) {
        console.log(error);
        return res.status(500).send(error);
      }

      const branchid = results[0].BranchID;

      req.pool.getConnection(function (err, connection2) {
        if (err) {
          console.log("Database connection error" + error);
          return;
        }
        var query2 = `INSERT INTO User_Branch (User_ID, BranchID) SELECT User_ID, ? FROM User WHERE Email = ?`;
        connection2.query(query2, [branchid, req.body.userEmail], (error, results2) => {
          connection.release();
          if (error) {
            console.log("Query error" + error);
            return;
          }
          console.log("Add new member to branch successfully");
          res.sendStatus(200);
        });
      });
    });
  });
});

router.get('/manager/read/updates/', isAuthenticated, hasRole("Manager"),  (req, res) => {
  req.pool.getConnection(function (err, connection) {
    if (err) {
      res.sendStatus(500);
      return;
    }

    connection.query(`Select U.UpdateID, U.Time_stamp, U.Title, U.Message, T.Type_name  from UpdateTable U join Type T on U.TypeID = T.TypeID join Branch B on B.BranchID = U.BranchID where B.Manager_ID = ?`, [req.session.userID], (error, results) => {
      connection.release();
      if (error) {
        return res.status(500).send(error);
      }

      results.forEach(update => {
        if (update.Time_stamp) {
          const date = new Date(update.Time_stamp);
          const year = date.getUTCFullYear();
          const month = String(date.getUTCMonth() + 1).padStart(2, '0'); // Months are zero-indexed
          const day = String(date.getUTCDate()).padStart(2, '0');

          update.Time_stamp = `${year}-${month}-${day}`;
        }
      });



      res.json(results);
    });
  });
});
router.get('/read/updates/', isAuthenticated, (req, res) => {
  req.pool.getConnection(function (err, connection) {
    if (err) {
      res.sendStatus(500);
      return;
    }

    connection.query(`SELECT
                        u.UpdateID,
                        u.Time_stamp,
                        u.Message,
                        u.Title,
                        u.Manager,
                        u.BranchID,
                        u.TypeID,
                        t.Type_name,
                        b.Branch_name
                    FROM
                        UpdateTable u
                        JOIN Branch b ON u.BranchID = b.BranchID
                        JOIN Type t ON u.TypeID = t.TypeID
                        JOIN User_Branch ub ON u.BranchID = ub.BranchID
                    WHERE
                        ub.User_ID = ?
                    ORDER BY
                        u.Time_stamp DESC;
                    `, [req.session.userID], (error, results) => {
      connection.release();
      if (error) {
        console.log(error);
        return res.status(500).send(error);
      }

      results.forEach(update => {
        if (update.Time_stamp) {
          const date = new Date(update.Time_stamp);
          const year = date.getUTCFullYear();
          const month = String(date.getUTCMonth() + 1).padStart(2, '0'); // Months are zero-indexed
          const day = String(date.getUTCDate()).padStart(2, '0');

          update.Time_stamp = `${year}-${month}-${day}`;
        }
      });


console.log(results);
      res.json(results);
    });
  });
});


router.get('/read/updates/:id', isAuthenticated, (req, res) => {
  req.pool.getConnection(function (err, connection) {
    if (err) {
      res.sendStatus(500);
      return;
    }

    connection.query(`SELECT
                        u.UpdateID,
                        u.Time_stamp,
                        u.Message,
                        u.Title,
                        u.Manager,
                        u.BranchID,
                        u.TypeID,
                        t.Type_name,
                        b.Branch_name
                    FROM
                        UpdateTable u
                        JOIN Branch b ON u.BranchID = b.BranchID
                        JOIN Type t ON u.TypeID = t.TypeID
                        LEFT JOIN User_Branch ub ON u.BranchID = ub.BranchID AND ub.User_ID = ?
                    WHERE
                        (ub.User_ID IS NOT NULL AND ub.BranchID = ? AND t.Type_name = 'private')
                        OR (u.BranchID = ? AND t.Type_name = 'public')
                    ORDER BY
                        u.Time_stamp DESC;
                    `, [req.session.userID, req.params.id, req.params.id], (error, results) => {
      connection.release();
      if (error) {
        console.log(error);
        return res.status(500).send(error);
      }

      results.forEach(update => {
        if (update.Time_stamp) {
          const date = new Date(update.Time_stamp);
          const year = date.getUTCFullYear();
          const month = String(date.getUTCMonth() + 1).padStart(2, '0'); // Months are zero-indexed
          const day = String(date.getUTCDate()).padStart(2, '0');

          update.Time_stamp = `${year}-${month}-${day}`;
        }
      });



      res.json(results);
    });
  });
});

router.post('/manager/create/updates', isAuthenticated, upload.none(), hasRole("Manager"),  (req, res) => {
  req.pool.getConnection(function (err, connection) {
    if (err) {
      res.sendStatus(500);
      return;
    }

    const data = req.body;

    const sql = `insert into UpdateTable(Title, Message, Manager, BranchID, TypeID)
values (?, ?, ?, ?, ?);`;
    connection.query(sql, [data.Title, data.Message, req.session.userID, req.session.BranchID[0], data.Type], (error, results, fields) => {
      connection.release();
      if (error) {
        console.log(error);
        return res.status(500).send(error);
      }
      res.send('Data inserted');
    });
  });
});

router.get('/manager/read/updates/:id', isAuthenticated, hasRole("Manager"),  (req, res) => {
  req.pool.getConnection(function (err, connection) {
    if (err) {
      res.sendStatus(500);
      return;
    }

    connection.query(`Select U.Time_stamp, U.Title, U.Message, B.Branch_name, T.Type_name from UpdateTable U join Type T on U.TypeID = T.TypeID join Branch B on B.BranchID = U.BranchID where U.UpdateID = ?`,
      [req.params.id], (error, results) => {
        connection.release();
        if (error) {
          return res.status(500).send(error);
        }

        results.forEach(update => {
          if (update.Time_stamp) {
            const date = new Date(update.Time_stamp);
            const year = date.getUTCFullYear();
            const month = String(date.getUTCMonth() + 1).padStart(2, '0'); // Months are zero-indexed
            const day = String(date.getUTCDate()).padStart(2, '0');

            update.Time_stamp = `${year}-${month}-${day}`;
          }
        });

        res.json(results);
      });
  });
});

router.get('/read/updates-detail/:id', isAuthenticated, (req, res) => {
  req.pool.getConnection(function (err, connection) {
    if (err) {
      res.sendStatus(500);
      return;
    }

    connection.query(`Select U.Time_stamp, U.Title, U.Message, B.Branch_name, T.Type_name from UpdateTable U join Type T on U.TypeID = T.TypeID join Branch B on B.BranchID = U.BranchID where U.UpdateID = ?`,
      [req.params.id], (error, results) => {
        connection.release();
        if (error) {
          return res.status(500).send(error);
        }

        results.forEach(update => {
          if (update.Time_stamp) {
            const date = new Date(update.Time_stamp);
            const year = date.getUTCFullYear();
            const month = String(date.getUTCMonth() + 1).padStart(2, '0'); // Months are zero-indexed
            const day = String(date.getUTCDate()).padStart(2, '0');

            update.Time_stamp = `${year}-${month}-${day}`;
          }
        });

        res.json(results);
      });
  });
});

router.get('/manager/read/events/member/:id', isAuthenticated, hasRole("Manager"),  (req, res) => {
  req.pool.getConnection(function (err, connection) {
    if (err) {
      res.sendStatus(500);
      return;
    }

    const query = `select U.First_name, U.Last_name from User U join User_Event UE on UE.User_ID = U.User_ID where UE.EventID = ?`;

    connection.query(query,
      [req.params.id], (error, results) => {
        connection.release();
        if (error) {
          console.log(error);
          return res.status(500).send(error);
        }
        res.json(results);
      });
  });
});

router.get('/manager/read/BranchRequest', isAuthenticated, hasRole("Manager"),  (req, res) => {
  req.pool.getConnection(function (err, connection) {
    if (err) {
      res.sendStatus(500);
      return;
    }

    const query = `select U.First_name, U.Last_name, J.RequestID from JoinRequest J join User U on J.UserID = U.User_ID where BranchID = ? and Status = "Pending"`;

    connection.query(query,
      [req.session.BranchID[0]], (error, results) => {
        connection.release();
        if (error) {
          console.log(error);
          return res.status(500).send(error);
        }
        res.json(results);
      });
  });
});

router.post('/manager/approve/BranchRequest', isAuthenticated, hasRole("Manager"),  (req, res) => {
  req.pool.getConnection(function (err, connection) {
    if (err) {
      res.sendStatus(500);
      return;
    }

    const data = req.body;

    const query = `CALL ApproveJoinRequest(?)`;

    connection.query(query,
      [data.RequestID], (error, results) => {
        connection.release();
        if (error) {
          console.log(error);
          return res.status(500).send(error);
        }
        res.sendStatus(200);
      });
  });
});

router.post('/manager/reject/BranchRequest', isAuthenticated, hasRole("Manager"),  (req, res) => {
  req.pool.getConnection(function (err, connection) {
    if (err) {
      res.sendStatus(500);
      return;
    }

    const data = req.body;

    const query = `delete from JoinRequest where RequestID = ?`;

    connection.query(query,
      [data.RequestID], (error, results) => {
        connection.release();
        if (error) {
          console.log(error);
          return res.status(500).send(error);
        }
        res.sendStatus(200);
      });
  });
});



module.exports = router;