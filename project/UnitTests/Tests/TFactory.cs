using DataVis.BusinessLogic.Repositories;
using DataVis.BusinessLogic.Services;
using DataVis.BusinessLogic.Services.Interfaces;
using DataVis.Logic;

namespace UnitTests.Tests
{
    public class TFactory
    {
        public IDataParser CreateDataParser()
        {
            return new DataParser();
        }

        public IXlsParser CreateXlsParser()
        {
            return new XlsParser();
        }

        public IDashboardService CreateDashboardService(IUnitOfWorkFactory unitOfWorkFactory)
        {
            return new DashboardService(unitOfWorkFactory);
        }
    }
}
