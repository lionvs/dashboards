using System;
using System.Collections.Generic;
using NUnit.Framework;

namespace UnitTests.Tests.Logic
{
    [TestFixture]
    public class XslParserTests : BaseTests
    {
        private const string messageOnFailure = @"Make sure you have right testable xslx file and right path to it: executeFolder\Storage\...";
        const string filePathFullData = @"TemperatureFullData";
        const string filePathDataWithNulls = @"TemperatureDataWithNulls";

        [Test]
        [Ignore]
        public void Parse_FullData()
        {
            var expected = new List<List<object>>();
            expected.Add(new List<object>(new object[]{ "Month", "City", "Temperature", "Rainfall"}));
            expected.Add(new List<object>(new object[] { "Jan", "Lviv", "-4", "200" }));
            expected.Add(new List<object>(new object[] { "Feb", "Lviv", "-3", "250" }));

            var xlsParser = Factory.CreateXlsParser();
            var result = xlsParser.Parse(filePathFullData);

            Assert.AreEqual(expected, result, messageOnFailure);
        }

        [Test]
        [Ignore]
        public void Parse_DataWithNulls()
        {
            var expected = new List<List<object>>();
            expected.Add(new List<object>(new object[] { "Month", "City", "Temperature", "Rainfall" }));
            expected.Add(new List<object>(new object[] { "Jan", DBNull.Value, "-4", "200" }));
            expected.Add(new List<object>(new object[] { "Feb", "Lviv", "-3", DBNull.Value }));

            var xlsParser = Factory.CreateXlsParser();
            var result = xlsParser.Parse(filePathDataWithNulls);

            Assert.AreEqual(expected, result, messageOnFailure);
        }
    }
}
