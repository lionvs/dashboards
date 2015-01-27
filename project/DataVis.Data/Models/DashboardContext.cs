using System.Data.Entity;
using DataVis.Data.Models.Mapping;

namespace DataVis.Data.Models
{
    public class DashboardContext : DbContext
    {
        static DashboardContext()
        {
            Database.SetInitializer<DashboardContext>(null);
        }

        public DashboardContext()
            : base("Name=DashboardContext")
        {
        }

        public DbSet<Dashboard> Dashboards { get; set; }

        protected override void OnModelCreating(DbModelBuilder modelBuilder)
        {
            modelBuilder.Configurations.Add(new DashboardMap());
        }
    }
}
