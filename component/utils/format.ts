import { is } from 'date-fns/locale';
import dayjs from 'dayjs';
import _ from 'lodash';

export const falseOrZero = (target: unknown, callBack?: any, replice?: string) => {
  const result = target === 0 || target ? target : replice || '--';
  return callBack ? callBack(result) : result;
};

type bytesTypes = (
  bytes: unknown,
  placeholder?: string,
  sizeType?: 'B' | 'KB' | 'MB' | 'GB' | 'TB' | 'PB' | 'EB' | 'ZB' | 'YB' | 'b' | 'kb' | 'mb' | 'gb' | 'tb' | 'pb' | 'eb' | 'zb' | 'yb',
) => string | number;

export const bytesToSize: bytesTypes = (bytes, placeholder = '', size = 'B') => {
  const targetBytes = Number(bytes);
  if (isNaN(targetBytes)) return '--';
  if (targetBytes === 0) return '0' + placeholder + size;
  if (targetBytes < 1) return _.round(targetBytes, 2) + placeholder + size;
  let k = 1024; // or 1024
  let sizes = ['B', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
  sizes = sizes.slice(sizes.indexOf(size.toUpperCase()));
  let i = Math.floor(Math.log(targetBytes) / Math.log(k));

  return _.round(targetBytes / Math.pow(k, i), 2) + placeholder + sizes[i];
};

type numTypes = (bytes: unknown, placeholder?: string) => string | number;

export const numToSize: numTypes = (bytes, placeholder = '') => {
  const targetBytes = Number(bytes);
  if ((bytes !== 0 && isNaN(targetBytes)) || targetBytes === 0) return '--';
  if (targetBytes < 1) return _.round(targetBytes, 2);
  if (targetBytes === 0) return '0' + placeholder + '';
  let k = 1000; // or 1024
  let sizes = ['', 'K', 'M', 'G'];
  let i = Math.floor(Math.log(targetBytes) / Math.log(k));
  return _.round(targetBytes / Math.pow(k, i), 2) + placeholder + sizes[i];
};

interface configType {
  target: unknown;
  type?: 'date' | 'default' | 'byte' | 'num';
  placeholder?: string;
  size?: 'B' | 'KB' | 'MB' | 'GB' | 'TB' | 'PB' | 'EB' | 'ZB' | 'YB' | 'b' | 'kb' | 'mb' | 'gb' | 'tb' | 'pb' | 'eb' | 'zb' | 'yb';
}
type formatTypes = (config: configType) => string | number;
export const format: formatTypes = (config) => {
  const { type = 'default', target, placeholder = '', size = 'B' } = config;
  switch (type) {
    case 'num':
      return numToSize(target, placeholder);
    case 'byte':
      return bytesToSize(target, placeholder, size);
    case 'date':
      return target ? dayjs(target as number).format(placeholder || 'YYYY-MM-DD HH:mm:ss') : '--';
    case 'default':
      return falseOrZero(target);
  }
};
