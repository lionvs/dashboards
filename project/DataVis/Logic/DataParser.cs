using System;
using System.Collections.Generic;
using Newtonsoft.Json.Linq;

namespace DataVis.Logic
{
    public class DataParser : IDataParser
    {
        public List<JObject> GetJson(object[,] data)
        {
            var result = new List<JObject>();

            var titleArray = new string[data.GetLength(1)];
            for (int i = 1; i <= data.GetLength(1); i++)
                titleArray[i - 1] = data[1, i].ToString();

            for (int j = 2; j <= data.GetLength(0); j++)
            {
                var obj = new JObject();
                for (int i = 1; i <= data.GetLength(1); i++)
                {
                    double value;
                    if (!Double.TryParse(data[j, i].ToString(), out value))
                        obj.Add(titleArray[i - 1], data[j, i].ToString());
                    else
                        obj.Add(titleArray[i - 1], value);
                }
                result.Add(obj);
            }
            return result;
        }
    }
}