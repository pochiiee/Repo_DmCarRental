using Microsoft.AspNetCore.Mvc;

namespace CarRental.Controllers.Admin
{
    public class InquiriesController : Controller
    {
        public IActionResult Index()
        {
            return View();
        }
    }
}
