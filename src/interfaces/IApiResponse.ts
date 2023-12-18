/* eslint-disable @typescript-eslint/no-explicit-any */
import { IHitApi } from "./IHitApi";

export interface IApiResponse {
  /**
   * Api arguments related to request
   */
  hitApiArgs: IHitApi;
  /**
   * Time when request started in EPOC
   */
  executionTime: number;
  /**
   * Time when response arrived in EPOC
   */
  responseTime: number;
  /**
   * Total time elapsed in request in seconds. From hitting request to downloaded content
   */
  totalTime: number;
  /**
   * Response of API
   */
  response: any;
}
