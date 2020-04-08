export const toLatin = str => {
  const chars = {
      а: 'a',
      б: 'b',
      в: 'v',
      г: 'g',
      д: 'd',
      е: 'e',
      ё: 'e',
      ж: 'j',
      з: 'z',
      и: 'i',
      к: 'k',
      л: 'l',
      м: 'm',
      н: 'n',
      о: 'o',
      п: 'p',
      р: 'r',
      с: 's',
      т: 't',
      у: 'u',
      ф: 'f',
      х: 'h',
      ц: 'c',
      ч: 'ch',
      ш: 'sh',
      щ: 'shch',
      ы: 'y',
      э: 'e',
      ю: 'u',
      я: 'ya',
      ї: 'yi',
      є: 'ye',
      i: 'i',
      ґ: 'g',
    },
    res = [];

  str = str.replace(/[ъь]+/g, '').replace(/й/g, 'i');

  for (let i = 0; i < str.length; ++i) {
    res.push(
      chars[str[i]] ||
        (chars[str[i].toLowerCase()] === undefined && str[i]) ||
        chars[str[i].toLowerCase()].replace(/^(.)/, match => match.toUpperCase()),
    );
  }

  return res.join('');
};
