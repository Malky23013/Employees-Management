using Solid.Core.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Solid.Core.DTOs
{
    public enum Position
    {
        Secretary,
        Manager,
        Teacher,
        Supervisor,
        Assistant
    }
    public class RoleDto
    {
        public Position Name { get; set; }
    }
}
