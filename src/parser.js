class Parser {
    parse(expression) {
        const tokens = this.tokenize(expression); // Токенизируем выражение
        return this.evaluate(tokens); // Вычисляем результат
    }

    tokenize(expression) {
        const tokens = expression.match(/(\d+\.?\d*|\+|\-|\*|\/|\(|\))/g);
        if (!tokens) throw new Error('Неверное выражение'); // Проверка на наличие токенов
        console.log('масcив токенов', tokens);
        return tokens;
    }

    evaluate(tokens) {
        const values = []; // Стек для чисел
        const ops = []; // Стек для операций

        for (let token of tokens) {
            console.log('перебор цикла каждого токена', token);
            console.log('масив values на каждой итерации', values);
            console.log('масив ops на каждой итерации', ops);
            if (!isNaN(token)) {
                values.push(parseFloat(token)); // Если токен - число, добавляем его в стек значений
            } else if (token === '(') {
                ops.push(token); // Если токен - открывающая скобка, добавляем в стек операций
            } else if (token === ')') {
                while (ops.length && ops[ops.length - 1] !== '(') {
                    const val2 = values.pop(); // Берем два последних значения
                    const val1 = values.pop();
                    const op = ops.pop(); // Берем последнюю операцию
                    values.push(this.applyOperation(op, val1, val2)); // Выполняем операцию и добавляем результат
                }
                ops.pop(); // Убираем открывающую скобку
            } else if (this.isOperator(token)) {
                while (ops.length && this.precedence(ops[ops.length - 1]) >= this.precedence(token)) {
                    const val2 = values.pop(); // Берем два последних значения
                    const val1 = values.pop();
                    const op = ops.pop(); // Берем последнюю операцию
                    values.push(this.applyOperation(op, val1, val2)); // Выполняем операцию и добавляем результат
                }
                ops.push(token); // Добавляем текущую операцию в стек
            }
        }

        while (ops.length) {
            const val2 = values.pop(); // Выполняем оставшиеся операции
            const val1 = values.pop();
            const op = ops.pop();
            console.log('val2, val1, op', val2, val1, op);
            values.push(this.applyOperation(op, val1, val2));
        }

        return values.length ? values[0] : null; // Возвращаем результат
    }

    isOperator(token) {
        return ['+', '-', '*', '/'].includes(token); // Проверяем, является ли токен оператором
    }

    precedence(op) {
        if (op === '+' || op === '-') return 1; // Приоритет для сложения и вычитания
        if (op === '*' || op === '/') return 2; // Приоритет для умножения и деления
        return 0; // Для других операций
    }

    applyOperation(op, a, b) {
        switch (op) {
            case '+': return a + b; // Сложение
            case '-': return a - b; // Вычитание
            case '*': return a * b; // Умножение
            case '/': 
                if (b === 0) throw new Error('Деление на ноль'); // Проверка на деление на ноль
                return a / b; // Деление
            default: throw new Error('Неизвестный оператор'); // Неизвестный оператор
        }
    }
}

module.exports = new Parser(); // Экспортируем экземпляр класса Parser