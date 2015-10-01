# qrs-mime

> Add mime types to the Qlik Sense repository.

## About

qrs-mime is a node.js based command line tool allowing you to add mime-type definitions to Qlik Sense server.

Why is this important?
l

## Usage

After installation of _qrs-mime_ using [npm](https://npmjs.com) open the [node.js](https://nodejs.org) command line and run _qrs-mime_ using one of the following options:

* 
**Run the tool directly on Qlik Sense server**

* 
**Run the tool on a different machine**

If this is the case, you need to set up proper authentication between your machine and the server where the Qlik Sense Repository Services (QRS) is running on.

### Running qrs-mime directly on Qlik Sense server

(TBD & tested)

### Running qrs-mime on a different machine / using header authentication

If you have properly set up header authentication for QRS, you should then have the following information to run qrs-mime:

* Fully qualified name or IP-address of your server (e.g. `myserver.mydomain.com`)
* Name of the virtual proxy (e.g. `hdr`)
* Whether to use SSL or not
* The header key and (e.g. `hdr-usr`)
* The header value (e.g. `mydomain.com\myUserName`)
* The user define in your header-value should have rootAdmin permissions on QRS

Then run the following command:

```bash
qrs-mime 
    --auth=header 
    --server=myserver.mydomian.com 
    --virtualproxy=hdr 
    --ssl 
    --header-key=hdr-usr 
    --header-value=mydomain.com\myUserName
```

_(Remove line breaks which were just added to improve readablity)_

Some references helping you to set up header authentication:

* [Qlik Sense Help: Virtual Proxy](http://help.qlik.com/sense/2.1/en-US/online/Subsystems/ManagementConsole/Content/create-virtual-proxy.htm)

### Running _qrs-mime_ on a different machine / using certificates

If you have exported the certificates and copied to your system, you should then have the following information available to run `qrs-mime`:

* Fully qualified name or IP-address of your server (e.g. `myserver.mydomain.com`)
* Name of the virtual proxy (if needed, leave blank if you are unsure)
* Whether to use ssl (define it, if you are unsure)
* Location of the certificate file (e.g. `C:\CertStore\client.pem`)
* Location of the key file (e.g. `C:\CertStore\client_key.pem`)
* Location of the ca file (e.g. `C:\CertStore\root.pem`)

```bash
qrs-mime
    --auth=certificates
    --server=myserver.mydomain.com
    --virtualproxy=
    --ssl
    --cert="C:\CertStore\client.pem"
    --key="C:\CertStore\client_key.pem"
    --ca="C:\CertStore\root.pem
```

_(Remove line breaks which were just added to improve readablity)_

Some references helping to set up certificate based authentication:

* [Qlik Sense Developer Help: Exporting certificates](http://help.qlik.com/sense/2.1/en-US/online/Subsystems/ManagementConsole/Content/export-certificates.htm) (ensure to use the platform independent format)
* [Qlik Sense Developer Help: Connecting using certificates](http://help.qlik.com/sense/2.1/en-us/developer/Subsystems/RepositoryServiceAPI/Content/RepositoryServiceAPI/RepositoryServiceAPI-Example-Connect-cURL-Certificates.htm)

## Contributing

Pull requests and stars are always welcome. For bugs and feature requests, [please create an issue](https://github.com/stefanwalther/qrs-mime/issues).
The process for contributing is outlined below:

1. Create a fork of the project
2. Work on whatever bug or feature you wish
3. Create a pull request (PR)

I cannot guarantee that I will merge all PRs but I will evaluate them all.

## Known Issues

* None, so far

## Related Projects

qrs-mime uses qrs, which is a a node.js library you can use to communicate with the QRS API.

## Author

**Stefan Walther**

+ [qliksite.io](http://qliksite.io)
* [twitter/waltherstefan](http://twitter.com/waltherstefan)
* [github.com/stefanwalther](http://github.com/stefanwalther)

## License

Released under the MIT license.

***

_This file was generated by [verb-cli](https://github.com/assemble/verb-cli) on October 01, 2015._