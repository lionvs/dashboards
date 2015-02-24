using System.Collections.Generic;
using Newtonsoft.Json.Linq;

namespace DataVis.Logic
{
    public interface IDataParser
    {
        List<JObject> GetJson(List<List<object>> data );
    }
}