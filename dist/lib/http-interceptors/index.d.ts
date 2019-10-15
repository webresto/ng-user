import { AuthInterceptor } from './auth.interceptor';
export declare const ngUserHttpInterceptorProviders: {
    provide: import("@angular/core/src/di/injection_token").InjectionToken<import("@angular/common/http/src/interceptor").HttpInterceptor[]>;
    useClass: typeof AuthInterceptor;
    multi: boolean;
}[];
