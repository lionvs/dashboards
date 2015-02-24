using System.Web.Mvc;

namespace DataVis.Controllers
{
    public class HomeController : Controller
    {
        public ActionResult Index()
        {
            return User.Identity.IsAuthenticated ? View() : View("GetStarted");
        }

        public ActionResult Register()
        {
            return View();
        }

        public ActionResult Login()
        {
            return View();
        }

        public ActionResult PageNotFound()
        {
            return View();
        }   
    }
}