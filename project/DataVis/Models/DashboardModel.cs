using System.ComponentModel.DataAnnotations;

namespace DataVis.Models
{
    public class DashboardModel
    {
        [Required]
        [MaxLength(30)]
        public string Title { get; set; }
        [Required]
        public string Config { get; set; }
        [MaxLength(300)]
        public string Description { get; set; }

        public string UserName { get; set; }
        public string DataSource { get; set; }
    }
}
