/*!@Program : Todo List Application designed and developed using ES8 
    Developer : Adeleke Bright 
	Company   : ACE AFRICA SOFTWARE 
	Modified  : 23 - 12 - 2019
*/ 
let selector = e => document.querySelector(e)
const path = selector("#path") //!redirection path  

//!Check if the user is logged in else redirect the user back to the login page 
if (!localStorage.user ) { 
	window.location.replace(path.getAttribute("data-redirectPath")) 
}

//!Handle logout  
selector("#logout").addEventListener("click" , event => {
	event.preventDefault() 
	//! Delete the current login and redirect the user to the login page 
	localStorage.removeItem("user")
	window.location.replace(path.getAttribute("data-redirectPath")) 
})

//!Handle reading of profile status --- Not implemented yet

//! construct the view for the application 

class View {
	constructor() {
		this.root = this.getElement('#root') 
		this.welcomeUser = this.createElement("h1")
		this.welcomeUser.textContent = localStorage.user != undefined ? `Welcome ${localStorage.user} ` : "Welcome Ben"
		this.welcomeUser.setAttribute("class" , "text-left")
		this.title = this.createElement('h2') 
		this.title.setAttribute("class" , "text-center")
		this.title.textContent = 'Todo List App'  
		this.listContainer = this.createElement('ul') 
		
		this.form = this.createElement('form') 
		this.input = this.createElement('input') 
		this.input.size = 60 
		this.input.placeholder = 'Add an Item' 
		this.input.setAttribute('class' , 'app-input')
		this.submit = this.createElement('button') 
		this.submit.type = 'submit' 
		this.submit.textContent = 'Add'
		this.submit.setAttribute("class" , "submit")
		this.form.append(this.input , this.submit) 
		
		this.root.append(this.welcomeUser ,  this.title , this.form, this.listContainer ) 
		
	}
	createElement(tag){
		return document.createElement(tag)  
	}
	getElement(target) {
		return document.querySelector(target) 
	} 
	showTodo(todos){
		while(this.listContainer.firstChild){
			this.listContainer.innerHTML = '' 
		}
		if (todos.length === 0) { 
		    //Create a paragraph to show a message that no item if the bucket is empty 
			const para = this.createElement('li')
			const text = document.createTextNode('You currently do not have any activity to track') 
			para.append(text) 
			this.listContainer.append(para) 
		}else { 
		    // Loop over each item in the bucket and create corresponding elements 
			/*!const para = this.createElement('h2')
			const text = document.createTextNode('Todo List History') 
			para.append(text) 
			this.root.append(para) 
			*/
			todos.map(item => { 
			    //!First create a checkbox that will be used in toggling the items  
				const checkbox = this.createElement('input') 
				checkbox.type = 'checkbox' 
				checkbox.checked = item.complete  
				//!Second create an input to receive the text 
				const listItem = this.createElement('input') 
				listItem.type = 'text' 
				listItem.size = 60  
				listItem.className = 'listItem'
				listItem.value = item.name  //+ ' ' + item.date_created
				if ( item.complete) {
					listItem.disabled = true 
				}
				//!Create the delete button 
				const deleteButton = this.createElement('button') 
				deleteButton.textContent = 'Delete'
				//!Create the parent list box 
				const li = this.createElement('li') 
				li.id = item.id  
				li.append(checkbox , listItem , deleteButton)
				this.listContainer.append(li) 
			})
		}
	} 	
				
} 

//! The model for the application  
class Model{
	constructor() {
		this.todos = []   
	} 
	addItem(item){
		this.todos.unshift({
	        id : this.todos.length === 0 ? 1 : this.todos.length + 1 ,
	        name : item , 
	        complete : false , 
	        date_created : new Date() 
        }) 
    }		
	removeItem(id){
		this.todos = this.todos.filter(elem => elem.id !== id)
	} 
	editItem(id , name){
		this.todos.map(item => item.id === id ? item.name = name  : item.name)
	} 
	isComplete(id){
		this.todos.map(elem => elem.id === id ? elem.complete = !elem.complete : elem.complete)
	} 
    save() {
        if (window.localStorage) {
			//!localStorage.clear()
            localStorage.todos = JSON.stringify({todos : this.todos})
			return localStorage.todos
		}
	}
    removeFromLocal(id) {
    }		
}	
//! The controller 
class Controller {
	constructor(){
		this.model = new Model() 
		this.view  = new View()
        this.handleSubmit() 
		this.handleClick() 
		this.handleChange() 
		//!this.items = [] || JSON.parse(localStorage.todos).todos
        this.view.showTodo(this.model.todos)		
	}
	handleSubmit(){
		this.view.form.addEventListener('submit' , event => { 
		    event.preventDefault() 
			let val = this.view.input.value 
			let re = /(^[a-zA-Z])/
			if (val.match(re)){
			    this.model.addItem(val) 
				this.model.save()
				//!Read the todos from localStorage instead so as to persist it 
				
				this.view.showTodo(this.model.todos) 
			} 
			//!this.model.save()
			//!An error message should be displayed if the user does not provide complete details
			const body = document.querySelector('body') 
            const h5 = document.createElement('h5') 
			
            try {
	            if (window.localStorage) {
		            if (localStorage.todos) {
			            const todos = JSON.parse(localStorage.todos)
			            h5.textContent = 'Total Item created : ' + todos.todos.length
			            body.append(h5) 
		            }
	            }
            }catch(error) {
	            console.log(error) 
            }
		})
	} 
	handleClick(){
		this.view.listContainer.addEventListener('click' , event =>{
			let target = event.target 
			if (target.type == 'checkbox') {
				let id = parseInt(target.parentNode.id) 
				this.model.isComplete(id) 
				this.model.save()
				this.view.showTodo(this.model.todos) 
			} 
			if (target.tagName == 'BUTTON') {
				let id = parseInt(target.parentNode.id) 
				this.model.removeItem(id)
				this.model.save()
				this.view.showTodo(this.model.todos) 
			}
		})
	} 
	handleChange(){
		this.view.listContainer.addEventListener('change' , event => {
			let target = event.target 
			if ( target.className == 'listItem') {
				let id = parseInt(target.parentNode.id) 
				this.model.editItem(id , target.value)
				this.model.save()
				this.view.showTodo(this.model.todos)
			}
		})
	}
				
}

let app = new Controller() 

window.addEventListener('storage' , event => {
	console.log('Storage event fired')
	//!console.log(event.originalEvent.newValue) 
	console.log(event.originalEvent.oldValue)
})
//!Utility function for reading items stored in localStorage todos 
const getTodos = (() => {
	let len = JSON.parse(localStorage.todos).todos.length 
	console.log(len) 
})()
//!Handling customization of user profile via image upload 
