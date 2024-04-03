import oceansJPG from "/album/oceans-the-blue-stones.jpg";
import masterBlasterJPG from "/album/master-blaster-stevie-wonder.jpg";
import noDiggityJPG from "/album/no-diggity-chet-faker.jpg";
import suitInTheBackJPG from "/album/suit-in-the-back-quaker-city-night-hawks.jpg";
import highNoMoreJPG from "/album/high-no-more-hajaj.jpg";
import desireJPG from "/album/desire-warhaus.jpg";
import whiskeyJPG from "/album/whiskey-tejon-street-corner-thieves.jpg";

export const useAlbumData = (albumByTitle) => {
	const albumData = [
		{
			id: 1,
			title: "Hidden Gems",
			artist: "The Blue Stones",
			image: oceansJPG,
		},
		{
			id: 2,
			title: "Hotter than July",
			artist: "Stevie Wonder",
			image: masterBlasterJPG,
		},
		{
			id: 3,
			title: "Thinking in textures",
			artist: "Chet Faker",
			image: noDiggityJPG,
		},
		{
			id: 4,
			title: "QCNH",
			artist: "Quaker City Night Hawks",
			image: suitInTheBackJPG,
		},
		{
			id: 5,
			title: "Last Call Ror Coco",
			artist: "Hajaj",
			image: highNoMoreJPG,
		},
		{
			id: 6,
			title: "Ha Ha Heartbreak",
			artist: "Warhaus",
			image: desireJPG,
		},
		{
			id: 7,
			title: "Every Last Drop",
			artist: "Tejon Street Corner Thieves",
			image: whiskeyJPG,
		},
	];

	if (albumByTitle) return albumData.find((album) => album.title === albumByTitle);
	return albumData;
};
