export const menuMode = {
  button: {
    viewProfile: 'Профіль',
    logout: 'Вийти',
    signIn: 'Увійти',
    signUp: 'Долучитися',
  },
  picker: {
    language: 'Українська',
    sec: 'сек',
  },
  title: {
    accountSettings: 'Налаштування акаунту',
    activitySettings: 'Налаштування тренувань',
    routeSettings: 'Налаштування маршрутів',
    appSettings: 'Налаштування додатку',
  },
  preference: {
    changeEmail: 'Змінити пошту',
    language: 'Мова',
    changePassword: 'Змінити пароль',
    deleteAccount: 'Видалити акаунт',
    autoPause: 'Авто пауза',
    vibrateOnStart: 'Вібрація при старті',
    timerOnStart: 'Таймер при старті',
    dragHints: 'Підказки зсувів',
    theme: 'Тема',
    defaultScreen: 'Початковий екран',
  },
  message: {
    noChangeEmailGAccount: 'Ви не в змозі змінити пошту при Google акаунті',
    noChangePasswordGAccount: 'Ви не в змозі змінити пароль при Google акаунті',
    logoutConfirm: 'Ви впевнені, що бажаєте вийти?',
    deleteAccountConfirm: 'Ви впевнені, що бажаєте видалити акаунт?',
    updateEmailConfirm: 'Ви бажаєте змінити пошту?',
    updatePasswordConfirm: 'Ви бажаєте змінити пароль?',
    emailUpdated: 'Пошту змінено',
    passwordUpdated: 'Пароль Змінено',
  },
  input: {
    newEmail: 'Нова пошта',
    newPassword: 'Новий пароль',
  },
};

export const savedMode = {
  button: {
    activities: 'Тренування',
    routes: 'Маршрути',
    deleteActivity: 'Видалити',
    deleteRoute: 'Видалити',
  },
  message: {
    deleted: 'Видалено',
    deleteActivityConfirm: 'Ви впевнені, що бажаєте видалити обране тренування?',
    deleteRouteConfirm: 'Ви впевнені, що бажаєте видалити обраний маршрут?',
    routesListEmpty: 'Список маршрутів порожній',
    routesListEnded: 'Досягнуто кінця списку маршрутів',
    activitiesListEmpty: 'Список тренувань порожній',
    activitiesListEnded: 'Досягнуто кінця списку тренувань',
  },
  activityDetail: {
    distance: 'Дистанція',
    km: 'км',
    pace: 'Темп',
    perKM: '/км',
    avgSpeed: 'Сер. швидкість',
    kmPerH: 'км/ч',
    movingTime: 'Час в русі',
    totalTime: 'Загальний час',
  },
};

export const drawMode = {
  message: {
    noInDragMode: 'Спочатку активуйте drag режим. Натисніть відповідну кнопку',
    selectNeededPoint: 'Натисність на коодинату, котру бажаєте зсунути',
    dragPointNow: 'Можете перемістити координату',
    saved: 'Збережено',
  },
  button: {
    saveRoute: 'Зберегти',
  },
};

export const viewMode = {
  message: {
    cityNotFound: 'Обраного міста не знайдено',
    chooseYourLocation: 'Обрати вашу геопозицію',
  },
  input: {
    typeCity: 'Вкажіть місто',
  },
};

export const liveMode = {
  message: {
    saved: 'Збережено',
    finishActivityConfirm: 'Завершити тренування?',
    finishActivityFirst: 'Спочатку завершіть тренування',
  },
  designation: {
    kmPerH: 'км/ч',
    currentSpeed: 'Поточ. швидк.',
    currentPace: 'Поточ. темп',
    avgSpeed: 'Сер. швидкість',
    km: 'км',
    distance: 'Дистанція',
    time: 'Час',
  },
  button: {
    start: 'Почати',
    pause: 'Зупинити',
    continue: 'Продовжити',
  },
};

export const common = {
  message: {
    errorOccurred: 'Виникла помилка',
    errorNetworkFailed: 'Перевірте стан інтернет підключення',
    tryAgain: 'Спробуйте ще раз',
    tryLater: 'Спробуйте пізніше',
  },
  designation: {
    km: 'км',
    perKM: '/км',
    kmPerH: 'км/ч',
    runs: 'пробіжок',
    activities: 'тренувань',
  },
  month: {
    jan: 'січ',
    feb: 'лют',
    mar: 'бер',
    apr: 'кві',
    may: 'тра',
    jun: 'чер',
    jul: 'лип',
    aug: 'сер',
    sep: 'вер',
    oct: 'жов',
    nov: 'лис',
    dec: 'гру',
  },
  picker: {
    yes: 'Так',
    no: 'Ні',
  },
};

export const gps = {
  message: {
    errorGpsTurnedOff: 'Геопозиція не доступна. Вмикність GPS',
    errorGpsProblem: 'Геопозиція не доступна. Перевірте ваші GPS налаштування',
  },
};

export const permissions = {
  message: {
    gpsDenied: 'Дозвіл геолокації не наданий',
    storageDenied: 'Дозвіл зберігання не наданий',
    gpsGranted: 'Дозвіл геолокації наданий',
    gpsAllow: 'Активуйте дозвіл геолокації в налаштуваннях',
    requireLocationTracking: 'Додатку необхідний дозвіл геолокації',
    questionOpenSettings: 'Бажаєте відкрити налаштування?',
    giveGps: 'Надати дозвіл геолокації',
    giveGpsDetailed: 'Додатку необхідний дозвіл для знаходження вашої геопозиції',
  },
  button: {
    yes: 'Так',
    no: 'Ні',
  },
};

export const sign = {
  message: {
    emailAlreadyUsed: 'Дана пошта вже у використанні іншого користувача',
    noCurrentUser: 'Ви не авторизувались',
    userNotFound: 'Користувача не знайдено',
    needAuth: 'Спочатку необхідно авторизуватись',
    needReLogin: 'Спочатку необхідно переавторизуватись',
  },
  input: {
    email: 'Пошта',
    password: 'Пароль',
  },
};

export const signIn = {
  message: {
    authorized: 'Авторизовано',
    welcomeBack: 'З поверенням,',
    signInToContinue: 'авторизуйтесь для продовження',
    or: 'або',
  },
  button: {
    withGoogle: 'Продовжити з Google',
    signIn: 'Авторизуватись',
  },
};

export const signUp = {
  message: {
    welcome: 'Вітаємо,',
    signUpToContinue: 'зареєструйтесь для продовження',
    or: 'або',
  },
  button: {
    withGoogle: 'Продовжити з Google',
    signUp: 'Зареєструватись',
  },
};

export const validation = {
  message: {
    weakPassword: 'Довжина паролю має бути від 6 символів',
    invalidEmail: 'Пошта має поєднувати лише букви (a-z), цифри (0–9) та точки (.)',
    passwordWrong: 'Вкажіть коректний пароль',
    ageWrong: 'Вкажіть коректний вік',
  },
  function: {
    fieldRequired: field => `Поле '${field}' є обов'язковим`,
  },
};

export const editProfile = {
  message: {
    profileSettings: 'Мій профіль',
    profileFillingConfirm: 'Ваш профіль заповнений не повністю.\n Бажаєте заповнити?',
  },
  input: {
    firstName: "Ім'я",
    lastName: 'Призвіще',
    gender: 'Стать',
    weight: 'Вага',
    age: 'Вік',
    height: 'Ріст',
  },
  button: {
    save: 'Зберегти',
  },
  designation: {
    cm: 'см',
    kgs: 'кг',
    male: 'Чоловіча',
    female: 'Жіноча',
  },
};
