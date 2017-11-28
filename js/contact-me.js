$(document).ready(function() {

	//Form input fields.
	var firstName = $("input[name=first_name]");
	var lastName = $("input[name=last_name]");
	var emailAddress = $("input[name=email_address]");
	var commentsTextArea = $("textarea[name=comments]");
	
	var form = $("#contact-me-form");
	form.validate();

	//Bind validation rules to form fields.
	firstName.rules("add", {
		required: true,
		messages: {
			required: "Please enter your first name"
		}
	});

	lastName.rules("add", {
		required: true,
		messages: {
			required: "Please enter your last name"
		}
	});

	emailAddress.rules("add", {
		required: true,
		email: true,
		messages: {
			required: "Please enter your email address",
			email: "Please enter a valid email address"
		}
	});
	
	//Bind AJAX request to form submit action.
	$('#contact-me-form-button').on("click", function(event) {
		event.preventDefault();
		if(form.valid()) {
			$.ajax({
				url: "http://heartnomads.co.za/contact.php",
				method: "POST",
				data: {first_name: firstName.val(),
						last_name: lastName.val(),
						email_address: emailAddress.val(),
						comments: commentsTextArea.val()},
				dataType: "json",
				error: function(jqXHR, textStatus, errorThrown) {
					$('#contact_form_error').html('<strong>ERROR</strong> an error occurred, please contact me directly.').show();
				},
				success: function(data, textStatus, jqXHR) {
					if(data.status === 'success') {
						$("input[name=first_name]").val('');
						$("input[name=last_name]").val('');
						$("input[name=email_address]").val('');
						$("textarea[name=comments]").val('');
						$('#contact_form_success').show();
					} else {
						if(data.errors.length > 0) {
							for(var i = 0; i < data.errors.length; i++) {
								if(data.errors[i].field === 'contact-me-form') {
									$('#contact_form_error').html('<strong>ERROR</strong> ' + data.errors[i].message).show();
								} else {
									$('input[name=' + data.errors[i].field + ']').after('<label class="error" for="' + data.errors[i].field + '">' + data.errors[i].message + '</label>');
								}
							}
						} else {
							$('#contact_form_error').html('<strong>ERROR</strong> an error occurred, please contact me directly.').show();
						}
					}
				}
			});
		}
	});

});