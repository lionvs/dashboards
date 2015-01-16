using DataVis.BusinessLogic.Repositories;
using DataVis.BusinessLogic.Services;
using DataVis.Logic;
using Ninject;

namespace DataVis.App_Start
{
    public static class NinjectTypeRegistrator
    {
        public static void RegisterServices(IKernel kernel)
        {
            kernel.Bind<IXlsParser>().To<XlsParser>();
            kernel.Bind<IDataParser>().To<DataParser>();

            kernel.Bind<IUnitOfWorkFactory>().To<UnitOfWorkFactory>();
            kernel.Bind<IUserService>().To<UserService>();
        }
    }
}
