using System.Collections.Generic;

namespace DataVis.Logic
{
    public interface IFileParser
    {
        List<List<object>> Parse(string filename);
    }
}