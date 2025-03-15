using Microsoft.AspNetCore.Mvc;

namespace CarRental.Controllers.Customer
{
    public class ProfileController : Controller
    {
        public IActionResult Index()
        {
            return View();
        }
    }
}
