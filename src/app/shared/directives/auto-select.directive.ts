import {
  Directive,
  effect,
  ElementRef,
  HostListener,
  input,
  output,
} from '@angular/core';

@Directive({
  selector: '[appAutoSelect]',
  standalone: true,
  inputs: ['providerToken'],
})
export class AutoSelectDirective {
  updateSelectable = output<string>();
  selectables = input.required<readonly ElementRef<any>[]>();
  selected = input<string>();

  alias = input.required<string>();

  isMouseOver: boolean = false;
  observer: IntersectionObserver | undefined;

  constructor() {
    effect(() => {
      const selected = this.selected();
      // if (selected) this.scrollTo(selected);
    });

    effect(() => {
      const elements = this.selectables();
      if (elements.length) {
        if (this.observer) {
          console.log('disconnect');
          this.observer.disconnect();
        } //disconnect if previous observer was connected, just in case elements are added dynamically
        console.log('setting up');
        this.setupScrollObserver(elements);
      }
    });
  }

  @HostListener('mouseover', ['$event'])
  onMouseOver(event: Event): void {
    console.log(this.alias(), this.isMouseOver);
    this.isMouseOver = true;
  }

  @HostListener('mouseleave', ['$event'])
  onMouseOut(event: Event): void {
    console.log(this.alias(), this.isMouseOver);
    this.isMouseOver = false;
  }

  setupScrollObserver(providerList: readonly ElementRef<unknown>[]) {
    const observer = new IntersectionObserver(
      (entries) => {
        console.log(
          entries.map((entry) => entry.target.getAttribute('data-category')),
          entries.length,
          entries,
          this.observer
        );

        // const firstFullyShownCategory = entries
        //   .reverse()
        //   .find((entry) => entry.intersectionRatio === 1);

        // if (firstFullyShownCategory && firstFullyShownCategory.target) {
        //   this.getElementValueAndUpdateSelectable(
        //     firstFullyShownCategory.target
        //   );
        // }
      },
      {
        //   root: null, // Use the viewport as the root
        //   rootMargin: '0px', // No margin
        threshold: 1, // Trigger when 10% of the element is visible
      }
    );

    providerList.forEach((provider) =>
      observer?.observe(provider.nativeElement as Element)
    );
  }

  getElementValueAndUpdateSelectable(provider: Element) {
    const category = provider.getAttribute('data-category') || '';
    console.log(category);
    this.updateSelectable.emit(category);
  }

  scrollTo(category: string) {
    if (this.isMouseOver) {
      console.log('cancelling ', this.alias());
      return;
    }
    console.log('going with', this.alias());
    const element = this.selectables().find(
      (selectable) =>
        selectable.nativeElement.getAttribute('data-category') === category
    );

    element?.nativeElement.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
    });
  }
}
