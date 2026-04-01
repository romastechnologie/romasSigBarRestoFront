import { h, type App } from "vue";
import type { AxiosResponse } from "axios";
import axios from "axios";
import VueAxios from "vue-axios";
import JwtService from "@/services/JwtService";
import { config } from "@fullcalendar/core/internal";

/**
 * @description service to call HTTP request via Axios
 */
class ApiService {
  /**
   * @description property to share vue instance
   */
  public static vueInstance: App;
  public static vueInstance2: App;

  /**
   * @description initialize vue axios
   */
  public static init(app: App<Element>) {
    ApiService.vueInstance = app;
    ApiService.vueInstance.use(VueAxios, axios);
    //ApiService.vueInstance.axios.defaults.baseURL ='https://gescom.somimas.com:3000/api';
    ApiService.vueInstance.axios.defaults.baseURL = 'http://localhost:3008/api';
    ApiService.vueInstance.axios.defaults.headers.common["Accept"] = "application/json";
    ApiService.vueInstance.axios.defaults.headers.common["Content-Type"] = "application/json";
    ApiService.vueInstance.use(VueAxios, axios);
  }

  /**
   * @description set the default HTTP request headers
   */
  public static setHeader(): void {
    console.log(JwtService.getToken(), "JwtService.getToken()")
    ApiService.vueInstance.axios.defaults.headers.common["Authorization"] = `bearer ${JwtService.getToken()}`;
    ApiService.vueInstance.axios.defaults.headers.common["Accept"] = "application/json";
  }


  /**
   * @description send the GET HTTP request
   * @param resource: string
   * @param params: AxiosRequestConfig
   * @returns Promise<AxiosResponse>
   */
  public static query(resource: string, params: any): Promise<AxiosResponse> {
    // if (JwtService.getUserId()) {
    //   params["userId"] = JwtService.getUserId();
    // }
    return ApiService.vueInstance.axios.get(resource, params,);
  }
  /**
 * @description send the GET HTTP request
 * @param resource: string
 * @param slug: string (optional)
 * @returns Promise<AxiosResponse>
 */
  public static get(resource: string, slug: string = "", config:any = {}): Promise<AxiosResponse> {
    // Construction finale de l'URL avec Axios GET
    console.log("testttt",JwtService.getPointDeVenteId())
    let url = `${resource}${slug}`;
    if (url.includes("?") && !url.includes("pointvente")) {
      url = `${url}&pointvente=${JwtService.getPointDeVenteId()}`;
    } else if (!url.includes("?") && !url.includes("pointvente")) {
      url = `${url}?pointvente=${JwtService.getPointDeVenteId()}`;
    }
    console.log(url, "urlurlurlurlurlurlurl")
    return ApiService.vueInstance.axios.get(url,config);
  }


  /**
   * @description set the POST HTTP request
   * @param resource: string
   * @param params: AxiosRequestConfig
   * @returns Promise<AxiosResponse>
   */
  public static post(resource: string, params: any): Promise<AxiosResponse> {
    if (JwtService.getPointDeVenteId()) {
      params["pointvente"] = JwtService.getPointDeVenteId();
    }
    return ApiService.vueInstance.axios.post(`${resource}`, params);
  }

  /**
  * @description set the POST HTTP request
  * @param resource: string
  * @param params: AxiosRequestConfig
  * @returns Promise<AxiosResponse>
  */
  public static postWithFile(resource: string, params: any): Promise<AxiosResponse> {
    if (JwtService.getPointDeVenteId()) {
      params["pointvente"] = JwtService.getPointDeVenteId();
    }
    return ApiService.vueInstance.axios.post(`${resource}`, params, {
      headers: {
        ...config.headers, // Garde les headers existants
        "Content-Type": "multipart/form-data",
        "Accept": "*/*"
      }
    });
  }

  /**
   * @description send the UPDATE HTTP request
   * @param resource: string
   * @param slug: string
   * @param params: AxiosRequestConfig
   * @returns Promise<AxiosResponse>
   */
  public static update(resource: string, slug: string, params: any): Promise<AxiosResponse> {
    // if (JwtService.getUser()) {
    //   params["userId"] = JwtService.getUser();
    // }
    return ApiService.vueInstance.axios.put(`${resource}/${slug}`, params);
  }

  /**
   * @description Send the PUT HTTP request
   * @param resource: string
   * @param params: AxiosRequestConfig
   * @returns Promise<AxiosResponse>
   */
  public static put(resource: string, params: any): Promise<AxiosResponse> {
    // if (JwtService.getUser()) {
    //   params["userId"] = JwtService.getUser();
    // }
    return ApiService.vueInstance.axios.put(`${resource}`, params);
  }

  /**
   * @description Send the PATCH HTTP request
   * @param resource: string
   * @param params: AxiosRequestConfig
   * @returns Promise<AxiosResponse>
   */
  public static patch(resource: string, params: any): Promise<AxiosResponse> {
    // if (JwtService.getUser()) {
    //   params["userId"] = JwtService.getUser();
    // }
    return ApiService.vueInstance.axios.patch(`${resource}`, params);
  }

  /**
   * @description Send the DELETE HTTP request
   * @param resource: string
   * @returns Promise<AxiosResponse>
   */
  public static delete(resource: string): Promise<AxiosResponse> {
    return ApiService.vueInstance.axios.delete(resource);
  }
}

export default ApiService;
