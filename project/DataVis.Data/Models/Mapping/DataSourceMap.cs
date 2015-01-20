using System.ComponentModel.DataAnnotations.Schema;
using System.Data.Entity.ModelConfiguration;

namespace DataVis.Data.Models.Mapping
{
    public class DataSourceMap : EntityTypeConfiguration<DataSource>
    {
        public DataSourceMap()
        {
            // Primary Key
            this.HasKey(t => t.Id);

            // Properties
            this.Property(t => t.Id)
                .IsRequired()
                .HasMaxLength(50);

            this.Property(t => t.DataString)
                .IsRequired();

            // Table & Column Mappings
            this.ToTable("DataSources");
            this.Property(t => t.Id).HasColumnName("Id");
            this.Property(t => t.DataString).HasColumnName("DataString");
        }
    }
}
