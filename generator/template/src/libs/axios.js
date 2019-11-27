/**
 * @file 路径配置配置
 * @author wangbing11(wangbing11@baidu.com)
 */

/* eslint-disable no-param-reassign */
import axios from 'axios';
import iView from 'iview';
class HttpRequest {
    constructor(baseUrl = '/') {
        this.baseUrl = baseUrl;
        this.queue = {};
    }

    getInsideConfig() {
        const config = {
            baseURL: this.baseUrl,
            headers: {
                //
            }
        };
        return config;
    }

    interceptors(instance, url) {
        instance.interceptors.request.use(
            config => {
                this.queue[url] = true;
                config.url = url;
                return config;
            },
            error => {
                return Promise.reject(error);
            }
        );
        // 响应拦截
        instance.interceptors.response.use(
            res => {
                // 权限提示
                const data = res.data;
                if (+data.errno === 403) {
                    iView.Message.error(data.errmsg || '没有权限访问');
                    return Promise.reject(data.errmsg);
                } else {
                    return data;
                }
            },
            error => {
                let errorInfo = error.response;
                if (!errorInfo) {
                    const {
                        request: {statusText, status},
                        config
                    } = JSON.parse(JSON.stringify(error));
                    errorInfo = {
                        statusText,
                        status,
                        request: {responseURL: config.url}
                    };
                }
                return Promise.reject(error);
            }
        );
    }

    request(options) {
        const instance = axios.create();
        options = Object.assign(this.getInsideConfig(), options);
        this.interceptors(instance, options.url);
        return instance(options);
    }
}
export default HttpRequest;
