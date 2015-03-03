using System.Web.Optimization;

namespace DataVis
{
    public class BundleConfig
    {
        // For more information on bundling, visit http://go.microsoft.com/fwlink/?LinkId=301862
        public static void RegisterBundles(BundleCollection bundles)
        {
            System.Web.Optimization.BundleTable.EnableOptimizations = false;

            bundles.Add(new ScriptBundle("~/bundles/jquery").Include(
                        "~/Scripts/jquery-{version}.js"));

            // Use the development version of Modernizr to develop with and learn from. Then, when you're
            // ready for production, use the build tool at http://modernizr.com to pick only the tests you need.
            bundles.Add(new ScriptBundle("~/bundles/modernizr").Include(
                        "~/Scripts/modernizr-*"));

            bundles.Add(new ScriptBundle("~/bundles/bootstrap").Include(
                      "~/Scripts/bootstrap.js",
                      "~/Scripts/respond.js"));

            bundles.Add(new StyleBundle("~/Content/css").Include(
                      "~/Content/bootstrap.css",
                      "~/Content/site.css"));

            bundles.Add(new ScriptBundle("~/bundles/scripts").Include(
                      "~/Scripts/*.js"));

            bundles.Add(new ScriptBundle("~/bundles/libraries").Include(
                     "~/Scripts/Libraries/*.js"));

            bundles.Add(new ScriptBundle("~/bundles/modules").Include(
                     "~/Scripts/Modules/*.js"));

            bundles.Add(new ScriptBundle("~/bundles/widgets").Include(
                    "~/Scripts/Widgets/*.js"));

            bundles.Add(new ScriptBundle("~/bundles/highchart").Include(
        "~/Scripts/Widgets/widgetHighChart/*.js"));

            bundles.Add(new ScriptBundle("~/bundles/themes").Include(
                    "~/Scripts/Widgets/widgetHighChart/themes/*.js"));
        }
    }
}
