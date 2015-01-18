using System;
using System.Web;
using System.Web.Http;
using Newtonsoft.Json.Linq;

namespace DataVis.Controllers.API
{
    [Authorize]
    public class FileController : ApiController
    {
        public JObject Post()
        {
            var result = new JObject();
            var httpRequest = HttpContext.Current.Request;
            if (httpRequest.Files.Count == 0)
                return null;
            var postedFile = httpRequest.Files[0];
            var fileId = Guid.NewGuid().ToString("n");
            var filePath = HttpContext.Current.Server.MapPath("~/Storage/" + fileId + ".xlsx");
            postedFile.SaveAs(filePath);
            result.Add("url", "/api/data/" + fileId);
            return result;
        }
    }
}