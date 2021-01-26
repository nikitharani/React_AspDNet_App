using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
//Add MySql Library
//using MySql.Data.MySqlClient;
using System.Data;
using System.Data.SqlClient;
using Microsoft.Extensions.Configuration;

namespace ReactDnetApp
{
    public class DbConnection
    {
        private SqlConnection connection;
        public string Server { get; set; }
        public string Database { get; set; }
        public string Uid { get; set; }
        public string Password { get; set; }
        public string Tablename { get; set; }

        //Constructor
        public DbConnection()
        {
            Initialize();
        }

        //Initialize values
        private void Initialize()
        {
            Tablename = "employeapp";

            string connectionString = Environment.GetEnvironmentVariable("REACT_DB_URL");
            //string connectionString = "Data Source=.;Initial Catalog=DotNetApp;Integrated Security=true";
            //string connectionString = @"Data Source=LAPTOP-9EB2FOHB;Initial Catalog=DotNetApp;User ID=LAPTOP-9EB2FOHB\\Ramuni;Password=";
            //string connectionString = "user id=LAPTOP-9EB2FOHB\\Ramuni;password=;server=LAPTOP-9EB2FOHB;Trusted_Connection=yes;database=DotNetApp;connection timeout=30";

            connection = new SqlConnection(connectionString);
            //string connectionString = "SERVER=LAPTOP-9EB2FOHB;DATABASE=DotNetApp;UID=LAPTOP-9EB2FOHB\\Ramuni;PASSWORD=;";
            //connection = new MySqlConnection(connectionString);

        }

        //open connection to database
        private bool OpenConnection()
        {
            try
            {
                connection.Open();
                return true;
            }
            catch (Exception ex)
            {
                Console.WriteLine("Can not open connection ! ");
                return false;
            }
        }

        //Close connection
        private bool CloseConnection()
        {
            try
            {
                connection.Close();
                return true;
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.Message);
                return false;
            }
        }

        //Insert statement
        public bool Insert(Employee emp)
        {
            string query = $"INSERT INTO {Tablename} (FirstName,LastName,Email,Address,Mobile,HomePhone,DateOfStart) VALUES("+
                $"'{emp.FirstName}', '{emp.LastName}','{emp.Email}','{emp.Address}',{emp.Mobile},{emp.Telephone},'{emp.DateOfStart}')";

            //open connection
            if (this.OpenConnection() == true)
            {
                //create command and assign the query and connection from the constructor
                SqlCommand cmd = new SqlCommand(query, connection);

                //Execute command
                cmd.ExecuteNonQuery();

                //close connection
                this.CloseConnection();

                return true;
            }

            return false;
        }

        //Update statement
        public bool Update(Employee employ)
        {
            string query = $"UPDATE {Tablename} SET FirstName='{employ.FirstName}', LastName='{employ.LastName}' WHERE id={employ.Id}";
            Console.WriteLine(employ.FirstName);
            //Open connection
            if (this.OpenConnection() == true)
            {
                //create mysql command
                SqlCommand cmd = new SqlCommand();
                //Assign the query using CommandText
                cmd.CommandText = query;
                //Assign the connection using Connection
                cmd.Connection = connection;

                //Execute query
                cmd.ExecuteNonQuery();

                //close connection
                this.CloseConnection();

                return true;
            }
            return false;
        }

        //Delete statement
        public bool Delete(int Id)
        {
            string query = $"DELETE FROM {Tablename} WHERE id={Id}";

            if (this.OpenConnection() == true)
            {
                SqlCommand cmd = new SqlCommand(query, connection);
                cmd.ExecuteNonQuery();
                this.CloseConnection();

                return true;
            }
            return false;
        }

        //Select statement
        public List<Employee> Select()
        {
            string query = $"SELECT * FROM {Tablename}";

            //Create a list to store the result
            List<Employee> empList = new List<Employee>();

            //Open connection
            if (this.OpenConnection() == true)
            {
                //Create Command
                SqlCommand cmd = new SqlCommand(query, connection);
                //Create a data reader and Execute the command
                SqlDataReader dataReader = cmd.ExecuteReader();

                int count = 0;

                //Read the data and store them in the list
                while (dataReader.Read())
                {
                    count++;
                    empList.Add(new Employee() { Id = (int)(dataReader["Id"]), Sno=count, FirstName = dataReader["FirstName"].ToString(),
                        LastName = dataReader["LastName"].ToString(),Email=dataReader["Email"].ToString(), Mobile =(long)dataReader["Mobile"],
                        Telephone =(long)dataReader["HomePhone"], Address=dataReader["Address"].ToString(),
                        DateOfStart =dataReader["DateOfStart"].ToString() });
                }

                //close Data Reader
                dataReader.Close();

                //close Connection
                this.CloseConnection();

                //return list to be displayed
                return empList;
            }
            else
            {
                return empList;
            }
        }

        
        
    }
}
