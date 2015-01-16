using System.Web.Mvc;

namespace DataVis.App_Start
{
    class IsAuthorizeAttribute : AuthorizeAttribute
    {
        protected override void HandleUnauthorizedRequest(AuthorizationContext filterContext)
        {
            filterContext.HttpContext.Response.StatusCode = 401;
            filterContext.HttpContext.Response.SuppressFormsAuthenticationRedirect = true;
            filterContext.Result = new ViewResult
            {
                ViewName = "~/Views/Account/Notauthorized.cshtml",
            };
        }
    }
}
