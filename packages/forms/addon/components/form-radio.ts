import Component from '@glimmer/component';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';

interface FormRadioArgs {
  label?: string;
  hint?: string;
  value?: unknown;
  checked?: unknown;
  name?: string;
  containerClass?: string;
  isSmall?: boolean;
  isLarge?: boolean;

  // Callback when onchange is triggered
  onChange?: (value: unknown, event: Event) => void;

  // internal function for FormRadioGroup
  _parentOnChange?: (value: unknown, event: Event) => void;
}

export default class FormRadio extends Component<FormRadioArgs> {
  @tracked isFocused = false;

  @action handleChange(value: unknown, event: Event): void {
    event.preventDefault();

    if (typeof this.args.onChange === 'function') {
      this.args.onChange(value, event);
    }

    if (typeof this.args._parentOnChange === 'function') {
      this.args._parentOnChange(value, event);
    }
  }

  @action handleFocusIn(event: FocusEvent): void {
    if (event.relatedTarget !== null) {
      this.isFocused = true;
    }
  }

  @action handleFocusOut(_: FocusEvent): void {
    this.isFocused = false;
  }
}