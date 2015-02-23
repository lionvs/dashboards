using System;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using FakeItEasy;
using NUnit;
using DataVis.Logic;
using DataVis.Controllers.API;
using Newtonsoft.Json.Linq;
using System.Collections.Generic;
using System.Web.Http;
using System.Web;

namespace UnitTests.Tests.Controllers
{
    [TestClass]
    public class FileControllerTest
    {
        //[TestMethod]
        //public void Post_CorrectResult()  //doesn't work
        //{
        //    var fakeXlsParser = A.Fake<IXlsParser>();
        //    var fakeDataParser = A.Fake<IDataParser>();
        //    List<JObject> expectedResult = new List<JObject>();
        //    object[,] fakeArray = { { new Object(), new Object() } };
        //    A.CallTo(() => fakeDataParser.GetJson(fakeArray)).Returns(expectedResult);
        //    var testFileController = new FileController(fakeXlsParser, fakeDataParser);
        //    var result = testFileController.Post();
        //    Assert.IsNotNull(result);
        //    CollectionAssert.AreEqual(expectedResult, result);
        //}
    }
}
