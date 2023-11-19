import React from "react";
import { Link } from "react-router-dom";
import { getRemainingTime } from "../utils/dateManipulation";

const PublicationCard = ({ challengeId, data }) => {
  return (
    <div className="bg-white shadow-md rounded-lg p-4 mb-4">
      <div className="flex items-center text-sm text-gray-600 mb-2">
        <span>
          {data?.createdAt ? getRemainingTime(data?.createdAt.seconds) : ""}
        </span>
      </div>
      <h3 className="font-semibold text-lg text-gray-800 mb-2">
        {data?.paper || ""}
      </h3>
      <p className="text-sm text-gray-600 mb-4">
        <a href={data?.doi} className="underline">
          {data?.doi}
        </a>
      </p>
      <div className="text-sm text-gray-800 mb-2">
        {data.authors && data.authors.length > 1
          ? data.authors.map((author, index) => (
              <span key={index}>
                {author.name}
                {index < author.name.length ? ", " : ""}
              </span>
            ))
          : ""}
      </div>
      <div className="flex items-center justify-between">
        <Link
          to={`/vote?doi=${data.doi}&challengeId=${challengeId}`}
          className="text-blue-600 hover:text-blue-800 visited:text-purple-600"
        >
          Vote Now
        </Link>
      </div>
    </div>
  );
};

export default PublicationCard;
