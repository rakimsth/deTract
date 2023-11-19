import { useEffect, useState, useCallback } from "react";
import { PhotoIcon } from "@heroicons/react/24/solid";
import { Link, useSearchParams, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

import { usePapers } from "../hooks/usePapers";
import PaperSnippet from "../components/PaperSnippet";
import { useAuthContext } from "../contexts/AuthContext";
import { useContract } from "../hooks/useContract";

export default function Details() {
  const [searchParams, setSearchParams] = useSearchParams();
  const doi = searchParams.get("doi");

  const navigate = useNavigate();
  const { address } = useAuthContext();
  const { getVotingPeriod, challengePaper } = useContract();

  const { fetchDetail, upload, loading } = usePapers();

  const [paperInfo, setPaperInfo] = useState(null);
  const [file, setFile] = useState(null);
  const [challenge, setChallenge] = useState({
    title: "",
    description: "",
  });

  const handleFile = (event) => {
    event.preventDefault();
    if (event.target.files) {
      if (event.target.files.length > 1) alert("You can upload only 1 file");
      else {
        setFile([...event.target.files]);
      }
    }
  };

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const payload = JSON.stringify({
        title: challenge?.title,
        description: challenge?.description,
        user_address: address,
        paper: paperInfo?.title,
        authors: paperInfo?.author,
        doi: doi,
      });
      const formData = new FormData();
      file &&
        file.length > 0 &&
        file.forEach((file) => {
          formData.append("images", file);
        });
      formData.append("metadata", payload);

      const result = await Swal.fire({
        title: "Warning!",
        text: "Your staked 0.05 ETH will only be refunded if the paper is retracted.",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, challenge it!",
      });
      if (result.isConfirmed) {
        const { data } = await upload(formData);
        await challengePaper(data?.doi, data?.IpfsHash);

        if (data?.IpfsHash) {
          Swal.fire({
            title: "Challenged!",
            text: "Challenge added successfully",
            icon: "success",
          });
          navigate("/dashboard");
        }

      }
    } catch (e) {
      alert(e);
    }
  };

  useEffect(() => {
    getById();
  }, [getById]);

  return (
    <form onSubmit={handleSubmit}>
      <div>{paperInfo && <PaperSnippet data={paperInfo} />}</div>
      <div className="space-y-12">
        <div className="border-b border-gray-900/10 pb-12">
          <h2 className="text-base font-semibold leading-7 text-gray-900">
            Challenge Paper
          </h2>
          <p className="mt-1 text-sm leading-6 text-gray-600">
            This information will be displayed publicly so be careful what you
            share.
          </p>

          <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
            <div className="col-span-full">
              <label
                htmlFor="title"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Challenge title
              </label>
              <div className="mt-2">
                <input
                  type="text"
                  value={challenge?.title}
                  name="title"
                  onChange={(e) => {
                    setChallenge((prev) => {
                      return { ...prev, title: e.target.value };
                    });
                  }}
                  className="block w-full rounded-md border-0 p-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>
            <div className="col-span-full">
              <label
                htmlFor="description"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Challenge description
              </label>
              <div className="mt-2">
                <textarea
                  name="description"
                  rows={3}
                  className="block w-full rounded-md border-0 p-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  value={challenge?.description}
                  onChange={(e) => {
                    setChallenge((prev) => {
                      return { ...prev, description: e.target.value };
                    });
                  }}
                />
              </div>
              <p className="mt-3 text-sm leading-6 text-gray-600">
                Write a few sentences about challenge.
              </p>
            </div>
            <div className="col-span-full">
              <label
                htmlFor="evidence"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Evidence
              </label>
              <div className="mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10">
                <div className="text-center">
                  <PhotoIcon
                    className="mx-auto h-12 w-12 text-gray-300"
                    aria-hidden="true"
                  />

                  <div className="max-w-2xl mx-auto">
                    <label
                      className="block mb-2 text-sm font-medium dark:text-gray-300"
                      htmlFor="file_input"
                    >
                      Upload file
                    </label>
                    <input
                      className="block w-full text-sm  border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none  dark:placeholder-gray-400"
                      id="file_input"
                      type="file"
                      onChange={handleFile}
                      accept="application/pdf"
                    />
                    <p className="text-xs leading-5 text-gray-600">
                      PDF up to 5MB
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-6 flex items-center justify-end gap-x-6">
        <Link
          to="/papers"
          type="button"
          className="text-sm font-semibold leading-6 text-gray-900"
        >
          Cancel
        </Link>
        <button
          disabled={loading}
          type="submit"
          className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
          Stake and challenge
        </button>
      </div>
    </form>
  );
}
