const Pool = require('pg').Pool

const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'api',
  password: '12345',
  port: 5432,
});

const getInvoices = (req, res) => {
  pool.query('SELECT * FROM invoices', (err, results) => {
    if (err) {
      res.status(201).send(`err: : ${err}`);
    }
    res.status(200).json(results.rows);
  })
}

const postInvoices = (req, res) => {

  const { user_id, from_id, to_id, amount } = req.body;

  const items = [amount];

  pool.query('SELECT * from users WHERE user_id = $1', [user_id], (err, results) => {
    if (err) {
      console.log("err: ", err);
      res.status(201).send(`err: : ${err}`);
    }

    if (results.rowCount == 0) {
      console.log("User Does Not Exists!!");
      res.status(201).send(`User Does Not Exists!!`)
    }
    else {
      pool.query('SELECT * FROM invoices WHERE from_id = $1 and to_id = $2', [from_id, to_id], (err, results) => {
        if (err) {
          res.status(201).send(`err: : ${err}`);
        }
        if (results.rowCount == 0) {
          
          pool.query('SELECT fk_company from users WHERE user_id = $1',[user_id],(err,company_id)=>{
            // console.log("ID Company-> ",company_id.rows[0].fk_company);
    
            if(company_id.rows[0].fk_company != from_id && company_id.rows[0].fk_company != to_id){
              res.status(201).send(`User Does Not Belong the Company!!!`);
            }
            else{
              pool.query('INSERT INTO invoices (user_id,from_id,to_id,amount,items) VALUES ($1, $2 ,$3, $4, $5)', [user_id, from_id, to_id, amount, items], (err, result) => {
                if (err) {
                  console.log("err: ", err);
                }
                res.status(201).send(`Transaction from : ${from_id} to ${to_id} added !!!`)
              })
            }
          })
        }
        else {
          console.log("Invoice Already Exist !!!");
          res.status(201).send(`Transaction Already Existed !!!`)
        }
      })
    }
  })
}

const patchInvoices = (req, res) => {

  const { user_id, from_id, to_id,amount } = req.body;

  pool.query('SELECT * from users WHERE user_id = $1', [user_id], (err, user) => {
    if (err) {
      console.log("err: ", err);
      res.status(201).send(`err: : ${err}`);
    }

    // console.log("User->",user.rows[0].user_id);

    if (user.rowCount == 0) {
      console.log("User Does Not Exists!!");
      res.status(201).send(`User Does Not Exists!!`)
    }
    else {
      // console.log("USER_ID-> ",user.user_id);

      pool.query('SELECT fk_company from users WHERE user_id = $1',[user.rows[0].user_id],(err,company_id)=>{
        // console.log("ID Company-> ",company_id.rows[0].fk_company);

        if(company_id.rows[0].fk_company != from_id && company_id.rows[0].fk_company != to_id){
          res.status(201).send(`User Does Not Belong the Company!!!`);
        }
        else{
          pool.query('SELECT * from invoices WHERE from_id = $1 and to_id = $2',[from_id,to_id],(err,result)=>{
            console.log("Row-> ",result);

            if(err){
              console.log("err: ",err);
              throw err
            }

            if(result.rowCount == 0){
              console.log("No Such Transaction Exist...You need To create one!!!");
              res.status(201).send(`No Such Transaction Exist...You need To create one!!!`);
            }
            else{
              let currAmount = parseInt(result.rows[0].amount);

              let currItems = result.rows[0].items;

              let amt = parseInt(amount);

              currAmount += amt;

              currItems.push(amt);

              console.log("CurrAmounnt-> ",currAmount, " " ,amt);

              pool.query('UPDATE invoices SET amount = $1, items = $2 WHERE from_id = $3 and to_id =$4 and user_id = $5',[currAmount, currItems, from_id, to_id,user_id],(err, updated) => {
                if (err) {
                  res.status(201).send(`err: : ${err}`);
                }
                if(updated.rowCount == 0){

                  const currIm = [amount];
                  
                  pool.query('INSERT INTO invoices (user_id,from_id,to_id,amount,items) VALUES ($1, $2 ,$3, $4, $5)', [user_id, from_id, to_id, amount, currIm], (err, result) => {
                    if (err) {
                      console.log("err: ", err);
                    }
                    // res.status(201).send(`Transaction from : ${from_id} to ${to_id} added !!!`)
                  })

                  res.status(200).send(`Invoice insertion successful!!`)
                }
                else{
                  res.status(200).send(`Invoice Updated successfully!!`)
                }
              })
              console.log("Transaction exist");
            }
          })

          // res.status(201).send(`User Belong the Company!!!`);
        }
      })
    }
  })
}

const getInvoice = (req,res)=>{
  const id = req.params.id;
  pool.query('SELECT * FROM invoices WHERE invoice_id = $1',[id],(err,result)=>{
    if(result.rowCount == 0){
      res.status(200).send(`Invoice Does Not Exist With ID : ${id}`);
    }
    else{
      res.status(200).json(result.rows);
    }
  })
}

module.exports = {
  getInvoices,
  postInvoices,
  patchInvoices,
  getInvoice
}