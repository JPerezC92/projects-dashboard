import { Link, Outlet } from "react-router-dom";

import { Brand } from "./Brand";
import { ErrorBoundary } from "./ErrorBoundary";
import styles from "./Layout.module.scss";
import { TopBarProgressByLocation } from "./TopBarProgressByLocation";

export function Layout() {
	const title = "Projects Dashboard";

	return (
		<>
			<TopBarProgressByLocation />
			<header className={styles.header}>
				<section className={styles.header__container}>
					<a href="https://codely.com">
						<Brand />
					</a>
					<Link to={`/`}>
						<h1 className={styles.app__brand}>{title}</h1>
					</Link>
				</section>
			</header>

			<ErrorBoundary>
				<Outlet />
			</ErrorBoundary>
		</>
	);
}
