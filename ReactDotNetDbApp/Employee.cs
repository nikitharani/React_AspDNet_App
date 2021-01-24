using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ReactDnetApp
{
    public class Employee
    {
        public int Id { get; set; }
        public int Sno { get; set; }

        private string firstname;
        private string lastname;
        private string address;
        public string FirstName { get { return firstname; } set { firstname = UppercaseWords(value); } }
        public string LastName { get { return lastname; } set { lastname = UppercaseWords(value); } }
        public long Mobile { get; set; }
        public long Telephone { get; set; }
        public string Address { get { return address; } set { address = UppercaseWords(value); } }
        public string Email { get; set; }
        //public DateTime DateOfStart { get; set; }
        public string DateOfStart { get; set; }
        //public int StartDay;
        //public int StartMonth; 
        //public int StartYear;


        //// constructor
        //public Employee(uint id, uint sno, string fname, string lname)
        //{
        //    this.Id = id;
        //    this.Sno = sno;
        //    this.FirstName = fname;
        //    this.LastName = lname;

        //}

        // Capitalise the first letter in the string.
        private string UppercaseWords(string value)
        {
            char[] array = value.ToCharArray();
            // Handle the first letter in the string.
            if (array.Length >= 1)
            {
                if (char.IsLower(array[0]))
                {
                    array[0] = char.ToUpper(array[0]);
                }
            }
            // Scan through the letters, checking for spaces.
            // ... Uppercase the lowercase letters following spaces.
            for (int i = 1; i < array.Length; i++)
            {
                if (array[i - 1] == ' ')
                {
                    if (char.IsLower(array[i]))
                    {
                        array[i] = char.ToUpper(array[i]);
                    }
                }
            }
            return new string(array);
        }

    }
}
