const Pool = require('pg').Pool

const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'api',
  password: '12345',
  port: 5432,
});

const getUsers = (req,res) => {
    pool.query('SELECT * FROM users', (error, results) => {
        if (error) {
          throw error
        }
        res.status(200).json(results.rows);
    })
}

const postUsers = (req,res) => {

  const {user_id,name,fk_company} = req.body;

  // console.log(req.body +" this one");

  pool.query('SELECT * FROM companies WHERE id = $1',[fk_company],(err,result)=>{
    console.log(result+" my");
    if(result.rowCount == 0){
      res.status(201).send(`Company does not exist`);
    }
    else{
      pool.query('INSERT INTO users (user_id,name,fk_company) VALUES ($1, $2 ,$3)', [user_id,name,fk_company], (error, results) => {
        if (error) {
          throw error
        }
        res.status(201).send(`User added with ID: ${user_id}`)
      })
    }
  })
}

const patchUsers = (req, res) => {

  const {user_id,name,fk_company} = req.body;

  pool.query(
    'UPDATE users SET user_id = $1, name = $2 , fk_company = $3 WHERE user_id = $1',
    [user_id,name,fk_company],
    (error, results) => {
      if (error) {
        throw error
      }
      res.status(200).send(`User modified with ID: ${user_id}`)
    }
  )
}

module.exports = {
    getUsers,
    postUsers,
    patchUsers
}