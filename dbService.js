// Import and require mysql2
const mysql = require('mysql2');

const dotenv = require('dotenv');
let instance = null;
dotenv.config();

let db;

if(process.env.JAWSDB_URL) {
  db = mysql.createConnection(process.env.JAWSDB_URL);
} else {
db = mysql.createConnection(
    {
      host: 'localhost',
      // MySQL username,
      user: 'root',
      // TODO: Add MySQL password here
      password: 'rootroot',
      database: 'wedding_db',
    },
    console.log(`Connected to the wedding_db database.`)
);
}
  
//query database
db.query('SELECT * FROM guest', function (err, results) {
    console.log(results);
});


class DbService {
    static getDbServiceInstance() {
        return instance ? instance : new DbService();
    }


    async getAllData() {
        try {
            const response = await new Promise((resolve, reject) => {
                const query = "SELECT * FROM guest";

                db.query(query, (err, results) => {
                    if (err) reject(new Error(err.message));
                    resolve(results);
                })
            });
            // console.log(response);
            return response;
        } catch (error) {
            console.log(error);
        }
    }
    
    async updateNameById(id, attending) {
        try {
            id = parseInt(id, 10); 
            const response = await new Promise((resolve, reject) => {
                const query = "UPDATE guest SET attending = ?  WHERE id = ?";
    
                db.query(query, [attending, id] , (err, result,) => {
                    if (err) reject(new Error(err.message));
                    resolve(result.affectedRows);
                })
            });
    
            return response === 1 ? true : false;
        } catch (error) {
            console.log(error);
            return false;
        }
    }

    async searchByName(full_name) {
        try {
            const response = await new Promise((resolve, reject) => {
                const query = "SELECT * FROM guest WHERE full_name = ?";

                // const query = "SELECT CONCAT(WHERE first_name = ?, ' ', WHERE last_name = ?) AS name FROM guests"

                // const query = "SELECT * FROM guests WHERE CONCAT(first_name, ' ', last_name) LIKE 'searchValue%'"

                db.query(query, [full_name], (err, results) => {
                    if (err) reject(new Error(err.message));
                    resolve(results);
                })
            });

            return response;
        } catch (error) {
            console.log(error);
        }
    }

    //////OPTIONAL////
    async insertNewName(name) {
        try {
            const dateAdded = new Date();
            const insertId = await new Promise((resolve, reject) => {
                const query = "INSERT INTO names (name, date_added) VALUES (?,?);";

                connection.query(query, [name, dateAdded] , (err, result) => {
                    if (err) reject(new Error(err.message));
                    resolve(result.insertId);
                })
            });
            return {
                id : insertId,
                name : name,
                dateAdded : dateAdded
            };
        } catch (error) {
            console.log(error);
        }
    }

    async deleteRowById(id) {
        try {
            id = parseInt(id, 10); 
            const response = await new Promise((resolve, reject) => {
                const query = "DELETE FROM names WHERE id = ?";
    
                connection.query(query, [id] , (err, result) => {
                    if (err) reject(new Error(err.message));
                    resolve(result.affectedRows);
                })
            });
    
            return response === 1 ? true : false;
        } catch (error) {
            console.log(error);
            return false;
        }
    }///////END OPTIONAL/////
}

module.exports = DbService;

