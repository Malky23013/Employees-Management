using Solid.Core.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Solid.Core.Services
{
    public interface IRoleService
    {
        List<Role> GetRoles();

        Role GetById(int id);
        Role AddRole(Role role);

    }
}
