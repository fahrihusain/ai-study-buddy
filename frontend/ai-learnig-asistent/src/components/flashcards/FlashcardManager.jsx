import React, { useState, useEffect } from "react";
import { Plus, ChevronLeft, ChevronRight, Trash2, ArrowLeft, Sparkles, Brain, TrafficCone } from "lucide-react";
import toas, { toast } from "react-hot-toast";
import moment from "moment";

import flashcardService from "../../services/flashCardService";
import aiService from "../../services/aiService";
import Spinner from "../common/Spinner";
import Modal from "../common/Modal ";
import Flashcard from "./Flashcard";

const FlashcardManager = ({ documentId }) => {
  const [flashcardSets, setFlashcardSets] = useState([]);
  const [selectedSet, setSelectedSet] = useState(null);
  const [loading, setLoading] = useState(true);
  const [generating, setGenerating] = useState(false);
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [setToDelete, setSetToDelete] = useState(null);

  const fetchFlashcardSets = async () => {
    setLoading(true);
    try {
      const response = await flashcardService.getFlashcardsDocument(documentId);
      setFlashcardSets(response.data);
    } catch (error) {
      toast.error("Failed to fetch flashcard set.");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (documentId) {
      fetchFlashcardSets();
    }
  }, [documentId]);

  const handleGenerateFlashcards = async () => {
    setGenerating(true);
    try {
      await aiService.generateFlashcards(documentId);
      toast.success("Flashcard generated succesfully.");
      fetchFlashcardSets();
    } catch (error) {
      toast.error(error.message || "Failed to generate flashcard");
    } finally {
      setGenerating(false);
    }
  };

  const handleNextCard = () => {
    if (selectedSet) {
      handleReview(currentCardIndex);
      setCurrentCardIndex((prevIndex) => (prevIndex + 1) % selectedSet.cards.length);
    }
  };

  const handlePrevCard = () => {
    if (selectedSet) {
      handleReview(currentCardIndex);
      setCurrentCardIndex((prevIndex) => (prevIndex - 1 + selectedSet.cards.length) % selectedSet.cards.length);
    }
  };

  const handleReview = async (index) => {
    const currentCard = selectedSet?.cards[currentCardIndex];
    if (!currentCard) return;

    try {
      await flashcardService.reviewFlashcard(currentCard._id, index);
      toast.success("Flashcard review");
    } catch (error) {
      toast.error("Failed to review flashcard.");
    }
  };

  const handleToggleStar = async (cardId) => {};

  const handleDeleteRequest = async (e, set) => {
    e.stopPropagation();
    setSetToDelete(set);
    setIsDeleteModalOpen(true);
  };

  const handleConfirmDelete = async () => {};

  const handleSelectSet = (set) => {
    setSelectedSet(set);
    setCurrentCardIndex(0);
  };

  const handleFlashcardViewer = () => {
    return "handleFlashcardViewer";
  };

  const renderSetList = () => {
    if (loading) {
      return (
        <div className="">
          <Spinner />
        </div>
      );
    }

    return (
      <div className="">
        <div className="">
          <Brain className="" strokeWidth={2} />
        </div>
        <h3 className="">No Flashcard yet</h3>
        <p className="">Generate flashcard from your document to start learning and reinforce your knowledge.</p>
        <button className="" onClick={handleGenerateFlashcards} disabled={generating}>
          {generating ? (
            <>
              <div className="" />
              Generating...
            </>
          ) : (
            <>
              <Sparkles className="" strokeWidth={2} />
              Generate Flashcards
            </>
          )}
        </button>
      </div>
    );
  };

  return <div className="bg-white/80 backdrop-blur-xl border border-slate-200/60 rounded-3xl shadow-xl shadow-slate-200/50 p-8">{selectedSet ? handleFlashcardViewer() : renderSetList()}</div>;
};

export default FlashcardManager;
