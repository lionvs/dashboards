using System;
using DataVis.Data.Models;

namespace DataVis.BusinessLogic.Repositories
{
    public interface IUnitOfWork : IDisposable
    {
        IGenericRepository<Dashboard> DashboardRepository { get; }
        IGenericRepository<DataSource> DataSourceRepository { get; }
        void Save();
    }
}