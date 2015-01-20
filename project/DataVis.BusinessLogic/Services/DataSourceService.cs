using DataVis.BusinessLogic.Repositories;
using DataVis.BusinessLogic.Services.Interfaces;
using DataVis.Data.Models;

namespace DataVis.BusinessLogic.Services
{
    public class DataSourceService : IDataSourceService
    {
        private readonly UnitOfWorkFactory _factory;

        public DataSourceService(UnitOfWorkFactory factory)
        {
            _factory = factory;
        }

        public DataSource Add(DataSource dataSource)
        {
            using (var unitOfWork = _factory.CreateUnitOfWork())
            {
                if (dataSource != null)
                {
                    var result = unitOfWork.DataSourceRepository.Insert(dataSource);
                    unitOfWork.Save();
                    return result;
                }
                return null;
            }
        }

        public void Delete(string id)
        {
            using (var unitOfWork = _factory.CreateUnitOfWork())
            {
                unitOfWork.DataSourceRepository.Delete(id);
                unitOfWork.Save();
            }
        }

        public void Update(DataSource dataSource)
        {
            using (var unitOfWork = _factory.CreateUnitOfWork())
            {
                unitOfWork.DataSourceRepository.Update(dataSource);
                unitOfWork.Save();
            }
        }

        public DataSource GetById(string id)
        {
            using (var unitOfWork = _factory.CreateUnitOfWork())
            {
                return unitOfWork.DataSourceRepository.GetById(id);
            }
        }
    }
}
