# Замечание ревью и исправление

[PR № 2](https://github.com/dima3246/lab3-hobby-shop/pull/2) содержит самостоятельное ревью автора: `setQuantity` принимал 1.5 для штучного товара.

Добавлен тест `fractional quantities are rejected`. До исправления он завершился ошибкой `Missing expected exception (RangeError)`; после замены проверки `Number.isFinite` на `Number.isInteger` прошёл. Исправление внесено отдельным коммитом `Reject fractional cart quantities after review`. Итог: 8 тестов, 8 пройдено, 0 ошибок.

Это подтверждает цикл замечание → воспроизведение → исправление → повторная проверка. Независимое ревью другим участником не выполнялось.
