After installation of *qrs-mime* using [npm](https://npmjs.com) open the [node.js](https://nodejs.org) command line and run *qrs-mime* using one of the following options:

* **Run the tool directly on Qlik Sense server**

* **Run the tool on a different machine**
If this is the case, you need to set up proper authentication between your machine and the server where the Qlik Sense Repository Services (QRS) is running on.

### Running qrs-mime directly on Qlik Sense server
(TBD & tested)

### Running qrs-mime on a different machine / using header authentication

If you have properly set up header authentication for QRS, you should then have the following information to run qrs-mime:

* Fully qualified name or IP-address of your server (e.g. `myserver.mydomain.com`)
* Name of the virtual proxy (e.g. `hdr`)
* Whether to use SSL or not
* The user you want to map to:
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
*(Remove line breaks which were just added to improve readability)*

**Note:** 
* Depending on the connection to the server, it can take a minute or two until the the job is done.
* Further options can be defined if necessary.

Some references helping you to set up header authentication:

* [Qlik Sense Help: Virtual Proxy](http://help.qlik.com/sense/2.1/en-US/online/Subsystems/ManagementConsole/Content/create-virtual-proxy.htm)


### Running *qrs-mime* on a different machine / using certificates

![](docs/images/qrs-mime-result.png)

If you have exported the certificates and copied to your system, you should then have the following information available to run `qrs-mime`:

* Fully qualified name or IP-address of your server (e.g. `myserver.mydomain.com`)
* Name of the virtual proxy (if needed, leave blank if you are unsure)
* Whether to use ssl (define it, if you are unsure)
* Location of the certificate file (e.g. `C:\CertStore\client.pem`)
* Location of the key file (e.g. `C:\CertStore\client_key.pem`)
* Location of the ca file (e.g. `C:\CertStore\root.pem`) 
* The user you want to map to (if not defined the below values will be used)
	* The header key and (e.g. `X-Qlik-User`)
	* The header value (e.g. `UserDirectory=Internal;UserId=sa_repository`)


```bash
qrs-mime
	--auth=certificates
	--server=myserver.mydomain.com
	--ssl
	--cert="C:\CertStore\client.pem"
	--key="C:\CertStore\client_key.pem"
	--ca="C:\CertStore\root.pem
```
*(Remove line breaks which were just added to improve readability)*

**Note:** 
* Depending on the connection to the server, it can take a minute or two until the the job is done.
* Further options can be defined if necessary.

Some references helping to set up certificate based authentication:

* [Qlik Sense Developer Help: Exporting certificates](http://help.qlik.com/sense/2.1/en-US/online/Subsystems/ManagementConsole/Content/export-certificates.htm) (ensure to use the platform independent format)
* [Qlik Sense Developer Help: Connecting using certificates](http://help.qlik.com/sense/2.1/en-us/developer/Subsystems/RepositoryServiceAPI/Content/RepositoryServiceAPI/RepositoryServiceAPI-Example-Connect-cURL-Certificates.htm)
