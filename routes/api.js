const express = require('express');
const path = require('path');
const router = express.Router();
const { isAuthenticated, hasRole } = require('../middleware/auth');
const multer = require('multer');



const storage = multer.memoryStorage();
const upload = multer({ storage: storage });
//route for api


router.get('/read/events', (req, res) => {
  req.pool.getConnection(function (err, connection) {
    if (err) {
      res.sendStatus(500);
      return;
    }

    connection.query(`SELECT * FROM Event`, (error, results) => {
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


router.get('/join/branches/:id', isAuthenticated, (req, res) => {
  req.pool.getConnection(function (err, connection) {
    if (err) {
      res.sendStatus(500);
      return;
    }

    connection.query(`insert User_Branch (User_ID, BranchID) values(?,?)`,
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


router.get('/manager/read/events/', isAuthenticated, (req, res) => {
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

router.get('/manager/read/events/:id', isAuthenticated, (req, res) => {
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


router.get('/manager/read/users', isAuthenticated, (req, res) => {
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


router.post('/manager/create/events', isAuthenticated, upload.single('image'), (req, res) => {
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

router.post('/manager/edit/events', isAuthenticated, upload.single('image'), (req, res) => {
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

router.post('/manager/delete/events', isAuthenticated, (req, res) => {
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


router.get('/manager/get/user', isAuthenticated, (req, res) => {
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

router.post('/manager/delete/user', isAuthenticated, (req, res) => {
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

router.post('/manager/add/user', isAuthenticated, (req, res) => {
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


module.exports = router;