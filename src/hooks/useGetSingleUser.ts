import axios from 'axios';
import { useQuery } from "react-query";
import { notification } from  "antd";

const getSingleUser = async (id: string) => await axios.get(`https://6270020422c706a0ae70b72c.mockapi.io/lendsqr/api/v1/users/${id}`)
.then(({ data }) => Promise.resolve(data))
.catch(({ response: { data } }) => Promise.reject(data));;

export default function useGetSingleUser(id: string) {
  return useQuery(
    ["get:single_user", id],
    () => getSingleUser(id),
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