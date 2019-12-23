//!@Registration and validation application for the TODO application 
//! Written by Adeleke Bright 
//! Last modified : 21-12-19 

// Selecting element
let grabElement = e => document.querySelector(e)

// Adding text to element as content
function message(id , msg){
	id.textContent = msg ; 
} 
// Styling DOM
function styleMe(e) {
	e.forEach((val , index , array) => {
	    val.style.color = "#f00"
		//val.style.fontWeight = "500"
        val.style.fontSize = "0.8rem"
    })
	return e
} 
//Styling for correct entry
function goodStyle(e) {
	e.forEach((val , index , array) => {
        val.style.fontSize = "0.8rem"
        val.style.color = "#000"
    })
	return e
}
// Text to show when error occur 

// Text to show when input field is focused 
let inputFocusMessage = {
	aceafrcaCode : "Please , enter your email to proceed"  , 
	firstName  :"Please , enter your first name"  , 
	lastName  :"Please , enter your last name"  , 
	telephone : "Enter your phone number"
} 
// Text to show when input field is blurred 
let inputBlurMessage = {
	firstName : [
	{good : "Good" , 
	error : function(val) {
	   return `The ${val} you provided is incorrect`
	} , 	   
	noMatach : "Password does not match" , match : "Password mactch"}
	] 
} 
//! Styling of display data  use forEach

	
let aC    = grabElement(".aceafricaCode") 
let aFN  = grabElement("#firstNameValidation")
let aLN  = grabElement("#lastNameValidation")
let aM    = grabElement("#mobileValidation")

//!Model for each of the fields 
//! Working on email 
let aceafricaCodeModel = {
	focusMessage() {
	    message(aC , inputFocusMessage.aceafrcaCode)   
	} , 
	checkValue : function(val) {
		var namePattern = /^[a-zA-Z]+(\d+?|\-+?|.?)*@[a-zA-Z]{3 , }\.[a-z]{2,6}$/
		
		//!/^[a-zA-Z]+[a-zA-Z0-9]+\@[a-z]{5}\.[a-z]{3}$/  , 
        var  val = val.trim();
		if (val.length === 0) {
			message(aC , inputBlurMessage.firstName[0].error("email"))
            var n = styleMe([aC])			
			return false;
		}
		if (val.match(namePattern)) {
			message(aC , inputBlurMessage.firstName[0].good)
			var n = goodStyle([aC])
		    return true ;
	    }else{
			message(aC , inputBlurMessage.firstName[0].error("email"))
			var n = styleMe([aC])		
			return false;
		};
	}
} ;
//! This object will handle the input  into the first name field and pass it to the model
var aceafricaCodeControl = {
        //Handle the input into the field
	fieldHandler : function() {
		var aceElement = grabElement("#aceafricaCode") ;//form Element
	        aceElement.addEventListener("focus" , function() {
			   if (aceElement.value == "") {
			       aceafricaCodeModel.focusMessage()
			   }
		    })
			aceElement.addEventListener("blur" , function() {
			    var e = aceElement.value ;
			    aceafricaCodeModel.checkValue(e) 
		    })
	}	
}
aceafricaCodeControl.fieldHandler()

let firstNameModel = {
	focusMessage() {
	    message(aFN , inputFocusMessage.firstName)   
	} , 
	checkValue : function(val) {
		var namePattern = /^[a-z]{2,20}$/i ,
            val = val.trim();
		if (val.length < 2 || val.length == "") {
			message(aFN , inputBlurMessage.firstName[0].error("first name"))
            var n = styleMe([aFN])			
			return false;
		}
		if (val.match(namePattern)) {
			message(aFN , inputBlurMessage.firstName[0].good)
			var n = goodStyle([aFN])
		    return true ;
	    }else{
			message(aFN , inputBlurMessage.firstName[0].error("first name"))
			var n = styleMe([aFN])		
			return false;
		};
	}
} ;
//! This object will handle the input into the first name field and pass it to the model
var firstNameControl = {
        //Handle the input into the field
	fieldHandler : function() {
		var aceElement = grabElement("#firstName")
	        aceElement.addEventListener("focus" , function() {
			   if (aceElement.value == "") {
			       firstNameModel.focusMessage()
			   }
		    })
			aceElement.addEventListener("blur" , function() {
			    var e = aceElement.value ;
			    firstNameModel.checkValue(e) 
		    })
	}	
}
firstNameControl.fieldHandler() 
//!Working on the last name field 
let lastNameModel = {
	focusMessage() {
	    message(aLN , inputFocusMessage.lastName)   
	} , 
	checkValue : function(val) {
		var namePattern = /^[a-z]{2,20}$/i ,
            val = val.trim();
		if (val.length < 2 || val.length == "") {
			message(aLN , inputBlurMessage.firstName[0].error("last name"))
            var n = styleMe([aLN])			
			return false;
		}
		if (val.match(namePattern)) {
			message(aLN , inputBlurMessage.firstName[0].good)
			var n = goodStyle([aLN])
		    return true ;
	    }else{
			message(aLN , inputBlurMessage.firstName[0].error("first name"))
			var n = styleMe([aLN])		
			return false;
		};
	}
} ;
//! This object will handle the input into the first name field and pass it to the model
var lastNameControl = {
        //Handle the input into the field
	fieldHandler : function() {
		var aceElement = grabElement("#lastName")
	        aceElement.addEventListener("focus" , function() {
			   if (aceElement.value == "") {
			       lastNameModel.focusMessage()
			   }
		    })
			aceElement.addEventListener("blur" , function() {
			    var e = aceElement.value ;
			    lastNameModel.checkValue(e) 
		    })
	}	
}
lastNameControl.fieldHandler()
// Working on mobile number  
let mobileModel = {
	focusMessage() {
	    message(aM , inputFocusMessage.email)   
	} , 
	checkValue : function(val) {
		var nm = /^[0]{1}[7|8]{1}[0|1]{1}[0-9]{8}$/  ,     
		    nm2 = /^[0]{1}[9]{1}[0]{1}[0-9]{8}$/ ,
            val = val.trim() 
		if (val.match(nm) || val.match(nm2)) {
			message(aM , inputBlurMessage.firstName[0].good)
			var n = goodStyle([aM])
		    return true ;
	    }else{
			message(aM , inputBlurMessage.firstName[0].error("mobile number"))
			var n = styleMe([aM])		
			return false;
		}
	}
} 
// This object will handle the input into the first name field and pass it to the model
var mobileControl = {
        //Handle the input into the field
	fieldHandler : function() {
		var aceElement = grabElement("#mobile")
	        aceElement.addEventListener("focus" , function() {
			   if (aceElement.value == "") {
			       mobileModel.focusMessage()
			   }
		    })
			aceElement.addEventListener("blur" , function() {
			    var e = aceElement.value ;
			    mobileModel.checkValue(e) 
		    })
	}	
}
mobileControl.fieldHandler()



//! Sending data as JSON to the backend API 
//! Use AJAX and the Fetch API


let field        = grabElement("#joinFe")   
let loadArea     = grabElement("#serverMessage") 

field.addEventListener("click" , event => { 
    event.preventDefault() 
	//!loadArea.textContent = '...Loading' 
	
	//!How to send a get request using the fetch API 
	//fetch('http://localhost/mobile/ume/app.php').
	//then(response => response.text()).then(res => loadArea.textContent = res || 'Nothing') 
	
	//!How to send a get request using AJAX 
	/*!let req = new XMLHttpRequest() 
	req.onreadystatechange = function() {
		if (req.readyState == XMLHttpRequest.DONE && req.status == 200) {
			loadArea.textContent = req.responseText 
		}
	}
	req.open('GET' , 'http://localhost/mobile/ume/app.php' , true) 
	req.send() 
	*/ 
	//! How to send a POST request using the Fetch API 
	
	//! How to send a POST request using AJAX
	//aceForm.style.display = "none"
	//e.preventDefault() ; 
	loadArea.classList.toggle("showThem")  // Use this for animating the content while user wait
	loadArea.textContent = "Processing ..."

	//let req = false ; 
	if (window.XMLHttpRequest) {
		req = new XMLHttpRequest() ; 
	}else if (window.ActiveXObject) {
		req = new ActiveXObject("Microsoft.XMLHttp") ; 
	}	
	//let displayArea = grabElement(".displayArea")() ;
	let regData = JSON.stringify(
	    { 
		aceCode      : grabElement("#aceafricaCode").value.trim()   , 
		firstName    : grabElement("#firstName").value.trim() , 
		lastName     : grabElement("#lastName").value.trim() , 
		studentType  : grabElement("#studentType").value.trim() , 
		phoneNumber  : grabElement("#mobile").value.trim()
		}
	) ;
	let encodeData = encodeURIComponent(regData)
    req.open("POST" , "http://localhost/mobile/ume/app.php") ; 
    req.setRequestHeader("Content-Type" , "application/x-www-form-urlencoded") ; 
    req.send("Name="+encodeData) ; 
    req.onload = function() {
	  let returnText = req.response  
		  loadArea.textContent = returnText 
		  loadArea.style.fontSize = "1.2rem"
          loadArea.style.color = "#000"	  
	}
	
} , false) ; 















