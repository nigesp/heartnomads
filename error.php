<?php

	class Err {
		public $field;
		public $message;

		public function	__construct($field, $message) {
			$this->field = $field;
			$this->message = $message;
		}
	
		public function __toString() {
			return 'Filed: ' . $this->field	. ' Message: ' . $this->message;
		}
	}

?>