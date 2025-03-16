const connection = new signalR.HubConnectionBuilder()
    .withUrl("/notificationHub")
    .build();

connection.start()
    .then(() => console.log("SignalR Connected!"))
    .catch(err => console.error("SignalR Error: ", err));

connection.on("ReceiveNotification", (title, message) => {
    const li = document.createElement("li");
    li.innerHTML = `<strong>${title}</strong> - ${message}`;
    document.getElementById("notificationList").appendChild(li);
});
