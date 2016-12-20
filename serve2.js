var createServer = require('auto-sni');
var restify      = require('restify');

// Override the https module in AutoSNI with restify.
createServer.https = restify;

var server = createServer({
  email: 'info@optires.se', // Emailed when certificates expire.
  agreeTos: true, // Required for letsencrypt.
  restify: true,
  debug: true, // Add console messages and uses staging LetsEncrypt server. (Disable in production)
  domains: ["www.optires.se"], // List of accepted domain names. (You can use nested arrays to register bundles with LE).
  forceSSL: true, // Make this false to disable auto http->https redirects (default true).
  redirectCode: 301, // If forceSSL is true, decide if redirect should be 301 (permanent) or 302 (temporary). Defaults to 302
  ports: {
  http: 80, // Optionally override the default http port.
  https: 443 // // Optionally override the default https port.
}
});

// Server is a "https.createServer" instance.
server.once("listening", function() {
  console.log("We are ready to go.");
});


server.get("/test", function (err, req, res, obj) {
  assert.ifError(err);
  console.log('Server returned: %j', obj);
  req.send('Florp!');
});
