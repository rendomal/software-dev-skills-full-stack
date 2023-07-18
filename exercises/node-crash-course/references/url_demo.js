const url = require('url');

const myUrl = new URL('https://mycoolsite.org:8000/hello.html?id=100&status=active');

// Serialized URL
console.log(myUrl.href);
console.log(myUrl.href.toString());

// Host (root)
console.log(myUrl.host);
// Hostname (does not include port like host)
console.log(myUrl.hostname);

// Pathname
console.log(myUrl.pathname);

// Serialized query
console.log(myUrl.search);
// Params object
console.log(myUrl.searchParams);
// Add param
myUrl.searchParams.append('abc', '123');
console.log(myUrl.searchParams);
// Loop params
myUrl.searchParams.forEach((value, name) => console.log(`${name}: ${value}`));