import axios from "axios";
import BASE_URL from "../utils/constants";
import { useDispatch } from "react-redux";
import { removeUserFromFeed } from "../utils/feedSLice";

const UserCard = ({ user }) => {
  const { firstName, lastName, age, gender, about, photoUrl,_id } = user;
  //console.log(user);
  const dispatch = useDispatch();

  const handleSendRequests = async (status, userId) => {
    try {
      const res = await axios.post(
        BASE_URL + "/request/send/" + status + "/" + userId,
        {},
        { withCredentials: true }
      );
      dispatch(removeUserFromFeed(userId));
    } catch (error) {
      // res.status(400).send("ERROR : " + error);
    }
  };

  return (
    <div>
      <div className="card bg-base-200 w-96 shadow-xl">
        <figure>
          <img src={photoUrl} alt="user photo" />
        </figure>
        <div className="card-body">
          <h2 className="card-title">{firstName + " " + lastName}</h2>
          {age && gender && <p>{gender + ", " + age}</p>}
          <p>{about}</p>
          <div className="card-actions justify-center my-4">
            <button
              className="btn btn-primary"
              onClick={() =>{
                handleSendRequests("ignored", _id);
              }}
            >
              Ignore
            </button>
            <button
              className="btn btn-secondary"
              onClick={() => {
                handleSendRequests("interested", _id);
              }}
            >
              Interested
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserCard;
