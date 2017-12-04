<?php

	include 'validation.php';
	include 'error.php';
	include 'clean_input.php';

	//Data entered into form:
	$res_email_address = clean_input($_POST['email_address']);
	$res_first_name = clean_input($_POST['first_name']);
	$res_last_name = clean_input($_POST['last_name']);
	$res_date = clean_input($_POST['date']);
	$res_time = clean_input($_POST['time']);
	$res_therapy = clean_input($_POST['therapy']);

	$validation = validate_input($res_email_address, $res_first_name, $res_last_name);

	if(!$validation->isHasErrors()) {
		//Send auto response email to client.
		$subject = 'Heart Nomads - Appointment Request';
		$message = 'Thank you for requesting a booking.';
		$headers = 'From: lorraine@heartnomads.co.za' . "\r\n" .
	    	'Reply-To: lorraine@heartnomads.co.za' . "\r\n" .
    		'X-Mailer: PHP/' . phpversion();
    	if(!mail($res_email_address, $subject, $message, $headers)) {
    		$validation->addError(new Err('contact-me-form', 'An error occurred, please get in touch with me directly.'));
    	}

		//Send email to lorraine.
		$to      = 'lorraine@heartnomads.co.za';
		$subject = 'Website - Appointment Request';
		$message = 'Booking requested';
		$headers = 'From: ' . $res_email_address . "\r\n" .
    		'Reply-To: ' . $res_email_address . "\r\n" .
    		'X-Mailer: PHP/' . phpversion();

		if(!mail($to, $subject, $message, $headers)) {
			$validation->addError(new Err('contact-me-form', 'An error occurred, please get in touch with me directly.'));
		}
	}

	//Send JSON response.
	header('Content-Type: application/json');
	echo json_encode($validation);

	//Validate input:
	function validate_input($res_email_address, $res_first_name, $res_last_name) {
		$val = new Validation();
		//Validate email address.
		if(!filter_var($res_email_address, FILTER_VALIDATE_EMAIL)) {
			$val->addError(new Err('res_email_address', 'Please enter a valid email address.'));
		}
		//First name must not be null.
		if(empty($res_first_name)) {
			$val->addError(new Err('res_first_name', 'Please enter your first name.'));
		}
		//Last name must not be null.
		if(empty($res_last_name)) {
			$val->addError(new Err('res_last_name', 'Please enter your last name.'));
		}

		return $val;
	}

?>
