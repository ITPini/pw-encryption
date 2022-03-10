# Password Encryption

Documentation: https://nodejs.org/dist/latest-v10.x/docs/api/crypto.html#crypto_class_cipher.  
This should not be used for production, since decryption is a two-way function.  
Encryption ≠ Hashing.  
Salted password is composed of "algorithm$salt$password".
