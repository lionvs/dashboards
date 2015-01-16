namespace DataVis.BusinessLogic.Repositories
{
    public interface IUnitOfWorkFactory
    {
        IUnitOfWork CreateUnitOfWork(); 
    }
}