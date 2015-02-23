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
    }
}
