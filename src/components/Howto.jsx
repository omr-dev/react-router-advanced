import { useOutletContext } from 'react-router-dom';
export const Howto = () => {
	const howto = useOutletContext();
	return (
		<>
			{howto && (
				<div className="howto">
					<a
						href={`https://edwardtanguay.netlify.app/howtos?id=${howto.id}`}
						target="_blank"
					>
						<h4>{howto.title}</h4>
					</a>
					<pre>{howto.body}</pre>
				</div>
			)}
		</>
	);
};
