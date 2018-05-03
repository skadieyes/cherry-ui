import {
    Directive,
    Input,
    SimpleChanges,
    AfterViewInit,
    ViewContainerRef,
    ComponentFactoryResolver,
    ElementRef,
    HostBinding,
    Optional,
    Renderer2
} from '@angular/core';
import { TooltipComponent } from './tooltip.component';
@Directive({
    selector: '[cherryTooltip]'
})
export class TooltipDirective implements AfterViewInit {

    constructor(
        public elementRef: ElementRef,
        private hostView: ViewContainerRef,
        private resolver: ComponentFactoryResolver,
        private renderer: Renderer2,
        @Optional() tooltip: TooltipComponent) {
        // Support faster tooltip mode: <a ui-tooltip="xxx"></a>. [NOTE] Used only under uiTooltipDirective currently.
        if (!tooltip) {
            const factory = this.resolver.resolveComponentFactory(TooltipComponent);
            tooltip = this.hostView.createComponent(factory).instance;
            this.isDynamicTooltip = true;
        }
        tooltip.setOverlayOrigin(this);
        this.tooltip = tooltip;
    }

    @HostBinding('class.cherry-ui-tooltip-open') isTooltipOpen = true;

    private tooltip: TooltipComponent;
    private isDynamicTooltip = false; // Indicate whether current tooltip is dynamic created

    ngAfterViewInit() {
        if (this.tooltip.uiTrigger === 'hover') {
            this.renderer.listen(this.elementRef.nativeElement, 'mouseenter', () => this.show());
            this.renderer.listen(this.elementRef.nativeElement, 'mouseleave', () => this.hide());
        } else if (this.tooltip.uiTrigger === 'focus') {
            this.renderer.listen(this.elementRef.nativeElement, 'focus', () => this.show());
            this.renderer.listen(this.elementRef.nativeElement, 'blur', () => this.hide());
        } else if (this.tooltip.uiTrigger === 'click') {
            this.renderer.listen(this.elementRef.nativeElement, 'click', (e) => {
                e.preventDefault();
                this.show();
            });
        }
    }

    private show() {
        this.tooltip.show();
        this.isTooltipOpen = true;
    }

    private hide() {
        this.tooltip.hide();
        this.isTooltipOpen = false;
    }
}
