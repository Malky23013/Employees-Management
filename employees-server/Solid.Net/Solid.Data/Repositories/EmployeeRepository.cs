using Solid.Core.Entities;
using Solid.Core.Repositories;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Solid.Data.Repositories
{
    public class EmployeeRepository : IEmployeeRepository
    {
        private readonly DataContext _context;

        public EmployeeRepository(DataContext context)
        {
            _context = context;
        }

        public Employee AddEmployee(Employee user)
        {
            _context.EmployeeList.Add(user);
            _context.SaveChanges();
            return user;
        }


        public Employee GetById(int id)
        {
            return _context.EmployeeList.ToList().Find(u => u.Id == id);
        }

        public List<Employee> GetEmployees()
        {
            return _context.EmployeeList.ToList();
        }

        public Employee UpdateEmployee(int id, Employee employee)
        {
            var updateEmployee = _context.EmployeeList.ToList().Find(u => u.Id == id);
            if (updateEmployee != null)
            {
                updateEmployee.FirstName = employee.FirstName;
                updateEmployee.LastName = employee.LastName;
                updateEmployee.DateOfStart = employee.DateOfStart;
                updateEmployee.DateOfBirth = employee.DateOfBirth;
                updateEmployee.Status = employee.Status;
                updateEmployee.Roles=employee.Roles;
                updateEmployee.Address = employee.Address;  
                return updateEmployee;
            }
            _context.SaveChanges();
            return null;
        }

        public Employee DeleteEmployee(int id)
        {
            var updateEmployee = _context.EmployeeList.ToList().Find(u => u.Id == id);
            if (updateEmployee != null)
            {
                updateEmployee.Status = 0;
             
                return updateEmployee;
            }
            return null;
        }

    }
}
