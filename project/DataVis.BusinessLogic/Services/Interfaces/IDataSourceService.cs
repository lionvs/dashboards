using DataVis.Data.Models;

namespace DataVis.BusinessLogic.Services.Interfaces
{
    public interface IDataSourceService
    {
        DataSource Add(DataSource dataSource);
        void Delete(string id);
        void Update(DataSource dataSource);
        DataSource GetById(string id);
    }
}