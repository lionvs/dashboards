using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Web;

namespace DataVis.Logic
{
    public class CsvParser : IFileParser
    {
        public List<List<object>> Parse(string filename)
        {
            const string fileType = ".csv";
            var fileFullName = HttpContext.Current.Server.MapPath("~/Storage/" + filename + fileType);
            var result = new List<List<object>>();
            using (var sr = new StreamReader(fileFullName))
            {
                string line;
                while ((line = sr.ReadLine()) != null)
                {
                    var values = line.Split(',');
                    List<object> listValuesLine = values.Cast<object>().ToList();
                    result.Add(listValuesLine);
                }
            }
            return result;
        }
    }
}