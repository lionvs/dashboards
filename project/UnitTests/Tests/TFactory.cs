using DataVis.BusinessLogic.Repositories;
using DataVis.BusinessLogic.Services;
using DataVis.BusinessLogic.Services.Interfaces;
using DataVis.Logic;
using DataVis.Logic.FileParsers;

namespace UnitTests.Tests
{
    public class TFactory
    {
        public IDataParser CreateDataParser()
        {
            return new DataParser();
        }

        public IFileParser CreateXlsParser()
        {
            return new XlsParser();
        }

        public IDashboardService CreateDashboardService(IUnitOfWorkFactory unitOfWorkFactory)
        {
            return new DashboardService(unitOfWorkFactory);
        }
    }
}
