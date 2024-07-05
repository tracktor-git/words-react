[![Maintainability](https://api.codeclimate.com/v1/badges/7e4631d8b2267d3487c6/maintainability)](https://codeclimate.com/github/tracktor-git/words-react/maintainability)

# Игра в слова

Классическая игра в слова. Пользователь называет слово, робот отвечает словом на последнюю букву слова пользователя, и так далее.


## Demo

Работу приложения можно посмотреть по ссылке: https://tracktor.su


## Установка

### Для установки frontend-части:

1. Клонируйте репозиторий:

```bash
git clone https://github.com/tracktor-git/words-react
```
2. Установите все зависимости:

```bash
npm ci
```

3. Запустите проект:

```bash
npm run start
```

### Для установки backend-части:
1. Для работы backend-части необходим php версии 7.4 и выше, запущенный под управлением веб-сервера, например Apache2.4. В php должны быть установлены модули mbstring и sqlite3.
2. Содержимое папки /public/backend разместите на настроенном веб-сервере.
3. Для работы в режиме разработки в файле /src/routes.js укажите URL вашего веб-сервера, куда будут отправляться запросы из фронтенда.
4. Поскольку в режиме разработки фронтенд и бэкенд будут работать на разных портах, в php необходимо будет прописать заголовки, разрешающие CORS запросы. Это можно сделать в настройках веб-сервера, либо же в файле index.php бэкенд части.

Настройка в index.php:
```php
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST');
header("Access-Control-Allow-Headers: X-Requested-With");
```

Пример настройки в конфигурации веб-сервера Apache (должен быть включен apache-модуль headers):
```
<Directory /var/www/html>
   ...
   Header set Access-Control-Allow-Origin "*"
   ...
</Directory>
```
## Deployment

Для деплоя проекта необходимо выполнить его сборку и размещение на вашем веб-сервере

1. Собираем проект:
```bash
npm run build
```

2. Содержимое полученной папки "build" размещаем на веб-сервере с поддержкой php7.4 и выше (должны быть включены php-модули mbstring и sqlite3).

