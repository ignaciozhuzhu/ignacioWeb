//去掉http://
const options = {
  delhttp: function(host) {
    host = host.replace('https://', '');
    host = host.replace('http://', '');
    return host
  }
}

module.exports = options