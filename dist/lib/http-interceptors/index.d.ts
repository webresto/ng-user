import { AuthInterceptor } from './auth.interceptor';
export declare const ngUserHttpInterceptorProviders: {
    provide: import("@angular/core").InjectionToken<import("@angular/common/http").HttpInterceptor[]>;
    useClass: typeof AuthInterceptor;
    multi: boolean;
}[];
