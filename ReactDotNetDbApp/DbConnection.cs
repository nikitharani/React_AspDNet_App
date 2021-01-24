﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

//Add MySql Library
using MySql.Data.MySqlClient;

namespace ReactDnetApp
{
    public class DbConnection
    {
        private MySqlConnection connection;
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
            Server = "localhost";
            Database = "dotnetapp";
            Uid = "root";
            Password = "";
            Tablename = "employeeapp";
            string connectionString;
            connectionString = "SERVER=" + Server + ";" + "DATABASE=" +
            Database + ";" + "UID=" + Uid + ";" + "PASSWORD=" + Password + ";";

            connection = new MySqlConnection(connectionString);
        }

        //open connection to database
        private bool OpenConnection()
        {
            try
            {
                connection.Open();
                return true;
            }
            catch (MySqlException ex)
            {
                //When handling errors, you can your application's response based 
                //on the error number.
                //The two most common error numbers when connecting are as follows:
                //0: Cannot connect to server.
                //1045: Invalid user name and/or password.
                switch (ex.Number)
                {
                    case 0:
                        Console.WriteLine("Cannot connect to server.  Contact administrator");
                        break;

                    case 1045:
                        Console.WriteLine("Invalid username/password, please try again");
                        break;
                }
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
            catch (MySqlException ex)
            {
                Console.WriteLine(ex.Message);
                return false;
            }
        }

        //Insert statement
        public bool Insert(Employee emp)
        {
            string query = $"INSERT INTO {Tablename} (FirstName,LastName) VALUES('{emp.FirstName}', '{emp.LastName}')";

            //open connection
            if (this.OpenConnection() == true)
            {
                //create command and assign the query and connection from the constructor
                MySqlCommand cmd = new MySqlCommand(query, connection);

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
                MySqlCommand cmd = new MySqlCommand();
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
                MySqlCommand cmd = new MySqlCommand(query, connection);
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
                MySqlCommand cmd = new MySqlCommand(query, connection);
                //Create a data reader and Execute the command
                MySqlDataReader dataReader = cmd.ExecuteReader();

                int count = 0;

                //Read the data and store them in the list
                while (dataReader.Read())
                {
                    count++;
                    empList.Add(new Employee() { Id = (int)(dataReader["Id"]), Sno=count, FirstName = dataReader["FirstName"].ToString(), LastName = dataReader["LastName"].ToString() });
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

        ////Count statement
        //public int Count()
        //{
        //    string query = $"SELECT Count(*) FROM {Tablename}";
        //    int Count = -1;

        //    //Open Connection
        //    if (this.OpenConnection() == true)
        //    {
        //        //Create Mysql Command
        //        MySqlCommand cmd = new MySqlCommand(query, connection);

        //        //ExecuteScalar will return one value
        //        Count = int.Parse(cmd.ExecuteScalar() + "");

        //        //close Connection
        //        this.CloseConnection();

        //        return Count;
        //    }
        //    else
        //    {
        //        return Count;
        //    }
        //}

        ////Backup
        //public void Backup()
        //{
        //}

        ////Restore
        //public void Restore()
        //{
        //}
    }
}
