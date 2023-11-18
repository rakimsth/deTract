import { useEffect, useState, useCallback } from "react";
import { Link, useSearchParams } from "react-router-dom";
import moment from "moment";
import { usePapers } from "../hooks/usePapers";
import { useAuthContext } from "../contexts/AuthContext";

export default function ChallengeDetail() {
  const { address } = useAuthContext();
  const [searchParams, setSearchParams] = useSearchParams();
  const doi = searchParams.get("doi");
  const challengeId = searchParams.get("challengeId");
  const { fetchDetail, getAllChallenges } = usePapers();

  const [challenge, setChallenge] = useState(null);
  const [paperInfo, setPaperInfo] = useState(null);

  const getById = useCallback(async () => {
    try {
      const { data } = await fetchDetail(doi);
      if (data) {
        setPaperInfo(data.message.paperData);
      }
    } catch (e) {
      alert(e);
    }
  }, [doi, fetchDetail]);

  const handleRetract = (e) => {
    e.preventDefault();
  };

  const handleDownVote = (e) => {
    e.preventDefault();
  };

  const getChallenges = useCallback(async () => {
    try {
      const { data } = await getAllChallenges();
      if (data) {
        setChallenge(data.message);
      }
    } catch (e) {
      alert(e);
    }
  }, [address, getAllChallenges]);

  useEffect(() => {
    getChallenges();
  }, [getChallenges]);

  useEffect(() => {
    getById();
  }, [getById]);

  const thisChallenge =
    challenge && challenge.length > 0
      ? challenge.find((c) => c.challengeId === challengeId)
      : {};

  return (
    <>
      <div>
        <div className="flex gap-2 pt-10 float-right">
          <button
            onClick={() => handleRetract()}
            className="py-1.5 px-12 hover:text-green-600 hover:scale-105 hover:shadow text-center border border-gray-300 rounded-md border-gray-400 h-12 text-sm flex items-center gap-1 lg:gap-2"
          >
            <svg
              className="w-12 h-12"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M6.633 10.5c.806 0 1.533-.446 2.031-1.08a9.041 9.041 0 012.861-2.4c.723-.384 1.35-.956 1.653-1.715a4.498 4.498 0 00.322-1.672V3a.75.75 0 01.75-.75A2.25 2.25 0 0116.5 4.5c0 1.152-.26 2.243-.723 3.218-.266.558.107 1.282.725 1.282h3.126c1.026 0 1.945.694 2.054 1.715.045.422.068.85.068 1.285a11.95 11.95 0 01-2.649 7.521c-.388.482-.987.729-1.605.729H13.48c-.483 0-.964-.078-1.423-.23l-3.114-1.04a4.501 4.501 0 00-1.423-.23H5.904M14.25 9h2.25M5.904 18.75c.083.205.173.405.27.602.197.4-.078.898-.523.898h-.908c-.889 0-1.713-.518-1.972-1.368a12 12 0 01-.521-3.507c0-1.553.295-3.036.831-4.398C3.387 10.203 4.167 9.75 5 9.75h1.053c.472 0 .745.556.5.96a8.958 8.958 0 00-1.302 4.665c0 1.194.232 2.333.654 3.375z"
              ></path>
            </svg>
            <span>Retract</span>
          </button>

          <button
            onClick={() => handleDownVote()}
            className="py-1.5 px-12 hover:text-red-600 hover:scale-105 hover:shadow text-center border border-gray-300 rounded-md border-gray-400 h-12 text-sm flex items-center gap-1 lg:gap-2"
          >
            <svg
              className="w-12 h-12"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M7.5 15h2.25m8.024-9.75c.011.05.028.1.052.148.591 1.2.924 2.55.924 3.977a8.96 8.96 0 01-.999 4.125m.023-8.25c-.076-.365.183-.75.575-.75h.908c.889 0 1.713.518 1.972 1.368.339 1.11.521 2.287.521 3.507 0 1.553-.295 3.036-.831 4.398C20.613 14.547 19.833 15 19 15h-1.053c-.472 0-.745-.556-.5-.96a8.95 8.95 0 00.303-.54m.023-8.25H16.48a4.5 4.5 0 01-1.423-.23l-3.114-1.04a4.5 4.5 0 00-1.423-.23H6.504c-.618 0-1.217.247-1.605.729A11.95 11.95 0 002.25 12c0 .434.023.863.068 1.285C2.427 14.306 3.346 15 4.372 15h3.126c.618 0 .991.724.725 1.282A7.471 7.471 0 007.5 19.5a2.25 2.25 0 002.25 2.25.75.75 0 00.75-.75v-.633c0-.573.11-1.14.322-1.672.304-.76.93-1.33 1.653-1.715a9.04 9.04 0 002.86-2.4c.498-.634 1.226-1.08 2.032-1.08h.384"
              ></path>
            </svg>
            <span>Dismiss</span>
          </button>
        </div>
        <div className="container w-6/12 md:max-w-4xl mx-auto pt-20">
          <div className="w-full px-4 md:px-6 text-xl text-gray-800 leading-normal">
            <div className="font-sans">
              <p className="text-base md:text-sm text-green-500 font-bold">
                &lt;{" "}
                <Link
                  to="/dashboard"
                  className="text-base md:text-sm text-green-500 font-bold no-underline hover:underline"
                >
                  BACK TO CHALLENGES
                </Link>
              </p>
              <h1 className="font-bold font-sans break-normal text-gray-900 pt-6 pb-2 text-3xl md:text-4xl">
                {paperInfo ? paperInfo?.title : ""}
              </h1>
              <p className="text-xs md:text-base font-normal text-gray-600">
                {paperInfo && paperInfo?.author
                  ? paperInfo.author.map((d) => d.name).toString()
                  : ""}
              </p>
              <p className="text-sm md:text-base font-normal text-gray-600 mt-2">
                Published at{" "}
                {paperInfo && paperInfo?.published
                  ? moment(paperInfo?.published).format("lll")
                  : ""}
              </p>
            </div>

            <p className="py-6 text-sm">{paperInfo?.summary || ""}</p>
            <blockquote className="border-l-4 border-green-500 italic my-8 pl-8 md:pl-12">
              Challenge details
            </blockquote>
            <div className="max-w-2xl p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
              <a href="#">
                <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                  {thisChallenge ? thisChallenge?.data?.title : ""}
                </h5>
              </a>
              <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
                {thisChallenge ? thisChallenge?.data?.description : ""}
              </p>
              <a
                target="_blank"
                href={
                  thisChallenge ? "//".concat(thisChallenge?.data?.image) : ""
                }
                className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              >
                Link to Evidence
                <svg
                  className="rtl:rotate-180 w-3.5 h-3.5 ms-2"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 14 10"
                >
                  <path
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M1 5h12m0 0L9 1m4 4L9 9"
                  />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
