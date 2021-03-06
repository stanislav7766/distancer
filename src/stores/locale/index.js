import {makeAutoObservable, observe} from 'mobx';
import {DEFAULT_LOCALE} from '~/constants/constants';
import {localesDI} from '~/utils/locales-di';
import {storesDI} from '~/utils/store-di';
import {isExist, isObject} from '~/utils/validation/helpers';

const separator = '.';

const execPapyrus = (accum, key) =>
  (val => (isObject(val) ? val : {_result: isExist(val) ? val : ''})).call(null, accum[key]);

export class LocaleStore {
  constructor() {
    makeAutoObservable(this);
    observe(this, this._listenLocale);
  }

  locale = DEFAULT_LOCALE;
  papyrus = localesDI.Inject(DEFAULT_LOCALE);

  setLocale = locale => {
    this.locale = locale;
  };
  papyrusify = path => {
    const papyrusified = path.split(separator).reduce(execPapyrus, this.papyrus);
    return papyrusified._result ?? papyrusified;
  };
  _listenLocale = ({name, newValue}) => {
    if (name !== 'locale') return;
    this.papyrus = localesDI.Inject(newValue);
  };
}

export const useLocale = () => storesDI.Inject('localeStore');
export const getLocaleStore = () => storesDI.Inject('localeStore');
