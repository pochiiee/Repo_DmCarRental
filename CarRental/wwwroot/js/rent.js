function openModal() {
    let modal = document.getElementById("rentModal");
    if (modal) {
        modal.style.display = "flex";
    }
}

function closeModal() {
    let modal = document.getElementById("rentModal");
    if (modal) {
        modal.style.display = "none";
    }
}

// Close modal when clicking outside
window.onclick = function (event) {
    let modal = document.getElementById("rentModal");
    if (event.target === modal) {
        modal.style.display = "none";
    }
};

// Close button functionality
document.addEventListener("DOMContentLoaded", function () {
    let closeBtn = document.querySelector(".modal .close");
    if (closeBtn) {
        closeBtn.addEventListener("click", closeModal);
    }
});


document.addEventListener("DOMContentLoaded", function () {
    var termsCheckbox = document.getElementById("termsCheckbox");
    var acceptButton = document.getElementById("acceptButton");
    var rentModal = document.getElementById("rentModal");
    var rentalDetailsModal = document.getElementById("rentalDetailsModal");
    var closeButtons = document.querySelectorAll(".close");

    // Toggle Accept Button based on checkbox state
    termsCheckbox.addEventListener("change", function () {
        acceptButton.disabled = !this.checked;
        acceptButton.classList.toggle("enabled", this.checked);
    });



    // Open Rennt Modal it has the booking
    function openModal() {
        rentModal.style.display = "flex";
    }

    // Open Rental Details Modal after Accept button is clicked
    acceptButton.addEventListener("click", function () {
        rentModal.style.display = "none"; // Close terms modal
        rentalDetailsModal.style.display = "flex"; // Open rental details modal
    });

    // Close Modal when 'X' is clicked
    closeButtons.forEach(button => {
        button.addEventListener("click", function () {
            this.closest(".modal").style.display = "none";
        });
    });

    // Close Modal when clicking outside
    window.addEventListener("click", function (event) {
        if (event.target === rentModal) {
            rentModal.style.display = "none";
        }
        if (event.target === rentalDetailsModal) {
            rentalDetailsModal.style.display = "none";
        }
    });

    // Enable confirm button only when fields are valid
    document.querySelectorAll("#pickupDateTime, #returnDateTime, #bookinglicenseNumber").forEach(input => {
        input.addEventListener("input", function () {
            let pickup = document.getElementById("pickupDateTime").value;
            let returnDate = document.getElementById("returnDateTime").value;
            let license = document.getElementById("bookinglicenseNumber").value;
            let pattern = /^[A-Z]{1}[0-9]{2}-[0-9]{2}-[0-9]{6}$/;

            document.getElementById("confirmRentalBtn") = !(pickup && returnDate && pattern.test(license));


        });
    });
});

// Function to open the Renter Details modal
function openRenterModal() {
    let modal = document.getElementById("renterDetailsModal");
    if (modal) {
        modal.style.display = "flex";
    }
}

// Function to close the Renter Details modal
function closeRenterModal() {
    let modal = document.getElementById("renterDetailsModal");
    if (modal) {
        modal.style.display = "none";
    }
}

// Close modal when clicking outside
window.onclick = function (event) {
    let modal = document.getElementById("renterDetailsModal");
    if (event.target === modal) {
        modal.style.display = "none";
    }
};



// Function to open the Confirmation modal
function openConfirmationModal() {
    let modal = document.getElementById("confirmationModal");
    if (modal) {
        modal.style.display = "flex";
    }
}

// Function to close the Confirmation modal
function closeConfirmationModal() {
    let modal = document.getElementById("confirmationModal");
    if (modal) {
        modal.style.display = "none";
    }
}

// Modify the existing renter form submission
document.addEventListener("DOMContentLoaded", function () {
    let form = document.getElementById("renterForm");
    if (form) {
        form.addEventListener("submit", function (event) {
            event.preventDefault(); // Prevent actual form submission

            // (Optional: You can send data to your backend here)

            closeRenterModal(); // Close renter details modal
            openConfirmationModal(); // Open confirmation modal
        });
    }
});
