﻿using System;
using System.Collections.Generic;
using System.Data;
using System.Data.OleDb;
using System.IO;
using System.Linq;

namespace DataVis.Logic
{
    public class XlsParser : IXlsParser
    {
        public List<List<object>> Parse(string filename)
        {
            var fileFullName = Path.Combine(AppDomain.CurrentDomain.BaseDirectory, @"Storage\" + filename + ".xlsx");
            var connectionString = "Provider=Microsoft.ACE.OLEDB.12.0;Data Source=" + fileFullName + ";Extended Properties=\"Excel 12.0;IMEX=1;HDR=NO;TypeGuessRows=0;ImportMixedTypes=Text\"";

            var adapter = new OleDbDataAdapter();
            var conn = new OleDbConnection(connectionString);
            conn.Open();

            DataTable excelSheets = conn.GetOleDbSchemaTable(OleDbSchemaGuid.Tables,
                new object[] { null, null, null, "TABLE" });

            const int workSheetNumber = 0;
            string spreadSheetName = excelSheets.Rows[workSheetNumber]["TABLE_NAME"].ToString();

            string strQuery = "select * from [" + spreadSheetName + "] ";
            adapter.SelectCommand = new OleDbCommand(strQuery, conn);
            var dsExcel = new DataSet();
            adapter.Fill(dsExcel);
            conn.Close();
            var result = new List<List<object>>();
            var listDataRow = dsExcel.Tables[0].Rows.Cast<DataRow>().ToList();
            foreach (var item in listDataRow)
            {
                var row = new List<object>();
                for (var i = 0; i < item.ItemArray.Count(); i++)
                    row.Add(item.ItemArray[i]);
                result.Add(row);
            }
            return result;
        }
    }
}