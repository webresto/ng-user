import { Directive, Renderer2, ElementRef } from '@angular/core';
import { NgRestoUserService } from '../services/ng-resto-user.service';
import * as i0 from "@angular/core";
import * as i1 from "../services/ng-resto-user.service";
export class BalanceDirective {
    constructor(renderer, el, ngRestoUserService) {
        this.renderer = renderer;
        this.el = el;
        this.ngRestoUserService = ngRestoUserService;
        let balance = 0;
        this.ngRestoUserService
            .getBonuses()
            .subscribe(bonuses => {
            for (let name in bonuses) {
                const data = bonuses[name];
                if (data.state == 'active') {
                    balance += data.balance;
                }
            }
            this.amount = `${balance}`;
            this.renderer.setProperty(this.el.nativeElement, 'innerHTML', this.amount);
        });
    }
}
BalanceDirective.ɵfac = function BalanceDirective_Factory(t) { return new (t || BalanceDirective)(i0.ɵɵdirectiveInject(i0.Renderer2), i0.ɵɵdirectiveInject(i0.ElementRef), i0.ɵɵdirectiveInject(i1.NgRestoUserService)); };
BalanceDirective.ɵdir = i0.ɵɵdefineDirective({ type: BalanceDirective, selectors: [["", "appBalance", ""]] });
/*@__PURE__*/ (function () { i0.ɵsetClassMetadata(BalanceDirective, [{
        type: Directive,
        args: [{
                selector: '[appBalance]'
            }]
    }], function () { return [{ type: i0.Renderer2 }, { type: i0.ElementRef }, { type: i1.NgRestoUserService }]; }, null); })();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYmFsYW5jZS5kaXJlY3RpdmUuanMiLCJzb3VyY2VSb290IjoiQzovVXNlcnMvbGFyY2hlbmtvdi9mcm9udGVuZC9wcm9qZWN0cy93ZWJyZXN0by9uZy11c2VyL3NyYy8iLCJzb3VyY2VzIjpbImxpYi9kaXJlY3RpdmVzL2JhbGFuY2UuZGlyZWN0aXZlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQUUsU0FBUyxFQUFFLFVBQVUsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUNqRSxPQUFPLEVBQUUsa0JBQWtCLEVBQUUsTUFBTSxtQ0FBbUMsQ0FBQzs7O0FBS3ZFLE1BQU0sT0FBTyxnQkFBZ0I7SUFJM0IsWUFDVSxRQUFtQixFQUNuQixFQUFjLEVBQ2Qsa0JBQXNDO1FBRnRDLGFBQVEsR0FBUixRQUFRLENBQVc7UUFDbkIsT0FBRSxHQUFGLEVBQUUsQ0FBWTtRQUNkLHVCQUFrQixHQUFsQixrQkFBa0IsQ0FBb0I7UUFFOUMsSUFBSSxPQUFPLEdBQUcsQ0FBQyxDQUFDO1FBQ2hCLElBQUksQ0FBQyxrQkFBa0I7YUFDcEIsVUFBVSxFQUFFO2FBQ1osU0FBUyxDQUFDLE9BQU8sQ0FBQyxFQUFFO1lBQ25CLEtBQUksSUFBSSxJQUFJLElBQUksT0FBTyxFQUFFO2dCQUN2QixNQUFNLElBQUksR0FBRyxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUM7Z0JBQzNCLElBQUcsSUFBSSxDQUFDLEtBQUssSUFBSSxRQUFRLEVBQUU7b0JBQ3pCLE9BQU8sSUFBSSxJQUFJLENBQUMsT0FBTyxDQUFDO2lCQUN6QjthQUNGO1lBRUQsSUFBSSxDQUFDLE1BQU0sR0FBRyxHQUFHLE9BQU8sRUFBRSxDQUFDO1lBQzNCLElBQUksQ0FBQyxRQUFRLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsYUFBYSxFQUFFLFdBQVcsRUFBRSxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUM7UUFDN0UsQ0FBQyxDQUFDLENBQUM7SUFFUCxDQUFDOztnRkF4QlUsZ0JBQWdCO3FEQUFoQixnQkFBZ0I7a0RBQWhCLGdCQUFnQjtjQUg1QixTQUFTO2VBQUM7Z0JBQ1QsUUFBUSxFQUFFLGNBQWM7YUFDekIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBEaXJlY3RpdmUsIFJlbmRlcmVyMiwgRWxlbWVudFJlZiB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyBOZ1Jlc3RvVXNlclNlcnZpY2UgfSBmcm9tICcuLi9zZXJ2aWNlcy9uZy1yZXN0by11c2VyLnNlcnZpY2UnO1xyXG5cclxuQERpcmVjdGl2ZSh7XHJcbiAgc2VsZWN0b3I6ICdbYXBwQmFsYW5jZV0nXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBCYWxhbmNlRGlyZWN0aXZlIHtcclxuXHJcbiAgYW1vdW50OnN0cmluZztcclxuXHJcbiAgY29uc3RydWN0b3IoXHJcbiAgICBwcml2YXRlIHJlbmRlcmVyOiBSZW5kZXJlcjIsXHJcbiAgICBwcml2YXRlIGVsOiBFbGVtZW50UmVmLFxyXG4gICAgcHJpdmF0ZSBuZ1Jlc3RvVXNlclNlcnZpY2U6IE5nUmVzdG9Vc2VyU2VydmljZVxyXG4gICkge1xyXG4gICAgbGV0IGJhbGFuY2UgPSAwO1xyXG4gICAgdGhpcy5uZ1Jlc3RvVXNlclNlcnZpY2VcclxuICAgICAgLmdldEJvbnVzZXMoKVxyXG4gICAgICAuc3Vic2NyaWJlKGJvbnVzZXMgPT4ge1xyXG4gICAgICAgIGZvcihsZXQgbmFtZSBpbiBib251c2VzKSB7XHJcbiAgICAgICAgICBjb25zdCBkYXRhID0gYm9udXNlc1tuYW1lXTtcclxuICAgICAgICAgIGlmKGRhdGEuc3RhdGUgPT0gJ2FjdGl2ZScpIHtcclxuICAgICAgICAgICAgYmFsYW5jZSArPSBkYXRhLmJhbGFuY2U7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB0aGlzLmFtb3VudCA9IGAke2JhbGFuY2V9YDtcclxuICAgICAgICB0aGlzLnJlbmRlcmVyLnNldFByb3BlcnR5KHRoaXMuZWwubmF0aXZlRWxlbWVudCwgJ2lubmVySFRNTCcsIHRoaXMuYW1vdW50KTtcclxuICAgICAgfSk7XHJcblxyXG4gIH1cclxuXHJcbn1cclxuIl19