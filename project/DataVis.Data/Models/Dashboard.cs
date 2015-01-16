namespace DataVis.Data.Models
{
    public partial class Dashboard
    {
        public int Id { get; set; }
        public string Title { get; set; }
        public string Config { get; set; }
        public int UserId { get; set; }
        public virtual User User { get; set; }
    }
}
