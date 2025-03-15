using Microsoft.AspNetCore.Mvc;

namespace CarRental.Controllers.Customer
{
    public class CustomerHomeController : Controller
    {
        public IActionResult Index()
        {
            return View();
        }
    }
}
