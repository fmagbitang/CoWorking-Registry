// forgot password script
let forgotPassword = document.getElementById("forgotPassword");

forgotPassword.addEventListener('click', () => {
    $('#logIn').modal('hide');
    $('#modalForgotPassword').modal('show');
});

const handleForgotPassword = async (event) => {
    event.preventDefault();

    const forgotPasswordForm = document.getElementById("forgotPasswordForm");
    const forgotPasswordData = new FormData(forgotPasswordForm);

    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    const requestBodyFP = JSON.stringify({
        identifier: forgotPasswordData.get('forgotPasswordIdentifier'),
        password: forgotPasswordData.get('newPassword')
    });

    const requestOptionsFP = {
        method: 'POST',
        headers: myHeaders,
        body: requestBodyFP,
        redirect: 'follow'
    };

    try {
        const responseFP = await fetch("http://143.198.237.154/api/forgot_passsword", requestOptionsFP);
        const resultFP = await responseFP.text();
        console.log(resultFP);

        if (responseFP.ok) {
            alert('Password change successfully!');
        }
        else {
            alert('This email or username doesn\'t exist yet!');
        }
    }
    catch (error) {
        console.log('error', error);
        alert('An error occurred. Please try again later.');
    }
};



//Forgot Password modal --- match password
// let new_password = document.getElementById("newPassword");
// let confirm_new_password = document.getElementById("confirm_new_password");

// function matchNewPassword() {
//     try {
//         if (new_password.value === confirm_new_password.value) {
//             const forgot_password = document.getElementById('forgotPasswordForm');
//             forgot_password.addEventListener('submit', handleForgotPassword);
//         }
//         else {
//             confirm_new_password.setCustomValidity("Passwords don't match.");
//             // alert('Passwords don\'t match');
//         }
//     } catch (error) {
//         location.reload();
//         $('.modalForgotPassword').modal('show');
//     }
// }

// new_password.onchange = matchNewPassword;
// confirm_new_password.onkeyup = matchNewPassword;
let new_password = document.getElementById("newPassword");
let confirm_new_password = document.getElementById("confirm_new_password");

function matchNewPassword() {
    try {
        if (new_password.value === confirm_new_password.value) {
            confirm_new_password.setCustomValidity("");
        } else {
            confirm_new_password.setCustomValidity("Passwords don't match.");
        }
    } catch (error) {
                location.reload();
                $('.modalForgotPassword').modal('show');

    }
}

new_password.addEventListener('input', matchNewPassword);
confirm_new_password.addEventListener('input', matchNewPassword);
// end of forgot password