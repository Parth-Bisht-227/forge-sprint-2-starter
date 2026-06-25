FROM php:8.3-cli
WORKDIR /var/www/html
RUN apt-get update && apt-get install -y \
    git \
    unzip \
    libsqlite3-dev \
    && docker-php-ext-install pdo pdo_sqlite \
    && rm -rf /var/lib/apt/lists/*
COPY --from=composer:2 /usr/bin/composer /usr/bin/composer
COPY composer.json composer.lock ./
RUN composer install --no-dev --optimize-autoloader --no-interaction --no-scripts
COPY . .
RUN mkdir -p database bootstrap/cache storage/logs \
    && touch database/database.sqlite \
    && chmod -R 775 database bootstrap/cache storage
CMD sh -c "touch database/database.sqlite && php artisan migrate --force && php artisan serve --host 0.0.0.0 --port \${PORT:-8000}"