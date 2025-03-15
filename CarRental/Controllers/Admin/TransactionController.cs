using Microsoft.AspNetCore.Mvc;
using System.Linq;
using CarRental.Models.Entites;
using CarRental.Views.CarList.Data;

namespace CarRental.Controllers.Admin
{
    [Route("Admin/Rentals")]
    public class TransactionController : Controller
    {
        private readonly AppDbContext _context;

        public TransactionController(AppDbContext context)
        {
            _context = context;
        }


        [HttpGet("Requests")]
        public IActionResult RentalRequests()
        {
            var requests = _context.RentalRequests.Where(r => r.Status == "Pending").ToList();
            return View(requests);
        }

        [HttpPost("Approve/{id}")]
        public IActionResult ApproveRental(int id)
        {
            var request = _context.RentalRequests.Find(id);
            if (request == null) return NotFound();


            var rental = new Rentals
            {
                CarId = request.CarId,
                RenterId = request.RenterId,
                RentalDate = request.RentalDate,
                ReturnDate = request.ReturnDate,
                Status = "Ongoing"
            };

            _context.Rentals.Add(rental);
            _context.RentalRequests.Remove(request);
            _context.SaveChanges();

            TempData["SuccessMessage"] = "Rental request approved!";
            return RedirectToAction("RentalRequests");
        }

        [HttpPost("Reject/{id}")]
        public IActionResult RejectRental(int id)
        {
            var request = _context.RentalRequests.Find(id);
            if (request == null) return NotFound();

            _context.RentalRequests.Remove(request);
            _context.SaveChanges();

            TempData["ErrorMessage"] = "Rental request rejected!";
            return RedirectToAction("RentalRequests");
        }


        [HttpGet("Ongoing")]
        public IActionResult OngoingRentals()
        {
            var rentals = _context.Rentals.Where(r => r.Status == "Ongoing").ToList();
            return View(rentals);
        }


        [HttpGet("History")]
        public IActionResult RentalHistory()
        {
            var rentals = _context.Rentals.Where(r => r.Status == "Completed").ToList();
            return View(rentals);
        }

        [HttpPost("Cancel/{id}")]
        public IActionResult CancelRental(int id)
        {
            var rental = _context.Rentals.Find(id);
            if (rental == null) return NotFound();

            rental.Status = "Canceled";
            _context.SaveChanges();

            TempData["WarningMessage"] = "Rental has been canceled!";
            return RedirectToAction("OngoingRentals");
        }
    }
}
