/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Directive, Renderer2, ElementRef } from '@angular/core';
import { NgRestoUserService } from '../services/ng-resto-user.service';
var BalanceDirective = /** @class */ (function () {
    function BalanceDirective(renderer, el, ngRestoUserService) {
        var _this = this;
        this.renderer = renderer;
        this.el = el;
        this.ngRestoUserService = ngRestoUserService;
        /** @type {?} */
        var balance = 0;
        this.ngRestoUserService
            .getBonuses()
            .subscribe((/**
         * @param {?} bonuses
         * @return {?}
         */
        function (bonuses) {
            for (var name_1 in bonuses) {
                /** @type {?} */
                var data = bonuses[name_1];
                if (data.state == 'active') {
                    balance += data.balance;
                }
            }
            _this.amount = "" + balance;
            _this.renderer.setProperty(_this.el.nativeElement, 'innerHTML', _this.amount);
        }));
    }
    BalanceDirective.decorators = [
        { type: Directive, args: [{
                    selector: '[appBalance]'
                },] },
    ];
    BalanceDirective.ctorParameters = function () { return [
        { type: Renderer2 },
        { type: ElementRef },
        { type: NgRestoUserService }
    ]; };
    return BalanceDirective;
}());
export { BalanceDirective };
if (false) {
    /** @type {?} */
    BalanceDirective.prototype.amount;
    /**
     * @type {?}
     * @private
     */
    BalanceDirective.prototype.renderer;
    /**
     * @type {?}
     * @private
     */
    BalanceDirective.prototype.el;
    /**
     * @type {?}
     * @private
     */
    BalanceDirective.prototype.ngRestoUserService;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYmFsYW5jZS5kaXJlY3RpdmUuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9Ad2VicmVzdG8vbmctdXNlci8iLCJzb3VyY2VzIjpbImxpYi9kaXJlY3RpdmVzL2JhbGFuY2UuZGlyZWN0aXZlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFFLFNBQVMsRUFBRSxVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDakUsT0FBTyxFQUFFLGtCQUFrQixFQUFFLE1BQU0sbUNBQW1DLENBQUM7QUFFdkU7SUFPRSwwQkFDVSxRQUFtQixFQUNuQixFQUFjLEVBQ2Qsa0JBQXNDO1FBSGhELGlCQW9CQztRQW5CUyxhQUFRLEdBQVIsUUFBUSxDQUFXO1FBQ25CLE9BQUUsR0FBRixFQUFFLENBQVk7UUFDZCx1QkFBa0IsR0FBbEIsa0JBQWtCLENBQW9COztZQUUxQyxPQUFPLEdBQUcsQ0FBQztRQUNmLElBQUksQ0FBQyxrQkFBa0I7YUFDcEIsVUFBVSxFQUFFO2FBQ1osU0FBUzs7OztRQUFDLFVBQUEsT0FBTztZQUNoQixLQUFJLElBQUksTUFBSSxJQUFJLE9BQU8sRUFBRTs7b0JBQ2pCLElBQUksR0FBRyxPQUFPLENBQUMsTUFBSSxDQUFDO2dCQUMxQixJQUFHLElBQUksQ0FBQyxLQUFLLElBQUksUUFBUSxFQUFFO29CQUN6QixPQUFPLElBQUksSUFBSSxDQUFDLE9BQU8sQ0FBQztpQkFDekI7YUFDRjtZQUVELEtBQUksQ0FBQyxNQUFNLEdBQUcsS0FBRyxPQUFTLENBQUM7WUFDM0IsS0FBSSxDQUFDLFFBQVEsQ0FBQyxXQUFXLENBQUMsS0FBSSxDQUFDLEVBQUUsQ0FBQyxhQUFhLEVBQUUsV0FBVyxFQUFFLEtBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQztRQUM3RSxDQUFDLEVBQUMsQ0FBQztJQUVQLENBQUM7O2dCQTNCRixTQUFTLFNBQUM7b0JBQ1QsUUFBUSxFQUFFLGNBQWM7aUJBQ3pCOzs7Z0JBTG1CLFNBQVM7Z0JBQUUsVUFBVTtnQkFDaEMsa0JBQWtCOztJQStCM0IsdUJBQUM7Q0FBQSxBQTdCRCxJQTZCQztTQTFCWSxnQkFBZ0I7OztJQUUzQixrQ0FBYzs7Ozs7SUFHWixvQ0FBMkI7Ozs7O0lBQzNCLDhCQUFzQjs7Ozs7SUFDdEIsOENBQThDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgRGlyZWN0aXZlLCBSZW5kZXJlcjIsIEVsZW1lbnRSZWYgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IE5nUmVzdG9Vc2VyU2VydmljZSB9IGZyb20gJy4uL3NlcnZpY2VzL25nLXJlc3RvLXVzZXIuc2VydmljZSc7XG5cbkBEaXJlY3RpdmUoe1xuICBzZWxlY3RvcjogJ1thcHBCYWxhbmNlXSdcbn0pXG5leHBvcnQgY2xhc3MgQmFsYW5jZURpcmVjdGl2ZSB7XG5cbiAgYW1vdW50OnN0cmluZztcblxuICBjb25zdHJ1Y3RvcihcbiAgICBwcml2YXRlIHJlbmRlcmVyOiBSZW5kZXJlcjIsXG4gICAgcHJpdmF0ZSBlbDogRWxlbWVudFJlZixcbiAgICBwcml2YXRlIG5nUmVzdG9Vc2VyU2VydmljZTogTmdSZXN0b1VzZXJTZXJ2aWNlXG4gICkge1xuICAgIGxldCBiYWxhbmNlID0gMDtcbiAgICB0aGlzLm5nUmVzdG9Vc2VyU2VydmljZVxuICAgICAgLmdldEJvbnVzZXMoKVxuICAgICAgLnN1YnNjcmliZShib251c2VzID0+IHtcbiAgICAgICAgZm9yKGxldCBuYW1lIGluIGJvbnVzZXMpIHtcbiAgICAgICAgICBjb25zdCBkYXRhID0gYm9udXNlc1tuYW1lXTtcbiAgICAgICAgICBpZihkYXRhLnN0YXRlID09ICdhY3RpdmUnKSB7XG4gICAgICAgICAgICBiYWxhbmNlICs9IGRhdGEuYmFsYW5jZTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLmFtb3VudCA9IGAke2JhbGFuY2V9YDtcbiAgICAgICAgdGhpcy5yZW5kZXJlci5zZXRQcm9wZXJ0eSh0aGlzLmVsLm5hdGl2ZUVsZW1lbnQsICdpbm5lckhUTUwnLCB0aGlzLmFtb3VudCk7XG4gICAgICB9KTtcblxuICB9XG5cbn1cbiJdfQ==