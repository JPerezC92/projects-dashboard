import React from "react";

import { Add } from "../../assets/svgs/Add";
import { FormEvent } from "../../domain/FormEvent";
import { RepositoryWidgetRepository } from "../../domain/RepositoryWidgetRepository";
import styles from "./AddRepositoryWidgetForm.module.scss";
import { useAddRepositoryWidget } from "./repositoryWidget/useAddRepositoryWidget";

function validateGitHubURL(url: string): boolean {
	const hasFourSlashes = url.split("/").length === 5;

	const hasGitHubDomain = url.startsWith("https://github.com/");

	const hasSlashAtTheEnd = url.endsWith("/");

	return hasFourSlashes && hasGitHubDomain && !hasSlashAtTheEnd;
}

type FormFields = { id: string; repositoryUrl: string };

export function AddRepositoryWidgetForm({
	repository,
}: {
	repository: RepositoryWidgetRepository;
}) {
	const [formValues, setFormValues] = React.useState<FormFields>({ id: "", repositoryUrl: "" });
	const [hasAlreadyExistsError, setHasAlreadyExistsError] = React.useState(false);
	const isFormValid = validateGitHubURL(formValues.repositoryUrl) && !!formValues.id;

	const [isFormActive, setIsFormActive] = React.useState(false);
	const addRepositoryWidget = useAddRepositoryWidget(repository);

	function handleChange(ev: React.ChangeEvent<HTMLInputElement>) {
		setFormValues((prev) => ({ ...prev, [ev.target.name]: ev.target.value }));
	}

	const submitForm = async (ev: FormEvent<FormFields>) => {
		ev.preventDefault();
		const { id, repositoryUrl } = ev.target.elements;

		const error = await addRepositoryWidget.save({
			id: id.value,
			repositoryUrl: repositoryUrl.value,
		});

		setHasAlreadyExistsError(!!error);
		setIsFormActive(false);
	};

	return (
		<article className={styles.add_widget}>
			<div className={styles.container}>
				{!isFormActive && !hasAlreadyExistsError ? (
					<button onClick={() => setIsFormActive(true)} className={styles.add_button}>
						<Add />
						<p>Añadir repositorio</p>
					</button>
				) : (
					// eslint-disable-next-line @typescript-eslint/no-misused-promises
					<form className={styles.form} onSubmit={submitForm}>
						<div>
							<label htmlFor="id">Id</label>
							<input type="text" name="id" id="id" onChange={handleChange} />
						</div>
						<div>
							<label htmlFor="repositoryUrl">Url del repositorio</label>
							<input type="text" name="repositoryUrl" id="repositoryUrl" onChange={handleChange} />
						</div>

						{hasAlreadyExistsError && (
							<p className={styles.error} role="alert" aria-describedby="duplicate-widget-error">
								<span id="duplicate-widget-error">Repositorio duplicado.</span>
							</p>
						)}

						<div>
							<input type="submit" value="Añadir" disabled={!isFormValid} />
						</div>
					</form>
				)}
			</div>
		</article>
	);
}
