using System;
using System.Collections.Generic;
using System.Web;
using System.Web.Http;
using System.Web.Mvc;
using Newtonsoft.Json.Linq;

namespace DataVis.Controllers.API
{
    using Excel = Microsoft.Office.Interop.Excel;

    public class FileController : ApiController
    {
        // GET api/<controller>
        public IEnumerable<string> Get()
        {
            return null;
        }

        // GET api/<controller>/5
        public JsonResult Get(string id)
        {
            var result = new JsonResult();
            try
            {
                var filePath = HttpContext.Current.Server.MapPath("~/Storage/" + id + ".xlsx");
                var xlApp = new Excel.Application();
                var xlWorkbook = xlApp.Workbooks.Open(filePath, 0, true, 5, "", "", true, Excel.XlPlatform.xlWindows,
                    "\t", false, false, 0, true, 1, 0);
                var xlWorksheet = (Excel._Worksheet)xlWorkbook.Sheets[1];
                var xlRange = xlWorksheet.UsedRange;
                object[,] arr = xlRange.Value2;

                var titleArray = new string[arr.GetLength(1)];
                for (int i = 1; i <= arr.GetLength(1); i++)
                    titleArray[i - 1] = arr[1, i].ToString();

                var objArray = new List<JObject>();

                for (int j = 2; j <= arr.GetLength(0); j++)
                {
                    var obj = new JObject();
                    for (int i = 1; i <= arr.GetLength(1); i++)
                    {
                        double value;
                        if (!Double.TryParse(arr[j, i].ToString(), out value))
                            obj.Add(titleArray[i - 1], arr[j, i].ToString());
                        else
                            obj.Add(titleArray[i - 1], value);
                    }
                    objArray.Add(obj);
                }
                result.Data = new { success = true, dataObj = objArray };
            }
            catch (Exception e)
            {
                result.Data = new { success = false, msg = e.Message };
            }
            return result;
        }

        // POST api/<controller>
        public JsonResult Post()
        {
            var result = new JsonResult();
            var httpRequest = HttpContext.Current.Request;
            if (httpRequest.Files.Count > 0)
            {
                var postedFile = httpRequest.Files[0];
                var fileId = Guid.NewGuid().ToString("n");
                var filePath = HttpContext.Current.Server.MapPath("~/Storage/" + fileId + ".xlsx");
                postedFile.SaveAs(filePath);
                result.Data = new { success = true, id = fileId };
            }
            else
                result.Data = new { success = false };
            return result;
        }

        // PUT api/<controller>/5
        public void Put(int id, [FromBody]string value)
        {
        }

        // DELETE api/<controller>/5
        public void Delete(int id)
        {
        }
    }
}