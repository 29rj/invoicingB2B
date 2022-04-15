const Pool = require('pg').Pool

const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'api',
  password: '12345',
  port: 5432,
});

const getCompanies = (req,res) => {
    pool.query('SELECT * FROM companies', (error, results) => {
        if (error) {
          res.status(201).send(`Error: : ${error}`);
        }
        res.status(200).json(results.rows);
    })
}

const postCompanies = (req,res) => {

  const {id,name,email} = req.body;

  // console.log(req.body +" this one");

  pool.query('INSERT INTO companies (id,name,email) VALUES ($1, $2 ,$3)', [id,name,email], (error, results) => {
    if (error) {
      res.status(201).send(`Error: : ${error}`);
    }
    res.status(201).send(`User added with ID: ${id}`)
  })
}

const patchCompanies = (req, res) => {

  const {id,name,email} = req.body;

  pool.query(
    'UPDATE companies SET id = $1, name = $2 , email = $3 WHERE id = $1',
    [id,name,email],
    (error, results) => {
      if (error) {
        res.status(201).send(`Error: : ${error}`);
      }
      res.status(200).send(`User modified with ID: ${id}`)
    }
  )
}

const getCompany= (req,res)=>{
  const id = req.params.id;
  pool.query('SELECT * FROM companies WHERE id = $1',[id],(err,result)=>{
    if(result.rowCount == 0){
      res.status(200).send(`Company Does Not Exist With ID : ${id}`);
    }
    else{
      res.status(200).json(result.rows);
    }
  })
}

module.exports = {
    getCompanies,
    postCompanies,
    patchCompanies,
    getCompany
}