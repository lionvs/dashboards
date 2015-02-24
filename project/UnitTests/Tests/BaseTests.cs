using NUnit.Framework;

namespace UnitTests.Tests
{
    [TestFixture]
    public class BaseTests
    {
        private TFactory _factory = new TFactory();
        public TFactory Factory { get { return _factory; } }
    }
}
