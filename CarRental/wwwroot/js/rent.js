// T&C Modal

// Open T&C Modal

console.log("rent.js is loaded and running!");

function openModal() {
    let modal = document.getElementById("rentModal");
    if (modal) {
        modal.style.display = "flex";
    }
}

// Close T&C Modal
function closeModal() {
    let modal = document.getElementById("rentModal");
    if (modal) {
        modal.style.display = "none";
    }
}

// Close button functionality
document.addEventListener("DOMContentLoaded", function () {
    console.log("✅ DOM is fully loaded - Initializing modals...");
    let closeBtn = document.querySelector(".modal .close");
    if (closeBtn) {
        closeBtn.addEventListener("click", closeModal);
    }

    // Checkbox for accepting T&C
    let termsCheckbox = document.getElementById("termsCheckbox");
    let acceptButton = document.getElementById("acceptButton");
    let rentalDetailsModal = document.getElementById("rentalDetailsModal");

    // Toggle Accept Button based on checkbox state
    termsCheckbox.addEventListener("change", function () {
        acceptButton.disabled = !this.checked;
        acceptButton.classList.toggle("enabled", this.checked);
    });

    // Open Rental Details Modal after Accept button is clicked
    acceptButton.addEventListener("click", function () {
        document.getElementById("rentModal").style.display = "none"; // Close terms modal
        rentalDetailsModal.style.display = "flex"; // Open rental details modal
    });

    // Enable confirm button only when fields are valid
    function validateForm() {
        let pickup = document.getElementById("rentalDate").value;
        let returnDate = document.getElementById("returnDate").value;
        let confirmRentalBtn = document.getElementById("confirmRentalBtn");

        let pickupError = document.getElementById("pickupError");
        let returnError = document.getElementById("returnError");

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

        // Enable or disable the confirm button
        confirmRentalBtn.disabled = !isValid;
        confirmRentalBtn.classList.toggle("enabled", isValid);
    }

    // Validate Date Inputs in Real-Time
    document.getElementById("rentalDate").addEventListener("input", validateForm);
    document.getElementById("returnDate").addEventListener("input", validateForm);

    // Confirm Rental button click logic
    let confirmRentalBtn = document.getElementById("confirmRentalBtn");
    if (confirmRentalBtn) {
        confirmRentalBtn.addEventListener("click", function () {
            rentalDetailsModal.style.display = "none"; // Close rental details modal
            document.getElementById("renterDetailsModal").style.display = "flex"; // Open renter details modal
        });
    }
});

// RENTER DETAILS MODAL

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
    let okButton = document.getElementById("okButton");

    if (modal) {
        modal.style.display = "flex"; // Show modal properly
    }

    if (okButton) {
        okButton.disabled = false; // Enable button
        okButton.classList.add("enabled"); // Apply correct styles
        okButton.style.pointerEvents = "auto"; // Make sure it's clickable
    }
}

function closeConfirmationModal() {
    let modal = document.getElementById("confirmationModal");
    if (modal) {
        modal.style.display = "none";
    }
}

// Ensure "OK" button is clickable
document.addEventListener("DOMContentLoaded", function () {
    let okButton = document.getElementById("okButton");
    if (okButton) {
        okButton.addEventListener("click", closeConfirmationModal);
    }
});


// Renter Form Validation
document.addEventListener("DOMContentLoaded", function () {
    console.log("✅ DOM is fully loaded - Initializing modals...");
    let renterForm = document.getElementById("renterForm");
    let submitButton = renterForm.querySelector("button[type='submit']");
    let licenseInput = document.getElementById("licenseNo");
    let addressInput = document.getElementById("address");
    let phoneInput = document.getElementById("contactNo");

    function validateLicense() {
        let licensePattern = /^[A-Z]\d{2}-\d{2}-\d{6}$/; // A12-12-123456
        return licensePattern.test(licenseInput.value);
    }

    function validateForm() {
        let allFieldsFilled =
            licenseInput.value.trim() !== "" &&
            addressInput.value.trim() !== "" &&
            phoneInput.value.trim() !== "" &&
            validateLicense(); // Check if license number is valid

        submitButton.disabled = !allFieldsFilled;
        submitButton.classList.toggle("enabled", allFieldsFilled);
    }

    // Real-time validation
    licenseInput.addEventListener("input", validateForm);
    addressInput.addEventListener("input", validateForm);
    phoneInput.addEventListener("input", validateForm);

    // Initial check
    validateForm();

    renterForm.addEventListener("submit", function (event) {
        event.preventDefault(); // Prevent actual form submission

        if (!submitButton.disabled) {
            closeRenterModal(); // Close renter details modal
            openConfirmationModal(); // Open confirmation modal
        } else {
            alert("Please fill out all fields correctly.");
        }
    });
});

document.addEventListener("DOMContentLoaded", function () {
    console.log("✅ DOM is fully loaded - Initializing modals...");
    let form = document.getElementById("renterForm");
    if (form) {
        form.addEventListener("submit", async function (event) {
            event.preventDefault();

            let userId = localStorage.getItem("userId");
            let carId = document.getElementById("carId").value;
            let rentalDate = document.getElementById("rentalDate").value;
            let returnDate = document.getElementById("returnDate").value;
            let estimatedPrice = document.getElementById("estimatedPrice").value;
            let contactNo = document.getElementById("contactNo").value;
            let licenseNo = document.getElementById("licenseNo").value;
            let address = document.getElementById("address").value;

            let requestData = {
                userId: parseInt(userId),
                carId: parseInt(carId),
                rentalDate: new Date(rentalDate).toISOString(),
                returnDate: new Date(returnDate).toISOString(),
                estimatedPrice: parseFloat(estimatedPrice),
                contactNo: contactNo,
                licenseNo: licenseNo,
                address: address
            };

            console.log("📨 Sending rental request:", JSON.stringify(requestData, null, 2));

            try {
                let response = await fetch("https://localhost:7181/api/customer/rentcar/requestrental", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        "Accept": "application/json" 
                    },
                    body: JSON.stringify(requestData)
                });

                console.log(" Fetch response status:", response.status);

                let result = await response.json();
                console.log("Response from server:", result);

                if (result.success) {
                    alert(" Rental request successfully sent!");
                    closeRenterModal();
                    openConfirmationModal();
                } else {
                    alert("Error: " + result.message);
                }
            } catch (error) {
                console.error("Request failed:", error);
                alert("Something went wrong. Please try again.");
            }
        });
    }
});
