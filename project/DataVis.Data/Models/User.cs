using System.Collections.Generic;

namespace DataVis.Data.Models
{
    public partial class User
    {
        public User()
        {
            this.Dashboards = new List<Dashboard>();
        }

        public int Id { get; set; }
        public string Login { get; set; }
        public string Username { get; set; }
        public string Email { get; set; }
        public string PasswordSalt { get; set; }
        public string PasswordHash { get; set; }
        public System.DateTime DateRegistered { get; set; }
        public virtual ICollection<Dashboard> Dashboards { get; set; }
    }
}
