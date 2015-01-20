﻿using System;
using System.Runtime.InteropServices;
using Excel = Microsoft.Office.Interop.Excel;
using System.Web;

namespace DataVis.Logic
{
    class XlsParser : IXlsParser
    {
        public object[,] Parse(string filename)
        {
            var xlApp = new Excel.Application();
            var filePath = HttpContext.Current.Server.MapPath("~/Storage/" + filename + ".xlsx");
            var xlWorkbook = xlApp.Workbooks.Open(filePath, 0, true, 5, "", "", true, Excel.XlPlatform.xlWindows,
                "\t", false, false, 0, true, 1, 0);
            var xlWorksheet = (Excel._Worksheet)xlWorkbook.Sheets[1];
            var xlRange = xlWorksheet.UsedRange;
            object[,] data = xlRange.Value2;

            xlApp.Quit();
            Marshal.ReleaseComObject(xlApp);
            GC.Collect();

            return data;
        }
    }
}
