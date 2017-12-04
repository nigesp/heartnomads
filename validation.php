<?php

	class Validation {
 		public $status = 'success';
		public $errors = array();
	
		public function addError($err) {
			array_push($this->errors, $err);
			$this->status = 'error';
		}
		
		public function isHasErrors() {
			if(sizeof($this->errors) > 0) {
				return true;
			} else {
				return false;
			}
		}
  
		public function __toString() {
			return $this->status . ' number of errors: ' . sizeof($this->errors);
		}
	
		public function expose() {
    		return get_object_vars($this);
		}
	}

?>