import axios from "axios";

const KEY = "AIzaSyBbdQwTtZDKt7v55wNic8dwNJKR4QRNUiE";

export default axios.create({
	baseURL: "https://www.googleapis.com/youtube/v3",
	params: {
		part: "snippet",
		type: "video",
		maxResults: 1,
		key: KEY,
	},
});
