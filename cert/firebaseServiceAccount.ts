import functions from 'firebase-functions'

export default {
  "type": process.env["TYPE"] || functions.config().project.firebase_type,
  "project_id": process.env["PROJECT_ID"] || functions.config().project.firebase_id,
  "private_key_id": process.env["PRIVATE_KEY_ID"] || functions.config().project.private_key_id,
  "private_key": process.env["PRIVATE_KEY"] || functions.config().project.private_key.replace(/\\n/g, '\n'),
  "client_email": process.env["CLIENT_EMAIL"] || functions.config().project.client_email,
  "client_id": process.env["CLIENT_ID"] || functions.config().project.client_id,
  "auth_uri": process.env["AUTH_URI"] || functions.config().project.auth_uri,
  "token_uri": process.env["TOKEN_URI"] || functions.config().project.token_uri,
  "auth_provider_x509_cert_url": process.env["AUTH_PROVIDER_X509_CERT_URL"] || functions.config().auth_provider_x509_cert_url,
  "client_x509_cert_url": process.env["CLIENT_X509_CERT_URL"] || functions.config().client_x509_cert_url
}