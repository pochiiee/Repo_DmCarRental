//T AND C MODAL

//open T&C
function openModal() {
    let modal = document.getElementById("rentModal");
    if (modal) {
        modal.style.display = "flex";
    }
}

//close T&C
function closeModal() {
    let modal = document.getElementById("rentModal");
    if (modal) {
        modal.style.display = "none";
    }
}

// Close button functionality
document.addEventListener("DOMContentLoaded", function () {
    let closeBtn = document.querySelector(".modal .close");
    if (closeBtn) {
        closeBtn.addEventListener("click", closeModal);
    }
});


//checkbox for accept
document.addEventListener("DOMContentLoaded", function () {
    var termsCheckbox = document.getElementById("termsCheckbox");
    var acceptButton = document.getElementById("acceptButton");
    var rentalDetailsModal = document.getElementById("rentalDetailsModal");
    var closeButtons = document.querySelectorAll(".close");


    // Toggle Accept Button based on checkbox state
    termsCheckbox.addEventListener("change", function () {
        acceptButton.disabled = !this.checked;
        acceptButton.classList.toggle("enabled", this.checked);
    });


//RENTAL DETAILS MODAL

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



    // Enable confirm button only when fields are valid
    function validateForm() {
        let pickup = document.getElementById("pickupDateTime").value;
        let returnDate = document.getElementById("returnDateTime").value;
        let license = document.getElementById("bookinglicenseNumber").value;
        let confirmRentalBtn = document.getElementById("confirmRentalBtn");

        let pickupError = document.getElementById("pickupError");
        let returnError = document.getElementById("returnError");
        let licenseError = document.getElementById("licenseError");

        let pattern = /^[A-Z]{1}[0-9]{2}-[0-9]{2}-[0-9]{6}$/;
        let isValid = true;

        // Validate Pick-up Date (Must not be empty)
        if (!pickup) {
            pickupError.style.display = "block";
            isValid = false;
        } else {
            pickupError.style.display = "none";
        }

        // Validate Return Date (Must be later than Pick-up Date)
        if (!returnDate || returnDate <= pickup) {
            returnError.style.display = "block";
            isValid = false;
        } else {
            returnError.style.display = "none";
        }

        // Validate License Number (Format: A12-34-567890)
        if (license.length !== 13 || !pattern.test(license)) {
            licenseError.style.display = "block";
            isValid = false;
        } else {
            licenseError.style.display = "none";
        }

        // Enable or disable the confirm button
        confirmRentalBtn.disabled = !isValid;
        confirmRentalBtn.classList.toggle("enabled", isValid);
    }

    // Validate License Input (Prevents Invalid Characters & Limits Input)
    document.getElementById("bookinglicenseNumber").addEventListener("input", function (event) {
        let input = event.target;
        let value = input.value.toUpperCase().replace(/[^A-Z0-9-]/g, ""); // Remove invalid chars
        if (value.length > 13) value = value.slice(0, 13); // Restrict max 13 chars
        input.value = value;
        validateForm();
    });

    // Validate Date Inputs in Real-Time
    document.getElementById("pickupDateTime").addEventListener("input", validateForm);
    document.getElementById("returnDateTime").addEventListener("input", validateForm);

});


//RENTER DETAILS MODAL

// Open Rental Details Modal after confirm button is clicked
confirmRentalBtn.addEventListener("click", function () {
    rentalDetailsModal.style.display = "none"; // Close rantal details modal
    renterDetailsModal.style.display = "flex"; // Open renter details modal
});


// Function to close the Renter Details modal
function closeRenterModal() {
    let modal = document.getElementById("renterDetailsModal");
    if (modal) {
        modal.style.display = "none";
    }
}


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



