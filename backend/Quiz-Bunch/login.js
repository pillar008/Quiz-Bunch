function validateLogin(){
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const errorMessage = document.getElementById('error-message');



    //checking for empty
    if (username.trim() === '' || password.trim() === '') {
        errorMessage.textContent = 'Username and password are required';
    }
    else{
        errorMessage.textContent='Login Successfull !';
        errorMessage.style.color = '#4caf50'
    }
}