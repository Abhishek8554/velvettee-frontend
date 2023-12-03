import { AuthorizationType } from '../enums/AuthorizationType';

export interface IHitApiConfig {
    /**
     * Authorization type for API
     */
    authorization: AuthorizationType;
    /**
     * default headers which will be set for API
     */
    defaultHeaders?: unknown;
}
