document.addEventListener('DOMContentLoaded', function () {
    // Получаем ссылки на поля формы
    const cardholderNameInput = document.getElementById('cardholdername');
    const cardNumberInput = document.getElementById('Cardnumber');
    const cardMonthInput = document.getElementById('Cardmonth');
    const cardYearInput = document.getElementById('Cardyear');
    const cardCvcInput = document.getElementById('CVC');

    // Получаем ссылки на элементы, где будут отображаться данные
    const cardholderNameDisplay = document.getElementById('card-holder-name');
    const cardNumberDisplay = document.getElementById('card-number');
    const cardDateDisplay = document.getElementById('card-date');
    const cardCvcDisplay = document.getElementById('card-cvc');

    // Сохраняем значения placeholder'ов
    const placeholders = {
        cardholderName: cardholderNameInput.placeholder,
        cardNumber: cardNumberInput.placeholder,
        cardMonth: cardMonthInput.placeholder,
        cardYear: cardYearInput.placeholder,
        cardCvc: cardCvcInput.placeholder,
    };

    // Функция для восстановления placeholder'ов
    function restorePlaceholders() {
        cardholderNameInput.placeholder = placeholders.cardholderName;
        cardNumberInput.placeholder = placeholders.cardNumber;
        cardMonthInput.placeholder = placeholders.cardMonth;
        cardYearInput.placeholder = placeholders.cardYear;
        cardCvcInput.placeholder = placeholders.cardCvc;
    }

    // Функция для очистки сообщений об ошибках
    function clearErrorMessages() {
        document.getElementById('name-error-msg').textContent = '';
        document.getElementById('number-error-msg').textContent = '';
        document.getElementById('date-error-msg').textContent = '';
        document.getElementById('cvc-error-msg').textContent = '';
    }

    // Функция для валидации данных перед отправкой
    function validateCardData() {
        // Получаем значения из полей
        const cardholderName = cardholderNameInput.value;
        const cardNumber = cardNumberInput.value;
        const cardMonth = cardMonthInput.value;
        const cardYear = cardYearInput.value;
        const cardCvc = cardCvcInput.value;
    
        // Перед проверкой сбрасываем предыдущие подсветки ошибок
        clearErrorHighlights();
    
        // Проверяем условия валидации и отображаем сообщения об ошибках
        if (!/^[a-zA-Z ]+$/.test(cardholderName)) {
            document.getElementById('name-error-msg').textContent = 'Wrong format, text only';
            highlightErrorField(cardholderNameInput);
            return false;
        }
    
        if (!/^\d{16}$/.test(cardNumber)) {
            document.getElementById('number-error-msg').textContent = 'Wrong format, number only';
            highlightErrorField(cardNumberInput);
            return false;
        }
    
        if (!/^\d{2}$/.test(cardMonth) || !/^\d{2}$/.test(cardYear)) {
            document.getElementById('date-error-msg').textContent = 'Wrong format, number only';
            highlightErrorField(cardMonthInput);
            return false;
        }
    
        if (!/^\d{3}$/.test(cardCvc)) {
            document.getElementById('cvc-error-msg').textContent = 'Wrong format, number only';
            highlightErrorField(cardCvcInput);
            return false;
        }
    
        return true;
    }
    
    // Функция для сброса подсветки ошибок
    function clearErrorHighlights() {
        const formInputs = document.querySelectorAll('input');
        formInputs.forEach(input => input.classList.remove('error-highlight'));
    }
    
    // Функция для подсветки поля с ошибкой
    function highlightErrorField(inputElement) {
        inputElement.classList.add('error-highlight');
    }

    // Функция для показа второго экрана с подтверждением данных
    function showConfirmationScreen() {
        // Скрываем основную форму
        document.querySelector('.cards-wrapper').style.display = 'none';
        document.querySelector('form').style.display = 'none';

        // Показываем экран подтверждения
        document.querySelector('.confirmation').style.display = 'block';
    }

    // Функция для восстановления placeholder'ов и очистки полей формы
    function restoreDefaults() {
        restorePlaceholders();
        clearCardFields();
    }

    // Функция для очистки полей формы
    function clearCardFields() {
        cardholderNameInput.value = '';
        cardNumberInput.value = '';
        cardMonthInput.value = '';
        cardYearInput.value = '';
        cardCvcInput.value = '';
    }

    // Функция для сохранения данных в localStorage
    function saveDataToLocalStorage() {
        localStorage.setItem('cardholderName', cardholderNameInput.value);
        localStorage.setItem('cardNumber', cardNumberInput.value);
        localStorage.setItem('cardMonth', cardMonthInput.value);
        localStorage.setItem('cardYear', cardYearInput.value);
        localStorage.setItem('cardCvc', cardCvcInput.value);
    }

    // Функция для восстановления данных из localStorage
    function restoreDataFromLocalStorage() {
        cardholderNameInput.value = localStorage.getItem('cardholderName') || '';
        cardNumberInput.value = localStorage.getItem('cardNumber') || '';
        cardMonthInput.value = localStorage.getItem('cardMonth') || '';
        cardYearInput.value = localStorage.getItem('cardYear') || '';
        cardCvcInput.value = localStorage.getItem('cardCvc') || '';

        // Обновляем отображаемые данные
        cardholderNameDisplay.textContent = cardholderNameInput.value;
        cardNumberDisplay.textContent = cardNumberInput.value;
        cardDateDisplay.textContent = cardMonthInput.value + '/' + cardYearInput.value;
        cardCvcDisplay.textContent = cardCvcInput.value;
    }

    // Вызываем функцию восстановления данных из localStorage при загрузке страницы
    restoreDataFromLocalStorage();

    // Обработчики событий ввода данных
    cardholderNameInput.addEventListener('input', function () {
        cardholderNameDisplay.textContent = cardholderNameInput.value;
        saveDataToLocalStorage();
    });

    cardNumberInput.addEventListener('input', function () {
        cardNumberDisplay.textContent = cardNumberInput.value;
        saveDataToLocalStorage();
    });

    cardMonthInput.addEventListener('input', function () {
        cardDateDisplay.textContent = cardMonthInput.value + '/' + cardYearInput.value;
        saveDataToLocalStorage();
    });

    cardYearInput.addEventListener('input', function () {
        cardDateDisplay.textContent = cardMonthInput.value + '/' + cardYearInput.value;
        saveDataToLocalStorage();
    });

    cardCvcInput.addEventListener('input', function () {
        cardCvcDisplay.textContent = cardCvcInput.value;
        saveDataToLocalStorage();
    });

    // Добавляем обработчик события на кнопку Confirm
    document.getElementById('confirm').addEventListener('click', function (event) {
        event.preventDefault(); // Предотвращаем отправку формы

        // Очищаем сообщения об ошибках
        clearErrorMessages();

        // Проверяем валидность данных
        if (validateCardData()) {
            // Если данные валидны, переходим ко второму экрану
            showConfirmationScreen();
        }
    });

    // Добавляем обработчик события на кнопку Continue
    document.getElementById('continue').addEventListener('click', function (event) {
        event.preventDefault(); // Предотвращаем отправку формы

        // Переходим обратно к основной форме
        document.querySelector('.cards-wrapper').style.display = 'flex';
        document.querySelector('form').style.display = 'block';

        // Скрываем экран подтверждения
        document.querySelector('.confirmation').style.display = 'none';

        // Восстанавливаем placeholder'ы и очищаем поля
        restoreDefaults();
    });
    function resetDataOnReload() {
        // Очищаем localStorage
        localStorage.clear();

        // Сбрасываем данные в полях формы
        restoreDefaults();
    }
    resetDataOnReload();

    // Вызываем функцию восстановления placeholder'ов при загрузке страницы
    restorePlaceholders();
});
