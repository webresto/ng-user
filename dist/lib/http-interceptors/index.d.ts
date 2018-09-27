import { AuthInterceptor } from './auth.interceptor';
export declare const ngUserHttpInterceptorProviders: {
    provide: import("../../../../../../../../../../Users/user/projects/gfcafe/node_modules/@angular/core/src/di/injection_token").InjectionToken<import("../../../../../../../../../../Users/user/projects/gfcafe/node_modules/@angular/common/http/src/interceptor").HttpInterceptor[]>;
    useClass: typeof AuthInterceptor;
    multi: boolean;
}[];
