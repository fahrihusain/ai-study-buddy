import { count, error } from "console";
import Document from "../models/Document.js";
import Flashcard from "../models/Flashcard.js";
import Quiz from "../models/Quiz.js";
import { extractTextFromPDF } from "../utils/pdfParser.js";
import { chunkText } from "../utils/textChunker.js";
import fs from "fs/promises";
import mongoose, { now } from "mongoose";

// @desc    Upload a document
// @route   POST /api/documents/upload
// @access  Private

export const uploadDocument = async (req, res, next) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        error: "Plese upload a pdf file",
        statusCode: 400,
      });
    }

    const { title } = req.body;

    if (!title) {
      //Delete uploudet file if no title provided
      await fs.unlink(req.file.path);
      return res.status(400).json({
        success: false,
        error: "Please provide a document title",
        statusCode: 400,
      });
    }

    //Construct the URL for the uplouded file
    const baseURL = `http://localhost:${process.env.PORT || 8000}`;
    const fileURL = `${baseURL}/uplouds/documents/${req.file.filename}`;
    //Create document record
    const document = await Document.create({
      userId: req.user._id,
      title,
      fileName: req.file.originalname,
      filePath: fileURL, //Store the URl instead of the local path
      fileSize: req.file.size,
      status: "processing",
    });

    //Procces PDF in background (in production, use a queue like bull)
    processPDF(document._id, req.file.path).catch((err) => {
      console.log("PDF processing error", err);
    });

    res.status(201).json({
      success: true,
      data: document,
      message: "Document uplouded succesfully, Processing in progres...",
    });
  } catch (error) {
    //Clean up uploaded file if there's an error
    if (req.file) {
      await fs.unlink(req.file.path).catch(() => {});
    }
    next(error);
  }
};

//Helper function to process PDF
const processPDF = async (documentId, filePath) => {
  try {
    const { text } = await extractTextFromPDF(filePath);

    //Create chunks
    const chunks = chunkText(text, 500, 50);

    //Update document
    await Document.findByIdAndUpdate(documentId, {
      extractedText: text,
      chunks: chunks,
      status: "ready",
    });

    console.log(`Document${documentId} processed succsessfully`);
  } catch (error) {
    console.error(`Error processing document ${documentId}`, error);

    await Document.findByIdAndUpdate(documentId, {
      status: "Failed",
    });
  }
};

// @desc Get all user's documents
// @route GET /api/documents
// @access Private

export const getDocuments = async (req, res, next) => {
  try {
    const documents = await Document.aggregate([
      {
        $match: { userId: new mongoose.Types.ObjectId(req.user._id) },
      },
      {
        $lookup: {
          from: "flashcards",
          localField: "_id",
          foreignField: "documentId",
          as: "flashcardSets",
        },
      },
      {
        $lookup: {
          from: "quizzes",
          localField: "_id",
          foreignField: "documentId",
          as: "quizzes",
        },
      },
      {
        $addFields: {
          flashcardCount: { $size: "$flashcardSets" },
          quizCount: { $size: "$quizzes" },
        },
      },
      {
        $project: {
          extractedText: 0,
          chunks: 0,
          flashcardSets: 0,
          quizzes: 0,
        },
      },
      {
        $sort: { uploudDate: -1 },
      },
    ]);

    res.status(200).json({
      success: true,
      count: documents.length,
      data: documents,
    });
  } catch (error) {}
};

// @desc Get a single document with chunks
// @route GET /api/documents/:id
// @access Private

export const getDocument = async (req, res, next) => {
  try {
    const document = await Document.findOne({
      _id: req.params.id,
      userId: req.user._id,
    });

    if (!document) {
      return res.status(404).json({
        success: false,
        error: "Document not found",
        statusCode: 404,
      });
    }

    //Get counts of associated flashcards and quizzes
    const flashcardCount = await Flashcard.countDocuments({ documentId: document._id, userId: req.user._id });
    const quizCount = await Quiz.countDocuments({ documentId: document._id, userId: req.user._id });

    // Update last accessed
    document.lastAccessed = Date.now();
    await document.save();

    //Combine document data with counts
    const documentData = document.toObject();
    documentData.flashcardCount = flashcardCount;
    documentData.quizCount = quizCount;

    res.status(200).json({
      success: true,
      data: documentData,
    });
  } catch (error) {
    next(error);
  }
};

// @desc Delete document
// @route DELETE /api/documents/:id
// @access Private

export const deleteDocument = async (req, res, next) => {
  try {
    const document = await Document.findOne({
      _id: req.params.id,
      userId: req.user.id,
    });

    if (!document) {
      return res.statu(404).json({
        success: false,
        error: "Document not found",
        statusCode: 404,
      });
    }

    //Delete file from filesystem
    await fs.unlink(document.filePath).catch(() => {});

    //Delete document
    await document.deleteOne();

    res.status(200).json({
      success: true,
      message: "Document delete successfuly",
    });
  } catch (error) {
    next(error);
  }
};

// @desc Update document
// @route PUT /api/documents/:id
// @access Private

// export const updateDocument = async (req, res, next) => {
//   try {
//   } catch (error) {}
// };
