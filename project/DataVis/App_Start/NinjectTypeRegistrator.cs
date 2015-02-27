using DataVis.BusinessLogic.Repositories;
using DataVis.BusinessLogic.Services;
using DataVis.BusinessLogic.Services.Interfaces;
using DataVis.Logic.FileParsers;
using DataVis.Logic;
using Ninject;

namespace DataVis
{
    public static class NinjectTypeRegistrator
    {
        public static void RegisterServices(IKernel kernel)
        {
            kernel.Bind<IFileParser>().To<XlsParser>();
            kernel.Bind<IDataParser>().To<DataParser>();
            kernel.Bind<IDashboardService>().To<DashboardService>();
            kernel.Bind<IUnitOfWorkFactory>().To<UnitOfWorkFactory>();
        }
    }
}
