export const menuMode = {
  button: {
    viewProfile: 'View Profile',
    logout: 'Logout',
    signIn: 'Sign in',
    signUp: 'Sign up',
    verify: 'Verify',
    change: 'Change',
  },
  picker: {
    language: 'English',
    sec: 'sec',
  },
  title: {
    accountSettings: 'Account settings',
    activitySettings: 'Activity settings',
    routeSettings: 'Route settings',
    appSettings: 'App settings',
  },
  preference: {
    changeEmail: 'Change Email',
    language: 'Language',
    changePassword: 'Change Password',
    deleteAccount: 'Delete Account',
    autoPause: 'Auto pause',
    vibrateOnStart: 'Vibrate on start',
    timerOnStart: 'Timer on start',
    dragHints: "Drag's hints",
    theme: 'Theme',
    defaultScreen: 'Default screen',
  },
  message: {
    noChangeEmailGAccount: 'Sorry, you can not change email with Google account',
    noChangePasswordGAccount: 'Sorry, you can not change password with Google account',
    logoutConfirm: 'Are you sure you want to logout?',
    deleteAccountConfirm: 'Are you sure you want to delete your account?',
    updateEmailConfirm: 'Type new email',
    verifyPassword: 'Need verify password',
    updatePasswordConfirm: 'Type new password',
    emailUpdated: 'Email updated',
    passwordUpdated: 'Password updated',
  },
  input: {
    newEmail: 'New Email',
    newPassword: 'New Password',
    currentPassword: 'Current Password',
  },
};

export const drawMode = {
  message: {
    noInDragMode: 'Drag mode not active. Press drag button',
    selectNeededPoint: "Press on point that you'll drag",
    dragPointNow: 'Drag selected point now',
    saved: 'Saved',
  },
  button: {
    saveRoute: 'Save Route',
  },
};

export const liveMode = {
  message: {
    saved: 'Saved',
    finishActivityConfirm: 'Are you sure you want to finish this activity?',
    finishActivityFirst: 'Please finish activity',
  },
  designation: {
    kmPerH: 'km/h',
    currentSpeed: 'Current speed',
    currentPace: 'Current pace',
    avgSpeed: 'Avg. speed',
    km: 'km',
    distance: 'Distance',
    time: 'Time',
  },
  button: {
    start: "Let's go",
    pause: 'Pause',
    continue: 'Continue',
  },
};

export const viewMode = {
  message: {
    cityNotFound: 'City Not Found',
    chooseYourLocation: 'Choose your location',
  },
  input: {
    typeCity: 'Type city',
  },
};

export const savedMode = {
  button: {
    activities: 'Activities',
    routes: 'Routes',
    deleteActivity: 'Delete Activity',
    deleteRoute: 'Delete Route',
  },
  message: {
    deleted: 'Deleted',
    deleteActivityConfirm: 'Are you sure you want to delete this activity?',
    deleteRouteConfirm: 'Are you sure you want to delete this route?',
    routesListEmpty: 'Routes list is empty',
    routesListEnded: 'Routes list is ended',
    activitiesListEmpty: 'Activities list is ended',
    activitiesListEnded: 'Activities list is empty',
  },
  activityDetail: {
    distance: 'Distance',
    km: 'km',
    pace: 'Pace',
    perKM: '/km',
    avgSpeed: 'Avg. speed',
    kmPerH: 'km/h',
    movingTime: 'Moving time',
    totalTime: 'Total time',
  },
};

export const common = {
  message: {
    errorOccurred: 'An error occurred',
    errorNetworkFailed: 'Network request failed',
    tryAgain: 'Try again',
    tryLater: 'Ty later',
  },
  designation: {
    km: 'km',
    perKM: '/km',
    kmPerH: 'km/h',
    runs: 'runs',
    activities: 'activities',
  },
  month: {
    jan: 'jan',
    feb: 'feb',
    mar: 'mar',
    apr: 'apr',
    may: 'may',
    jun: 'jun',
    jul: 'jul',
    aug: 'aug',
    sep: 'sep',
    oct: 'oct',
    nov: 'nov',
    dec: 'dec',
  },
  picker: {
    yes: 'Yes',
    no: 'No',
  },
};

export const gps = {
  message: {
    errorGpsTurnedOff: 'No location provider available. Turn on GPS',
    errorGpsProblem: 'No location provider available. Check your GPS settings',
  },
};

export const permissions = {
  message: {
    gpsDenied: 'Location permissions denied',
    storageDenied: 'Storage permissions denied',
    gpsGranted: 'Location permissions granted',
    gpsAllow: 'Allow permissions in settings',
    requireLocationTracking: 'App requires location tracking permission',
    questionOpenSettings: 'Would you like to open app settings?',
    giveGps: 'Give Location Permission',
    giveGpsDetailed: 'App needs location permission to find your position',
  },
  button: {
    yes: 'Yes',
    no: 'No',
  },
};

export const sign = {
  message: {
    emailAlreadyUsed: 'The email address is already in use by another account',
    noCurrentUser: 'You are not signed',
    userNotFound: 'User not found',
    needAuth: 'Log in first',
    needReLogin: 'Please re-log in first',
  },
  input: {
    email: 'Email',
    password: 'Password',
  },
};

export const signIn = {
  message: {
    authorized: 'Authorized',
    welcomeBack: 'Welcome back,',
    signInToContinue: 'sign in to continue',
    or: 'or',
  },
  button: {
    withGoogle: 'Continue with Google',
    signIn: 'Sign in',
  },
};

export const signUp = {
  message: {
    welcome: 'Welcome,',
    signUpToContinue: 'sign up to continue',
    or: 'or',
  },
  button: {
    withGoogle: 'Continue with Google',
    signUp: 'Sign up',
  },
};

export const editProfile = {
  message: {
    profileSettings: 'Profile settings',
    profileFillingConfirm: 'Your profile is not fully completed.\n Do you want to fill it up?',
  },
  input: {
    firstName: 'First Name',
    lastName: 'Last Name',
    gender: 'Gender',
    weight: 'Weight',
    age: 'Age',
    height: 'Height',
  },
  button: {
    save: 'Save',
  },
  designation: {
    cm: 'cm',
    kgs: 'kgs',
    male: 'Male',
    female: 'Female',
  },
};

export const validation = {
  message: {
    weakPassword: 'Password should be at least 6 characters',
    invalidEmail: 'The email can include latin letters (a-z), numbers (0-9) and period (.)',
    passwordWrong: 'Type the correct password',
    ageWrong: 'Type the correct age',
  },
  function: {
    fieldRequired: field => `The '${field}' is required`,
  },
};
