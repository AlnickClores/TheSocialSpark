import { icons } from "../../assets/icons/icons";
import { useNavigate } from "react-router-dom";

const FollowingFollowers = (props: any) => {
  const navigate = useNavigate();

  const navigateToProfile = (username: string) => {
    navigate(`/profile/${username}`);
    props.setModalOpen(!props.modalOpen);
  };

  return (
    <div
      className="bg-[#121212] border border-gray-600 p-3 rounded-xl h-96 w-[85%] absolute left-2/4 top-2/4 overflow-scroll"
      style={{
        transform: "translate(-50%, -50%)",
      }}
    >
      <div>
        <div className="flex justify-between">
          <h1 className="text-xl font-bold text-gray-400">
            {props.action === "following" ? "Following" : "Followers"}
          </h1>
          <span onClick={props.handleOpenModal}>{icons.cross}</span>
        </div>

        <div className="mt-5">
          {props.action === "following"
            ? props.following.map((data: any) => (
                <button
                  className="flex items-center gap-2 my-3 border border-gray-600 px-3 py-2 rounded-md w-full"
                  key={data.userID}
                  onClick={() => navigateToProfile(data.username)}
                >
                  <img
                    src={`http://localhost:3000/uploads/${data.image}`}
                    alt="profile image"
                    className="w-8 h-8 rounded-full"
                  />

                  <h1 className="font-semibold text-sm text-gray-300">
                    {data.username}
                  </h1>
                </button>
              ))
            : props.followers.map((data: any) => (
                <button
                  className="flex items-center gap-2 my-3 border border-gray-600 px-3 py-2 rounded-md w-full"
                  key={data.userID}
                  onClick={() => navigateToProfile(data.username)}
                >
                  {data.image ? (
                    <img
                      src={`http://localhost:3000/uploads/${data.image}`}
                      alt="profile image"
                      className="w-8 h-8 rounded-full"
                    />
                  ) : (
                    icons.userCircle
                  )}

                  <h1 className="font-semibold text-sm text-gray-300">
                    {data.username}
                  </h1>
                </button>
              ))}
        </div>
      </div>
    </div>
  );
};

export default FollowingFollowers;
