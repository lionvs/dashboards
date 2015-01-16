using System;
using DataVis.Data.Models;

namespace DataVis.BusinessLogic.Repositories
{
    public interface IUnitOfWork : IDisposable
    {
        IGenericRepository<User> UserRepository { get; }
        IGenericRepository<Dashboard> DashboardRepository { get; }
        IGenericRepository<DataSource> DataSourceRepository { get; }
        void Save();
    }
}