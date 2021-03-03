import {LOCALES} from '~/constants/constants';
import * as en from '~/constants/papyrus/en';
import * as uk from '~/constants/papyrus/uk';
import {localesDI} from '~/utils/locales-di';

localesDI.Injectable(LOCALES.EN)(en);
localesDI.Injectable(LOCALES.UK)(uk);
