namespace DataVis.Logic
{
    public interface IXlsParser
    {
        object[,] GetDataFromFile(string id);
    }
}