const questions = [
  "I have fever",
  "I have headache",
  "Find nearby pharmacy",
  "Recommend medicine",
  "I have stomach pain",
  "Medicine for cough",
];

interface Props {
  onSelect: (value: string) => void;
}

function SuggestedQuestions({ onSelect }: Props) {
  return (
    <div className="flex flex-wrap gap-3 mb-6">

      {questions.map((q) => (

        <button
          key={q}
          onClick={() => onSelect(q)}
          className="border rounded-full px-5 py-2 hover:bg-blue-600 hover:text-white transition"
        >
          {q}
        </button>

      ))}

    </div>
  );
}

export default SuggestedQuestions;