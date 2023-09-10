import throttle from "lodash.throttle";

const STORAGE_KEY = "feedback-form-state";

const form = document.querySelector('.feedback-form');
console.log(form)
form.addEventListener('input', throttle(onInput, 500));

populateForm()

function onInput(evt) {
    const { email, message } = (evt.target.closest('.feedback-form')).elements;

    console.log(email, message)
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
        const { email, message } = form.elements;
        email.value = savedDate.email
        message.value = savedDate.message
    }
}

form.addEventListener('submit', onSubmit);

function onSubmit(evt) {
    evt.preventDefault();
    console.log(JSON.parse(localStorage.getItem(STORAGE_KEY)));

    // очищення
    evt.currentTarget.reset();
    localStorage.removeItem(STORAGE_KEY);
}