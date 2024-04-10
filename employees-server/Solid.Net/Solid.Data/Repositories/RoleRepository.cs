using Solid.Core.Entities;
using Solid.Core.Repositories;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Solid.Data.Repositories
{
    public class RoleRepository:IRoleRepository
    {
        private readonly DataContext _context;

        public RoleRepository(DataContext context)
        {
            _context = context;
        }

        public Role AddRole(Role role)
        {
            _context.RoleList.Add(role);
            _context.SaveChanges();
            return role;
        }

        public void DeleteRole(int id)
        {
            _context.RoleList.Remove(_context.RoleList.ToList().Find(u => u.Id == id));
        }

        public Role GetById(int id)
        {
            return _context.RoleList.ToList().Find(u => u.Id == id);
        }

        public List<Role> GetRoles()
        {
            return _context.RoleList.ToList();
        }

        public Role UpdateRole(int id, Role role)
        {
            var updateRole = _context.RoleList.ToList().Find(u => u.Id == id);
            if (updateRole != null)
            {
                updateRole.IsManagerial = role.IsManagerial;
                updateRole.DateOfStart = role.DateOfStart;
                updateRole.Name = role.Name;
                return updateRole;
            }
            return null;
        }
    }
}
