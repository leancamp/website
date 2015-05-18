<?php

	if(!$_POST) exit;

	if (!defined("PHP_EOL")) define("PHP_EOL", "\r\n");

	$name     = $_POST['lName'];
	$email    = $_POST['lEmail'];
	$subject    = $_POST['lSubject'];
	$nachricht = $_POST['lMessage'];

	$address = "rui@azn-one.de";

	$e_subject = $subject;

	$e_body = "You have been contacted by $name with regards to $subject, their additional message is as follows." . PHP_EOL . PHP_EOL;
	$e_content = "\"$nachricht\"" . PHP_EOL . PHP_EOL;
	$e_reply = "You can contact ". $name ."via email". $email;

	$msg = wordwrap( $e_body . $e_content . $e_reply, 70 );

	$headers = "From: ". $email . PHP_EOL;
	$headers .= "Reply-To: ". $email . PHP_EOL;
	$headers .= "MIME-Version: 1.0" . PHP_EOL;
	$headers .= "Content-type: text/plain; charset=utf-8" . PHP_EOL;
	$headers .= "Content-Transfer-Encoding: quoted-printable" . PHP_EOL;

	if(mail($address, $e_subject, $msg, $headers, "-f rui@azn-one.de")) {
		echo '1';
	} else {
		echo '0';
	}

?>