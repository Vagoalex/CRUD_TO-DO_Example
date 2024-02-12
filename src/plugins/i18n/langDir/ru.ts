import { TasksFilterStatusEnum } from "@/stores/tasks/types/TasksFilterStatusEnum";

const ru = {
	locale: {
		en: "Английский",
		ru: "Русский"
	},
	nav: {
		home: "Главная",
		about: "О нас"
	},
	home: {
		header: "Добро пожаловать в руководство Vue 3 I18n!",
		created_by: "Это руководство создано для вас компанией {company}.",
		num_visits: "Страницу не посещали :( | Страницу посетили {n} раз | Страницу посетили {n} раза | Страницу посетили {n} раз"
	},
	about: {
		header: "О нас",
		donations: "Пожертвований собрано: {donations}"
	},
	logs: {
		error: {
			requestError: "Ошибка выполнения запроса"
		},
		info: {
			request: "Запрос {url}",
			response: "Ответ {url}"
		}
	},
	fields: {
		email: {
			label: "Почта",
			placeholder: "Введите эл. почту"
		},
		password: {
			label: "Пароль",
			placeholder: "Введите пароль"
		},
		name: {
			label: "Имя",
			placeholder: "Введите имя"
		},
		surname: {
			label: "Фамилия",
			placeholder: "Введите фамилию"
		}
	},
	dialogs: {
		deleteNote: {
			title: "Удалить запись",
			warning: "Вы действительно хотите удалить запись? Данное действие невозможно будет восстановить."
		},
		deleteSelectedNotes: {
			title: "Удалить выбранные записи",
			warning: "Вы действительно хотите удалить выбранные записи? Данное действие невозможно будет восстановить."
		},
		confirmCancelFormChanges: {
			title: "Отменить изменения?",
			description: "Последние изменения не были сохранены, данные могут быть утеряны."
		}
	},
	titles: {
		tasks: "Список задач"
	},
	subTitles: {},
	content: {
		noTasks: "Нет задач"
	},
	cardTitles: {
		authorization: "Авторизация",
		registration: "Регистрация"
	},
	buttons: {
		agree: "Подтвердить",
		cancel: "Отменить",
		logout: "Сменить аккаунт",
		deleteNote: "Удалить запись",
		deleteSelectedNotes: "Удалить выбранные записи",
		add: "Добавить",
		delete: "Удалить",
		back: "Назад",
		ok: "Ок",
		edit: "Редактировать",
		save: "Сохранить",
		clear: "Очистить",
		accept: "Применить"
	},
	tables: {
		loading: "Загружается список...",
		tasks: {
			text: "Описание задачи",
			completed: "Статус задачи"
		}
	},
	navigation: {
		tasks: "Список задач"
	},
	aliases: {
		filterTasksStatus: {
			[TasksFilterStatusEnum.ALL]: "Все",
			[TasksFilterStatusEnum.DONE]: "Выполненные",
			[TasksFilterStatusEnum.NOT_DONE]: "Не выполненные"
		},
		taskStatus: {
			done: "Выполненная",
			notDone: "Не выполненная"
		},
		activeStatus: {
			active: "Активен",
			inactive: "Неактивен"
		}
	}
};

export default ru;
