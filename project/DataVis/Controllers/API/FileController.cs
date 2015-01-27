using System;
using System.Collections.Generic;
using System.IO;
using System.Web;
using System.Web.Http;
using DataVis.Logic;
using Newtonsoft.Json.Linq;

namespace DataVis.Controllers.API
{
    public class FileController : ApiController
    {
        private readonly IXlsParser _xlsParser;
        private readonly IDataParser _dataParser;

        public FileController(IXlsParser xlsParser, IDataParser dataParser)
        {
            this._xlsParser = xlsParser;
            this._dataParser = dataParser;
        }

        [Authorize]
        public List<JObject> Post()
        {
            var httpRequest = HttpContext.Current.Request;
            if (httpRequest.Files.Count == 0)
                return null;
            var postedFile = httpRequest.Files[0];
            var fileName = Guid.NewGuid().ToString("n");
            var filePath = HttpContext.Current.Server.MapPath("~/Storage/" + fileName + ".xlsx");
            postedFile.SaveAs(filePath);
            var result = _dataParser.GetJson(_xlsParser.Parse(fileName));
            File.Delete(filePath);
            return result;
        }
    }
}