using System.Collections.Generic;
using System.Web.Http;
using Newtonsoft.Json.Linq;
using DataVis.Logic;

namespace DataVis.Controllers.API
{
    public class DataController : ApiController
    {
        private readonly IXlsParser _xlsParser;
        private readonly IDataParser _dataParser;

        public DataController(IXlsParser xlsParser, IDataParser dataParser)
        {
            this._xlsParser = xlsParser;
            this._dataParser = dataParser;
        }

        public List<JObject> Get(string id)
        {
            var data = _xlsParser.GetDataFromFile(id);
            return _dataParser.GetJson(data);
        }
    }
}
