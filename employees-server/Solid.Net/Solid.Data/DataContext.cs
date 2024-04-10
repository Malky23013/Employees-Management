using Microsoft.EntityFrameworkCore;
using Solid.Core.Entities;

namespace Solid.Data
{
    public class DataContext : DbContext
    {
        public DbSet<Employee> EmployeeList { get; set; }

        public DbSet<Role> RoleList { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)                           
        {
            optionsBuilder.UseSqlServer(@"Server=(localdb)\MSSQLLocalDB;Database=my_db");
       }    
    }
}