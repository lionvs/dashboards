using DataVis.BusinessLogic.Repositories;
using DataVis.Data.Models;
using FakeItEasy;
using NUnit.Framework;

namespace UnitTests.Tests.Services
{
    [TestFixture]
    public class DashboardServiceTest : BaseTests
    {
        readonly IUnitOfWorkFactory _fakeUnitOfWorkFaktory = A.Fake<IUnitOfWorkFactory>();
        readonly IUnitOfWork _fakeUnitOfWork = A.Fake<IUnitOfWork>();

        [Test]
        public void Add_CorrectDashboard()
        {
            A.CallTo(() => _fakeUnitOfWorkFaktory.CreateUnitOfWork()).Returns(_fakeUnitOfWork);
            var testDashboardService = Factory.CreateDashboardService(_fakeUnitOfWorkFaktory);
            var testDashboardToAdd = new Dashboard();
            A.CallTo(() => _fakeUnitOfWork.DashboardRepository.Insert(testDashboardToAdd)).Returns(testDashboardToAdd);
            var result = testDashboardService.Add(testDashboardToAdd);
            A.CallTo(() => _fakeUnitOfWork.DashboardRepository.Insert(testDashboardToAdd)).MustHaveHappened();
            A.CallTo(() => _fakeUnitOfWork.Save()).MustHaveHappened();
            Assert.AreEqual(testDashboardToAdd, result);
        }

        [Test]
        public void Add_Null()
        {
            A.CallTo(() => _fakeUnitOfWorkFaktory.CreateUnitOfWork()).Returns(_fakeUnitOfWork);
            var testDashboardService = Factory.CreateDashboardService(_fakeUnitOfWorkFaktory);
            Dashboard testDashboardToAdd = null;
            A.CallTo(() => _fakeUnitOfWork.DashboardRepository.Insert(testDashboardToAdd)).Returns(testDashboardToAdd);
            var result = testDashboardService.Add(testDashboardToAdd);
            A.CallTo(() => _fakeUnitOfWork.DashboardRepository.Insert(testDashboardToAdd)).MustNotHaveHappened();
            A.CallTo(() => _fakeUnitOfWork.Save()).MustNotHaveHappened();
            Assert.IsNull(result);
        }

        [Test]
        public void Delete_CallsInternalMethods()
        {
            A.CallTo(() => _fakeUnitOfWorkFaktory.CreateUnitOfWork()).Returns(_fakeUnitOfWork);
            var testDashboardService = Factory.CreateDashboardService(_fakeUnitOfWorkFaktory);
            var testDeleteId = "123";
            testDashboardService.Delete(testDeleteId);
            A.CallTo(() => _fakeUnitOfWork.DashboardRepository.Delete(testDeleteId)).MustHaveHappened();
            A.CallTo(() => _fakeUnitOfWork.Save()).MustHaveHappened();
        }

        [Test]
        public void Update_CallsInternalMethods()
        {
            A.CallTo(() => _fakeUnitOfWorkFaktory.CreateUnitOfWork()).Returns(_fakeUnitOfWork);
            var testDashboardService = Factory.CreateDashboardService(_fakeUnitOfWorkFaktory);
            var testDashboardToUpdate = new Dashboard();
            testDashboardService.Update(testDashboardToUpdate);
            A.CallTo(() => _fakeUnitOfWork.DashboardRepository.Update(testDashboardToUpdate)).MustHaveHappened();
            A.CallTo(() => _fakeUnitOfWork.Save()).MustHaveHappened();
        }

        [Test]
        public void GetById_CorrectDashboard()
        {
            A.CallTo(() => _fakeUnitOfWorkFaktory.CreateUnitOfWork()).Returns(_fakeUnitOfWork);
            var testDashboardService = Factory.CreateDashboardService(_fakeUnitOfWorkFaktory);
            var testIdToGet = "212";
            var testDashboardToGet = new Dashboard();
            A.CallTo(() => _fakeUnitOfWork.DashboardRepository.GetById(testIdToGet)).Returns(testDashboardToGet);
            var result = testDashboardService.GetById(testIdToGet);
            A.CallTo(() => _fakeUnitOfWork.DashboardRepository.GetById(testIdToGet)).MustHaveHappened();
            Assert.AreEqual(testDashboardToGet, result);
        }

        //[Test]
        //public void GetByUserId_CorrectListOfDashboards()
        //{
        //    A.CallTo(() => _fakeUnitOfWorkFaktory.CreateUnitOfWork()).Returns(_fakeUnitOfWork);
        //    var testDashboardService = Factory.CreateDashboardService(_fakeUnitOfWorkFaktory);
        //    string testUserIdToGet = "Nazar";
        //    var testDashboardToGet = new Dashboard();
        //    var testListOfDashboardToGet = new List<Dashboard> { testDashboardToGet };
        //    var a = new Expression<Func<Dashboard, object>>[0];
        //    A.CallTo(() => _fakeUnitOfWork.DashboardRepository.Get(x => x.UserId.Equals(testUserIdToGet), null, a)).Returns(testListOfDashboardToGet);
        //    var result = testDashboardService.GetByUserId(testUserIdToGet);
        //    A.CallTo(() => _fakeUnitOfWork.DashboardRepository.Get(x => x.UserId.Equals(testUserIdToGet), null, a)).MustHaveHappened();
        //    Assert.AreEqual(testListOfDashboardToGet, result);
        //    CollectionAssert.AreEqual(testListOfDashboardToGet, result);
        //}
    }
}
