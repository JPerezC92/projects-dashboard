export type CleanEvent = () => void;

interface CE<Detail> {
	trigger: (detail: Detail) => void;
	listener: (callback: (event: CustomEvent<Detail>) => void) => CleanEvent;
}

export class EventFactory<Detail = void> {
	public create(name: string): CE<Detail> {
		return {
			trigger: (detail: Detail) => {
				const event = new CustomEvent<Detail>(name, { detail });

				window.dispatchEvent(event);
			},
			listener: (callback: (event: CustomEvent<Detail>) => void): CleanEvent => {
				window.addEventListener(name, callback as EventListenerOrEventListenerObject);

				return () =>
					window.removeEventListener(name, callback as EventListenerOrEventListenerObject);
			},
		};
	}
}
