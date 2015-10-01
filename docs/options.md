* **`--help`** (alias `-h`) - Display the usage guide.
* **`--debug`** (alias `-d`) - Return debug info.
* **`--server`** - Server where the QRS is running.
* **`--virtualproxy`** - Name of the virtual proxy.
* **`--auth`** (alias `-d`)
Authentication method, can be either \"certificates\" (c) or \"header\" (h).
Defaults to "certificates".
* **`--port`** (alias `-p`) Port to be used. 
If you want to use the default port, use 0 or leave blank.
In case of using certificates leave either blank or use 4242.
* **`--ssl`** - Whether to use SSL (defaults to false)
If SSL is desired, define --ssl, otherwise omit this option.
* **`--header-key`** - Header key, typically used when using header authentication, in case of using certificates it defaults `X-Qlik-User`
* **`--header-value`** - Header value, typically used when using header authentication, in case of using certificates, it defaults to `UserDirectory=Internal;UserId=sa_repository`
* **`--cert`** - Path to the certificate file, typically `client.pem`
* **`--key`** - Path to the key file, typically `client_key.pem`
* **`--ca`** - Path to the ca file, typically `root.pem`
* **`--passphrase`** - (TBD, not clear if needed at all)
* **`--file`** - Path to the file containing the definition of mime-types, by default the file you can find in this repository under `./config/mime-types.txt` will be taken.