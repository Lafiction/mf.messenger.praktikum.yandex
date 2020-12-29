const METHODS = {
  GET: 'GET',
  PUT: 'PUT',
  POST: 'POST',
  DELETE: 'DELETE'
};

function queryStringify(data: Record<string, any>) {
  if (typeof data !== 'object') {
		throw new Error('Data must be object');
	}
  const keys = Object.keys(data);
  return keys.reduce((result, key, index) => {
    return `${result}${key}=${data[key]}${index < keys.length - 1 ? '&' : ''}`;
  }, '?');
}

export class HTTPTransport {
  get(url: any, options: Record<string, any> = {}) {
    return this.request(url, { ...options, method: METHODS.GET }, options.timeout);
  };

  post(url: any, options: Record<string, any> = {}) {
    return this.request(url, { ...options, method: METHODS.POST }, options.timeout);
  };

  put(url: any, options: Record<string, any> = {}) {
    return this.request(url, { ...options, method: METHODS.PUT }, options.timeout);
  };

  delete(url: any, options: Record<string, any> = {}) {
    return this.request(url, { ...options, method: METHODS.DELETE }, options.timeout);
  };

  request(url: any, options: Record<string, any>, timeout = 5000): Promise<XMLHttpRequest> {
    const { method, data = {}, headers } = options;

    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.timeout = timeout;

      let fullUrl = url;
      if (method === METHODS.GET && Object.keys(data).length !== 0) {
        fullUrl = fullUrl + queryStringify(data);
      }
      
      xhr.open(method, fullUrl, true);

      xhr.onload = function () {
        resolve(xhr);
      };

      xhr.onabort = reject;
      xhr.onerror = reject;
      xhr.ontimeout = reject;

      if (headers) {
        Object.keys(headers)
          .forEach(function (key) {
            xhr.setRequestHeader(key, headers[key]);
          });
      }

      if (method === METHODS.GET) {
        xhr.send();
      } else {
        xhr.send(data);
      }
    });
  };
}
