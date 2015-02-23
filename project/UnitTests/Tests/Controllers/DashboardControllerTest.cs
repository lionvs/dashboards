using System.Collections.Generic;
using System.Web.Http.Results;
using DataVis.BusinessLogic.Services.Interfaces;
using DataVis.Controllers.API;
using DataVis.Data.Models;
using DataVis.Models;
using FakeItEasy;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using NUnit.Framework;
using Assert = NUnit.Framework.Assert;

//using Assert = Microsoft.VisualStudio.TestTools.UnitTesting.Assert;

namespace UnitTests.Tests.Controllers
{
    [TestClass]
    public class DashboardControllerTest
    {
        public IDashboardService fakeDashboardService = A.Fake<IDashboardService>();

        //[Test]
        //public void Get_EmptyList()
        //{
        //    var myController = new DashboardController(fakeDashboardService);
        //    var dashboards = new List<Dashboard>();
            
        //    var privateObject = new PrivateObject(dashbo);
        //    var result = privateObject.Invoke("GetValue", new object[] { "1.1" });
        //    A.CallTo(() => myController.).Returns("1");

        //    A.CallTo(() => fakeDashboardService.GetByUserId("1")).Returns(dashboards);
        //    var result = myController.Get();
        //    A.CallTo(() => fakeDashboardService.GetByUserId("1")).MustHaveHappened();
        //    Assert.AreEqual(dashboards, result);
        //}
        //[TestMethod]
        //public void Get_FullList()
        //{
        //    var dashboards = new List<Dashboard>();

        //}

        [Test]
        public void GetById_Null()
        {
            var myController = new DashboardController(fakeDashboardService);
            var dashboard = new Dashboard();
            string id = null;

            A.CallTo(() => fakeDashboardService.GetById(id)).Returns(dashboard);
            var result = myController.Get(id);
            A.CallTo(() => fakeDashboardService.GetById(id)).MustHaveHappened();
            Assert.AreEqual(dashboard, result);
        }

        [Test]
        public void GetById_NotNull()
        {
            var myController = new DashboardController(fakeDashboardService);
            var dashboard = new Dashboard();
            var id = "1";

            A.CallTo(() => fakeDashboardService.GetById(id)).Returns(dashboard);
            var result = myController.Get(id);
            A.CallTo(() => fakeDashboardService.GetById(id)).MustHaveHappened();
            Assert.AreEqual(dashboard, result);
        }

        //[Test]
        //public void Put_NotNull()
        //{
        //    DashboardController myController = new DashboardController(fakeDashboardService);
        //    var dashboard = new Dashboard();
        //    var dashboardModel = new DashboardModel();
        //    string id = "1";

        //    A.CallTo(() => fakeDashboardService.GetById(id)).Returns(dashboard);
        //    var result = myController.Put(id, dashboardModel);
        //    A.CallTo(() => fakeDashboardService.GetById(id)).MustHaveHappened();
        //    var ss =new  OkResult(myController);
        //    Assert.AreEqual(ss, result);
        //}
    }
}
