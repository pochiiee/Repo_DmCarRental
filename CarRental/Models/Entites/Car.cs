using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;


namespace CarRental.Models.Entites;

[Table("Cars")]  // Explicitly map the class to the Cars table
public class Car
{
    [Key]
    public int CarId { get; set; }

    [Required]
    public string Brand { get; set; }

    [Required]
    public string Model { get; set; }

    [Required]
    public int Seaters { get; set; }

    [Required]
    [Column(TypeName = "decimal(18,2)")]
    public decimal RentalPrice { get; set; }

    public string ImageUrl { get; set; }

    [Required]
    public string Status { get; set; } = "Available";
}
