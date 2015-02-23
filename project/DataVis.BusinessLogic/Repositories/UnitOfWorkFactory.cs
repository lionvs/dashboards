namespace DataVis.BusinessLogic.Repositories
{
    public class UnitOfWorkFactory : IUnitOfWorkFactory
    {
        public virtual IUnitOfWork CreateUnitOfWork()
        {
            return new UnitOfWork();
        }
    }
}