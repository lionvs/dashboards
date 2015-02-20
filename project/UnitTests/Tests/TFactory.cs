using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using DataVis.Logic;

namespace UnitTests.Tests
{
    public class TFactory
    {
        public IDataParser CreateDataParser()
        {
            return new DataParser();
        }
    }
}
