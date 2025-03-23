using Microsoft.EntityFrameworkCore;
using CarRental.Models;
using CarRental.Models.Entites;
using CarRental.Services.Password;

namespace CarRental.Views.CarList.Data
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options)
        {
        }

        public DbSet<UserAccount> UserAccounts { get; set; }
        public DbSet<Renters> Renters { get; set; }
        public DbSet<RentalRequest> RentalRequests { get; set; }
        public DbSet<Car> Cars { get; set; }
        public DbSet<Rentals> Rentals { get; set; }

        public DbSet<CustomerInquiry> CustomerInquiries { get; set; }

 

        public DbSet<Notification> Notifications { get; set; }



        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            modelBuilder.Entity<UserAccount>().HasData(
              new UserAccount
              {
                  UserId = 1,
                  FirstName = "Dm",
                  LastName = "Cars",
                  Username = "dmcars",
                  Email = "dmcarss23@email.com",
                  Password = PasswordHelper.HashPassword("dmcars23"),
                  Role = "Admin"
              }
          );

            modelBuilder.Entity<Car>().HasData(
                new Car { CarId = 1, Brand = "Toyota", Model = "Vios", Seaters = 5, ImageUrl = "vios.jpg", RentalPrice = 2000m, Status = "Available" },
                new Car { CarId = 2, Brand = "Honda", Model = "City", Seaters = 5, ImageUrl = "city.jpg", RentalPrice = 2200m, Status = "Available" },
                new Car { CarId = 3, Brand = "Mitsubishi", Model = "Mirage G4", Seaters = 5, ImageUrl = "mirage.jpg", RentalPrice = 2000m, Status = "Available" },
                new Car { CarId = 4, Brand = "Nissan", Model = "Almera", Seaters = 5, ImageUrl = "almera.jpg", RentalPrice = 2300m, Status = "Available" },
                new Car { CarId = 5, Brand = "Ford", Model = "EcoSport", Seaters = 5, ImageUrl = "ecosport.jpg", RentalPrice = 2800m, Status = "Available" },
                new Car { CarId = 6, Brand = "Suzuki", Model = "Dzire", Seaters = 5, ImageUrl = "dzire.jpg", RentalPrice = 2000m, Status = "Available" },
                new Car { CarId = 7, Brand = "Hyundai", Model = "Accent", Seaters = 5, ImageUrl = "accent.jpg", RentalPrice = 2500m, Status = "Available" },
                new Car { CarId = 8, Brand = "Kia", Model = "Soluto", Seaters = 5, ImageUrl = "soluto.jpg", RentalPrice = 2300m, Status = "Available" },
                new Car { CarId = 9, Brand = "Chevrolet", Model = "Spark", Seaters = 5, ImageUrl = "spark.jpg", RentalPrice = 2200m, Status = "Available" },
                new Car { CarId = 10, Brand = "Mazda", Model = "2 Sedan", Seaters = 5, ImageUrl = "sedan.jpg", RentalPrice = 2400m, Status = "Available" },
                new Car { CarId = 11, Brand = "Subaru", Model = "XV", Seaters = 5, ImageUrl = "xv.jpg", RentalPrice = 3200m, Status = "Available" },
                new Car { CarId = 12, Brand = "Toyota", Model = "Avanza", Seaters = 7, ImageUrl = "avanza.jpg", RentalPrice = 3500m, Status = "Available" },
                new Car { CarId = 13, Brand = "Mitsubishi", Model = "Xpander", Seaters = 7, ImageUrl = "xpander.jpg", RentalPrice = 3800m, Status = "Available" },
                new Car { CarId = 14, Brand = "Suzuki", Model = "Ertiga", Seaters = 7, ImageUrl = "ertiga.jpg", RentalPrice = 3200m, Status = "Available" },
                new Car { CarId = 15, Brand = "Nissan", Model = "Livina", Seaters = 7, ImageUrl = "livina.jpg", RentalPrice = 3500m, Status = "Available" },
                new Car { CarId = 16, Brand = "Toyota", Model = "Hiace", Seaters = 12, ImageUrl = "hiace.jpg", RentalPrice = 4500m, Status = "Available" },
                new Car { CarId = 17, Brand = "Nissan", Model = "Urvan", Seaters = 12, ImageUrl = "urvan.jpg", RentalPrice = 4400m, Status = "Available" },
                new Car { CarId = 18, Brand = "Hyundai", Model = "Starex", Seaters = 10, ImageUrl = "starex.jpg", RentalPrice = 4600m, Status = "Available" },
                new Car { CarId = 19, Brand = "Ford", Model = "Transit", Seaters = 15, ImageUrl = "transit.jpg", RentalPrice = 4800m, Status = "Available" },
                new Car { CarId = 20, Brand = "Mercedes-Benz", Model = "Sprinter", Seaters = 14, ImageUrl = "sprinter.jpg", RentalPrice = 5000m, Status = "Available" }
            );
        }

    }
}
