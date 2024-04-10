using AutoMapper;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Solid.API.Models;
using Solid.Core.DTOs;
using Solid.Core.Entities;
using Solid.Core.Services;
using Solid.Service;

namespace Solid.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class RolesController : ControllerBase
    {
        private readonly IRoleService _roleService;
        private readonly IMapper _mapper;
        public RolesController(IRoleService roleService,IMapper mapper)
        {
            _roleService = roleService;
            _mapper = mapper;
        }

        // GET: api/<UsersController>
        [HttpGet]
        public IActionResult Get()
        {
            return Ok(_roleService.GetRoles().ToList());

            var roles = _roleService.GetRoles();
            var roleDtos = _mapper.Map<IEnumerable<RoleDto>>(roles);
            return Ok(roleDtos);
        }

        // GET api/<UsersController>/5
        [HttpGet("{id}")]
        public IActionResult Get(int id)
        {
            var role = _roleService.GetById(id);
            if (role is null)
            {
                return NotFound();
            }
            return Ok(role);
        }

        // POST api/<UsersController>
        [HttpPost]
        public IActionResult Post([FromBody] RoleModel role)
        {
            var r = new Role()
            {
               // Name = role.Name,
                IsManagerial = role.IsManagerial,
                DateOfStart = role.DateOfStart,
               
            };
            return Ok(_roleService.AddRole(r));
        }
        // PUT api/<UsersController>/5
        [HttpPut("{id}")]
        public void Put(int id, [FromBody] string value)
        {
        }

        // DELETE api/<UsersController>/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
        }
    }
}
