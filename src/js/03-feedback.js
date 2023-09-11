import throttle from "lodash.throttle";

const STORAGE_KEY = "feedback-form-state";

const form = document.querySelector('.feedback-form');
console.log(form)
const { email, message } = form.elements;
form.addEventListener('input', throttle(onInput, 500));

populateForm()

function onInput(evt) {
        //для зберігання вмісту полів
        const data = {
            email: email.value.trim(),
            message: message.value
        };
        //зберігли у локальне сховище
        localStorage.setItem(STORAGE_KEY, JSON.stringify(data))
    }


function populateForm() {
    //забрали обʼєкт зі сховища
    const savedDate = JSON.parse(localStorage.getItem(STORAGE_KEY));
    
    //якщо щось було, заповнюємо поля
    if (savedDate) {
     //   const { email, message } = form.elements;
        email.value = savedDate.email
        message.value = savedDate.message
    }
}

form.addEventListener('submit', onSubmit);

function onSubmit(evt) {
    evt.preventDefault();
    if (!(email.value.length) || !(message.value.length)) {
        return alert('Please fill in all fields of the form')
    } else {
        console.log(JSON.parse(localStorage.getItem(STORAGE_KEY)));

        // очищення
        evt.currentTarget.reset();
        localStorage.removeItem(STORAGE_KEY);
    }
}