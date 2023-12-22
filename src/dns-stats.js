const { NotImplementedError } = require('../extensions/index.js');

/**
 * Given an array of domains, return the object with the appearances of the DNS.
 *
 * @param {Array} domains
 * @return {Object}
 *
 * @example
 * domains = [
 *  'code.yandex.ru',
 *  'music.yandex.ru',
 *  'yandex.ru'
 * ]
 *
 * The result should be the following:
 * {
 *   '.ru': 3,
 *   '.ru.yandex': 3,
 *   '.ru.yandex.code': 1,
 *   '.ru.yandex.music': 1,
 * }
 *
 */
function getDNSStats(domains) {
  const dnsStats = {};
  
  for (const domain of domains) {
    const parts = domain.split('.').reverse();
    let currentDomain = '';
    
    for (const part of parts) {
      currentDomain = `${currentDomain}.${part}`;
    
      dnsStats[currentDomain] = (dnsStats[currentDomain] || 0) + 1;
    }
  }
  
  const result = {};
  
  for (const domain in dnsStats) {
    const count = dnsStats[domain];
    const formattedDomain = "." + domain.replace(/^\./, '');;
    result[formattedDomain] = count;
  }
  
  return result;
}

module.exports = {
  getDNSStats
};
