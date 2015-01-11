using System;
using System.Collections.Generic;

namespace DataVis.Data.Models
{
    class User
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
        public DateTime DateRegistered { get; set; }

        public virtual List<Dashboard> Dashboards { get; set; } 
    }
}
