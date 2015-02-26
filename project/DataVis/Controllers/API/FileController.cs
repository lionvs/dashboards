using System;
using System.IO;
using System.Web;
using System.Web.Http;
using DataVis.Logic;

namespace DataVis.Controllers.API
{
    [Authorize]
    public class FileController : ApiController
    {
        private readonly IXlsParser _xlsParser;
        private readonly IDataParser _dataParser;

        public FileController(IXlsParser xlsParser, IDataParser dataParser)
        {
            this._xlsParser = xlsParser;
            this._dataParser = dataParser;
        }

        public IHttpActionResult Post()
        {
            var httpRequest = HttpContext.Current.Request;
            if (httpRequest.Files.Count == 0)
                return null;
            var postedFile = httpRequest.Files[0];
            var fileName = Guid.NewGuid().ToString("n");
            var filePath = HttpContext.Current.Server.MapPath("~/Storage/" + fileName + ".xlsx");
            try
            {
                postedFile.SaveAs(filePath);
                var result = _dataParser.GetJson(_xlsParser.Parse(fileName));
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