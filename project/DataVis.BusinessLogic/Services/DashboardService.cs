using System.Collections.Generic;
using System.Linq;
using DataVis.BusinessLogic.Repositories;
using DataVis.BusinessLogic.Services.Interfaces;
using DataVis.Data.Models;

namespace DataVis.BusinessLogic.Services
{
    public class DashboardService : IDashboardService
    {
        private readonly IUnitOfWorkFactory _factory;

        public DashboardService(IUnitOfWorkFactory factory)
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

        public List<Dashboard> GetByUserId(string userId)
        {
            using (var unitOfWork = _factory.CreateUnitOfWork())
            {
                return unitOfWork.DashboardRepository.Get(x => x.UserId.Equals(userId)).ToList();
            }
        }
    }
}
