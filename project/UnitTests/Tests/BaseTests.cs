using System;
using NUnit.Framework;

namespace UnitTests.Tests
{
    [TestFixture]
    public class BaseTests
    {
        private TFactory m_Factory = new TFactory();
        public TFactory Factory { get { return m_Factory; } }
    }
}
