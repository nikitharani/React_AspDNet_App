using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Logging;

using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ReactDnetApp.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class EmployeeController : ControllerBase
    {
        //private static readonly string[] Summaries = new[]
        //{
        //    "Freezing", "Bracing", "Chilly", "Cool", "Mild", "Warm", "Balmy", "Hot", "Sweltering", "Scorching"
        //};

        private readonly ILogger<EmployeeController> _logger;

        public EmployeeController(ILogger<EmployeeController> logger)
        {
            _logger = logger;
        }

        public List<Employee> empList { get; set; }

        [HttpGet]
        //public IEnumerable<Employee> Get()
        public JsonResult Get()

        {
            DbConnection mydb = new DbConnection();

            //List<Employee> empList;
            empList = mydb.Select();

            return new JsonResult(empList);

            //List<Employee> empList = new List<Employee>
            //{
            //    new Employee{Sno=1, Id=1,FirstName="Abhinav",LastName="Bangalore"},

            //    new Employee{Sno=2, Id=2,FirstName="Abhishek",LastName="Chennai"},

            //    new Employee{Sno=3, Id=3,FirstName="Akshay",LastName="Bangalore"},

            //    new Employee{Sno=4, Id=4,FirstName="Akash",LastName="Chennai"},

            //    new Employee{Sno=5, Id=5,FirstName="Anil",LastName="Bangalore"}
            //};
            //return empList;
        }
        [HttpPost]
        //post method
        public JsonResult Post(Employee employee)
        {
            DbConnection mydb = new DbConnection();

            if (mydb.Insert(employee))
            {

                return new JsonResult("Added Succesufully!");
            }
            else
            {
                return new JsonResult("Failed adding applicant data!");
            }

        }
        [HttpPut]
        //put method
        public JsonResult Put([FromBody] Employee employee)
        {
            DbConnection mydb = new DbConnection();

            if (mydb.Update(employee))
            {
                return new JsonResult("Updated Succesufully!");
            }
            else
            {
                return new JsonResult("Failed to update applicant data!");
            }
        }

        [HttpDelete("{id}")]
        //Delete method
        public JsonResult Delete(int id)
        {
            DbConnection mydb = new DbConnection();

            if (mydb.Delete(id))
            {
                return new JsonResult("Deleted Succesufully!");
            }
            else
            {
                return new JsonResult("Failed to Delete applicant data!");
            }


        }

    }
}

