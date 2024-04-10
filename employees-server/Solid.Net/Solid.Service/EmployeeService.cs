using Solid.Core.Entities;
using Solid.Core.Repositories;
using Solid.Core.Services;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Solid.Service
{
    public class EmployeeService : IEmployeeService
    {
        private readonly IEmployeeRepository _employeeRepository;

        public EmployeeService(IEmployeeRepository employeeRepository)
        {
            _employeeRepository = employeeRepository;
        }

        public List<Employee> GetEmployees()
        {
            return _employeeRepository.GetEmployees();
        }

        public Employee GetById(int id)
        {
            return _employeeRepository.GetById(id);
        }

        public Employee AddEmployee(Employee employee)
        {
            return _employeeRepository.AddEmployee(employee);
        }

        public Employee UpdateEmployee(int id, Employee employee)
        {
            return (_employeeRepository.UpdateEmployee(id, employee));  
        }

        public Employee DeleteEmployee(int id)
        {
            return (_employeeRepository.DeleteEmployee(id));
        }
    }
}
