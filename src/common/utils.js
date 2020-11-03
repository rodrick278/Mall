var moment = require('moment');


export function debounce(func, delay=500) {
  let timer = null;
  return function (...args) {
    if (timer) clearTimeout(timer);

    timer = setTimeout(() => {
      func.apply(this, args);
    }, delay);
  };
}

export function throttle(fn, wait) {
  let lastTime = 0
  let timer = null
  let nowTime = new Date().getTime();

  return function (...args) {
    
    if (nowTime - lastTime > wait) {
      fn.apply(this, args)
      lastTime = nowTime
    } else if (timer === null) {
      timer = setTimeout(() => {
        timer = null
        fn.apply(this, args)
      }, wait)
      
    }
  }



}

export function formatDate(date, fmt) {
  return moment.unix(date).format(fmt);
  // if (/(y+)/.test(fmt)) {
  //   fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length));
  // }
  // let o = {
  //   'M+': date.getMonth() + 1,
  //   'd+': date.getDate(),
  //   'h+': date.getHours(),
  //   'm+': date.getMinutes(),
  //   's+': date.getSeconds()
  // };
  // for (let k in o) {
  //   if (new RegExp(`(${k})`).test(fmt)) {
  //     let str = o[k] + '';
  //     fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? str : padLeftZero(str));
  //   }
  // }
  // return fmt;
};

// function padLeftZero(str) {
//   return ('00' + str).substr(str.length);
// };