using System.Data.Entity.ModelConfiguration;

namespace DataVis.Data.Models.Mapping
{
    public class DashboardMap : EntityTypeConfiguration<Dashboard>
    {
        public DashboardMap()
        {
            // Primary Key
            this.HasKey(t => t.Id);

            // Properties
            this.Property(t => t.Id)
                .IsRequired()
                .HasMaxLength(50);

            this.Property(t => t.Title)
                .IsRequired()
                .HasMaxLength(30);

            this.Property(t => t.Config)
                .IsRequired();

            this.Property(t => t.Description)
                .HasMaxLength(300);

            this.Property(t => t.UserId)
                .HasMaxLength(128);

            // Table & Column Mappings
            this.ToTable("Dashboards");
            this.Property(t => t.Id).HasColumnName("Id");
            this.Property(t => t.Title).HasColumnName("Title");
            this.Property(t => t.Config).HasColumnName("Config");
            this.Property(t => t.Description).HasColumnName("Description");
            this.Property(t => t.DataSource).HasColumnName("DataSource");
            this.Property(t => t.UserId).HasColumnName("UserId");
        }
    }
}
