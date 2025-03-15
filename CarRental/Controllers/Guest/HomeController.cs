using System.Diagnostics;
using CarRental.Models.Entites;
using CarRental.Models.ViewModels;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using System.Threading.Tasks;
using System.Collections.Generic;
using CarRental.Views.CarList.Data;

namespace CarRental.Controllers.Guest
{
    public class HomeController : Controller
    {
        private readonly ILogger<HomeController> _logger;
        private readonly AppDbContext _context; // Add database context

        public HomeController(ILogger<HomeController> logger, AppDbContext context)
        {
            _logger = logger;
            _context = context;
        }

        public async Task<IActionResult> Index()
        {
            var cars = await _context.Cars
                .OrderBy(c => c.CarId)
                .ToListAsync();


            return View( cars);
        }

     

        public IActionResult Privacy()
        {
            return View();
        }

        [HttpPost]
        public async Task<IActionResult> SendMessage(string name, string email, string phone, string message)
        {
            Console.WriteLine("🔍 Form submitted...");

            if (string.IsNullOrWhiteSpace(name) || string.IsNullOrWhiteSpace(email) || string.IsNullOrWhiteSpace(message))
            {
                Console.WriteLine("❌ Missing required fields!");
                TempData["ErrorMessage"] = "Please fill out all required fields.";
                return RedirectToAction("Index");
            }

            var contactMessage = new ContactMessage
            {
                Name = name,
                Email = email,
                Phone = phone,
                Message = message
            };

            _context.ContactMessages.Add(contactMessage);
            await _context.SaveChangesAsync();

           
            TempData["SuccessMessage"] = "Your message has been saved!";

            return RedirectToAction("Index");
        }

        [ResponseCache(Duration = 0, Location = ResponseCacheLocation.None, NoStore = true)]
        public IActionResult Error()
        {
            return View(new ErrorViewModel { RequestId = Activity.Current?.Id ?? HttpContext.TraceIdentifier });
        }
    }
}
