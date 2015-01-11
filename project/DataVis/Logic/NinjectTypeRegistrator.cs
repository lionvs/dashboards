using Ninject;

namespace DataVis.Logic
{
    public static class NinjectTypeRegistrator
    {
        public static void RegisterServices(IKernel kernel)
        {
            kernel.Bind<IXlsParser>().To<XlsParser>();
            kernel.Bind<IDataParser>().To<DataParser>();
        }
    }
}
