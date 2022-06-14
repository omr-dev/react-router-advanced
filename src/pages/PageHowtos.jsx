import { useEffect, useState } from 'react';
import axios from 'axios';
import {
	NavLink,
	useParams,
	useNavigate,
	Outlet,
	
} from 'react-router-dom';

export const PageHowtos = () => {
	let { id } = useParams();
	const categoryOfHowto = 'php';
	const [filteredHowtos, setFilteredHowtos] = useState([]);
	
	const navigate = useNavigate();
	useEffect(() => {
		(async () => {
			const howtos = (
				await axios.get(
					'https://edwardtanguay.netlify.app/share/howtos.json'
				)
			).data;
			const _filteredHowtos = howtos.filter(
				(howto) => howto.category.toLowerCase() === categoryOfHowto
			);
			setFilteredHowtos(_filteredHowtos);
			console.log(
				`Category: ${categoryOfHowto}. There are ${_filteredHowtos.length} howtos`
			);
		})();
	}, []);

	const getCurrentHowto = () => {
		if (id) {
			return filteredHowtos.find((howto) => {

				return howto.id == id;
			});
		} else {
			if (filteredHowtos.length > 0) {
				const _id = String(filteredHowtos[0].id);
				navigate(_id);
			}
		}
	};

	return (
		<div className="page-howtos">
			<h2>Howtos</h2>
			<p>{`These are my ${categoryOfHowto} howtos:`}</p>
			<ul>
				{filteredHowtos.length > 0 &&
					filteredHowtos.map((howto, index) => {
						return (
							<li key={index}>
								<NavLink to={String(howto.id)}>
									{howto.title} ({howto.id})
								</NavLink>
							</li>
						);
					})}
			</ul>

			<Outlet context={getCurrentHowto()} />
		</div>
	);
};
