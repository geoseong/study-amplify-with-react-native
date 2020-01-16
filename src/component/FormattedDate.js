import { Text, View } from 'react-native';

import React from 'react';
import styles from '../style';

const digitFiller = digit => {
  const nDigit = Number(digit);
  return nDigit < 10 ? `0${nDigit}` : nDigit;
};
const FormattedDate = ({ date, format }) => {
  const transformedDt = isNaN(date) ? date : Number(date)
  const dt = new Date(transformedDt);
  const _year = dt.getFullYear();
  const _month = dt.getMonth() + 1;
  const _date = dt.getDate();
  const _day = dt.getDay();
  const _hour = dt.getHours();
  const _minute = dt.getMinutes();
  const _second = dt.getSeconds();
  if (format === 'yyyymmdd') {
    return (
      // <View style={styles.contentBetweenAlignCenter}>
      <>
        <Text>
          {_year}.{digitFiller(_month)}.{digitFiller(_date)}
        </Text>
      </>
    );
  } else {
    // format === 'yyyymmdd hhmmss'
    return (
      <>
        <Text>
          {_year}.{digitFiller(_month)}.{digitFiller(_date)}{' '}
          {digitFiller(_hour)}:{digitFiller(_minute)}:{digitFiller(_second)}
        </Text>
      </>
    );
  }
};
export { FormattedDate };
