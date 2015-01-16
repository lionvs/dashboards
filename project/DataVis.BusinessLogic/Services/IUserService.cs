using System.Collections.Generic;
using DataVis.Data.Models;

namespace DataVis.BusinessLogic.Services
{
    public interface IUserService
    {
        User AddUser(User user);
        void DeleteUser(long id);
        void UpdateUser(User user);
        User GetById(long id);
        User GetByName(string name);
        User GetByEmail(string email);
        User GetByLogin(string login);
        List<User> GetAll();
    }
}