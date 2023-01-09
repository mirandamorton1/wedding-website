const express = require('express');
const path = require('path');
// Import and require mysql2
const mysql = require('mysql2');

const PORT = process.env.PORT || 3001;
const app = express();


// Express middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static('public'));


//.ejs stuff
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');
app.set('views', __dirname);
// var bodyParser = require('body-parser');
// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended:true}));


app.get('/', (req, res) => 
  res.sendFile(path.join(__dirname, '/public/index.html'))
);

app.get('/questions', (req, res) =>
  res.sendFile(path.join(__dirname, '/public/pages/questions.html'))
);

app.get('/photos', (req, res) =>
  res.sendFile(path.join(__dirname, '/public/pages/photos.html'))
);

app.get('/party', (req, res) =>
  res.sendFile(path.join(__dirname, '/public/pages/party.html'))
);

app.get('/registry', (req, res) =>
  res.sendFile(path.join(__dirname, '/public/pages/registry.html'))
);

app.get('/rsvp', (req, res) =>
  res.sendFile(path.join(__dirname, '/public/pages/rsvp.html'))
);

app.get('/shuttle', (req, res) =>
  res.sendFile(path.join(__dirname, '/public/pages/shuttle.html'))
);

app.get('/story', (req, res) =>
  res.sendFile(path.join(__dirname, '/public/pages/story.html'))
);

app.get('/todo', (req, res) =>
  res.sendFile(path.join(__dirname, '/public/pages/todo.html'))
);

app.get('/travel', (req, res) =>
  res.sendFile(path.join(__dirname, '/public/pages/travel.html'))
);

// Connect to database
const db = mysql.createConnection(
  {
    host: 'localhost',
    // MySQL username,
    user: 'root',
    // TODO: Add MySQL password here
    password: 'rootroot',
    database: 'wedding_db'
  },
  console.log(`Connected to the wedding_db database.`)
);

//query database
db.query('SELECT * FROM guests', function (err, results) {
  console.log(results);
});

app.get('/rsvp',function(req, res){
  db.connect(function(error){
    if(error) console.log(error);

    const sql = "SELECT * FROM guests";

    db.query(sql,function(error, result){
      if(error) console.log(error);
      res.render(__dirname+'/public/pages/rsvp.html',{guests:result});
    });
  });
});

app.get('/search',function(req,res){

  var first_name =req.query.first_name;
  var last_name =req.query.last_name;

  db.connect(function(error){
    if(error) console.log(error);

    const sql = "SELECT * FROM guests WHERE first_name LIKE '%"+first_name+"%' AND last_name LIKE '%"+last_name+"%'";

    db.query(sql, function(error, result){
      if(error)console.log(error);
      res.render(__dirname+'/public/pages/rsvp.html',{guests:result});
    });
  });
});


// // Read all movies
// app.get('/api/movies', (req, res) => {
//   const sql = `SELECT id, movie_name AS title FROM movies`;
  
//   db.query(sql, (err, rows) => {
//     if (err) {
//       res.status(500).json({ error: err.message });
//        return;
//     }
//     res.json({
//       message: 'success',
//       data: rows
//     });
//   });
// });

// // Delete a movie
// app.delete('/api/movie/:id', (req, res) => {
//   const sql = `DELETE FROM movies WHERE id = ?`;
//   const params = [req.params.id];
  
//   db.query(sql, params, (err, result) => {
//     if (err) {
//       res.statusMessage(400).json({ error: res.message });
//     } else if (!result.affectedRows) {
//       res.json({
//       message: 'Movie not found'
//       });
//     } else {
//       res.json({
//         message: 'deleted',
//         changes: result.affectedRows,
//         id: req.params.id
//       });
//     }
//   });
// });

// // Read list of all reviews and associated movie name using LEFT JOIN
// app.get('/api/movie-reviews', (req, res) => {
//   const sql = `SELECT movies.movie_name AS movie, reviews.review FROM reviews LEFT JOIN movies ON reviews.movie_id = movies.id ORDER BY movies.movie_name;`;
//   db.query(sql, (err, rows) => {
//     if (err) {
//       res.status(500).json({ error: err.message });
//       return;
//     }
//     res.json({
//       message: 'success',
//       data: rows
//     });
//   });
// });

// // BONUS: Update review name
// app.put('/api/review/:id', (req, res) => {
//   const sql = `UPDATE reviews SET review = ? WHERE id = ?`;
//   const params = [req.body.review, req.params.id];

//   db.query(sql, params, (err, result) => {
//     if (err) {
//       res.status(400).json({ error: err.message });
//     } else if (!result.affectedRows) {
//       res.json({
//         message: 'Movie not found'
//       });
//     } else {
//       res.json({
//         message: 'success',
//         data: req.body,
//         changes: result.affectedRows
//       });
//     }
//   });
// });

// // Default response for any other request (Not Found)
// app.use((req, res) => {
//   res.status(404).end();
// });

app.listen(PORT, () => {
  console.log(`Server running on port http://localhost:${PORT}`);
});
