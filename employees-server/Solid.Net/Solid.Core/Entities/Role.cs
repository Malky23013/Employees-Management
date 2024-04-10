using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Solid.Core.Entities
{
    public enum Position
    {
        Secretary,
        Manager,
        Teacher,
        Supervisor,
        Assistant
    }

    public class Role
    {
        public int Id { get; set; }

        public Position Name { get; set; }

        public bool IsManagerial { get; set; }

        public DateTime DateOfStart { get; set; }

   
    }
}
