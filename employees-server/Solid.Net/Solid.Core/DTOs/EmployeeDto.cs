using Solid.Core.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Solid.Core.DTOs
{
    public enum Status
    {
        Active, Inactive
    }
    public enum Gender
    {
        Male, Female
    }
    public class EmployeeDto
    {
        public int Id { get; set; }
        public string IdNumber { get; set; }
        public Status Status { get; set; }
        public Gender Gender { get; set; }

        public string FirstName { get; set; }

        public string LastName { get; set; }

        public DateTime DateOfStart { get; set; }

        public DateTime DateOfBirth { get; set; }
        public string Address { get; set; }

        public List<Role> Roles { get; set; }
    }
}
