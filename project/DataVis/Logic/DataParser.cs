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
                    obj.Add(titleArray[i - 1], GetValue(data[j, i]));
                result.Add(obj);
            }
            return result;
        }

        private dynamic GetValue(object o)
        {
            if (o == null)
                return null;
            double dValue;
            int iValue;
            if (Int32.TryParse(o.ToString(), out iValue))
                return iValue;
            if (Double.TryParse(o.ToString(), out dValue))
                return dValue;
            return o.ToString();
        }
    }
}