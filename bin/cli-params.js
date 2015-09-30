module.exports = [
	{
		"name": "help",
		"alias": "h",
		"type": Boolean,
		"description": "Display the usage guide."
	},
	{
		"name": "debug",
		"alias": "d",
		"group": "debug",
		"type": Boolean,
		"defaultValue": false,
		"description": "Return debug info."
	},
	{
		"name": "auth",
		"alias": "a",
		"type": String,
		"group": "main",
		"defaultValue": "certificates",
		"description": "Authentication method, can be either \"certificates\" (c) or \"header\" (h)."
	},
	{
		"name": "ssl",
		"alias": "s",
		"type": Boolean,
		"defaultValue": false,
		"group": "main",
		"description": "Whether to use SSL (defaults to true)"
	},
	{
		"name": "server",
		"type": String,
		"group": "main",
		"description": "Server where the QRS is running."
	},
	{
		"name": "virtual-proxy",
		"type": String,
		"group": "main",
		"description": "Name of the virtual proxy."
	},
	{
		"name": "header-key",
		"type": String,
		"group": "header",
		"description": "Header key to be used for header authentication (Header authentication header name)."
	},
	{
		"name": "header-value",
		"type": String,
		"group": "header",
		"description": "Header value to be used for header authentication."
	},
	{
		"name": "file",
		"type": String,
		"group": "main",
		"description": "File containing the mime-type definitions to add."
	},
	{
		"name": "cert",
		"type": String,
		"group": "certificates",
		"description": "Certificate file containing the certificate (client.pem)."
	},
	{
		"name": "key",
		"type": String,
		"group": "certificates",
		"description": "Certificate file containing the key (client_key.pem)."
	},
	{
		"name": "ca",
		"type": String,
		"group": "certificates",
		"description": "Certificate file containing the ca (root.pem)."
	}

];
