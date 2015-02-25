using System.Data.Entity;
using DataVis.Data.Models;

namespace DataVis.Data
{
    public class DashboardContext : DbContext
    {
        public DashboardContext()
            : base("Name=DashboardContext")
        {
        }

        public DbSet<Dashboard> Dashboards { get; set; }
    }
}
