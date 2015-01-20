using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;

namespace DataVis.BusinessLogic.Repositories
{
    public interface IGenericRepository<TEntity> where TEntity : class
    {
        IEnumerable<TEntity> Get(Expression<Func<TEntity, bool>> filter = null,
            Func<IQueryable<TEntity>, IOrderedQueryable<TEntity>> orderBy = null,
            params Expression<Func<TEntity, object>>[] includes
            );

        TEntity GetById(string id);
        TEntity Insert(TEntity item);
        void Update(TEntity item);
        void Delete(string id);
    }
}
