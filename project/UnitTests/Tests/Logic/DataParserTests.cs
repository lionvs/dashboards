using System;
using System.Collections.Generic;
using DataVis.Logic;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using Newtonsoft.Json.Linq;
using NUnit.Framework;
using Assert = NUnit.Framework.Assert;
using CollectionAssert = NUnit.Framework.CollectionAssert;

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
            var result = privateObject.Invoke("GetValue", new object[] {'0'});

            Assert.AreEqual(0, result);
        }

        [Test]
        public void GetValue_Double()
        {
            IDataParser dataParser = Factory.CreateDataParser();
            var privateObject = new PrivateObject(dataParser);
            var result = privateObject.Invoke("GetValue", new object[] {"1.1"});

            Assert.AreEqual(1.1, result);
        }

        [Test]
        public void GetValue_String()
        {
            IDataParser dataParser = Factory.CreateDataParser();
            var privateObject = new PrivateObject(dataParser);
            var result = privateObject.Invoke("GetValue", new object[] {"Lviv"});

            Assert.AreEqual("Lviv", result);
        }

        [Test]
        public void GetJson_FullData()
        {
            IDataParser dataParser = Factory.CreateDataParser();


            var data = new object[,]
            {
                {"City", "Month", "Temperature", "Rainfall"},
                {"Lviv", "Feb", "20", "200"}
            };
            object[,] comInteropArray = Array.CreateInstance(
                typeof (object),
                new[] {data.GetLength(0), data.GetLength(1)},
                new[] {1, 1}) as object[,];
            for (int i = 0; i < data.GetLength(0); i++)
                for (int j = 0; j < data.GetLength(1); j++)
                    comInteropArray[i + 1, j + 1] = data[i, j];

            IList<JObject> expected = new List<JObject>()
            {
                JObject.Parse(@"{
                    'City': 'Lviv',
                    'Month': 'Feb',
                    'Temperature': 20,
                    'Rainfall': 200,
                }")
            };

            var result = dataParser.GetJson(comInteropArray);


            Assert.AreEqual(expected.Count, result.Count);
            for (int i = 0; i < result.Count; i++)
            {
                Assert.AreEqual(JToken.DeepEquals(expected[i], result[i]), true);
            }
        }

        [Test]
        public void GetJson_DataWithNulls()
        {
            IDataParser dataParser = Factory.CreateDataParser();


            var data = new object[,]
            {
                {"City", "Month", "Temperature", "Rainfall"},
                {null, "Feb", "20", null},
                {"Lviv","Jun",null,"200"}
            };
            object[,] comInteropArray = Array.CreateInstance(
                typeof(object),
                new[] { data.GetLength(0), data.GetLength(1) },
                new[] { 1, 1 }) as object[,];
            for (int i = 0; i < data.GetLength(0); i++)
                for (int j = 0; j < data.GetLength(1); j++)
                    comInteropArray[i + 1, j + 1] = data[i, j];

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

            var result = dataParser.GetJson(comInteropArray);


            Assert.AreEqual(expected.Count, result.Count);
            for (int i = 0; i < result.Count; i++)
            {
                Assert.AreEqual(JToken.DeepEquals(expected[i], result[i]), true);
            }
        }
    }
}
