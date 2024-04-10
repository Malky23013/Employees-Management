using Solid.Core.Entities;

namespace Solid.API.Models
{
    public enum Position
    {
        Secretary,
        Manager,
        Teacher,
        Supervisor,
        Assistant
    }
    public class RoleModel
    {
        public Position Name { get; set; }

        public bool IsManagerial { get; set; }

        public DateTime DateOfStart { get; set; }
    }
}
