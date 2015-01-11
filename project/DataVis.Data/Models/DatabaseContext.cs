using System.Data.Entity;

namespace DataVis.Data.Models
{
    class DatabaseContext : DbContext
    {
        public DbSet<User> Users { get; set; }
        public DbSet<Dashboard> Dashboards { get; set; }
        public DbSet<Data> Datas { get; set; }
    }
}
