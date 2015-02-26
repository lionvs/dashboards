using System;
using System.Collections.Generic;
using Newtonsoft.Json.Linq;

namespace DataVis.Logic
{
    public class DataParser : IDataParser
    {
        public List<JObject> GetJson(List<List<object>> data)
        {
            var result = new List<JObject>();

            var titleArray = new string[data[0].Count];
            for (int i = 0; i < data[0].Count; i++)
                titleArray[i] = data[0][i].ToString();

            for (int j = 1; j < data.Count; j++)
            {
                var obj = new JObject();
                for (int i = 0; i < data[0].Count; i++)
                    obj.Add(titleArray[i], GetValue(data[j][i]));
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