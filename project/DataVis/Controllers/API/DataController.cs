using System;
using System.Web.Http;
using DataVis.BusinessLogic.Services.Interfaces;
using DataVis.Data.Models;
using Newtonsoft.Json.Linq;

namespace DataVis.Controllers.API
{
    //[Authorize]
    public class DataController : ApiController
    {
        private readonly IDataSourceService _dataSourceService;

        public DataController(IDataSourceService dataSourceService)
        {
            _dataSourceService = dataSourceService;
        }

        public JObject Get(string dataId)
        {
            var dataSource = _dataSourceService.GetById(dataId);
            return new JObject { { "data", dataSource.DataString }, { "id", dataSource.Id } };
        }

        public JObject Post(string data)
        {
            var dataSource = new DataSource() { DataString = data, Id = Guid.NewGuid().ToString("n") };
            var addedDataSource = _dataSourceService.Add(dataSource);
            return new JObject {{"id", addedDataSource.Id}};
        }
    }
}
