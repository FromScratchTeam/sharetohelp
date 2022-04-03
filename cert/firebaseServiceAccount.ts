import functions from 'firebase-functions'

export default {
  "type": functions.config().project.firebase_type,
  "project_id": functions.config().project.firebase_id,
  "private_key_id": functions.config().project.private_key_id,
  "private_key": functions.config().project.private_key.replace(/\\n/g, '\n'),
  "client_email": functions.config().project.client_email,
  "client_id": functions.config().project.client_id,
  "auth_uri": functions.config().project.auth_uri,
  "token_uri": functions.config().project.token_uri,
  "auth_provider_x509_cert_url": functions.config().auth_provider_x509_cert_url,
  "client_x509_cert_url": functions.config().client_x509_cert_url
}
