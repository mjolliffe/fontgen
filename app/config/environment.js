var localEnvVars = {
  TITLE:      "FontGen",
  SAFE_TITLE: 'fontgen'
};

var secret = "secretsonsecrets";

// Merge all environmental variables into one object.
module.exports = {
  localEnvVars: localEnvVars,
  secret: secret
}
