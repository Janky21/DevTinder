import axios from "axios";
import React, { useEffect } from "react";
import BASE_URL from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addRequests, removeRequests } from "../utils/requestsSlice";

const Requests = () => {
  const requests = useSelector((store) => store.requests);
  const dispatch = useDispatch();

  const reviewRequest = async (status, _id) => {
    try {
      const res = axios.post(
        BASE_URL + "/request/reveiw/" + status + "/" + _id,
        {},
        { withCredentials: true }
      );
      dispatch(removeRequests(_id));
    } catch (error) {
      res.status(400).send("ERROR : " + error);
    }
  };

  const viewRequests = async () => {
    try {
      const res = await axios.get(BASE_URL + "/user/requests/received", {
        withCredentials: true,
      });
      dispatch(addRequests(res.data.data));
    } catch (error) {
      res.status(400).send("ERROR :" + error.message);
    }
  };

  useEffect(() => {
    viewRequests();
  }, []);

  if (!requests) return;

  if (requests.length === 0)
    return (
      <h1 className="font-bold text-2xl text-center">No Requests Found</h1>
    );

  return (
    <div className=" text-center my-10">
      <h1 className="font-bold text-3xl">Requests</h1>

      {requests.map((request) => {
        const {
          _id,
          firstName,
          lastName,
          photoUrl,
          age,
          gender,
          about,
          skills,
        } = request.fromUserId;

        return (
          <div
            key={_id}
            className="flex justify-between items-center m-4 p-4 rounded-lg bg-base-200 w-2/3 mx-auto"
          >
            <div>
              <img
                alt="user photo"
                className="w-20 h-20 rounded-full"
                src={photoUrl}
              />
            </div>
            <div className="text-justify mx-4">
              <h2 className="font-bold text-xl">
                {firstName + " " + lastName}
              </h2>
              {age && gender && <p>{age + ", " + gender}</p>}
              <p>{about}</p>
            </div>
            <div>
              <button
                className="btn btn-active btn-primary mx-2"
                onClick={() => {
                  reviewRequest("rejected", request._id);
                }}
              >
                Reject
              </button>
              <button
                className="btn btn-active btn-secondary mx-2"
                onClick={() => {
                  reviewRequest("accepted", request._id);
                }}
              >
                Accept
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Requests;
