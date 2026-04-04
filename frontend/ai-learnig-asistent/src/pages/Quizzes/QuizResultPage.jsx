import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import quizService from "../../services/quizService";
import PageHeader from "../../components/common/PageHeader";
import Spinner from "../../components/common/Spinner";
import toast from "react-hot-toast";
import { ArrowLeft, CheckCircle2, XCircle, Trophy, Target, BookOpen } from "lucide-react";

const QuizResultPage = () => {
  const { quizId } = useParams();
  const [results, setResults] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchResults = async () => {
      try {
        const data = await quizService.getQuizResults(quizId);
        setResults(data);
      } catch (error) {
        toast.error("Failed to fetch quiz results.");
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchResults();
  }, [quizId]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <Spinner />
      </div>
    );
  }

  if (!results || !results.data) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="text-center">
          <p className="text-slate-600 text-lg">Quiz Results Not Found.</p>
        </div>
      </div>
    );
  }

  const {
    data: { quiz },
    results: detailedResults = [],
  } = results;

  const score = quiz?.score || 0;
  const totalQuestions = detailedResults.length;
  const correctAnswers = detailedResults.filter((r) => r.isCorrect).length;
  const inCorrectAnswers = totalQuestions - correctAnswers;

  const getScoreColor = (score) => {
    if (score >= 80) return "from-emerald-500 to-teal-500";
    if (score >= 60) return "from-amber-500 to-orange-500";
    return "from-rose-500 to-red-500";
  };

  const getScoreMessage = (score) => {
    if (score >= 90) return "Outstanding!";
    if (score >= 80) return "Great Job!";
    if (score >= 70) return "Good Work!";
    if (score >= 60) return "Not Bad!";
    return "Keep Practicing!";
  };

  return (
    <div className="">
      {/* Back Button */}
      <div className="">
        <Link to={`/documents/${quiz.document._id}`} className="">
          <ArrowLeft className="" strokeWidth={2} />
          Back to document
        </Link>
      </div>

      <PageHeader title={`${quiz.title || "Quiz"}`} />

      {/* Score card */}
      <div className="">
        <div className="">
          <div className="">
            <Trophy className="" strokeWidth={2} />
          </div>

          <div>
            <p className="">You Score</p>
            <div className={`inline-block text-5xl font-bold bg-linear-to-r ${getScoreColor(score)} bg-clip-text text-transparent mb-2`}>{score}%</div>
            <p className="">{getScoreMessage(score)}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuizResultPage;
