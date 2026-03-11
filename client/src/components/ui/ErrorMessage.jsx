function ErrorMessage({ message = 'Something went wrong.' }) {
	return (
		<section role="alert" aria-live="polite">
			<p>{message}</p>
		</section>
	);
}

export default ErrorMessage;
