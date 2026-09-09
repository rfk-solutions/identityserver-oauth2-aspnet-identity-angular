import { Injectable, signal } from '@angular/core';

export type ModalType = 'confirm' | 'error' | 'success';

export interface ModalOptions {
  type: ModalType;
  title: string;
  message: string;
  confirmLabel?: string;
  cancelLabel?: string;
}

export interface ActiveModal extends Required<ModalOptions> {
  resolve: (confirmed: boolean) => void;
}

@Injectable({ providedIn: 'root' })
export class ModalService {
  readonly active = signal<ActiveModal | null>(null);

  confirm(options: Omit<ModalOptions, 'type'>): Promise<boolean> {
    return this.open({ ...options, type: 'confirm' });
  }

  error(message: string, title = 'Something went wrong'): Promise<void> {
    return this.open({ type: 'error', title, message, confirmLabel: 'Close' }).then(() => undefined);
  }

  success(message: string, title = 'Done'): Promise<void> {
    return this.open({ type: 'success', title, message, confirmLabel: 'Continue' }).then(() => undefined);
  }

  close(confirmed: boolean): void {
    const modal = this.active();
    if (!modal) return;
    this.active.set(null);
    modal.resolve(confirmed);
  }

  private open(options: ModalOptions): Promise<boolean> {
    if (this.active()) this.close(false);

    return new Promise<boolean>((resolve) => {
      this.active.set({
        type: options.type,
        title: options.title,
        message: options.message,
        confirmLabel: options.confirmLabel ?? 'Confirm',
        cancelLabel: options.cancelLabel ?? 'Cancel',
        resolve
      });
    });
  }
}
