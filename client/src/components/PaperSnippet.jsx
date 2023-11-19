import React from "react";
import { FaUsers } from "react-icons/fa";

export default function PaperSnippet({ data }) {
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
          </div>
        </div>
      </div>
    </div>
  );
}
