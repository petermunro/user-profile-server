'use strict';

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _schema = require('./schema');

var _schema2 = _interopRequireDefault(_schema);

var _graphql = require('graphql');

var _expressGraphql = require('express-graphql');

var _expressGraphql2 = _interopRequireDefault(_expressGraphql);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

let app = (0, _express2.default)();
const PORT = 3000;

app.use('/graphql', (0, _expressGraphql2.default)({
  schema: _schema2.default,
  graphiql: true
}));

let server = app.listen(PORT, function () {
  let host = server.address().address;
  let port = server.address().port;

  console.log('GraphQL listening at http://%s:%s', host, port);
});
//# sourceMappingURL=server.js.map