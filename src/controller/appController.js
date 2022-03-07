const { sql,poolPromise } = require('../services/dbService');

class MainController {
  async addStudent(req, res){
    try {
        if(req.body != null) {
          const student = req.body;
          const pool = await poolPromise;
          console.log(student);
          const result = await pool.request()
          .input('name',sql.VarChar , student.name)
          .input('class',sql.VarChar , student.class)
          .query("INSERT INTO [dbo].[students] (name,class) VALUES (@name,@class)");
          res.send(student.name + " Details Successfully Added");
        } else {
          res.send('Please fill all the details!')
        }        
    } catch (error) {
        console.log(error);
        res.status(400).send(error.message);
    }
  }

  async addMarks(req, res){
    try {
        if(req.body != null) {
          const student = req.body;
          const pool = await poolPromise;
          console.log(student);
          const result = await pool.request()
          .input('studentId',sql.Int , student.studentId)
          .input('paper1',sql.Int , student.paper1)
          .input('paper2',sql.Int , student.paper2)
          .input('paper3',sql.Int , student.paper3)
          .input('paper4',sql.Int , student.paper4)
          .input('paper5',sql.Int , student.paper5)
          .input('sem',sql.Int , student.sem)
          .query("INSERT INTO [dbo].[test] (studentId,paper1,paper2,paper3,paper4,paper5,sem) VALUES (@studentId,@paper1,@paper2,@paper3,@paper4,@paper5,@sem)");
          res.send(student.studentId + " Details Successfully Added");
        } else {
          res.send('Please fill all the details!')
        }        
    } catch (error) {
        console.log(error);
        res.status(400).send(error.message);
    }
  }

  async getMarks(req, res){
    try {
      const pool = await poolPromise;
      
      //To get studentIds
      const result = await pool.request()
      .query(`SELECT studentId FROM students`);
      const studentIds = result.recordset;

      //To get details from studentIds
      let details = [];
      for (const student of studentIds) {
        const result2 = await pool.request()
        .query(`SELECT * FROM test WHERE studentId = '${student.studentId}'`);
        details.push(result2.recordset);
      }
      res.send(details);        
    } catch (error) {
        console.log(error);
        res.status(400).send(error.message);
    }
  }
}

const adminController = new MainController();
module.exports = adminController;
