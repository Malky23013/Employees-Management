using Solid.Core.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Solid.Core.Services
{
    public interface IEmployeeService
    {
        List<Employee> GetEmployees();

        Employee GetById(int id);

        Employee AddEmployee(Employee employee);

        Employee UpdateEmployee(int id, Employee employee);

        Employee DeleteEmployee(int id);


    }
}
