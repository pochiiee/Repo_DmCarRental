const connection = new signalR.HubConnectionBuilder()
    .withUrl("/notificationHub")
    .build();

connection.on("ReceiveNotification", (message) => {
    alert("🔔 Notification: " + message);
});

connection.start()
    .then(() => console.log("SignalR Connected!"))
    .catch(err => console.error("SignalR Error: ", err));
