'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) {
  return typeof obj;
} : function (obj) {
  return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
};

var _slicedToArray = function () {
  function sliceIterator(arr, i) {
    var _arr = [];var _n = true;var _d = false;var _e = undefined;try {
      for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {
        _arr.push(_s.value);if (i && _arr.length === i) break;
      }
    } catch (err) {
      _d = true;_e = err;
    } finally {
      try {
        if (!_n && _i["return"]) _i["return"]();
      } finally {
        if (_d) throw _e;
      }
    }return _arr;
  }return function (arr, i) {
    if (Array.isArray(arr)) {
      return arr;
    } else if (Symbol.iterator in Object(arr)) {
      return sliceIterator(arr, i);
    } else {
      throw new TypeError("Invalid attempt to destructure non-iterable instance");
    }
  };
}();

var getURLSearchParams = function getURLSearchParams(url) {
  return url.split('?')[1].split('&').reduce(function (map, params) {
    var _params$split = params.split('='),
        _params$split2 = _slicedToArray(_params$split, 2),
        key = _params$split2[0],
        value = _params$split2[1];

    map[key] = value;
    return map;
  }, {});
};

var hasSameShape = function hasSameShape(objectOne, objectTwo) {
  if (Object.keys(objectOne).length !== Object.keys(objectTwo).length) {
    return false;
  }

  for (var key in objectOne) {
    if (!key in objectTwo) {
      return false;
    }

    if (_typeof(objectOne[key]) !== _typeof(objectTwo[key])) {
      return false;
    }

    if (Object.prototype.toString.call(objectOne[key]) === '[object Object]') {
      return hasSameShape(objectOne[key], objectTwo[key]);
    }
  }

  return true;
};

describe('searchYouTube', function () {
  var requests, xhr;

  // Sinon temporarily hijacks all outgoing AJAX requests with `useFakeXMLHttpRequest`
  // letting us synchronously inspect any request made by `searchYouTube`

  beforeEach(function () {
    requests = [];
    xhr = sinon.useFakeXMLHttpRequest();
    xhr.onCreate = function (req) {
      requests.push(req);
    };
  });

  afterEach(function () {
    if (xhr.restore) {
      xhr.restore();
    }
  });

  it('should send a GET request', function () {
    searchYouTube({}, function () {});

    expect(requests[0].method).to.equal('GET');
  });

  it('should accept `key`, `query`, and `max` options and send them in GET request', function () {
    searchYouTube({ key: 'API_KEY', query: 'cats', max: 10 }, function () {});

    var params = getURLSearchParams(requests[0].url);
    expect(params.key).to.equal('API_KEY');
    expect(params.q).to.equal('cats');
    expect(params.maxResults).to.equal('10');
  });

  // Same shape means that the data should have the same keys, nested the same way as `exampleVideoData`,
  // though it will not necessarily have the same values.
  it('should GET videos with the same shape as `exampleVideoData`', function (done) {
    var options = {
      key: window.YOUTUBE_API_KEY,
      query: 'react',
      max: 5
    };

    // We want this test to make a real AJAX request
    xhr.restore();

    searchYouTube(options, function (data) {
      expect(hasSameShape(data, window.exampleVideoData)).to.be.true;
      done();
    });
  });
});