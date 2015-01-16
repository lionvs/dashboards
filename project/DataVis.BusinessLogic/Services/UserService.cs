using System.Collections.Generic;
using System.Linq;
using DataVis.BusinessLogic.Repositories;
using DataVis.Data.Models;

namespace DataVis.BusinessLogic.Services
{
    public class UserService : IUserService
    {
        public readonly IUnitOfWorkFactory _factory;

        public UserService(IUnitOfWorkFactory factory)
        {
            _factory = factory;
        }

        public User AddUser(User user)
        {
            using (var unitOfWork = _factory.CreateUnitOfWork())
            {
                if (user != null)
                {
                    var addedUser = unitOfWork.UserRepository.Insert(user);
                    unitOfWork.Save();
                    return addedUser;
                }
                return null;
            }
        }

        public void DeleteUser(long id)
        {
            using (var unitOfWork = _factory.CreateUnitOfWork())
            {
                unitOfWork.UserRepository.Delete(id);
                unitOfWork.Save();
            }
        }

        public void UpdateUser(User user)
        {
            using (var unitOfWork = _factory.CreateUnitOfWork())
            {
                unitOfWork.UserRepository.Update(user);
                unitOfWork.Save();
            }
        }

        public User GetById(long id)
        {
            using (var unitOfWork = _factory.CreateUnitOfWork())
            {
                return unitOfWork.UserRepository.GetById(id);
            }
        }

        public User GetByName(string name)
        {
            using (var unitOfWork = _factory.CreateUnitOfWork())
            {
                return unitOfWork.UserRepository.Get(x => x.Username.Equals(name)).FirstOrDefault();
            }
        }

        public User GetByEmail(string email)
        {
            using (var unitOfWork = _factory.CreateUnitOfWork())
            {
                return unitOfWork.UserRepository.Get(x => x.Email.Equals(email.ToLower())).FirstOrDefault();
            }
        }

        public User GetByLogin(string login)
        {
            using (var unitOfWork = _factory.CreateUnitOfWork())
            {
                return unitOfWork.UserRepository.Get(x => x.Login.Equals(login)).FirstOrDefault();
            }
        }

        public List<User> GetAll()
        {
            using (var unitOfWork = _factory.CreateUnitOfWork())
            {
                return unitOfWork.UserRepository.Get().ToList();
            }
        }
    }
}
