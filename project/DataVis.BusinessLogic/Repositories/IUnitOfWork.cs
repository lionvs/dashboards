using System;
using DataVis.Data.Models;

namespace DataVis.BusinessLogic.Repositories
{
    public interface IUnitOfWork : IDisposable
    {
        IGenericRepository<Dashboard> DashboardRepository { get; }
        void Save();
    }
}