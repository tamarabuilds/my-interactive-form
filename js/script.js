// ***** BASIC INFO ***** //

/*
start user with focus on the name field
initialize form with the 'other-job-role' field hidden, then show if "Other" is selected in job-role drop down
listen for changes on job role title selection and hide/show other-job-role text field based on the option selected
*/

const nameInput = document.querySelector('#name')
const emailInput = document.querySelector('#email')
nameInput.focus()

const otherJobRole = document.querySelector('#other-job-role')
otherJobRole.style.display = 'none'

const titleInput = document.querySelector('#title')
titleInput.addEventListener('change', (e)=> {
    if (titleInput.value === 'other'){
        otherJobRole.style.display = 'block'
    } else {
        otherJobRole.style.display = 'none'
    }
})


// ***** T-SHIRT ***** //

// initially, disable the 'color' select element
const colorInput = document.querySelector('#color')
const colorOptions = colorInput.querySelectorAll('option')
colorInput.style.display = 'none'

/*
listen for changes on the 'design' select element and 
(1) enable the 'color' select element (2) show an available color 
(3) ensure colors align with selected 'design'
*/

const designInput = document.querySelector('#design')
designInput.addEventListener('change', (e)=> {
    colorInput.style.display = 'block'
    let selectedToBeSet = true
    for (let i = 0; i < colorInput.length; i++){
        if (colorInput[i].dataset.theme === designInput.value){
            colorInput[i].removeAttribute('hidden')
            // setting default availale color
            if (selectedToBeSet){
                colorInput[i].setAttribute('selected', true)  
                selectedToBeSet = false
                console.log(`selected option: ${colorInput[i]}`)
            } else {
                colorInput[i].removeAttribute('selected')  
            }
        } else {
            colorInput[i].setAttribute('hidden', true)
            colorInput[i].removeAttribute('selected')
        }
    }
})


// ***** ACTIVITIES ***** //

/* 
'activity-cost' paragraph to update total cost based on event listener on 'activites' fieldset checkbox inputs. 
Increase/decrease amount by data-cost of each checked/unchecked element.
*/

const activites = document.querySelector('#activities')
const cost = document.querySelector('#activities-cost')
const activityCheckboxes = document.querySelectorAll("input[type='checkbox']")
let isAnActivitySelected = false
activites.addEventListener('change', (e)=>{
    let runningSum = 0
    isAnActivitySelected = false
    for (let i = 0; i < activityCheckboxes.length; i++){
        if ( activityCheckboxes[i].checked){
            runningSum += parseInt(activityCheckboxes[i].dataset.cost)
            isAnActivitySelected = true
        }
    }
    cost.innerText = `Total: $${runningSum}`
})

/*
Added visible focus states to more easily navigate via keyboard.
*/
// Thanks to @Nicole D. & @Liz T. for helping with this forEach
activityCheckboxes.forEach( (element) => {
    element.addEventListener('focus', (e)=>{
        e.target.closest('label').className = 'focus'
    })

    element.addEventListener('blur', (e)=>{
        const focusToBeRemoved = document.querySelector('label.focus')
        focusToBeRemoved.className = ''
    })
})


// ***** PAYMENT ***** //

/*
Set credit card to default option with only its fields visible. 
When user updates 'payment' type, show those fields
*/

const paymentType = document.querySelector('#payment')
paymentType.querySelector("[value='credit-card'").setAttribute('selected', true)
document.querySelector("#paypal").setAttribute('hidden', true)
document.querySelector("#bitcoin").setAttribute('hidden', true)

paymentType.addEventListener('change', (e)=> {
    if (paymentType.value === 'credit-card'){
        document.querySelector("#credit-card").removeAttribute('hidden')
        document.querySelector("#paypal").setAttribute('hidden', true)
        document.querySelector("#bitcoin").setAttribute('hidden', true)
    } else if (paymentType.value === 'bitcoin'){
        document.querySelector("#bitcoin").removeAttribute('hidden')
        document.querySelector("#paypal").setAttribute('hidden', true)
        document.querySelector("#credit-card").setAttribute('hidden', true)
    } else if (paymentType.value === 'paypal'){
        document.querySelector("#paypal").removeAttribute('hidden')
        document.querySelector("#bitcoin").setAttribute('hidden', true)
        document.querySelector("#credit-card").setAttribute('hidden', true)

    }
})


// ***** FORM VALIDATION ***** //

/* 
Form event listener should check the following helper functions are valid & required on 'submit':
Required fields to be validated with the following helper functions:
    (1) name field cannot be empty
    (2) email formatted correctly: word-chars + @ + word-chars + . + word-chars
    (3) 'activites' should have at least 1 activity selected
    (4) if payment-method is credit-card
        (a) card-number must contain 13-16 digits, no dashes/spaces
        (b) zip must be 5 digit number
        (c) CVV must be 3 digit number
Visual validation added with hints
*/ 

const form = document.querySelector('form')
const isNameValid = () => Boolean(nameInput.value)
const isEmailValid = () => {
    return /^\w+@\w+\.\w+$/.test(emailInput.value)
}
const ccNum = document.querySelector('#cc-num')
const ccZip = document.querySelector('#zip')
const ccCVV = document.querySelector('#cvv')
const isCCNumValid = () => {
    return /^\d{13,16}$/.test(ccNum.value)
}
const isZipValid = () => {
    return /^\d{5}$/.test(ccZip.value)
}
const isCVVValid = () => {
    return /^\d{3}$/.test(ccCVV.value)
}
const isCreditCardValid = () =>{

    return (paymentType.value === 'credit-card' &&
            isCCNumValid() &&
            isZipValid() &&
            isCCNumValid) ||
            paymentType.value === 'bitcoin' ||
            paymentType.value === 'paypal'
}

function errorField(errorElement){
    const parentOfError = errorElement.parentElement
    parentOfError.classList.add('not-valid')
    parentOfError.classList.remove('valid')
    parentOfError.lastElementChild.style.display = 'block'
}

function validField(resolvedElement){
    const parentOfResolved = resolvedElement.parentElement
    parentOfResolved.classList.add('valid')
    parentOfResolved.classList.remove('not-valid')
    parentOfResolved.lastElementChild.style.display = 'none'
}

form.addEventListener('submit', (e)=> {
    console.log(`preventing submission upfront...`)
    e.preventDefault()

    if (isNameValid()){
        validField(nameInput)
    } else {
        e.preventDefault()
        errorField(nameInput)
    }

    if (isEmailValid()){
        validField(emailInput)
    } else {
        e.preventDefault()
        errorField(emailInput)
    }

    if (isAnActivitySelected){
        validField(document.querySelector('#activities-box'))
    } else {
        e.preventDefault()
        errorField(document.querySelector('#activities-box'))
    }

    if (isCCNumValid()){
        validField(ccNum)
    } else {
        e.preventDefault()
        errorField(ccNum)
    }

    if (isZipValid()){
        validField(ccZip)
    } else {
        e.preventDefault()
        errorField(ccZip)
    }
     
    if (isCVVValid()){
        validField(ccCVV)
    } else {
        e.preventDefault()
        errorField(ccCVV)
    } 
})
