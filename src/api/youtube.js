import axios from "axios";

const KEY = "AIzaSyAAYF2OJ57_GaJPwcoBdYNIEaT9fj75C5k";

export default axios.create({
	baseURL: "https://www.googleapis.com/youtube/v3",
	params: {
		part: "snippet",
		type: "video",
		maxResults: 1,
		key: KEY,
	},
});
