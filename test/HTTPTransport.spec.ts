import { assert, expect } from 'chai';
import sinon from 'sinon';
import { HTTPTransport } from '../src/common/HTTPTransport';

describe('HTTPTransport', () => {
  let xhr: any;
  let requests: any[];

  beforeEach(() => {
    xhr = sinon.useFakeXMLHttpRequest();
    requests = [];
    xhr.onCreate = (xhr1: any) => {
      requests.push(xhr1);
    };
  });

  afterEach(() => {
    xhr.restore();
  });

  describe('delete()', () => {
    it('should set xhr timeout', () => {
      const transport = new HTTPTransport();

      transport.delete('http://example.com');

      expect(requests.length).to.equal(1);
      expect(requests[0].timeout).to.equal(5000);

      transport.delete('http://example.com', { timeout: 100500 });

      expect(requests.length).to.equal(2);
      expect(requests[1].timeout).to.equal(100500);
    });

    it('should set xhr withCredentials', () => {
      const transport = new HTTPTransport();

      transport.delete('http://example.com');

      expect(requests.length).to.equal(1);
      expect(requests[0].withCredentials).to.be.true;
    });

    it('should set xhr url', () => {
      const transport = new HTTPTransport();

      transport.delete('http://example.com');

      expect(requests.length).to.equal(1);
      expect(requests[0].url).to.equal('http://example.com');
    });

    it('should send request with type DELETE', () => {
      const transport = new HTTPTransport();

      transport.delete('http://example.com');

      expect(requests.length).to.equal(1);
      expect(requests[0].method).to.equal('DELETE');
    });

    it('should send provided data', () => {
      const transport = new HTTPTransport();

      transport.delete('http://example.com', { data: 'test' });

      expect(requests.length).to.equal(1);
      expect(requests[0].requestBody).to.equal('test');
    });

    it('should send provided headers', () => {
      const headers = {
        'Content-Type': 'text/plain;charset=utf-8',
        foo: 'bar',
        baz: 'test',
      };
      const transport = new HTTPTransport();

      transport.delete('http://example.com', { headers });

      expect(requests.length).to.equal(1);
      expect(requests[0].requestHeaders).to.deep.equal(headers);
    });

    it('should return promise', () => {
      const transport = new HTTPTransport();

      const result = transport.delete('http://example.com', { data: 'test' });

      expect(result).to.be.instanceOf(Promise);
    });

    it('should resolve with xhr instance', (done) => {
      const transport = new HTTPTransport();

      const result = transport.delete('http://example.com', { data: 'test' });

      result.then((response) => {
        expect(response).to.be.instanceOf(XMLHttpRequest);
        done();
      });

      requests[0].respond(200, { 'Content-Type': 'text/html' }, 'OK');
    });

    it('should reject if request is failed', (done) => {
      const transport = new HTTPTransport();

      const result = transport.delete('http://example.com', { data: 'test' });

      result.then(() => {
        assert.fail('Request should fail');
      }).catch(() => {
        done();
      });

      requests[0].error();
    });
  });

  describe('post()', () => {
    it('should send correct request', () => {
      const headers = {
        'Content-Type': 'text/plain;charset=utf-8',
        foo: 'bar',
        baz: 'test',
      };

      const transport = new HTTPTransport();

      transport.post('http://example.com', { data: 'test', headers });

      expect(requests.length).to.equal(1);
      expect(requests[0].withCredentials).to.be.true;
      expect(requests[0].method).to.equal('POST');
      expect(requests[0].url).to.equal('http://example.com');
      expect(requests[0].requestBody).to.equal('test');
      expect(requests[0].requestHeaders).to.deep.equal(headers);
    });

    it('should resolve with xhr instance', (done) => {
      const transport = new HTTPTransport();

      const result = transport.post('http://example.com', { data: 'test' });

      expect(result).to.be.instanceOf(Promise);
      result.then((response) => {
        expect(response).to.be.instanceOf(XMLHttpRequest);
        expect(response.status).to.equal(200);
        expect(response.responseText).to.equal('OK');
        done();
      });

      requests[0].respond(200, { 'Content-Type': 'text/html' }, 'OK');
    });
  });

  describe('put()', () => {
    it('should send correct request', () => {
      const headers = {
        'Content-Type': 'text/plain;charset=utf-8',
        foo: 'bar',
        baz: 'test',
      };

      const transport = new HTTPTransport();

      transport.put('http://example.com', { data: 'test', headers });

      expect(requests.length).to.equal(1);
      expect(requests[0].withCredentials).to.be.true;
      expect(requests[0].method).to.equal('PUT');
      expect(requests[0].url).to.equal('http://example.com');
      expect(requests[0].requestBody).to.equal('test');
      expect(requests[0].requestHeaders).to.deep.equal(headers);
    });

    it('should resolve with xhr instance', (done) => {
      const transport = new HTTPTransport();

      const result = transport.put('http://example.com', { data: 'test' });

      expect(result).to.be.instanceOf(Promise);
      result.then((response) => {
        expect(response).to.be.instanceOf(XMLHttpRequest);
        expect(response.status).to.equal(200);
        expect(response.responseText).to.equal('OK');
        done();
      });

      requests[0].respond(200, { 'Content-Type': 'text/html' }, 'OK');
    });
  });

  describe('get()', () => {
    it('should send correct request', () => {
      const headers = {
        'Content-Type': 'text/plain;charset=utf-8',
        foo: 'bar',
        baz: 'test',
      };

      const transport = new HTTPTransport();

      transport.get('http://example.com', { headers });
      expect(requests.length).to.equal(1);
      expect(requests[0].withCredentials).to.be.true;
      expect(requests[0].method).to.equal('GET');
      expect(requests[0].url).to.equal('http://example.com');
      expect(requests[0].requestBody).to.equal(undefined);
      expect(requests[0].requestHeaders).to.deep.equal(headers);
    });

    it('should send correct querystring', () => {
      const headers = {
        'Content-Type': 'text/plain;charset=utf-8',
        foo: 'bar',
        baz: 'test',
      };

      const data = {
        foo: 'bar',
        baz: 1,
      };

      const transport = new HTTPTransport();

      transport.get('http://example.com', { data, headers });
      expect(requests.length).to.equal(1);
      expect(requests[0].url).to.equal('http://example.com?foo=bar&baz=1');
      expect(requests[0].requestBody).to.equal(undefined);
    });

    it('should resolve with xhr instance', (done) => {
      const transport = new HTTPTransport();

      const result = transport.get('http://example.com');

      expect(result).to.be.instanceOf(Promise);
      result.then((response) => {
        expect(response).to.be.instanceOf(XMLHttpRequest);
        expect(response.status).to.equal(200);
        expect(response.responseText).to.equal('OK');
        done();
      });

      requests[0].respond(200, { 'Content-Type': 'text/html' }, 'OK');
    });
  });
});
