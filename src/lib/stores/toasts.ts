import { Toast } from '$lib/models/toast';
import { writable } from 'svelte/store';

const createToasts = () => {
	const { subscribe, set, update } = writable<Toast[]>([]);

	return {
		subscribe,
		add: (toast: Toast) =>
			update((toasts) => {
				dismissOnTimeout(toast);

				return [toast, ...toasts];
			}),
		info: (message: string) => toasts.add(new Toast(message, 'info')),
		error: (message: string) => toasts.add(new Toast(message, 'error')),
		warning: (message: string) => toasts.add(new Toast(message, 'warning')),
		success: (message: string) => toasts.add(new Toast(message, 'success')),
		dismiss: (id: string) =>
			update((toasts) => {
				return toasts.filter((t) => t.id !== id);
			}),
		reset: () => set([])
	};
};

const dismissOnTimeout = (toast: Toast) => {
	setTimeout(() => toasts.dismiss(toast.id), toast.timeout);
};

export const toasts = createToasts();
