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
            this.Property(t => t.DataString)
                .IsRequired();

            // Table & Column Mappings
            this.ToTable("Datas");
            this.Property(t => t.Id).HasColumnName("Id");
            this.Property(t => t.DataString).HasColumnName("DataString");
        }
    }
}
