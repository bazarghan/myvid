import axios from "axios";
import { domain } from "../constants/constant";

export default axios.create({
  baseURL: domain+"/",
});
