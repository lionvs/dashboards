using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Linq.Expressions;
using DataVis.Data;
using DataVis.Data.Models;

namespace DataVis.BusinessLogic.Repositories
{
    public class GenericRepository<TEntity> : IGenericRepository<TEntity> where TEntity : class
    {
        private readonly DashboardContext _context;
        private readonly DbSet<TEntity> _dbSet;

        public GenericRepository(DashboardContext context)
        {
            _context = context;
            _dbSet = context.Set<TEntity>();
        }

        public virtual IEnumerable<TEntity> Get(Expression<Func<TEntity, bool>> filter = null,
            Func<IQueryable<TEntity>, IOrderedQueryable<TEntity>> orderBy = null,
            params Expression<Func<TEntity, object>>[] includes
            )
        {
            IQueryable<TEntity> query = _dbSet;
            if (filter != null)
                query = query.Where(filter);

            if (includes != null)
                foreach (var include in includes)
                {
                    if (query != null) query = query.Include(include);
                }

            if (orderBy != null)
                return orderBy(query).ToList();
            return query != null ? query.ToList() : null;
        }

        public virtual TEntity GetById(string id)
        {
            return _dbSet.Find(id);
        }

        public virtual TEntity Insert(TEntity item)
        {
            return _dbSet.Add(item);
        }

        public virtual void Update(TEntity item)
        {
            _dbSet.Attach(item);
            _context.Entry(item).State = EntityState.Modified;
        }

        public virtual void Delete(string id)
        {
            TEntity entityToDelete = _dbSet.Find(id);
            _dbSet.Remove(entityToDelete);
        }

        public virtual void Delete(TEntity entityToDelete)
        {
            if (_context.Entry(entityToDelete).State == EntityState.Detached)
                _dbSet.Attach(entityToDelete);
            _dbSet.Remove(entityToDelete);
        }
    }
}
