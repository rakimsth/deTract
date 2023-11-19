import { useState } from "react";
import { Link } from "react-router-dom";
import { usePapers } from "../hooks/usePapers";
import moment from "moment";
import Alert from "../components/Alert";

export default function List() {
  const { fetchDetail, loading } = usePapers();
  const [paper, setPaper] = useState("");
  const [result, setResult] = useState(null);
  const [info, setInfo] = useState("");

  const handleSubmit = async (e) => {
    const prefix = "http://dx.doi.org/";
    const query = paper.includes("http://") ? paper : prefix.concat(paper);
    const resp = await fetchDetail(query);
    if (!resp.data.message.paperData) {
      setInfo("Not Found");
      setTimeout(() => {
        setInfo("");
      }, 2500);
    } else {
      setResult(resp.data.message.paperData);
    }
  };

  console.log(result);
  const clearResult = () => {};
  return (
    <>
      <div className="h-80 bg-gray-100 flex justify-center items-center">
        <div className="flex items-center justify-center ">
          {!loading ? (
            <div className="flex border-2 border-gray-200 rounded">
              <input
                type="text"
                className="px-4 py-2 w-80"
                value={paper}
                onChange={(e) => setPaper(e.target.value)}
                placeholder="Search any paper using DOI..."
              />
              <button
                className="px-4 text-white bg-gray-600 border-l"
                disabled={loading}
                onClick={handleSubmit}
              >
                Search
              </button>
            </div>
          ) : (
            <>Loading...</>
          )}
        </div>
      </div>
      {info ? <Alert title="Sorry!" message="Journal not found" /> : null}
      <div className="h-100 bg-gray-100 flex justify-center items-center">
        <div className="flex items-center justify-center">
          {result && result?.title ? <FoundCard result={result} /> : null}
        </div>
      </div>
    </>
  );
}

const FoundCard = ({ result }) => {
  return (
    <>
      <div>
        <div className="inline-block min-w-full shadow rounded-lg overflow-hidden">
          <table className="min-w-full leading-normal">
            <thead>
              <tr>
                <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Title
                </th>
                <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Author
                </th>
                <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  DOI
                </th>
                <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Published
                </th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                  <div className="flex items-center">
                    <div className="ml-3">
                      <Link to={`/papers/${result.counter}?doi=${result.doi}`}>
                        <p className="text-gray-900 whitespace-no-wrap underline">
                          {result && result?.title
                            ? result?.title.substring(0, 80)
                            : ""}
                        </p>
                      </Link>
                    </div>
                  </div>
                </td>
                <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                  <p className="text-gray-900 whitespace-no-wrap">
                    {result?.author.length > 0
                      ? result?.author.map((author) => author.name).toString()
                      : ""}
                  </p>
                </td>
                <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                  <a
                    href={result.doi}
                    className="text-gray-900 whitespace-no-wrap underline"
                  >
                    {result && result?.doi ? result?.doi : ""}
                  </a>
                </td>
                <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                  <p className="text-gray-900 whitespace-no-wrap">
                    {result && result?.published
                      ? moment(result?.published).format("lll")
                      : ""}
                  </p>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};
