using DataVis.Data.Models;

namespace DataVis.BusinessLogic.Services.Interfaces
{
    public interface IDashboardService
    {
        Dashboard Add(Dashboard dashboard);
        void Delete(string id);
        void Update(Dashboard dashboard);
        Dashboard GetById(string id); 
    }
}