using System.Collections.Generic;

namespace DataVis.Logic
{
    public interface IXlsParser
    {
        List<List<object>> Parse(string filename);
    }
}