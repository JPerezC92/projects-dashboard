import React from "react";

import { PageLoadedEvent } from "../../domain/PageLoadedEvent";

export function usePageloaded(): void {
	React.useEffect(() => {
		PageLoadedEvent.trigger();
	}, []);
}
