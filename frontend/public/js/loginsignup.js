// login script

// Function to handle form submission
const handleFormSubmit = async (event) => {
    event.preventDefault();

    const form = document.getElementById('loginForm');
    const formData = new FormData(form);

    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    const requestBody = JSON.stringify({
        identifier: formData.get('identifier'),
        password: formData.get('password')
    });

    const requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: requestBody,
        redirect: 'follow'
    };

    try {
        const response = await fetch("http://143.198.237.154/api/login", requestOptions);
        const result = await response.text();
        console.log(result);

        if (response.ok) {
            const data = await JSON.parse(result);
            const token = data.token;
            console.log(token);
            // Store the token in local storage or as a cookie
            localStorage.setItem('token', token);
            // Redirect the user to the desired page
            console.log('redirecting to / now');
            window.location.href = '/homePage'; // Change to your desired URL
        } else {
            alert('Invalid email or password. Please try again.');
        }
    } catch (error) {
        console.log('error', error);
        alert('An error occurred. Please try again later.');
    }
};

const loginForm = document.getElementById('loginForm');
loginForm.addEventListener('submit', handleFormSubmit);

// signup script
let password = document.getElementById("signUpPassword");
let confirm_password = document.getElementById("confirm_password");

function matchPassword() {
    if (password.value != confirm_password.value) {
        confirm_password.setCustomValidity("Passwords don't match.");
    }
    else {
        confirm_password.setCustomValidity('');
    }
}

password.onchange = matchPassword;
confirm_password.onkeyup = matchPassword;

const handleSignupForm = async (event) => {
    event.preventDefault();

    const signupForm = document.getElementById("signUpForm");
    const signUpformData = new FormData(signupForm);


    const myHeaders = new Headers(); //para malaman ni server na json and padala
    myHeaders.append("Content-Type", "application/json");

    const requestBodySU = JSON.stringify({
        fname: signUpformData.get('fname'),
        lname: signUpformData.get('lname'),
        username: signUpformData.get('username'),
        email: signUpformData.get('email'),
        mobile: signUpformData.get('phone'),
        password: signUpformData.get('password'),
        role: signUpformData.get('role')
    });

    const requestOptionsSU = {
        method: 'POST',
        headers: myHeaders,
        body: requestBodySU,
        redirect: 'follow'
    };

    try {
        const responseSu = await fetch('http://143.198.237.154/api/signup', requestOptionsSU);
        const resultSu = await responseSu.text();

        if (responseSu.ok) {
            $('#logIn').modal('hide');
            $('#signUp').modal('hide'); // Close the sign-up modal
            $('#signupVerification').modal('show'); //shows the verification message
        }
    }
    catch (error) {
        console.log('error', error);
        alert('An error occurred. Please try again later.');
    }
};

const signUpForm = document.getElementById('signUpForm');
signUpForm.addEventListener('submit', handleSignupForm);

// signup to login vice-versa
document.addEventListener("DOMContentLoaded", () => {
    const switchToSignUpLink = document.getElementById("switchToSignUp");
    const switchToLoginLink = document.getElementById("switchToLogin");

    switchToSignUpLink.addEventListener("click", () => {
        $('#logIn').modal('hide'); // Close the login modal
        $('#signUp').modal('show'); // Open the sign-up modal
    });
    switchToLoginLink.addEventListener("click", () => {
        $('#signUp').modal('hide'); // Close the sign-up modal
        $('#logIn').modal('show'); // Open the login modal
    });
});

// form validator
const forms = document.querySelectorAll("form");

forms.forEach(form => {
    form.addEventListener('submit', event => {
        if (!form.checkValidity()) {
            event.preventDefault();
        }
        form.classList.add('was-validated');
    });
});