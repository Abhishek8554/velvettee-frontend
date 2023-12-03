import axios from 'axios';
import { IHitApi } from '../interfaces/IHitApi';
import { environment } from '../environments/environment';

class HitApi {
    apiEndpoint: string = '';
    constructor(private args: IHitApi) {
        this.initArgs();
    }
    initArgs() {
        if (!this.args.requestId) {
            this.args.requestId = Symbol();
        }
        if (this.args.baseUrl) {
            this.apiEndpoint = this.args.baseUrl + this.args.url;
        } else {
            this.apiEndpoint = environment.baseUrl + this.args.url;
        }
        if (!Object.keys(this.args.payload).length) {
            this.args.payload = {};
        }
    }
    hitApi() {
        axios({
            method: this.args.requestType,
            url: this.apiEndpoint,
            data: this.args.payload,
        })
            .then((response) => {
                if (this.args.successCallback) {
                    this.args.successCallback(response.data, response);
                }
            })
            .catch((error) => {
                if (this.args.errorCallback) {
                    this.args.errorCallback(error);
                }
            });
    }
}

export default HitApi;
