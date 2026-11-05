import type { Request, Response } from "express";
import { prisma } from "../lib/prisma.js";

// GET - Retrieve all checklists
export async function getChecklists(req: Request, res: Response) {
  try {
    const checklists = await prisma.checklist.findMany();

    return res.status(200).json({
      success: true,
      count: checklists.length,
      data: checklists,
    });
  } catch (error) {
    console.error("Error fetching checklists:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to fetch checklists",
    });
  }
}


// GET - Retrieve a checklist by ID

export async function getChecklistById(req: Request, res: Response) {
  try {
    const { id } = req.params;

    const checklist = await prisma.checklist.findUnique({
      where: {
        id: String(id),
      },
    });

    if (!checklist) {
      return res.status(404).json({
        success: false,
        message: "Checklist not found",
      });
    }

    return res.status(200).json({
      success: true,
      data: checklist,
    });
  } catch (error) {
    console.error("Error fetching checklist:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to fetch checklist",
    });
  }
}


// POST - Create a new checklist

export async function createChecklist(req: Request, res: Response) {
  try {
    const { name, restaurant, category, shift } = req.body;

    // Validate required fields
    if (!name || !restaurant || !category || !shift) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    // Save the checklist to PostgreSQL
    const newChecklist = await prisma.checklist.create({
      data: {
        name,
        restaurant,
        category,
        shift,
      },
    });

    return res.status(201).json({
      success: true,
      message: "Checklist created successfully",
      data: newChecklist,
    });
  } catch (error) {
    console.error("Error creating checklist:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to create checklist",
    });
  }
}


// PATCH - Update an existing checklist

export async function updateChecklist(req: Request, res: Response) {
  try {
    const { id } = req.params;
    const { name, restaurant, category, shift } = req.body;

    // Find the checklist in PostgreSQL
    const existingChecklist = await prisma.checklist.findUnique({
      where: {
        id: String(id),
      },
    });

    // Return 404 if the checklist doesn't exist
    if (!existingChecklist) {
      return res.status(404).json({
        success: false,
        message: "Checklist not found",
      });
    }

    // Update the checklist in PostgreSQL
    const updatedChecklist = await prisma.checklist.update({
      where: {
        id: String(id),
      },
      data: {
        name,
        restaurant,
        category,
        shift,
      },
    });

    return res.status(200).json({
      success: true,
      message: "Checklist updated successfully",
      data: updatedChecklist,
    });
  } catch (error) {
    console.error("Error updating checklist:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to update checklist",
    });
  }
}


// DELETE - Remove a checklist

export async function deleteChecklist(req: Request, res: Response) {
  try {
    const { id } = req.params;

    // Check whether the checklist exists
    const existingChecklist = await prisma.checklist.findUnique({
      where: {
        id: String(id),
      },
    });

    if (!existingChecklist) {
      return res.status(404).json({
        success: false,
        message: "Checklist not found",
      });
    }

    // Delete the checklist from PostgreSQL
    const deletedChecklist = await prisma.checklist.delete({
      where: {
        id: String(id),
      },
    });

    return res.status(200).json({
      success: true,
      message: "Checklist deleted successfully",
      data: deletedChecklist,
    });
  } catch (error) {
    console.error("Error deleting checklist:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to delete checklist",
    });
  }
}
