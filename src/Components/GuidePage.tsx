import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

interface Guide {
  id: string;
  title: string;
  thumbnailUrl: string;
  description: string;
  author: string;
  // Add other fields as needed
}

function GuidePage() {
  const { id } = useParams();
  const [guide, setGuide] = useState<Guide | null>(null);

  useEffect(() => {
    fetch("../data/guides.json")
      .then((res) => res.json())
      .then((data) => {
        const found = data.find((g: any) => g.id === id);
        setGuide(found);
      });
  }, [id]);

  if (!guide) return <div>Loading...</div>;

  return (
    <div>
      <h1>{guide.title}</h1>
      <img src={guide.thumbnailUrl} alt={guide.title} />
      <p>{guide.description}</p>
      <div>Author: {guide.author}</div>
      {/* Add more guide details here */}
    </div>
  );
}

export default GuidePage;