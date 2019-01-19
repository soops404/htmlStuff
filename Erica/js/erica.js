var visited = parseInt(sessionStorage.getItem("visited"));
if (visited == 1) {
  $("#hideScreen").css("display", "none");             
}

$("#enterBTN").click( removeSplash);
$("#stopSign").click( removeSplash);

function removeSplash() {
    $("#hideScreen").fadeOut();  
    if (window.sessionStorage) {
        sessionStorage.setItem("visited", 1);
    }    
}
 

// for the verify code submital
$(document).ready(function() {
    $(function() {
        var form = $("#downloadInputForm");
        $(form).submit( function(event) {
            // Stop the browser from submitting the form.
            event.preventDefault();
            var formData = $(form).serialize();
            $.ajax({
                type: 'POST',
                url: $(form).attr('action'),
                data: formData
            })
            .done(function(response) {
                // Set the message text.
                $("#downloadLink").html(response);
                $(form).fadeOut();
            })
            .fail(function(data) {
                // Set the message text.
                if (data.responseText !== '') {
                    $("#downloadLink").html(data.responseText);
                } else {
                    $("#downloadLink").html('Oops! An error occured and your message could not be sent.');
                }
            });
        });
    });
});  

// for the contact form
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