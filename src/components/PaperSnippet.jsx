import React from "react";
import { FaUsers } from "react-icons/fa";

export default function PaperSnippet({ data }) {
  console.log({ data });
  return (
    <div>
      <div className="px-4 border">
        <div className="my-5 flex items-center justify-between">
          <h2 className="text-lg font-semibold text-gray-900">
            Paper Information
          </h2>
        </div>
        <div className="mb-6 rounded-lg bg-white p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <div>
                <h3 className="text-base font-semibold text-gray-900">
                  {data?.title}
                </h3>
                <span className="block text-xs font-normal text-gray-500">
                  Title
                </span>
              </div>
            </div>
            <p className="text-sm font-medium text-indigo-500">
              <a href={data?.doi} target="_blank">
                Visit
              </a>
            </p>
          </div>
          <div className="mt-6 flex items-center justify-between text-sm font-semibold text-gray-900">
            <div className="flex">
              <FaUsers size="20px" />
              &nbsp;
              {data?.author &&
                data.author.length > 0 &&
                data.author.map((d) => d.name.concat(", "))}
            </div>
            <div className="flex items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                className="mr-1 h-5 w-6 text-yellow-500"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z"
                />
              </svg>
              4,7 (750 Reviews)
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
