using DataVis.BusinessLogic.Repositories;
using DataVis.BusinessLogic.Services.Interfaces;
using DataVis.Data.Models;

namespace DataVis.BusinessLogic.Services
{
    public class DashboardService : IDashboardService
    {
        private readonly UnitOfWorkFactory _factory;

        public DashboardService(UnitOfWorkFactory factory)
        {
            _factory = factory;
        }


        public Dashboard Add(Dashboard dashboard)
        {
            using (var unitOfWork = _factory.CreateUnitOfWork())
            {
                if (dashboard != null)
                {
                    var result = unitOfWork.DashboardRepository.Insert(dashboard);
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
                unitOfWork.DashboardRepository.Delete(id);
                unitOfWork.Save();
            }
        }

        public void Update(Dashboard dashboard)
        {
            using (var unitOfWork = _factory.CreateUnitOfWork())
            {
                unitOfWork.DashboardRepository.Update(dashboard);
                unitOfWork.Save();
            }
        }

        public Dashboard GetById(string id)
        {
            using (var unitOfWork = _factory.CreateUnitOfWork())
            {
                return unitOfWork.DashboardRepository.GetById(id);
            }
        }
    }
}
