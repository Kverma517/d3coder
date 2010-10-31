/** 
 * @version 0.3
 * @author Maik Kulbe <info@linux-web-development.de>
 * @copyright (c) 2010 Maik Kulbe
 */

var D3menu = 
{
 /**
  * Version number
  * 
  * @var String
  */
 version: "0.3",
 /**
  * list all message types so we can use this while saving
  * @var Array 
  */
 options: Array("message_type1", "message_type2", "message_type3", "message_type4"),
 /**
  * list all functions so we can use this while saving
  * @var Array 
  */
 checkboxes: Array("functions_rot13",
		 	       "functions_timestamp",
		 	       "functions_crc32",
		 	       "functions_bin2hex",
		 	       "functions_html_entity_decode",
		 	       "functions_htmlentities",
		 	       "functions_htmlspecialchars",
		 	       "functions_htmlspecialchars_decode",
		 	       "functions_md5",
		 	       "functions_sha1",
		 	       "functions_quoted_printable_decode",
		 	       "functions_quoted_printable_encode",
		 	       "functions_escapeshellarg",
		 	       "functions_base64_encode",
		 	       "functions_base64_decode"),
		
 /**
  * initialization to collect startup errors
  */
 init: function() {
	try {
	    D3menu.checkInstall();
		D3menu.restore_options();
	} catch(e) {
		alert("An error accured:" + e + "\n\n Feel free to report errors to "+
				"info@linux-web-development.de so I can fix them.");
	}
 },
 
 checkInstall: function() {
     if(!localStorage.getItem('D3installed'+this.version) || localStorage.getItem('D3installed'+this.version) != 'true') {
         localStorage.setItem("message_type", "notifications");
         localStorage.setItem("message_type1", "0"); 
         localStorage.setItem("message_type2", "1"); 
         localStorage.setItem("message_type3", "0"); 
         localStorage.setItem("message_type4", "0"); 
         
         D3menu.checkboxes.each(function(el){
             localStorage.setItem(el, "1"); 
         });
         localStorage.setItem('D3installed'+this.version, 'true');
         if(localStorage.getItem('D3lastversion')) {
        	 localStorage.removeItem('D3installed'+localStorage.getItem('lastversion'));
         }
         localStorage.setItem('D3lastversion',this.version);
         
     }   
 },
 
 /**
  * Save options to localStorage
  */
 save_options: function(alertText) {
	 if(alertText == undefined) {
		 alert = true;
	 }
     var value = false;
     D3menu.options.each(function(option){
		 if($( option ) && $( option ).checked == true) {
			 value = $( option ).value; 
		 }
	 });
	 localStorage.setItem("message_type", value ? value : "notifications");
	 
	 D3menu.checkboxes.each(function(option){
		 var elem = $( option );
		 var value = "0";
		 if(elem.checked)
			 value = elem.checked ? "1" : "0";
		 else if(elem.value)
			 value = elem.value=="on" ? "1" : "0";
		 
		 localStorage.setItem(option, value); 
	 });
	 alertText ? alert("d3coder:\n\nSettings changed successfully\n\nBe aware: If you enabled and/or disabled functions, you need to reload the extension under the extensions tab(chome://extensions)!\nAt the moment there is no other way to work around this, sorry.") : null;
 },

 /**
  * Restore options from localStorage
  */
 restore_options: function() {
	 var type 				= localStorage.getItem("message_type") ? 
			 						localStorage.getItem("message_type") : 
			 						"notifications"; 
	 var somethingChecked   = false;
	 
	 D3menu.options.each(function(option){
		 var optionValue = $(option).value;
		 if(optionValue==type) {
			 $(option).checked = true;
			 somethingChecked = true;
		 }
	 });
	 if(somethingChecked == false) {
		 $('message_type2').checked = true;
	 }
	 
	 D3menu.checkboxes.each(function(option){
		 var value = localStorage.getItem(option) == 1 ? true : false;
		 var elem = $(option).checked = value;
	 });
 },
 
 /**
  * menu tab functions
  * TODO:  better code to switch between tabs than this massive block of JS
  */
 messageTabShow: function(){
	 $('message').style.display = '';
	 $('message-tab').className = 'active';
	 
	 $('context-menu').style.display = 'none';
	 $('context-menu-tab').className = '';

	 $('misc').style.display = 'none';
	 $('misc-tab').className = '';

	 $('credits').style.display = 'none';
	 $('credits-tab').className = '';
 },
 contextMenuTabShow: function(){
	 $('message').style.display = 'none';
	 $('message-tab').className = '';
	 
	 $('context-menu').style.display = '';
	 $('context-menu-tab').className = 'active';

	 $('misc').style.display = 'none';
	 $('misc-tab').className = '';

	 $('credits').style.display = 'none';
	 $('credits-tab').className = '';
 },
 miscTabShow: function(){
	 $('message').style.display = 'none';
	 $('message-tab').className = '';
	 
	 $('context-menu').style.display = 'none';
	 $('context-menu-tab').className = '';

	 $('misc').style.display = '';
	 $('misc-tab').className = 'active';

	 $('credits').style.display = 'none';
	 $('credits-tab').className = '';
 },
 creditsTabShow: function(){
	 $('message').style.display = 'none';
	 $('message-tab').className = '';
	 
	 $('context-menu').style.display = 'none';
	 $('context-menu-tab').className = '';

	 $('misc').style.display = 'none';
	 $('misc-tab').className = '';

	 $('credits').style.display = '';
	 $('credits-tab').className = 'active';
 }
};

D3menu.init();

$$('input').each(function(el){
	el.addEvent('change', function(){D3menu.save_options(false);});
});