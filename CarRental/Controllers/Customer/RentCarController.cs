using Microsoft.AspNetCore.Mvc;
using CarRental.Models.Entites;
using Microsoft.AspNetCore.Authorization;
using System.Linq;
using CarRental.Hubs;
using CarRental.Views.CarList.Data;
using Microsoft.AspNetCore.SignalR;
using Microsoft.EntityFrameworkCore;

namespace CarRental.Controllers.Customer
{
    
    public class RentCarController : Controller
    {
        private readonly AppDbContext _context;
        private readonly IHubContext<NotificationHub> _hubContext;

        public RentCarController(AppDbContext context, IHubContext<NotificationHub> hubContext)
        {
            _context = context;
            _hubContext = hubContext;
        }

        [HttpPost("Request")]
        public async Task<IActionResult> RequestRental(int carId, DateTime rentalDate, DateTime returnDate)
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
            await _context.SaveChangesAsync();
            await _hubContext.Clients.All.SendAsync("ReceiveNotification", "New rental request received!");
            return RedirectToAction("Index");
        }

   
        [HttpGet]
        /*public IActionResult Index()
        {
            var userId = GetCurrentUserId();
            if (userId == null) return Unauthorized();

            var rentals = _context.Rentals.Where(r => r.RenterId == userId.Value).ToList();
            return View(rentals);
        }*/

        public IActionResult Index()
        {

            return View();
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
