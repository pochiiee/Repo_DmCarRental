using CarRental.Models.Entites;
using CarRental.Views.CarList.Data;
using Microsoft.AspNetCore.Mvc;
using System.Linq;

namespace CarRental.Controllers.Admin
{
    public class CarListController : Controller
    {
        private readonly AppDbContext _context;

        public CarListController(AppDbContext context)
        {
            _context = context;
        }


        public IActionResult Index()
        {
            var cars = _context.Cars.ToList();
            return View(cars);
        }


        public IActionResult CarList()
        {
            var cars = _context.Cars.ToList();
            return View(cars);
        }

        public IActionResult AddCar()
        {
            return View();
        }

        [HttpPost]
        public IActionResult AddCar(Car car)
        {
            _context.Cars.Add(car);
            _context.SaveChanges();
            return RedirectToAction("CarList");
        }



        public IActionResult EditCar(int id)
        {
            var car = _context.Cars.Find(id);
            if (car == null) return NotFound();
            return View(car);
        }

        [HttpPost]
        public IActionResult EditCar(int id, Car updatedCar)
        {
            var car = _context.Cars.Find(id);
            if (car == null) return NotFound();

            // Update fields
            car.Brand = updatedCar.Brand;
            car.Model = updatedCar.Model;
            car.Seaters = updatedCar.Seaters;
            car.RentalPrice = updatedCar.RentalPrice;
            car.Status = updatedCar.Status;

            _context.Cars.Update(car);
            _context.SaveChanges();
            return RedirectToAction("CarList");
        }


        public IActionResult DeleteCar(int id)
        {
            var car = _context.Cars.Find(id);
            if (car == null) return NotFound();

            return View("DeleteCar", car);
        }

        [HttpPost]
        public IActionResult DeleteCarConfirmed(int id)
        {
            var car = _context.Cars.Find(id);
            if (car == null) return NotFound();

            _context.Cars.Remove(car);
            _context.SaveChanges();

            return RedirectToAction("CarList");
        }



    }
}
