const crypto = require("crypto");

const algorithm = "aes-256-ecb"
const secretKey = "D0E276D0144890D3BDA30EGDH1578F81";   // 32 bytes
const salt = "DYOycGhXqyfO";                            // can be any salted string
const secretPassword = "password";                      // any password

// Encrypts a password using an secret encryption key
function encrypt (password, key, outputEncoding = "base64") {
    const salted = algorithm + "$" + salt + "$" + password;

    const cipher = crypto.createCipheriv(algorithm, key, null);
    return Buffer.concat([cipher.update(salted), cipher.final()]).toString(outputEncoding);
}

// Decrypts a password using an given encryption key
// Return false if wrong encryption key
function decrypt (password, key, outputEncoding = "utf8") {
    const buffer = Buffer.from(password, "base64")
    try{
        const cipher = crypto.createDecipheriv(algorithm, key, null);
        return Buffer.concat([cipher.update(buffer), cipher.final()]).toString(outputEncoding);
    } catch(e){
        return false;
    }
}

// Compare any two passwords
function isMatch (decryptedPassword, password) {
    try{
        return (decryptedPassword.split('$')[2] === password ? true : false);
    } catch(e){
        return false;
    }
}

// Use-case
let encrypted = encrypt(secretPassword, secretKey);
let decrypted = decrypt(encrypted, "D0E276D0144890D3BDA30EGDH1578F81"); // Proper key

console.log("Encrypted (base64):", encrypted);
console.log("Decrypted (utf8):", decrypted);
console.log(isMatch(decrypted, secretPassword) ? "Is Match: ✔️": "Is Match: ✖️");
