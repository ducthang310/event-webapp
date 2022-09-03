const API_URL = 'http://localhost:3000'
const app = {
    _init: () => {
        document.addEventListener('DOMContentLoaded', function() {
            document.getElementById('form').addEventListener('submit', function (event) {
                event.preventDefault();
                if (!app._validateForm()) {
                    return;
                } else {
                    app._hideErrors();
                }
                app._submitForm();
            });
            document.querySelector('.form-control').addEventListener('change', (event) => {
                app._hideErrors();
            });
        });
    },
    _submitForm: async () => {
        const data = {
            email: document.getElementById('email').value.trim(),
            name: document.getElementById('name').value.trim(),
        }
        document.getElementById('submit').style.display = 'none';
        document.getElementById('submit-loading').style.display = null;
        const res = await fetch(API_URL + '/auth/sign-up', {
            method: 'post',
            body: JSON.stringify(data),
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        });
        const resJson = await res.json();
        if (res.ok) {
            app._showSuccess();
        }
        if (resJson.status !== 201 && resJson.status !== 200 && resJson.message) {
            app._showError('errors', resJson.message)
        }
        document.getElementById('submit').style.display = null;
        document.getElementById('submit-loading').style.display = 'none';
    },
    _validateForm: () => {
        const email = document.getElementById('email').value.trim();
        const name = document.getElementById('name').value.trim();
        const emailError = !email ? 'Email is required' : '';
        const nameError = !name ? 'Name is required' : '';
        document.getElementById('email-error').innerText = emailError;
        document.getElementById('name-error').innerText = nameError;
        return email && name;
    },
    _hideErrors: () => {
        const errors = document.getElementsByClassName('error');
        for (let error of errors) {
            error.innerText = '';
            error.style.display = 'none';
        }
    },
    _showError: (id, message) => {
        const elm = document.getElementById(id);
        elm.innerText = message;
        elm.style.display = null;
    },
    _showSuccess: () => {
        document.getElementById('form-main').style.display = 'none';
        document.getElementById('form-success').style.display = null;
    },
    _showMainForm: () => {
        document.getElementById('form-main').style.display = null;
        document.getElementById('form-success').style.display = 'none';
    },
}
app._init();
