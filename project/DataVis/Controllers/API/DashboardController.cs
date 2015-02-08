using System;
using System.Collections.Generic;
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

        public List<JObject> Get()
        {
            var result = new List<JObject>();
            var dashboards = _dashboardService.GetByUserId(HttpContext.Current.User.Identity.GetUserId());
            foreach (var dashboard in dashboards)
            {
                result.Add(new JObject
                {
                    {"Title", dashboard.Title},
                    {"Description", dashboard.Description},
                    {"Id", dashboard.Id}
                });
            }
            return result;
        }

        public Dashboard Get(string id)
        {
            return _dashboardService.GetById(id);
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
                    UserId = HttpContext.Current.User.Identity.GetUserId(),
                    Description = dashboardModel.Description,
                    DataSource = dashboardModel.DataSource
                };
                _dashboardService.Add(dashboard);
                return Ok();
            }
            else return BadRequest();
        }

        public IHttpActionResult Delete(string id)
        {
            try
            {
                _dashboardService.Delete(id);
                return Ok();
            }
            catch (Exception e)
            {
                return BadRequest();
            }
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
            else return BadRequest();
        }
    }
}
