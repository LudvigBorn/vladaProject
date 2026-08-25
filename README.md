# VLADA PROJECT — сайт

Лендинг на Next.js (App Router) с собственной админ-панелью (`/admin`) для
редактирования текстов, фото, контактов и т.д. без пересборки сайта.

## Как это устроено

- Весь контент страницы хранится в SQLite (`prisma/dev.db`) в виде одной
  JSON-записи (`PageContent`). Главная страница — серверный компонент,
  который читает эти данные при каждом запросе (со статическим кэшем).
- При сохранении в админке (`/admin`) вызывается `revalidatePath("/")` —
  Next.js перегенерирует главную страницу мгновенно, без `npm run build`.
- Фото загружаются через админку и сохраняются в `public/uploads/`.
- Вход в админку защищён логином/паролем (таблица `AdminUser`, пароль
  хранится как bcrypt-хеш) и подписанной cookie-сессией (JWT, 7 дней).
- SEO: `generateMetadata` берёт title/description из контента,
  `sitemap.xml` и `robots.txt` генерируются автоматически
  (`src/app/sitemap.ts`, `src/app/robots.ts`), на странице есть JSON-LD
  разметка организации (`src/lib/seo.ts`).

## Локальная разработка

```bash
npm install
cp .env.example .env      # и подставьте свои значения
npx prisma migrate deploy # применить миграции к базе
npm run db:seed           # создать первого админа + дефолтный контент
npm run dev
```

Сайт: http://localhost:3000
Админка: http://localhost:3000/admin (логин/пароль из `ADMIN_USERNAME`/`ADMIN_PASSWORD` в `.env`, использованных при первом `db:seed`)

## Переменные окружения (`.env`)

| Переменная | Назначение |
|---|---|
| `DATABASE_URL` | путь к SQLite-файлу, обычно `file:./dev.db` |
| `SESSION_SECRET` | случайная строка ≥16 символов для подписи cookie-сессии админки |
| `ADMIN_USERNAME` / `ADMIN_PASSWORD` | используются только один раз, при первом `npm run db:seed`, чтобы создать админ-аккаунт |
| `SITE_URL` | публичный адрес сайта (для метатегов, sitemap, canonical) |

Сгенерировать `SESSION_SECRET`:

```bash
openssl rand -base64 32
```

## Деплой на свой VPS

Рекомендуемая схема: Node.js процесс под PM2 + Nginx как reverse proxy с TLS
(Let's Encrypt/Certbot).

1. **Подготовка сервера** (Ubuntu, пример):
   ```bash
   curl -fsSL https://deb.nodesource.com/setup_20.x | sudo bash -
   sudo apt install -y nodejs nginx
   sudo npm install -g pm2
   ```

2. **Выкладка кода** — склонируйте репозиторий на сервер, например в
   `/var/www/vladaproject`.

3. **Настройка окружения** — создайте `.env` в корне проекта на сервере
   (см. таблицу выше), укажите боевой `SITE_URL` и надёжный
   `SESSION_SECRET`.

4. **Установка и сборка**:
   ```bash
   cd /var/www/vladaproject
   npm ci
   npx prisma migrate deploy
   npm run db:seed        # только при первом деплое — создаёт админа
   npm run build
   ```

5. **Запуск через PM2**:
   ```bash
   pm2 start npm --name vladaproject -- start
   pm2 save
   pm2 startup            # включить автозапуск после перезагрузки сервера
   ```
   По умолчанию сайт слушает порт 3000 (`next start`).

6. **Nginx как reverse proxy** (пример конфига
   `/etc/nginx/sites-available/vladaproject`):
   ```nginx
   server {
       listen 80;
       server_name vladaproject.kz www.vladaproject.kz;

       location / {
           proxy_pass http://127.0.0.1:3000;
           proxy_http_version 1.1;
           proxy_set_header Upgrade $http_upgrade;
           proxy_set_header Connection 'upgrade';
           proxy_set_header Host $host;
           proxy_set_header X-Real-IP $remote_addr;
           proxy_cache_bypass $http_upgrade;
       }
   }
   ```
   Активировать и выпустить HTTPS-сертификат:
   ```bash
   sudo ln -s /etc/nginx/sites-available/vladaproject /etc/nginx/sites-enabled/
   sudo nginx -t && sudo systemctl reload nginx
   sudo certbot --nginx -d vladaproject.kz -d www.vladaproject.kz
   ```

7. **Обновление сайта после изменений в коде** (сам контент через админку
   этого не требует):
   ```bash
   cd /var/www/vladaproject
   git pull
   npm ci
   npx prisma migrate deploy
   npm run build
   pm2 restart vladaproject
   ```
   `prisma/dev.db` и `public/uploads/` не удаляются при пересборке —
   контент и загруженные фото сохраняются между деплоями. Обязательно
   включите их в резервное копирование сервера.

### Важно про хранение файлов

Не используйте `output: "standalone"` в `next.config.ts` для этого проекта:
он копирует `public/` в отдельную папку при сборке, из-за чего фото,
загруженные через админку после сборки, физически не будут лежать рядом с
тем `public/`, который раздаёт запущенный сервер. Текущая конфигурация
запускает `next start` прямо из корня проекта, поэтому `public/uploads`
всегда один и тот же каталог — что при `npm run build`, что во время
работы сайта.

## Смена пароля администратора

Проще всего — через SQLite напрямую или скриптом. Например, добавить
временный скрипт, который хэширует новый пароль через `bcryptjs` и
обновляет `AdminUser.passwordHash` для нужного `username` в базе на
сервере.
