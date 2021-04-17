import axios from "axios";

const KEY = "AIzaSyAJKBHucx_E3r-rINmmk8qSiz04UuOlrNM";

export default axios.create({
	baseURL: "https://www.googleapis.com/youtube/v3",
	params: {
		part: "snippet",
		type: "video",
		maxResults: 1,
		key: KEY,
	},
});
