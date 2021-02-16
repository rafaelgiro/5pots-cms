/**
 * From:
 * https://github.com/zachgoll/express-jwt-authentication-starter
 */
import crypto from "crypto";
import fs from "fs";

function genKeyPair() {
  // Generates an object where the keys are stored in properties `privateKey` and `publicKey`
  const keyPair = crypto.generateKeyPairSync("rsa", {
    modulusLength: 4096, // bits - standard for RSA keys
    publicKeyEncoding: {
      type: "pkcs1", // "Public Key Cryptography Standards 1"
      format: "pem", // Most common formatting choice
    },
    privateKeyEncoding: {
      type: "pkcs1", // "Public Key Cryptography Standards 1"
      format: "pem", // Most common formatting choice
    },
  });

  // Create the public key file
  fs.writeFileSync(
    __dirname + "/../config/keys/id_rsa_pub.pem",
    keyPair.publicKey
  );

  // Create the private key file
  fs.writeFileSync(
    __dirname + "/../config/keys/id_rsa_priv.pem",
    keyPair.privateKey
  );
}

// Generate the keypair
genKeyPair();
