import oceansJPG from "/album/oceans-the-blue-stones.jpg";
import masterBlasterJPG from "/album/master-blaster-stevie-wonder.jpg";
import noDiggityJPG from "/album/no-diggity-chet-faker.jpg";
import suitInTheBackJPG from "/album/suit-in-the-back-quaker-city-night-hawks.jpg";
import highNoMoreJPG from "/album/high-no-more-hajaj.jpg";
import desireJPG from "/album/desire-warhaus.jpg";
import whiskeyJPG from "/album/whiskey-tejon-street-corner-thieves.jpg";

import oceansMP3 from "/songs/oceans-the-blue-stones.mp3";
import masterBlasterMP3 from "/songs/stevie-wonder-master-blaster.mp3";
import noDiggityMP3 from "/songs/no-diggity-chet-faker.mp3";
import suitInTheBackMP3 from "/songs/suit-in-the-back-quaker-city-night-hawks.mp3";
import highNoMoreMP3 from "/songs/high-no-more-hajaj.mp3";
import desireMP3 from "/songs/desire-warhaus.mp3";
import whiskeyMP3 from "/songs/whiskey-tejon-street-corner-thieves.mp3";

export const useSongData = (songByAlbum, songByArtist, songByTitle) => {

	const songData = [
		{
			albumId: 1,
			title: "Oceans",
			artist: "The Blue Stones",
			image: oceansJPG,
			mp3: oceansMP3,
		},
		{
			albumId: 2,
			title: "Master Blaster (Jammin')",
			artist: "Stevie Wonder",
			image: masterBlasterJPG,
			mp3: masterBlasterMP3,
		},
		{
			albumId: 3,
			title: "No Diggity",
			artist: "Chet Faker",
			image: noDiggityJPG,
			mp3: noDiggityMP3,
		},
		{
			albumId: 4,
			title: "Suit in the Back",
			artist: "Quaker City Night Hawks",
			image: suitInTheBackJPG,
			mp3: suitInTheBackMP3,
		},
		{
			albumId: 5,
			title: "High No More",
			artist: "Hajaj",
			image: highNoMoreJPG,
			mp3: highNoMoreMP3,
		},
		{
			albumId: 6,
			title: "Desire",
			artist: "Warhaus",
			image: desireJPG,
			mp3: desireMP3,
		},
		{
			albumId: 7,
			title: "Whiskey",
			artist: "Tejon Street Corner Thieves",
			image: whiskeyJPG,
			mp3: whiskeyMP3,
		},
	];

	if (songByAlbum) return songData.filter((song) => song.albumId === songByAlbum);
	if (songByArtist) return songData.filter((song) => song.artist == songByArtist)
	if (songByTitle) return songData.filter((song) => song.title.includes(songByTitle));

	return songData;
};
