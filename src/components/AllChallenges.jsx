import { useState, useEffect, useCallback } from "react";
import { usePapers } from "../hooks/usePapers";

import Alert from "./Alert";
import PublicationCard from "./PublicationCard";

export default function Challenges() {
  const { getAllChallenges } = usePapers();
  const publications = [
    {
      timeAgo: "55 minutes ago",
      title:
        "Prolonged immune alteration following resolution of acute inflammation in humans",
      journal: "PLoS ONE",
      year: 2017,
      authors: [
        "Madhur P. Motwani",
        "Justine Newson",
        "Simon Kwong",
        "Angela Richard-Loendt",
        "Romain Colas",
        "Jesmond Dalli",
        "Derek W. Gilroy",
      ],
      commentsCount: 1,
    },
    // ... other publication data
  ];

  const [challenges, setChallenges] = useState([]);

  const getChallenges = useCallback(async () => {
    try {
      const { data } = await getAllChallenges();
      if (data) {
        setChallenges(data.message);
      }
    } catch (e) {
      alert(e);
    }
  }, [getAllChallenges]);

  useEffect(() => {
    getChallenges();
  }, [getChallenges]);
  return (
    <div>
      <div className="px-4 sm:px-0">
        <h3 className="text-base font-semibold leading-7 text-gray-900">
          All Challenges
        </h3>
        <p className="mt-1 max-w-2xl text-sm leading-6 text-gray-500">
          All the Challenges so far...
        </p>
      </div>
      <div className="container mx-auto p-4">
        {challenges && challenges.length > 0 ? (
          challenges.map((challenge, index) => (
            <PublicationCard key={index} {...challenge} />
          ))
        ) : (
          <Alert title="Sorry!" message="No challenges found..." />
        )}
      </div>
    </div>
  );
}
