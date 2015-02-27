using System.Collections.Generic;

namespace DataVis.Logic.FileParsers
{
    public interface IFileParser
    {
        List<List<object>> Parse(string filename);
    }
}