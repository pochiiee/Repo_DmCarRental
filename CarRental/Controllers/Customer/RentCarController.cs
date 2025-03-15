using Microsoft.AspNetCore.Mvc;
using CarRental.Models.Entites;
using Microsoft.AspNetCore.Authorization;
using System.Linq;
using CarRental.Views.CarList.Data;

namespace CarRental.Controllers.Customer
{
    
    public class RentCarController : Controller
    {
        private readonly AppDbContext _context;

        public RentCarController(AppDbContext context)
        {
            _context = context;
        }

        [HttpPost("Request")]
        public IActionResult RequestRental(int carId, DateTime rentalDate, DateTime returnDate)
        {
            var userId = GetCurrentUserId();
            if (userId == null) return Unauthorized();

            var request = new RentalRequest
            {
                CarId = carId,
                RenterId = userId.Value,
                RentalDate = rentalDate,
                ReturnDate = returnDate,
                Status = "Pending"
            };

            _context.RentalRequests.Add(request);
            _context.SaveChanges();
            TempData["SuccessMessage"] = "Rental request sent!";
            return RedirectToAction("Index");
        }

   
        [HttpGet]
        public IActionResult Index()
        {
            var userId = GetCurrentUserId();
            if (userId == null) return Unauthorized();

            var rentals = _context.Rentals.Where(r => r.RenterId == userId.Value).ToList();
            return View(rentals);
        }

     
        [HttpPost("Cancel/{id}")]
        public IActionResult CancelRequest(int id)
        {
            var userId = GetCurrentUserId();
            if (userId == null) return Unauthorized();

            var request = _context.RentalRequests.Find(id);
            if (request == null || request.RenterId != userId.Value) return NotFound();

            if (request.Status == "Pending")
            {
                _context.RentalRequests.Remove(request);
                _context.SaveChanges();
                TempData["SuccessMessage"] = "Rental request canceled!";
            }
            else
            {
                TempData["ErrorMessage"] = "Cannot cancel processed request!";
            }

            return RedirectToAction("Index");
        }

        private int? GetCurrentUserId()
        {
            return int.TryParse(User.Identity.Name, out var userId) ? userId : null;
        }
    }
}
