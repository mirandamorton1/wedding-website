const express = require('express');
const path = require('path');
const cors = require('cors');
const dotenv = require('dotenv');
dotenv.config();
const bodyParser = require("body-parser"); 


const PORT = process.env.PORT || 3001;
const app = express();

const dbService = require('./dbService');

// Express middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static('public'));
app.use(cors());


//.ejs stuff
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');
app.set('views', __dirname);
// var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended:false}));


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

// read
app.get('/getAll', (request, response) => {
  const db = dbService.getDbServiceInstance();

  const result = db.getAllData();
  
  result
  .then(data => response.json({data : data}))
  .catch(err => console.log(err));
})

// update
app.patch('/update', (request, response) => {
  console.log(request.body);
  const { id, attending } = request.body;
  const db = dbService.getDbServiceInstance();

  const result = db.updateNameById(id, attending);
  
  result
  .then(data => response.json({success : data}))
  .catch(err => console.log(err));
});

app.get('/search/:full_name', (request, response) => {
  const { full_name } = request.params;
  const db = dbService.getDbServiceInstance();

  const result = db.searchByName(full_name);
  
  result
  .then(data => response.json({success : data}))
  .catch(err => console.log(err));
})

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
