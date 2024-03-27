import theBlueStones from "../../public/artist/the-blue-stones.png";
import stevieWonder from "../../public/artist/stevie-wonder.png";
import chetFaker from "../../public/artist/chet-faker.png";
import quakerCityNightHawks from "../../public/artist/quaker-city-night-hawks.png";
import hajaj from "../../public/artist/hajaj.png";
import warhaus from "../../public/artist/warhaus.png";
import tejonStreetCornerThieves from "../../public/artist/tejon-street-corner-thieves.png";

export const useArtistData = (artistByTitle) => {
	const artistData = [
		{
			title: "The Blue Stones",
			image: theBlueStones,
		},
		{
			title: "Stevie Wonder",
			image: stevieWonder,
		},
		{
			title: "Chet Faker",
			image: chetFaker,
		},
		{
			title: "Quaker City Night Hawks",
			image: quakerCityNightHawks,
		},
		{
			title: "Hajaj",
			image: hajaj,
		},
		{
			title: "Warhaus",
			image: warhaus,
		},
		{
			title: "Tejon Street Corner Thieves",
			image: tejonStreetCornerThieves,
		},
	];

	if (artistByTitle) return artistData.find((artist) => artist.title === artistByTitle);
	return artistData;
};

