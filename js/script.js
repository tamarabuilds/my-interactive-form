// ***** BASIC INFO ***** //

// start user with focus on the name field
document.querySelector('#name').focus()

// initialize form with the 'other-job-role' field hidden, then show if "Other" is selected in job-role drop down
const otherJobRole = document.querySelector('#other-job-role')
otherJobRole.style.display = 'none'

// listen for changes on job role title selection and hide/show other-job-role text field based on the option selected
const titleInput = document.querySelector('#title')
titleInput.addEventListener('change', (e)=> {
    if (titleInput.value === 'other'){
        otherJobRole.style.display = 'block'
    } else {
        otherJobRole.style.display = 'none'
    }
})



// ***** T-SHIRT INFO ***** //

// initially, disable the 'color' select element
const colorInput = document.querySelector('#color')
const colorOptions = colorInput.querySelectorAll('option')                              // using a node list instead of an HTML collection
console.log(colorOptions)
colorInput.style.display = 'none'

// listen for changes on the 'design' select element and (1) enable the 'color' select element (2) show an available color (3) ensure colors align with selected 'design'
const designInput = document.querySelector('#design')
designInput.addEventListener('change', (e)=> {
    colorInput.style.display = 'block'
    for (let i = 0; i < colorInput.length; i++){
        let selectedToBeSet = true
        if (colorInput[i].dataset.theme === designInput.value){
            colorInput[i].removeAttribute('hidden')

            

            // setting default availale color
            if (selectedToBeSet){                                                           /// NEED TO FIX DEFAULT AVAILABLE COLOR
                colorInput[i].setAttribute('selected', true)  
                selectedToBeSet = false
            } else {
                colorInput[i].removeAttribute('selected')  
            }



        } else {
            colorInput[i].setAttribute('hidden', true)
        }
    }
})
// console.log(`${colorInput[i].dataset.theme}`)