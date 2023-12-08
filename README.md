# Финальный проект по курсу Web-разработчик Skypro

## Описание проекта
`skypro-avito` - это платформа для продажи и покупки товаров и услуг, частично аналогичная по функционалу с Avito. Проект разработан с использованием современных инструментов и технологий, таких как React, Redux Toolkit, CSS Modules, Docker и TypeScript.
Основные функции:
– Регистрация и авторизация пользователей
– Создание объявлений о продаже товаров и услуг с возможностью загрузки изображений
- Поиск товаров по названию
- Редактирование объявлений о продаже
- Возможность оставлять комментарии к товарам
- Возможность редактирования профиля пользователя
- Снятие объявлений с публикации
- Редактирование аватара пользователя
- Смена пароля пользователя
- Возможность просмотра профиля продавца
- Есть мобильная версия

<img src="./src/assets/img/preview1.png" alt="preview">&nbsp;
<img src="./src/assets/img/preview2.png" alt="preview">&nbsp;
<img src="./src/assets/img/preview3.png" alt="preview">&nbsp;
<img src="./src/assets/img/preview4.png" alt="preview">&nbsp;
  
## Используемые технологии
<div>
  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg" width="40" height="40"/>&nbsp;
  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original-wordmark.svg" width="40" height="40"/>&nbsp;   
  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg" width="40" height="40"/>&nbsp;  
  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/redux/redux-original.svg" width="40" height="40"/>&nbsp;     
  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-plain-wordmark.svg" width="40" height="40"/>&nbsp;  
</div>

## Техническое описание
Для того, чтобы посмотреть проект, необходимо:  
1. Скачать файл backend'a по [ссылке](https://drive.google.com/file/d/1pFE-NRANTsWmQwTyURjHXuECMmoKCFjO/view) и развернуть его в Docker.
   - Скачайте архив и разархивируйте его.
   - Через терминал перейдите в разархивированную папку.
   - Запустите в терминале команду: `docker-compose -f docker-compose-backend.yaml up -d`
3. Установить зависимости командой `npm install`
4. Запустить проект командой `npm run start`
5. Можно собрать проект командой `npm run build`

`src/` — директория, содержащая исходный код проекта.
