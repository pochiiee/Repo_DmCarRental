using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.SignalR;
using System.Threading.Tasks;
using CarRental.Hubs;

namespace CarRental.Controllers.Admin
{
  
    public class NotificationController : Controller
    {
        private readonly IHubContext<NotificationHub> _hubContext;

        public NotificationController(IHubContext<NotificationHub> hubContext)
        {
            _hubContext = hubContext;
        }

        public IActionResult Index()
        {
            return View();
        }


        [HttpPost("api/admin/notification/send-message")]
        public async Task<IActionResult> SendRentalRequestNotification()
        {
            await _hubContext.Clients.All.SendAsync("ReceiveNotification", "New rental request received!");
            return Ok(new { message = "Notification sent successfully!" });
        }


        [HttpPost("api/admin/notification/send-message2")]
        public async Task<IActionResult> SendMessageNotification()
        {
            await _hubContext.Clients.All.SendAsync("ReceiveNotification", "New customer message received!");
            return Ok(new { message = "Message notification sent!" });
        }
    }
}
