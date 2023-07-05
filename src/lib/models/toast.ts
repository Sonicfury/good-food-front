export class Toast {
	id: string;

	constructor(
		public message: string,
		public level: 'info' | 'success' | 'warning' | 'error' = 'info',
		public isDismissible: boolean = true,
		public timeout: number = 3000
	) {
		this.id = Math.random().toString(36).slice(2, 9);
		this.level = level;
		this.message = message;
		this.isDismissible = isDismissible;
		this.timeout = timeout;
	}
} 
