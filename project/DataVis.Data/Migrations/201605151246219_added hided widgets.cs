namespace DataVis.Data.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class addedhidedwidgets : DbMigration
    {
        public override void Up()
        {
            AddColumn("dbo.Dashboards", "HidedWidgets", c => c.String());
        }
        
        public override void Down()
        {
            DropColumn("dbo.Dashboards", "HidedWidgets");
        }
    }
}
