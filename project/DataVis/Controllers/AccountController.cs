using System;
using System.Web.Mvc;
using System.Web.Security;
using DataVis.App_Start;
using DataVis.BusinessLogic.Services;
using DataVis.Data.Models;
using DataVis.Models;

namespace DataVis.Controllers
{
    [AllowAnonymous]
    public class AccountController : Controller
    {
        private readonly IUserService _userService;

        public AccountController(IUserService userService)
        {
            _userService = userService;
        }

        [HttpPost]
        public ActionResult LogIn(UserLoginModel userLoginModel)
        {
            if (ModelState.IsValid)
            {
                string username = _userService.GetByLogin(userLoginModel.Login).Username;
                if (IsValid(userLoginModel.Login, userLoginModel.Password))
                {
                    FormsAuthentication.SetAuthCookie(username, false);
                    return RedirectToAction("Index", "Home");
                }
                else
                    ModelState.AddModelError("", "Login data is incorrect");
            }
            return RedirectToAction("Index", "Home");
        }

        [IsAuthorize]
        [HttpPost]
        public ActionResult LogOut()
        {
            FormsAuthentication.SignOut();
            return RedirectToAction("Index", "Home");
        }

        [HttpGet]
        public ActionResult Register()
        {
            FormsAuthentication.SignOut();
            return View();
        }

        [HttpPost]
        public ActionResult Register(UserRegisterModel userModel)
        {
            if (ModelState.IsValid)
            {
                var loginCheck = _userService.GetByLogin(userModel.Login);
                var emailCheck = _userService.GetByEmail(userModel.Email);
                var userNameCheck = _userService.GetByName(userModel.Username);

                if (loginCheck == null && emailCheck == null && userNameCheck == null)
                {
                    var crypto = new SimpleCrypto.PBKDF2();
                    var salt = crypto.GenerateSalt();
                    var hash = crypto.Compute(userModel.Password, salt);

                    var user = new User
                    {
                        DateRegistered = DateTime.Today,
                        Email = userModel.Email.ToLower(),
                        Username = userModel.Username,
                        Login = userModel.Login,
                        PasswordHash = hash,
                        PasswordSalt = salt,
                    };
                    _userService.AddUser(user);
                    RedirectToAction("Index", "Home");
                }
                else
                {
                    if (loginCheck != null)
                        ModelState.AddModelError("", "Login already exists.");
                    if (emailCheck != null)
                        ModelState.AddModelError("", "Email address has a profile already.");
                    if (userNameCheck != null)
                        ModelState.AddModelError("", "User name already exists.");
                }
            }
            else
                ModelState.AddModelError("", "Data is incorrect.");
            return RedirectToAction("Index", "Home");
        }

        private bool IsValid(string login, string password)
        {
            var isValid = false;
            var crypto = new SimpleCrypto.PBKDF2();
            var user = _userService.GetByLogin(login);
            if (user != null && user.PasswordHash == crypto.Compute(password, user.PasswordSalt))
                isValid = true;
            return isValid;
        }
    }
}