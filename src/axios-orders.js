import axios from "axios";

const instance = axios.create({
  baseURL: "https://my-react-burger-7980a.firebaseio.com/"
});

export default instance;
