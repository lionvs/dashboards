namespace DataVis.Logic
{
    public interface IXlsParser
    {
        object[,] Parse(string filename);
    }
}