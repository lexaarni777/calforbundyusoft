const express = require('express'); // Импортируем библиотеку Express
const bodyParser = require('body-parser'); // Импортируем middleware для парсинга тела запроса
const path = require('path'); // Импортируем модуль для работы с путями
const Parser = require('./src/parser'); // Импортируем парсер


const app = express(); // Создаем экземпляр приложения Express
const PORT = process.env.PORT || 9000; // Устанавливаем порт для сервера

app.use(express.static('public')); // Указываем папку для статических файлов
app.use(bodyParser.json()); // Используем middleware для парсинга JSON




// Обработка POST-запроса для вычисления выражения
app.post('/api/calculate', (req, res) => {
    console.log(1)
    const { expression } = req.body; // Получаем выражение из тела запроса
    console.log(expression)
    try {
        const result = Parser.parse(expression); // Парсим и вычисляем выражение
        res.json({ result }); // Возвращаем результат в формате JSON
    } catch (error) {
        res.status(400).json({ error: error.message }); // Обрабатываем ошибки
    }
});
// Запускаем сервер и слушаем указанный порт
app.listen(PORT, () => {
    console.log(`Сервер запущен на http://localhost:${PORT}`);
});