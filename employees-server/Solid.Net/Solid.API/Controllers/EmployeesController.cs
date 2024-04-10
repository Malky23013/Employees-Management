using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Solid.API.Models;
using Solid.Core.DTOs;
using Solid.Core.Entities;
using Solid.Core.Services;
using System.Data;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace Solid.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
   
    public class EmployeesController : ControllerBase
    {
        private readonly IEmployeeService _employeeService;
        private readonly IMapper _mapper;
        public EmployeesController(IEmployeeService employeeService,IMapper mapper)
        {
            _employeeService = employeeService;
            _mapper = mapper;
        }
        
        // GET: api/<UsersController>
        [HttpGet]
        [Authorize]
        public IActionResult Get()
        {
            //את התפקידים צריך לעבור על מערך התפקידים ולהוציא משם
            var employees = _employeeService.GetEmployees();
            var employeeDtos = _mapper.Map<IEnumerable<EmployeeDto>>(employees);
            return Ok(employeeDtos);
        }

        // GET api/<UsersController>/5
        [HttpGet("{id}")]
        public IActionResult Get(int id)
        {
            var employee = _employeeService.GetById(id);
            if (employee is null)
            {
                return NotFound();
            }
            return Ok(employee);
        }

        // POST api/<UsersController>
        [HttpPost]
        public IActionResult Post([FromBody] EmployeeModel employee)
        {
            var emp = new Employee()
            {
                IdNumber = employee.IdNumber,   
                FirstName = employee.FirstName,
                LastName = employee.LastName,
                DateOfBirth = employee.DateOfBirth,
                DateOfStart = employee.DateOfStart,
                Gender = (Core.Entities.Gender)employee.Gender,
                Address=employee.Address,
                Status= (Core.Entities.Status)1,
                Roles = employee.Roles
                //לשלוח מכאן לקונטרולר של הוספה תפקיד עם ID 
            
            };
            return Ok(_employeeService.AddEmployee(emp));
        }
        // PUT api/<UsersController>/5
        [HttpPut("{id}")]
        public IActionResult Put(int id, [FromBody] Employee employee)
        {
            var Employee = new Employee() { Address=employee.Address, FirstName = employee.FirstName, LastName = employee.LastName,
                DateOfBirth = employee.DateOfBirth, DateOfStart = employee.DateOfStart, Gender = employee.Gender,
                Status = (Core.Entities.Status)1, Roles = employee.Roles };
            return Ok(_employeeService.UpdateEmployee(id, Employee));
        }
        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            return Ok(_employeeService.DeleteEmployee(id)); 
        }

    }
}
