namespace DataVis.BusinessLogic.Repositories
{
    public class UnitOfWorkFactory : IUnitOfWorkFactory
    {
        public IUnitOfWork CreateUnitOfWork()
        {
            return new UnitOfWork();
        }
    }
}