using DataVis.BusinessLogic.Repositories;
using DataVis.BusinessLogic.Services;
using DataVis.BusinessLogic.Services.Interfaces;
using DataVis.Data.Models;
using FakeItEasy;
using Microsoft.VisualStudio.TestTools.UnitTesting;

namespace UnitTests.Tests.Services
{
    [TestClass]
    public class DashboardServiceTest
    {
        readonly UnitOfWorkFactory fakeUnitOfWorkFaktory = A.Fake<UnitOfWorkFactory>();
        readonly IUnitOfWork fakeUnitOfWork = A.Fake<IUnitOfWork>();
        
        [TestMethod]
        public void Add_CorrectDashboard()
        {
            A.CallTo(() => fakeUnitOfWorkFaktory.CreateUnitOfWork()).Returns(fakeUnitOfWork);
            IDashboardService testDashboardService = new DashboardService(fakeUnitOfWorkFaktory);
            Dashboard testDashboardToAdd = new Dashboard();
            A.CallTo(() => fakeUnitOfWork.DashboardRepository.Insert(testDashboardToAdd)).Returns(testDashboardToAdd);
            var result = testDashboardService.Add(testDashboardToAdd);
            A.CallTo(() => fakeUnitOfWork.DashboardRepository.Insert(testDashboardToAdd)).MustHaveHappened();
            A.CallTo(() => fakeUnitOfWork.Save()).MustHaveHappened();
            Assert.AreEqual(testDashboardToAdd, result);
        }

        [TestMethod]
        public void Add_ReturnNull()
        {
            A.CallTo(() => fakeUnitOfWorkFaktory.CreateUnitOfWork()).Returns(fakeUnitOfWork);
            IDashboardService testDashboardService = new DashboardService(fakeUnitOfWorkFaktory);
            Dashboard testDashboardToAdd = null;
            A.CallTo(() => fakeUnitOfWork.DashboardRepository.Insert(testDashboardToAdd)).Returns(testDashboardToAdd);
            var result = testDashboardService.Add(testDashboardToAdd);
            A.CallTo(() => fakeUnitOfWork.DashboardRepository.Insert(testDashboardToAdd)).MustNotHaveHappened();
            A.CallTo(() => fakeUnitOfWork.Save()).MustNotHaveHappened();
            Assert.IsNull(result);
        }

        [TestMethod]
        public void Delete_CallsInternalMethods()
        {
            A.CallTo(() => fakeUnitOfWorkFaktory.CreateUnitOfWork()).Returns(fakeUnitOfWork);
            IDashboardService testDashboardService = new DashboardService(fakeUnitOfWorkFaktory);
            string testDeleteId = "123";
            testDashboardService.Delete(testDeleteId);
            A.CallTo(() => fakeUnitOfWork.DashboardRepository.Delete(testDeleteId)).MustHaveHappened();
            A.CallTo(() => fakeUnitOfWork.Save()).MustHaveHappened();
        }

        [TestMethod]
        public void Update_CallsInternalMethods()
        {
            A.CallTo(() => fakeUnitOfWorkFaktory.CreateUnitOfWork()).Returns(fakeUnitOfWork);
            IDashboardService testDashboardService = new DashboardService(fakeUnitOfWorkFaktory);
            Dashboard testDashboardToUpdate = new Dashboard();
            testDashboardService.Update(testDashboardToUpdate);
            A.CallTo(() => fakeUnitOfWork.DashboardRepository.Update(testDashboardToUpdate)).MustHaveHappened();
            A.CallTo(() => fakeUnitOfWork.Save()).MustHaveHappened();
        }

        [TestMethod]
        public void GetById_CorrectDashboard()
        {
            A.CallTo(() => fakeUnitOfWorkFaktory.CreateUnitOfWork()).Returns(fakeUnitOfWork);
            IDashboardService testDashboardService = new DashboardService(fakeUnitOfWorkFaktory);
            string testIdToGet = "123";
            Dashboard testDashboardToGet = new Dashboard();
            A.CallTo(() => fakeUnitOfWork.DashboardRepository.GetById(testIdToGet)).Returns(testDashboardToGet);
            var result = testDashboardService.GetById(testIdToGet);
            A.CallTo(() => fakeUnitOfWork.DashboardRepository.GetById(testIdToGet)).MustHaveHappened();
            Assert.AreEqual(testDashboardToGet, result);
        }

        //[TestMethod]
        //public void GetByUserId_CorrectListOfDashboards()
        //{
        //    A.CallTo(() => fakeUnitOfWorkFaktory.CreateUnitOfWork()).Returns(fakeUnitOfWork);
        //    IDashboardService testDashboardService = new DashboardService(fakeUnitOfWorkFaktory);
        //    string testUserIdToGet = "Nazar";
        //    Dashboard testDashboardToGet = new Dashboard();
        //    List<Dashboard> testListOfDashboardToGet = new List<Dashboard>();
        //    testListOfDashboardToGet.Add(testDashboardToGet);
        //    A.CallTo(() => fakeUnitOfWork.DashboardRepository.Get(x => x.UserId.Equals(testUserIdToGet), null)).Returns(testListOfDashboardToGet);
        //    var result = testDashboardService.GetByUserId(testUserIdToGet);
        //    //A.CallTo(() => fakeUnitOfWork.DashboardRepository.Get(x => x.UserId.Equals(testUserIdToGet), null)).MustHaveHappened();
        //    //Assert.AreEqual(testListOfDashboardToGet, result);
        //    //CollectionAssert.AreEqual(testListOfDashboardToGet, result);
        //}
    }
}
