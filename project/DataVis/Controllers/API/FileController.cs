using System;
using System.IO;
using System.Net.Http;
using System.Web;
using System.Web.Http;
using System.Web.Http.Results;
using System.Web.UI.WebControls;
using DataVis.Logic.FileParsers;
using DataVis.Logic;

namespace DataVis.Controllers.API
{
    [Authorize]
    public class FileController : ApiController
    {
        private readonly IDataParser _dataParser;

        public FileController(IDataParser dataParser)
        {
            _dataParser = dataParser;
        }

        public IHttpActionResult Post()
        {
            var httpRequest = HttpContext.Current.Request;
            if (httpRequest.Files.Count == 0)
                return null;
            var postedFile = httpRequest.Files[0];
            var fileType = postedFile.FileName.Substring(postedFile.FileName.LastIndexOf('.') + 1,
                postedFile.FileName.Length - postedFile.FileName.LastIndexOf('.') - 1);
            var fileName = Guid.NewGuid().ToString("n");
            var filePath = HttpContext.Current.Server.MapPath(String.Format("~/Storage/{0}.{1}", fileName, fileType));
            try
            {
                Directory.CreateDirectory(HttpContext.Current.Server.MapPath("~/Storage/"));
                postedFile.SaveAs(filePath);
                var parser = ParserFactory.GetFileParser(fileType);
                var result = _dataParser.GetJson(parser.Parse(fileName));
                File.Delete(filePath);
                return Ok(new { Data = result, Message = (string)null });
            }
            catch (Exception e)
            {
                return Ok(new { Message = e.Message });
            }
        }
    }
}