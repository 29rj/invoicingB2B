# invoicingB2B

Explanation of End-Points:

1. Users's End-Points:

  a) /users/get : * It fetches all the users in the "users" table i.e. all the registered users.
                  * If any user does not exist then it handles that case also and gives warning that 'User Does Not Exist'
                  
  b) /users/post : * It creates user entry, by taking 3 informations i.e. "user_id,name,fk_company". (fk_company is foreign key refering to the company table)
                   * It also checks that if that fk_company actually exist in the company table or not,
                              - If exist then entry is successfull
                              - If entry does not exist then it returns warning that "company does not exist".
 
  c) /users/patch : * It updates the attributes of the users like user_id,name,fk_company.
                    * Contrainst that if the company_id exist or not has also been handled.
                    
                 
2. Companies's End-Points:

  a) /companies/get : * It fetches all the companies in the "companies" table i.e. all the registered companies.
                      * If any companies does not exist then it handles that case also and gives warning that 'Company Does Not Exist'
                  
  b) /companies/post : * It creates companies entry, by taking 3 informations i.e. "id,name,email".
                       * It also checks that if that "id" already exist in the company table or not,
                              - If does not exist then entry is successfull
                              - If entry exist then it returns warning that "Company already exist".
 
  c) /companies/patch : * It updates the attributes of the companies like id,name,email.
                        * Contrainst that if the id exist or not has also been handled.
                        
                   
3. Invoices's End-Points:

  a) /invoices/get : * It fetches all the invoices in the "invoices" table i.e. all the poissible invoices generated.
                  
  b) /invoices/post : * It takes user_id (person who is generating), from_id(selling companies), to_id(buying companies) ,amount.
                      * It creates the transaction invoices by the user with user_id
                      * It checks all the possible edge cases like:
                              - If user_id does not exist it gives warining that user does not exist and does not move forward with the process.
                              - If any transaction already exists like (company_id_1 to company_id_2) then it gives warning then it already exists.
                              - If not exist then it will give entry to the invoice table with following amount.
 
  c) /invoices/patch : * It maintains each transaction and by each user too using single invoice table.
                       * It works in following ways:
                          - If invoices does not exist then it will give warning then it does not exist and go and create that transaction.
                          - If it exist then we have two options:
                                a) If that invoice is created by that user who created that transaction initially then it will update that amount and add transaction to the item array of the invoice table.
                                b) If that invoice is created by another user then simply insert that transaction according to that user_id.
                    
                    
 Steps To Run In The Local Server :
 
  a) Download the repository.
  b) Then open terminal and go to that index.js directory.
  c) And run nodemon index.js in terminal, it start our sever on the port 7777.
  d) TO check working of each URL, go to the "test.http" file where already some filled data is there and use it to the check working of all the end-points.
  
