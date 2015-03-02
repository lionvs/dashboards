using System;
using System.Linq;
using System.Web;
using System.Web.Http;
using DataVis.BusinessLogic.Services.Interfaces;
using DataVis.Data.Models;
using DataVis.Models;
using Microsoft.AspNet.Identity;
using Newtonsoft.Json.Linq;

namespace DataVis.Controllers.API
{
    [Authorize]
    public class DashboardController : ApiController
    {
        private readonly IDashboardService _dashboardService;

        public DashboardController(IDashboardService dashboardService)
        {
            _dashboardService = dashboardService;
        }

        public IHttpActionResult Get()
        {
            var dashboards = _dashboardService.GetByUserId(GetCurrentUserId());
            var result = dashboards.Select(dashboard => new JObject
            {
                {"Title", dashboard.Title}, {"Description", dashboard.Description}, {"Id", dashboard.Id}
            }).ToList();
            return Ok(result);
        }

        public IHttpActionResult Get(string id)
        {
            return Ok(_dashboardService.GetById(id));
        }

        public IHttpActionResult Post(DashboardModel dashboardModel)
        {
            if (ModelState.IsValid)
            {
                var dashboard = new Dashboard
                {
                    Title = dashboardModel.Title,
                    Config = dashboardModel.Config,
                    Id = Guid.NewGuid().ToString("n"),
                    UserId = GetIdByUsername(dashboardModel.UserName) ?? GetCurrentUserId(),
                    Description = dashboardModel.Description,
                    DataSource = dashboardModel.DataSource
                };
                _dashboardService.Add(dashboard);
                return Ok();
            }
            return BadRequest();
        }

        public IHttpActionResult Delete(string id)
        {
            if (GetCurrentUserId() != _dashboardService.GetById(id).UserId)
                return BadRequest();
            _dashboardService.Delete(id);
            return Ok();
        }

        public IHttpActionResult Put(string id, DashboardModel dashboard)
        {
            if (ModelState.IsValid)
            {
                var currDashboard = _dashboardService.GetById(id);
                currDashboard.Config = dashboard.Config;
                currDashboard.DataSource = dashboard.DataSource;
                currDashboard.Title = dashboard.Title;
                currDashboard.Description = dashboard.Description;
                _dashboardService.Update(currDashboard);
                return Ok();
            }
            return BadRequest();
        }

        private string GetCurrentUserId()
        {
            return HttpContext.Current.User.Identity.GetUserId();
        }

        private string GetIdByUsername(string username)
        {
            var rand = new Random();
            return "username" + rand.Next(4000000);
        }
    }
}
