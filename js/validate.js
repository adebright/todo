//! Validate.js -- a small package for client side validation  

//!validate input for names 
export const validateName = (val) => { 
    let namePattern = /^[a-zA-Z]+(\-+?)?([a-zA-Z]?)+$/ 
	try {
		if ( String(val).match(namePattern)) {
	        return {
		        name : "Matched" , 
		        value : val.trim() 
	        } 
		}else {
			throw {
				name : "Please provide a valid name" , 
				value : null 
			}
		}
	}catch(err) {
		return {
			name : err.name , 
			value : err.value 
		}
	}
} 

//! validating and authenticating email 
export const validateEmail = (val) => {
	let emailPattern = /^[a-zA-Z]+(\d+|_+|\.)?([a-zA-Z]+|\d+)*@[a-zA-Z]{3,}\.[a-zA-Z]{2,6}$/
	try { 
		if ( String(val).match(emailPattern)) {
	        return { 
		        name : "Matched" , 
		        value : val.trim() 
	        } 
		}else {
			throw {
				name : "Please provide a valid email" , 
				value : null 
			}
		}
	}catch(err) {
		return {
			name : err.name , 
			value : err.value 
		}
	}
} 

//! validating password field 
export const validatePassword = (val) => {
	let passPattern = /\d+/
	try { 
		if ( String(val).match(passPattern)) {
	        return { 
		        name : "Matched" , 
		        value : val.trim() 
	        } 
		}else {
			throw {
				name : "Please provide a valid password" , 
				value : null 
			}
		}
	}catch(err) {
		return {
			name : err.name , 
			value : err.value 
		}
	}
} 
//! verification of password match 
export const verifyPassword = (a , b) => { 
    try {
		if ( a.value === b.value ) {
			return {
				name : "Password matched" , 
				value : a.value 
			}
		}else {
			throw {
				name : "Password did not match again " , 
				value : null 
			}
		}
	}catch(error) {
		return {
			name : error.name ,  
			value : error.value 
		}
	}
}


//let checkName = validateName("2benbne") 
//!validateName("ade-ade").then(res => console.log(res.value)).catch(err => console.error(err.value))  
//console.log(checkName.value)
//!console.log(validateName("ade"))
//!Grab the values provided by the user and store it to local storage 
//! After signup redirect the user using history and location API to login page
//!Use this for checking if the user is logged in 
//! mimic a route as the path to fetch the data from . The path will be providing the data in form of json to getter
//let name = JSON.parse(storeLocally("Adeleke" , "ade@gmail.com" , "234344")).userName 
//console.log(localStorage.validUser.userName)