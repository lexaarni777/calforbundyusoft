document.getElementById('calculate').addEventListener('click', () => {
    const expression = document.getElementById('expression').value; // Получаем выражение из поля ввода
    console.log(expression)
    fetch('/api/calculate', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json', // Указываем тип содержимого
        },
        body: JSON.stringify({ expression }), // Отправляем выражение на сервер
    })
    .then(response => {
        console.log(response)
        if (!response.ok) {
            throw new Error('Ошибка в ответе сервера'); // Обрабатываем ошибки
        }
        return response.json(); // Обрабатываем ответ от сервера
    })
    .then(data => {
        document.getElementById('result').innerText = `Результат: ${data.result}`; // Выводим результат
    })
    .catch(error => {
        document.getElementById('result').innerText = `Ошибка: ${error.message}`; // Обрабатываем ошибки
    });
});