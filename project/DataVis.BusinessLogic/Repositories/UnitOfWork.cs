using System;
using DataVis.Data;
using DataVis.Data.Models;

namespace DataVis.BusinessLogic.Repositories
{
    public class UnitOfWork : IUnitOfWork
    {
        private readonly DashboardContext _context = new DashboardContext();

        private IGenericRepository<Dashboard> _dashboardRepository;

        public IGenericRepository<Dashboard> DashboardRepository
        {
            get { return _dashboardRepository ?? (_dashboardRepository = new GenericRepository<Dashboard>(_context)); }
        }

        public void Save()
        {
            _context.SaveChanges();
        }

        public void Dispose()
        {
            Dispose(true);
            GC.SuppressFinalize(this);
        }

        private bool _disposed;

        protected virtual void Dispose(bool disposing)
        {
            if (!_disposed)
                if (disposing)
                    _context.Dispose();
            _disposed = true;
        }
    }
}
