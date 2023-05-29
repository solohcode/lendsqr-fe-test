import axios from 'axios';
import { useQuery } from "react-query";
import { notification } from  "antd";

const getAllUsers = async () => await axios.get("https://6270020422c706a0ae70b72c.mockapi.io/lendsqr/api/v1/users")
.then(({ data }) => Promise.resolve(data))
.catch(({ response: { data } }) => Promise.reject(data));;

export default function useGetAllUsers(key?: any) {
  return useQuery(
    ["get:all_users", key],
    () => getAllUsers(),
    {
      retry: 2,
      onError: (err) => {
        notification.error({
          message: "Error!",
          description: String(err || "Something went wrong!")
        })
      }
    }
  );
}