import React from "react";
import { useLocation } from "react-router-dom";
import TopBarProgress from "react-topbar-progress-indicator";

import { PageLoadedEvent } from "../../domain/PageLoadedEvent";

export function TopBarProgressByLocation() {
	const { pathname: currentPathname } = useLocation();
	const [lastPathname, setLastPathname] = React.useState(currentPathname);
	const hasLocationChanged = lastPathname !== currentPathname;

	React.useEffect(() => {
		const updateLastPathname = () => setLastPathname(currentPathname);
		const cleanEvent = PageLoadedEvent.listener(updateLastPathname);

		return () => cleanEvent();
	}, [currentPathname]);

	if (!hasLocationChanged) {
		return <></>;
	}

	return <TopBarProgress />;
}
