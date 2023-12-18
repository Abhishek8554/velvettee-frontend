/* eslint-disable @typescript-eslint/no-explicit-any */
import { AxiosResponse } from "axios";
import { RequestType } from "../enums/RequestType";
import { IHitApiConfig } from "./IHitApiConfig";

export interface IHitApi {
  /**
   * Adding baseUrl will override default base url which is set in environment, Leave it empty in case you want to skip it
   */
  baseUrl?: string;
  /**
   * Unique id associated with every request. It will be auto generated unless passed statically
   */
  requestId?: symbol;
  /**
   * Url of API. It will act as a route suffix in case baseUrl is present
   */
  url: string;
  /**
   * Type of request. GET, POST etc
   */
  requestType: RequestType;
  /**
   * Configuration corresponding to API request
   */
  config?: IHitApiConfig;
  /**
   * Payload that needs to be passed in the API
   */
  payload?: any;
  /**
   * This callback will be executed in case API responds with success
   */
  successCallback?: SuccessCallback;
  /**
   * This callback will be executed in case API responds with error
   */
  errorCallback?: ErrorCallback;
}

export type SuccessCallback = (
  response: any,
  fullResponse?: AxiosResponse
) => void;
export type ErrorCallback = (error: Error) => void;
