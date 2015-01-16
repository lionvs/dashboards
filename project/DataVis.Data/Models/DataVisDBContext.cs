using System.Data.Entity;
using DataVis.Data.Models.Mapping;

namespace DataVis.Data.Models
{
    public partial class DataVisDBContext : DbContext
    {
        static DataVisDBContext()
        {
            Database.SetInitializer<DataVisDBContext>(null);
        }

        public DataVisDBContext()
            : base("Name=DataVisDBContext")
        {
        }

        public DbSet<Dashboard> Dashboards { get; set; }
        public DbSet<DataSource> DataSources { get; set; }
        public DbSet<User> Users { get; set; }

        protected override void OnModelCreating(DbModelBuilder modelBuilder)
        {
            modelBuilder.Configurations.Add(new DashboardMap());
            modelBuilder.Configurations.Add(new DataSourceMap());
            modelBuilder.Configurations.Add(new UserMap());
        }
    }
}
