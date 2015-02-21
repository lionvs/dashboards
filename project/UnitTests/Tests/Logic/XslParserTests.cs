using System;
using System.Web;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using NUnit.Framework;
using Assert = NUnit.Framework.Assert;

namespace UnitTests.Tests.Logic
{
    [TestFixture]
    public class XslParserTests : BaseTests
    {
        private const string messageOnFailure = @"Make sure you have right testable xslx file and right path to it: executeFolder\Storage\...";
        const string filePathFullData = @"TemperatureFullData";
        const string filePathDataWithNulls = @"TemperatureDataWithNulls";

        [Test]
        public void Parse_FullData()
        {
            var expected = new object[,]
            {
                {"Month", "City", "Temperature", "Rainfall"},
                {"Jan", "Lviv", -4, 200},
                {"Feb", "Lviv", -3, 250}
            };

            expected = TestHelper.CreateArrayWithStartingIndex1(expected);
            var xlsParser = Factory.CreateXlsParser();
            var result = xlsParser.Parse(filePathFullData);

            Assert.AreEqual(expected, result, messageOnFailure);
        }

        [Test]
        public void Parse_DataWithNulls()
        {
            var expected = new object[,]
            {
                {"Month", "City", "Temperature", "Rainfall"},
                {"Jan", null, -4, 200},
                {"Feb", "Lviv", -3, null}
            };

            expected = TestHelper.CreateArrayWithStartingIndex1(expected);
            var xlsParser = Factory.CreateXlsParser();
            var result = xlsParser.Parse(filePathDataWithNulls);

            Assert.AreEqual(expected, result, messageOnFailure);
        }
    }
}
