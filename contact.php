<?php

	include 'validation.php';
	include 'error.php';
	include 'clean_input.php';

	//Data entered into form:
	$client_email_address = clean_input($_POST['email_address']);
	$client_first_name = clean_input($_POST['first_name']);
	$client_last_name = clean_input($_POST['last_name']);
	$client_comments = clean_input($_POST['comments']);

	$validation = validate_input($client_email_address, $client_first_name, $client_last_name);

	if(!$validation->isHasErrors()) {
		//Send auto response email to client.
		$client_subject = 'Heart Nomads - Contact';
		$client_message = 'Thank you for contacting Heart Nomads.';
		$client_headers = 'From: lorraine@heartnomads.co.za' . "\r\n" .
	    	'Reply-To: lorraine@heartnomads.co.za' . "\r\n" .
    		'X-Mailer: PHP/' . phpversion();
    	if(!mail($client_email_address, $client_subject, $client_message, $client_headers)) {
    		$validation->addError(new Err('contact-me-form', 'An error occurred, please get in touch with me directly.'));
    	}

		//Send email to lorraine.
		$to      = 'lorraine@heartnomads.co.za';
		$subject = 'Website - contact me form.';
		$message = $client_comments;
		$headers = 'From: ' . $client_email_address . "\r\n" .
    		'Reply-To: ' . $client_email_address . "\r\n" .
    		'X-Mailer: PHP/' . phpversion();

		if(!mail($to, $subject, $message, $headers)) {
			$validation->addError(new Err('contact-me-form', 'An error occurred, please get in touch with me directly.'));
		}
	}

	//Send JSON response.
	header('Content-Type: application/json');
	echo json_encode($validation);

	//Validate input:
	function validate_input($client_email_address, $client_first_name, $client_last_name) {
		$val = new Validation();
		//Validate email address.
		if(!filter_var($client_email_address, FILTER_VALIDATE_EMAIL)) {
			$val->addError(new Err('email_address', 'Please enter a valid email address.'));
		}
		//First name must not be null.
		if(empty($client_first_name)) {
			$val->addError(new Err('first_name', 'Please enter your first name.'));
		}
		//Last name must not be null.
		if(empty($client_last_name)) {
			$val->addError(new Err('last_name', 'Please enter your last name.'));
		}

		return $val;
	}

?>
