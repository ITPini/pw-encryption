const crypto = require("crypto");

// Documentation: https://nodejs.org/dist/latest-v10.x/docs/api/crypto.html#crypto_class_cipher
// This should not be used for production, since decryption is a two-way function.
// Encryption ≠ Hashing
// Salted password is composed of "algorithm$salt$password"

const algorithm = "des-ecb"
const secretKey = "D0E276D0144890D3";                   // 16 bytes
const salt = "DYOycGhXqyfO";                            // can be any salted string
const secretPassword = "password";                      // any password

// Encrypts a password using an secret encryption key
function encrypt (password, key, outputEncoding = "hex"){
    key = Buffer.from(key, outputEncoding);
    let saltedPassword = algorithm + "$" + salt + "$" + password;

    const cipher = crypto.createCipheriv(algorithm, key, null);
    let encrypted = cipher.update(saltedPassword, "utf8", outputEncoding);
    encrypted += cipher.final(outputEncoding);
    return encrypted;
}

// Decrypts a password using an given encryption key
// Return false if wrong encryption key
function decrypt (password, key, outputEncoding = "utf8"){
    key = Buffer.from(key, "hex");
    try {
        const decipher = crypto.createDecipheriv(algorithm, key, null);
        let decrypted = decipher.update(password, "hex", outputEncoding);
        decrypted += decipher.final(outputEncoding);
        return decrypted;
    } catch (e) {
        return false;
    }
}

// Compare any two passwords
function isMatch (decryptedPassword, password) {
    try {
        return (decryptedPassword.split("$")[2] === password ? true : false);
    } catch (e) {
        return false;
    }
}

// Use-case
let encrypted = encrypt(secretPassword, secretKey);
let decrypted = decrypt(encrypted, "D0E276D0144890D3"); // Proper key

console.log("Encrypted (hex): " + encrypted);
console.log("Decrypted (utf8): " + decrypted);
console.log(isMatch(decrypted, secretPassword) ? "Is Match: ✔️": "Is Match: ✖️");