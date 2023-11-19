import { useCallback, useEffect, useState } from "react";

import { usePapers } from "../hooks/usePapers";
import { useAuthContext } from "../contexts/AuthContext";
import { getRemainingTime } from "../utils/dateManipulation";

import Alert from "./Alert";

export default function Challenges() {
  const { address } = useAuthContext();
  const [data, setData] = useState([]);
  const { getUserChallenge } = usePapers();

  const getMyChallenges = useCallback(async () => {
    try {
      const { data } = await getUserChallenge(address);
      if (data) {
        setData(data.message);
      }
    } catch (e) {
      alert(e);
    }
  }, [address, getUserChallenge]);

  useEffect(() => {
    getMyChallenges();
  }, [getMyChallenges]);

  return (
    <div>
      <div className="px-4 sm:px-0">
        <h3 className="text-base font-semibold leading-7 text-gray-900">
          My Challenges
        </h3>
      </div>
      <div className="w-full mb-12 xl:mb-0 mx-auto">
        <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded ">
          <div className="block w-full overflow-x-auto mt-5">
            <table className="items-center bg-transparent w-full border-collapse ">
              <thead>
                <tr>
                  <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                    Title
                  </th>
                  <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                    Description
                  </th>
                  <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                    DOI
                  </th>
                  <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                    Time Remaining
                  </th>
                  <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                    Evidence
                  </th>
                </tr>
              </thead>

              <tbody>
                {data && data.length > 0 ? (
                  data.map((challenge, idx) => {
                    return (
                      <tr key={idx}>
                        <th className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left text-blueGray-700">
                          {challenge?.title}
                        </th>
                        <th className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left text-blueGray-700">
                          {challenge?.description
                            ? challenge?.description.substring(0, 50)
                            : ""}
                        </th>
                        <th className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left text-blueGray-700">
                          <a
                            href={challenge?.doi}
                            className="underline"
                            target="_blank"
                          >
                            Link
                          </a>
                        </th>
                        <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                          {challenge?.createdAt
                            ? getRemainingTime(challenge?.createdAt.seconds)
                            : ""}
                        </td>
                        <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                          <a
                            href={"//".concat(challenge?.image)}
                            className="underline"
                            target="_blank"
                          >
                            Check
                          </a>
                        </td>
                      </tr>
                    );
                  })
                ) : (
                  <tr>
                    <td colSpan={5}>
                      <Alert title="Sorry!" message="No Challenges Found." />
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
