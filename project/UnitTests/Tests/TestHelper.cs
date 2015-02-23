using System;

namespace UnitTests.Tests
{
    public static class TestHelper
    {
        public static object[,] CreateArrayWithStartingIndex1(object[,] data)
        {
            object[,] comInteropArray = Array.CreateInstance(
                typeof(object),
                new[] { data.GetLength(0), data.GetLength(1) },
                new[] { 1, 1 }) as object[,];

            for (int i = 0; i < data.GetLength(0); i++)
                for (int j = 0; j < data.GetLength(1); j++)
                    comInteropArray[i + 1, j + 1] = data[i, j];

            return comInteropArray;
        }
    }
}
