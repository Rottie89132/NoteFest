import theBlueStones from "/artist/the-blue-stones.png";
import stevieWonder from "/artist/stevie-wonder.png";
import chetFaker from "/artist/chet-faker.png";
import quakerCityNightHawks from "/artist/quaker-city-night-hawks.png";
import hajaj from "/artist/hajaj.png";
import warhaus from "/artist/warhaus.png";
import tejonStreetCornerThieves from "/artist/tejon-street-corner-thieves.png";

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

