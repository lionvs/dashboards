using System;

namespace DataVis.Logic
{
    public static class ParserFactory
    {
        public static IFileParser GetFileParser(string type)
        {
            switch (type)
            {
                case "xlsx": return new XlsParser();
                case "csv": return new CsvParser();
            }
            throw new ArgumentException("{0} parser does not exist.", type);
        }
    }
}