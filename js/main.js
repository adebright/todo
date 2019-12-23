//! Validate.js -- a small package for client side validation 
//!Require validating functions  
import {validateName , validateEmail , validatePassword , verifyPassword } from "./validate" 

 //!Helper function for uniquely selecting DOM elements  
let selector = e => document.querySelector(e) 
let createElement = e => document.createElement(e) 

//! A utility function for success message to be delivered to the user 
const successElement = (elem , msg , color) => {
	let feedBack = createElement(elem) 
	feedBack.textContent = msg
	feedBack.style.color  = color 
	feedBack.style.textAlign = "center" 
	return feedBack
}

//!Attach a submit event to the form or a click event to the submit button 
selector("form").addEventListener("submit" , event => {
	event.preventDefault()
	
    //!validate all the input field  	
	let userName     = validateName(selector("#name").value.trim()) 
	let userEmail    = validateEmail(selector("#email").value.trim()) 
	let userPass     = validatePassword(selector("#password").value.trim())
	let confirmPass  = validatePassword(selector("#confirmPassword").value.trim())
	let verifyPass     = verifyPassword(userPass , confirmPass) 
	
	//! Now  , try to use the values in storing them locally 
	try {
		if ( userName.value != null ) {
            if ( userEmail.value != null ) {
				if ( verifyPass.value != null) {	
		            const storeLocally = ((name , email , pass) => {
	                    try {
		                    if ( window.localStorage ) {
			                    localStorage.clear() 
			                    const user = {
				                    userName  : name.value, 
				                    userEmail : email.value , 
				                    userPass :  pass.value 
			                    }
			                    localStorage.validUser = JSON.stringify(user) 
			                    return localStorage.validUser 
		                    }else {
			                    throw {
				                    name : "Local Storage not supported "
			                    }
		                    }
	                    }catch(err) {
		                    console.error (err.name)
	                    }
                    })(userName , userEmail , verifyPass) 
					let msg = `${userName.value} , your registration was successful. You will be redirected to 
                            the login page in 4 seconds `
			        selector("#na").replaceChild(successElement("h2" , msg , "#fff") , selector("#serverResponse")) 
				    const route = {
						currentPage : "/mobile/todo/signup.html" , 
						targetPage  : "/mobile/todo/login.html" 
					}
		            if (location.pathname == route.currentPage) { 
					    console.log("Y")
			            setTimeout(function() {
			                    window.location.replace(route.targetPage)
                            } , 4000)
                    }				
		        }else {
			        throw {
				        name : "RegistrationError" , 
				        message : verifyPass.name   
			        }        
		        }
			}else {
			    throw {
				    name : "RegistrationError" , 
				    message : "Invalid Email "   
			    }        
		    }
		}else {
			throw {
				name : "RegistrationError" , 
				message : "Invalid Email "   
			}        
		} 
	}catch(error){ 
	    
		console.log(`${error.name} - ${error.message}`)
		
	}
})
