import { formatDistanceToNow } from "date-fns";
import { useState } from "react";
import axios from "axios";
import { useAuthContext } from "../hooks/useAuthContext.js";
import React from "react";

const baseUrl = process.env.REACT_APP_BASE_URL;
const apiUrl = process.env.REACT_APP_API_URL;

const TabletCards = ({ listOfTablets }) => {
  const { user } = useAuthContext();

  const [tabletName, setTabletName] = useState(
    listOfTablets.customID ? listOfTablets.customID : listOfTablets.name
  );
  const [isEdit, setIsEdit] = useState(false);

  const changeCustomID = async (customID) => {
    await axios
      .patch(
        `${apiUrl}/tablets/${listOfTablets.id}/customID`,
        {
          customID: customID,
        },
        {
          headers: { Authorization: `Bearer ${user.token}` },
        }
      )
      .then()
      .catch();
  };

  const imageUrl = listOfTablets.image
    ? `${baseUrl}${listOfTablets.image}`
    : "https://via.placeholder.com/300x300?text=No+Image";

  return (
    <div className={"row-sm-2 my-5 mx-5 d-inline-flex"}>
      <div className={"card"}>
        <div
          className={"card-header text-center h5"}
          style={{
            color:
              listOfTablets?.status === "done"
                ? "green"
                : listOfTablets.status === "ready to check"
                ? "orange"
                : "red",
          }}
          key={listOfTablets._id}
        >
          {listOfTablets.status}
        </div>
        <div className={"card-body"}>
          <img
            src={`${baseUrl}/uploads/` + listOfTablets.name}
            className={"card-img-top"}
            alt={"tablet"}
          />
          <h4 className={"card-title my-4"}>
            {" "}
            {tabletName} &nbsp; &nbsp;{" "}
            <i
              className={"fa-regular fa-pen-to-square"}
              onClick={() => setIsEdit(!isEdit)}
            ></i>{" "}
          </h4>
          {isEdit && (
            <div className={"d-flex gap-2 align-items-center"}>
              <input
                type={"text"}
                id={"changeCustomIDField"}
                className={"form-control set-custom-id-div"}
              />
              <button
                className={"set-custom-id-btn"}
                onClick={() => {
                  const customID = document.getElementById(
                    "changeCustomIDField"
                  ).value;
                  changeCustomID(customID).then();
                  setTabletName(customID);
                  setIsEdit(false);
                }}
              >
                {" "}
                Change ID{" "}
              </button>
            </div>
          )}
          <h6 className={"card-title my-4"}>
            {" "}
            Database ID: {listOfTablets.id}{" "}
          </h6>
          <a
            href={"/tablet/" + listOfTablets.id}
            className={"btn btn-primary align-items-center my-2"}
          >
            {" "}
            Annotate{" "}
          </a>
        </div>
        <div className={"card-footer text-muted"}>
          last update:{" "}
          {formatDistanceToNow(new Date(listOfTablets.updatedAt), {
            addSuffix: true,
          })}
        </div>
      </div>
    </div>
  );
};

export default TabletCards;
