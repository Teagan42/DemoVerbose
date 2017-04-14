var HttpError = require('http-errors');
var express = require('express');
var bodyParser = require('body-parser')
var app = express();

var jsonParser = bodyParser.urlencoded();

app.use(jsonParser);
/**
 * @api {post} /api/:id Create User information
 * @apiName PostUser
 * @apiGroup User
 *
 * @apiParam {Number} id Users unique ID.
 *
 */
app.post('/api/', function(req, res, next) {
  var body = req.body;
  console.log(body);
  if (!body.id || !/\d+/.test(body.id)) {
    return next(new HttpError.BadRequest("Invalid id"));
  }
  if (!body.name) {
    return next(new HttpError.BadRequest("Invalid name"));
  }

  return res.send();
});


/**
 * @api {get} /api/:id Get User information
 * @apiName GetUser
 * @apiGroup User
 *
 * @apiParam {Number} id Users unique ID.
 *
 */
app.get('/api/:id', function(req, res, next) {
  var params = req.params;
  console.log(params);
  if (!params.id || !/\d+/.test(params.id)) {
    return next(new HttpError.BadRequest("Invalid id"));
  }

  return res.send({
      name: "Joe Schmoe",
      id: params.id
  });
});


/**
 * @api {put} /api/:id Update User information
 * @apiName PutUser
 * @apiGroup User
 *
 * @apiParam {Number} id Users unique ID.
 * @apiParam {String} name Users name
 *
 */
app.put('/api/:id', function(req, res, next) {
  var body = req.body;
  var params = req.params;
  console.log(body);
  console.log(params);
  if (!params.id || !/\d+/.test(params.id)) {
    return next(new HttpError.BadRequest("Invalid id"));
  }
  if (!body.name) {
    return next(new HttpError.BadRequest("Invalid name"));
  }

  return res.send({});
});

app.use(function (err, req, res, next) {
   if (err.statusCode) {
     res = res.status(err.status);
   }

   return res.send(err.message);
});

app.listen(8080);
