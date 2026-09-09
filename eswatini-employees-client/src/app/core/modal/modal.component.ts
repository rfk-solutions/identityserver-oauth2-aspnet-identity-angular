import { Component, HostListener, inject } from '@angular/core';
import { ModalService } from './modal.service';

@Component({
  selector: 'app-modal',
  standalone: true,
  template: `
    @if (modal.active(); as current) {
      <div class="modal-backdrop" (click)="onBackdrop($event)">
        <section class="modal" role="dialog" aria-modal="true" [attr.aria-labelledby]="'modal-title'">
          <div class="modal-icon" [class.error]="current.type === 'error'" [class.success]="current.type === 'success'">
            {{ current.type === 'confirm' ? '?' : current.type === 'success' ? '✓' : '!' }}
          </div>
          <h2 id="modal-title">{{ current.title }}</h2>
          <p>{{ current.message }}</p>
          <div class="modal-actions">
            @if (current.type === 'confirm') {
              <button class="btn btn-outline" type="button" (click)="modal.close(false)">
                {{ current.cancelLabel }}
              </button>
            }
            <button
              class="btn"
              [class.btn-danger]="current.type === 'confirm'"
              [class.btn-primary]="current.type !== 'confirm'"
              type="button"
              (click)="modal.close(true)"
            >
              {{ current.confirmLabel }}
            </button>
          </div>
        </section>
      </div>
    }
  `,
  styles: [`
    .modal-backdrop { 
      align-items: center; 
      background: rgba(16, 38, 39, .48); 
      backdrop-filter: blur(4px); 
      display: flex; 
      inset: 0; 
      justify-content: center; 
      padding: 20px; 
      position: fixed; 
      z-index: 1000; 
    }
    .modal { 
      background: var(--surface); 
      border: 1px solid var(--border); 
      border-radius: 18px; 
      box-shadow: 0 24px 70px rgba(15, 47, 48, .22); 
      max-width: 430px; 
      padding: 32px; 
      text-align: center; 
      width: 100%; 
      animation: modal-in .18s ease-out; 
    }
    .modal-icon { 
      align-items: center; 
      background: #fff4df; 
      border-radius: 50%; 
      color: #a55b00; 
      display: flex; 
      font-size: 24px; 
      font-weight: 700; 
      height: 52px; 
      justify-content: center; 
      margin: 0 auto 18px; 
      width: 52px; 
    }
    .modal-icon.error { background: #fff0ef; color: #b13a35; }
    .modal-icon.success { background: #e8f3f2; color: var(--accent-dark); }
    h2 { margin: 0 0 10px; }
    p { color: var(--muted); line-height: 1.6; margin: 0; }
    
    /* --- Modernized Button Styles --- */
    .modal-actions { 
      display: flex; 
      gap: 12px; 
      justify-content: center; 
      margin-top: 28px; 
    }

    .btn {
      appearance: none;
      border: 1px solid transparent;
      border-radius: 10px;
      font-family: inherit;
      font-size: 0.95rem;
      font-weight: 600;
      letter-spacing: 0.01em;
      line-height: 1.2;
      padding: 11px 20px;
      min-height: 44px; /* Accessible touch target size */
      display: inline-flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      user-select: none;
      transition: all 0.2s cubic-bezier(0.16, 1, 0.3, 1);
    }

    .btn:focus-visible {
      outline: 3px solid var(--accent, #2563eb);
      outline-offset: 2px;
    }

    .btn:active {
      transform: scale(0.97);
    }

    /* Cancel / Neutral Button */
    .btn-outline {
      background-color: transparent;
      border-color: var(--border, #e2e8f0);
      color: var(--ink, #1e293b);
    }

    .btn-outline:hover {
      background-color: rgba(0, 0, 0, 0.04);
      border-color: var(--muted, #94a3b8);
    }

    /* Primary Accent Button */
    .btn-primary {
      background-color: var(--accent, #0f766e);
      color: #ffffff;
      box-shadow: 0 2px 6px rgba(15, 118, 110, 0.25);
    }

    .btn-primary:hover {
      filter: brightness(1.08);
      box-shadow: 0 4px 12px rgba(15, 118, 110, 0.35);
    }

    /* Danger / Confirm Action Button */
    .btn-danger {
      background-color: #dc2626;
      color: #ffffff;
      box-shadow: 0 2px 6px rgba(220, 38, 38, 0.25);
    }

    .btn-danger:hover {
      background-color: #b91c1c;
      box-shadow: 0 4px 12px rgba(220, 38, 38, 0.35);
    }

    @keyframes modal-in { 
      from { opacity: 0; transform: translateY(8px) scale(.98); } 
      to { opacity: 1; transform: translateY(0) scale(1); } 
    }

    @media (max-width: 480px) { 
      .modal { padding: 26px 20px; } 
      .modal-actions { flex-direction: column-reverse; } 
      .modal-actions .btn { width: 100%; } 
    }
  `]
})
export class ModalComponent {
  readonly modal = inject(ModalService);

  @HostListener('document:keydown.escape')
  closeWithEscape(): void {
    if (this.modal.active()?.type === 'confirm') this.modal.close(false);
    else if (this.modal.active()) this.modal.close(true);
  }

  onBackdrop(event: MouseEvent): void {
    if (event.target === event.currentTarget && this.modal.active()?.type === 'confirm') {
      this.modal.close(false);
    }
  }
}