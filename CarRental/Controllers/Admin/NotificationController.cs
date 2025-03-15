using Microsoft.AspNetCore.Mvc;

namespace CarRental.Controllers.Admin
{
    public class NotificationController : Controller
    {
        public IActionResult Index()
        {
            return View();
        }
    }
}
