using System.Data.Entity;
using DataVis.Data.Models;

namespace DataVis.Data
{
    public class DashboardContext : DbContext
    {
        public DashboardContext()
            : base("Name=DefaultConnection")
        {
        }

        public DbSet<Dashboard> Dashboards { get; set; }
    }
}
