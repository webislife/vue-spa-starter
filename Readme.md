# Frontend starter kit

Стартовый репозиторий для SPA проектов на VUE v.0.0.1

- Docker
- NGNIX
- Vue\Vuex\Vue Router
- SCSS\SASS
- svg sprite loader
- exclude sassfile loader

## Development

- `task docker-dev` - Старт проекта, в dev режиме
- `task docker-prod` - Старт проекта в prod режиме
- `task build-production` - билд проекта в production режиме
- `task build-development` - билд проекта в development режиме

### Файловая структура

- `/config` - файлы конфигураций
- `/src` - source исходные файлы проекта
- `/dist` - сгенерированный билд

### TODO 
Добавить поддержку sevice worker и offline режим
Реализовать prerender
Форкнуть и запилить vue ssr стек
Добавить примеры CI