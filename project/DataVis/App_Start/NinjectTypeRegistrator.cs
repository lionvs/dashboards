using DataVis.BusinessLogic.Services;
using DataVis.BusinessLogic.Services.Interfaces;
using DataVis.Logic;
using Ninject;

namespace DataVis
{
    public static class NinjectTypeRegistrator
    {
        public static void RegisterServices(IKernel kernel)
        {
            kernel.Bind<IXlsParser>().To<XlsParser>();
            kernel.Bind<IDataParser>().To<DataParser>();
            kernel.Bind<IDashboardService>().To<DashboardService>();
        }
    }
}
