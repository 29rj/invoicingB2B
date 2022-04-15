const Pool = require('pg').Pool

const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'api',
  password: '12345',
  port: 5432,
});

const getUsers = (req,res) => {
    pool.query('SELECT * FROM users', (err, results) => {
        if (err) {
          return res.status(201).send(`err: : ${err}`);
        }
        return res.status(200).json(results.rows);
    })
}

const postUsers = (req,res) => {

  const {user_id,name,fk_company} = req.body;

  // console.log(req.body +" this one");

  pool.query('SELECT * FROM companies WHERE id = $1',[fk_company],(err,result)=>{
    console.log(result+" my");
    if(result.rowCount == 0){
      return res.status(201).send(`Company does not exist`);
    }
    else{
      pool.query('INSERT INTO users (user_id,name,fk_company) VALUES ($1, $2 ,$3)', [user_id,name,fk_company], (err, results) => {
        if (err) {
          return res.status(201).send(`err: : ${err}`);
        }
        return res.status(201).send(`User added with ID: ${user_id}`)
      })
    }
  })
}

const patchUsers = (req, res) => {

  const {user_id,name,fk_company} = req.body;

  pool.query('SELECT * FROM companies WHERE id = $1',[fk_company],(err,result)=>{
    // console.log(result+" my");
    if(result.rowCount == 0){
      return res.status(201).send(`Company does not exist`);
    }
    else{

      pool.query('SELECT * FROM users WHERE user_id = $1',[user_id],(err,result)=>{
        if(err){
          return res.status(201).send(`err is ${err}`)
        }
        if(result.rowCount == 0){
          return res.status(201).send(`User does not exist with ID: ${user_id}`)
        }

        pool.query(
          'UPDATE users SET user_id = $1, name = $2 , fk_company = $3 WHERE user_id = $1',
          [user_id,name,fk_company],
          (err, results) => {
            if (err) {
              return res.status(201).send(`err: : ${err}`);
            }
            return res.status(201).send(`User modified with ID: ${user_id}`)
          }
        )

      })
    }
  })
}

const getUser = (req,res)=>{
  const id = req.params.id;
  pool.query('SELECT * FROM users WHERE user_id = $1',[id],(err,result)=>{
    if(result.rowCount == 0){
      return res.status(200).send(`User Does Not Exist With ID : ${id}`);
    }
    else{
      return res.status(200).json(result.rows);
    }
  })
}

module.exports = {
    getUsers,
    postUsers,
    patchUsers,
    getUser
}