<?php   include 'php/header.php'; ?>

    <div class="row">
        <div class = "book col-sm-6">
            <h2>I'd luv to hear from you</h2>>
            <p>Enter the form and let 'er go</p>
        </div>             
        <div class="book col-sm-6">
            <h2>Contact Erica</h2>
            <?php include 'php/contactForm.php'; ?>
            <div id="contactResults"> Results here </div>
        </div>
    </div>

    <script type="text/javascript">
        $(function() {
            var form = $("#contactForm");

            var formMessages = $("#contactResults");

            $(form).submit(function(event) {
                // Stop the browser from submitting the form.
                event.preventDefault();

                // Serialize the form data.
                var formData = $(form).serialize();

                $.ajax({
                        type: 'POST',
                        url: $(form).attr('action'),
                        data: formData
                    })

                .done(function(response) {
                    // Make sure that the formMessages div has the 'success' class.
                    $(formMessages).removeClass('error');
                    $(formMessages).addClass('success');

                    // Set the message text.
                    $(formMessages).text(response);

                    // Clear the form.
                    $('#email').val('');
                    $('#name').val('');
                    $('#message').val('');
                })
                .fail(function(data) {
                    // Make sure that the formMessages div has the 'error' class.
                    $(formMessages).removeClass('success');
                    $(formMessages).addClass('error');

                    // Set the message text.
                    if (data.responseText !== '') {
                        $(formMessages).text(data.responseText);
                    } else {
                        $(formMessages).text('Oops! An error occured and your message could not be sent.');
                    }
                });
            });
        });
    </script>

<?php include 'php/footer.php'; ?>