using System.Collections.Generic;
using DataVis.Logic;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using Newtonsoft.Json.Linq;
using NUnit.Framework;
using Assert = NUnit.Framework.Assert;

namespace UnitTests.Tests.Logic
{
    [TestFixture]
    public class DataParserTests : BaseTests
    {
        [Test]
        public void GetValue_Integer()
        {
            IDataParser dataParser = Factory.CreateDataParser();
            var privateObject = new PrivateObject(dataParser);
            var result = privateObject.Invoke("GetValue", new object[] { '0' });

            Assert.AreEqual(0, result);
        }

        [Test]
        public void GetValue_Double()
        {
            IDataParser dataParser = Factory.CreateDataParser();
            var privateObject = new PrivateObject(dataParser);
            var result = privateObject.Invoke("GetValue", new object[] { "1.1" });

            Assert.AreEqual("1.1", result);
        }

        [Test]
        public void GetValue_String()
        {
            IDataParser dataParser = Factory.CreateDataParser();
            var privateObject = new PrivateObject(dataParser);
            var result = privateObject.Invoke("GetValue", new object[] { "Lviv" });

            Assert.AreEqual("Lviv", result);
        }

        [Test]
        public void GetJson_FullData()
        {
            var inputData = new List<List<object>>();
            inputData.Add(new List<object>(new object[] { "City", "Month", "Temperature", "Rainfall" }));
            inputData.Add(new List<object>(new object[] { "Lviv", "Feb", "20", "200" }));

            IList<JObject> expected = new List<JObject>()
            {
                JObject.Parse(@"{
                    'City': 'Lviv',
                    'Month': 'Feb',
                    'Temperature': 20,
                    'Rainfall': 200,
                }")
            };

            IDataParser dataParser = Factory.CreateDataParser();
           // object[,] comInteropArray = TestHelper.CreateArrayWithStartingIndex1(inputData);
            var result = dataParser.GetJson(inputData);

            AssertListsJobjects(expected, result);
        }

        [Test]
        public void GetJson_DataWithNulls()
        {
            var inputData = new List<List<object>>();
            inputData.Add(new List<object>(new object[] { "City", "Month", "Temperature", "Rainfall" }));
            inputData.Add(new List<object>(new object[] { null, "Feb", "20", null }));
            inputData.Add(new List<object>(new object[] { "Lviv", "Jun", null, "200" }));
            
            IList<JObject> expected = new List<JObject>()
            {
                JObject.Parse(@"{
                    'City': null,
                    'Month': 'Feb',
                    'Temperature': 20,
                    'Rainfall': null,
                }"),
                JObject.Parse(@"{
                    'City': 'Lviv',
                    'Month': 'Jun',
                    'Temperature': null,
                    'Rainfall': 200,
                }")
            };

            IDataParser dataParser = Factory.CreateDataParser();
            var result = dataParser.GetJson(inputData);

            AssertListsJobjects(expected, result);
        }

        private void AssertListsJobjects(IList<JObject> expected, IList<JObject> result,
            string message = "Lists of jobjects are different")
        {
            Assert.AreEqual(expected.Count, result.Count, message);
            for (int i = 0; i < result.Count; i++)
            {
                Assert.AreEqual(JToken.DeepEquals(expected[i], result[i]), true, message);
            }
        }
    }
}