using System.Collections.Generic;
using DataVis.BusinessLogic.Services;
using DataVis.Data.Models;
using FakeItEasy;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using NUnit.Framework;

namespace UnitTests.Tests.Controllers
{
    [TestClass]
    public class DashboardControllerTest
    {
        private readonly DashboardService fakeDashboardService = A.Fake<DashboardService>();

        [TestMethod]
        public void Get_EmptyList()
        {
            var dashboards = new List<Dashboard>();
        }
        [TestMethod]
        public void Get_FullList()
        {
            var dashboards = new List<Dashboard>();

        }

    }
}
