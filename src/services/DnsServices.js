/**
 * Created by zenit1 on 29/12/2016.
 */
"use strict";

const CommonUtils   = require('../utils/CommonUtils');
const ProvisionApi  = require('../services/ProvisionApi');
const apiConfig     = require('../../config/ApiConfig.json');
const apiDnsActions = apiConfig.Actions.DnsApi;
const BeameLogger            = require('../utils/Logger');
const logger                 = new BeameLogger("DnsServices");
class DnsServices {

	saveDns(fqdn, edge_fqdn) {

		return new Promise((resolve, reject) => {
				this._saveDns(fqdn, edge_fqdn).then(()=>{
					logger.info(`DNS update record for ${fqdn} requested`);
					resolve();
				}).catch(reject);
			}
		);

	}

	_getToken(fqdn, edge_fqdn) {
		return new Promise((resolve, reject) => {
				const store = new (require('./BeameStoreV2'))();

				store.find(fqdn, false).then(cred => {
					const AuthToken = require('./AuthToken'),
					      data      = {fqdn, value: edge_fqdn};

					let authToken = AuthToken.create(data, cred);
					resolve(authToken);
				}).catch(reject);
			}
		);
	}

	_saveDns(fqdn, edge_fqdn) {

		return new Promise((resolve, reject) => {
				this._getToken(fqdn, edge_fqdn).then(authToken => {
					let provisionApi = new ProvisionApi();
					provisionApi.postRequest(`${apiConfig.Endpoints.BaseDNSUrl}${apiDnsActions.Get.endpoint}${fqdn}`, {authToken},resolve);
				}).catch(reject);
			}
		);

	}
}


module.exports = DnsServices;