$(document).ready(function () {
    $('#enquiryForm').submit(function (event) {
        event.preventDefault(); // Prevent default form submission

        // Form validation
        let isValid = true; 
        let phone = $('input[name="phone"]').val();
        let email = $('input[name="email"]').val();
        
        // Add custom validation checks (can also use the built-in HTML5 validation)
        if (!/^[0-9]{10}$/.test(phone)) {
            alert("Please enter a valid 10-digit phone number.");
            isValid = false;
        }

        if (!email.includes('@')) {
            alert("Please enter a valid email address.");
            isValid = false;
        }

        if (isValid) {
            // Serialize form data
            let formData = $(this).serialize();

            // AJAX form submission
            $.ajax({
                type: "POST",
                url: $(this).attr('action'), // Use the form's action attribute as URL
                data: formData,
                success: function (response) {
                    alert("Your enquiry has been submitted successfully!");
                    // Optionally reset form here
                    $('#enquiryForm')[0].reset();
                },
                error: function () {
                    alert("An error occurred. Please try again.");
                }
            });
        }
    });
});