// eslint-disable-next-line sonarjs/cognitive-complexity
export default function verifyMatchWithTaxcode(name: string, surname: string, fiscalCode?: string) {
  if (name) {
    const fiscalCodeName = fiscalCode?.substring(3, 6).toLocaleUpperCase();
    const consonantsName = name
      .match(/[^aeiou]/gi)
      ?.join('')
      .replace(/\s/g, '')
      .toLocaleUpperCase();
    if (consonantsName?.length === 3 && fiscalCodeName === consonantsName) {
      return false;
    } else if (consonantsName && consonantsName?.length > 3) {
      const threeNameLetters = consonantsName?.slice(0, 1) + consonantsName?.slice(2, 4);
      if (fiscalCodeName === threeNameLetters) {
        return false;
      }
    } else if (consonantsName && consonantsName?.length < 3) {
      const firstVocalFound = name
        .match(/[aeiou]/gi)
        ?.join('')
        .substring(0, 1)
        .toLocaleUpperCase();
      if (firstVocalFound) {
        const threeNameLetters = consonantsName?.concat(firstVocalFound);
        if (fiscalCodeName === threeNameLetters) {
          return false;
        }
      }
    } else {
      return true;
    }
  } else {
    const fiscalCodeSurname = fiscalCode?.substring(0, 3).toLocaleUpperCase();
    const consonantsSurname = surname
      .match(/[^aeiou]/gi)
      ?.join('')
      .replace(/\s/g, '')
      .toLocaleUpperCase();
    if (consonantsSurname && consonantsSurname?.length >= 3) {
      const threeSurnameLetters = consonantsSurname?.substring(0, 3);
      return !(fiscalCodeSurname === threeSurnameLetters);
    } else {
      const firstVocalFound = surname
        .match(/[aeiou]/gi)
        ?.join('')
        .substring(0, 1)
        .toLocaleUpperCase();
      if (firstVocalFound) {
        const threeSurnameLetters = consonantsSurname?.concat(firstVocalFound);
        return !(fiscalCodeSurname === threeSurnameLetters);
      }
    }
  }
  return fiscalCode;
}
