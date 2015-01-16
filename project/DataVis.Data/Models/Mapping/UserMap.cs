using System.Data.Entity.ModelConfiguration;

namespace DataVis.Data.Models.Mapping
{
    public class UserMap : EntityTypeConfiguration<User>
    {
        public UserMap()
        {
            // Primary Key
            this.HasKey(t => t.Id);

            // Properties
            this.Property(t => t.Login)
                .IsRequired()
                .HasMaxLength(20);

            this.Property(t => t.Username)
                .IsRequired()
                .HasMaxLength(20);

            this.Property(t => t.Email)
                .IsRequired()
                .HasMaxLength(100);

            this.Property(t => t.PasswordSalt)
                .IsRequired()
                .HasMaxLength(200);

            this.Property(t => t.PasswordHash)
                .IsRequired()
                .HasMaxLength(200);

            // Table & Column Mappings
            this.ToTable("Users");
            this.Property(t => t.Id).HasColumnName("Id");
            this.Property(t => t.Login).HasColumnName("Login");
            this.Property(t => t.Username).HasColumnName("Username");
            this.Property(t => t.Email).HasColumnName("Email");
            this.Property(t => t.PasswordSalt).HasColumnName("PasswordSalt");
            this.Property(t => t.PasswordHash).HasColumnName("PasswordHash");
            this.Property(t => t.DateRegistered).HasColumnName("DateRegistered");
        }
    }
}
