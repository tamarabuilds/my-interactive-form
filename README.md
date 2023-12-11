# my-interactive-form
Unit 03 project for the Full Stack JavaScript Techdegree. This form uses JavaScript to enhance an interactive registration form for a fictional Full Stack conference.

![Screenshot 2023-09-22 at 11 23 31 AM](https://github.com/tamarabuilds/my-interactive-form/assets/98510821/0cb7e23f-54cb-444b-9b5d-2624263a0d59)

Live Site: https://tamarabuilds.github.io/my-interactive-form/


## Installation

There is nothing to install on this project.

## Usage

Interact with the form with the following features:
* Name field is the initial focus
* Job role other field will only display if “other” is selected
* T-shirt color is initially hidden, then revealed based on selected design. Only available colors are displayed with an available color initially highlighted.
* Activity costs are dynamically updated
* Payment will default to credit card with its associated field but when another option is selected, the credit card fields are hidden
* For keyboard navigation, the activities options demonstrate visually where the focus is
* Visual validation errors are enabled including hints and valid input notifications

The following form validation is also in place:
* Conflicting activity times are disabled
* Real-time error messages are displayed on the name and email fields
* Conditional error messages are displayed on the email field
* The following fields are required prior to submitting:
  * Name must not be blank
  * Email must be correctly formatted
  * Activities must have at least 1 selection
  * If credit card is the payment method, the number, zip and cvv code are required

## Contributing

Pull requests are welcome. For major changes, please open an issue first
to discuss what you would like to change.


## License

[MIT](https://choosealicense.com/licenses/mit/)
