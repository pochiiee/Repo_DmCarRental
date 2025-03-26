
        $(document).ready(function () {
            console.log("✅ Script Loaded - jQuery Ready!");

            let resendCooldown = 60; // Cooldown in seconds
            let countdownInterval;

            // ✅ Close Modal when clicking (X) and redirect to Forgot Password
            $("#closeModal").on("click", function () {
                console.log("🔴 Close Modal Clicked - Redirecting...");
                window.location.href = "/Guest/Account/ForgotPassword";
            });

            // ✅ AJAX Submission for Verify Code Form
            $(document).on("submit", "#verifyCodeForm", function (e) {
                e.preventDefault();
                console.log("✅ Form Submitted!");

                let formData = $(this).serialize();
                console.log("📨 Sending AJAX Request with Data:", formData);

                $.ajax({
                    url: this.action,
                    method: this.method,
                    data: formData,
                    dataType: "json",
                    success: function (response) {
                        console.log("✅ AJAX Response:", response);

                        if (response.success) {
                            let redirectUrl = response.redirectUrl;
                            console.log("🔀 Redirecting to:", redirectUrl);
                            window.location.href = redirectUrl;
                        } else {
                            console.error("❌ Verification Failed:", response.message);
                            $(".error-message").text(response.message).show();
                        }
                    },
                    error: function (xhr, status, error) {
                      
                        alert("Error processing request. Please try again.");
                    }
                });
            });

            // ✅ Handle Resend Code Click
            $("#resendCode").on("click", function (e) {
                e.preventDefault();
                let $this = $(this);
                if ($this.prop("disabled")) return;

                console.log("🔁 Resend Code Clicked!");

                // Disable button and start countdown
                $this.prop("disabled", true);
                startCountdown(resendCooldown);

                let email = $("input[name='Email']").val();
               

                $.ajax({
                    url: "/Guest/Account/ResendCode",
                    method: "POST",
                    data: { email: email },
                    success: function (response) {
                        console.log("✅ Resend Code AJAX Response:", response);

                        if (response.success) {
                       
                            alert("Verification code has been resent to your email.");
                        } else {
                            console.error("❌ Resend Failed:", response.message);
                            alert(response.message);
                            clearInterval(countdownInterval);
                            $this.prop("disabled", false).text("Resend Code");
                        }
                    },
                    error: function (xhr, status, error) {
                       
                        alert("Error processing request.");
                        clearInterval(countdownInterval);
                        $this.prop("disabled", false).text("Resend Code");
                    }
                });
            });

            // ✅ Start Countdown Timer
            function startCountdown(timeLeft) {
                let $resendTimer = $("#resendTimer");
                let $resendCode = $("#resendCode");

                console.log("⏳ Starting Resend Countdown:", timeLeft, "seconds");

                $resendCode.text(`Resend Code (${timeLeft}s)`);
                countdownInterval = setInterval(function () {
                    timeLeft--;
                    $resendCode.text(`Resend Code (${timeLeft}s)`);

                    if (timeLeft <= 0) {
                        clearInterval(countdownInterval);
                        console.log("✅ Countdown Finished. Button Enabled.");
                        $resendCode.prop("disabled", false).text("Resend Code");
                    }
                }, 1000);
            }
        });
