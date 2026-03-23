import GalleryItem from "../models/galleryItem.js";

// Create new gallery item
export async function createGalleryItem(req, res) {
  try {
    const user = req.user;

    if (!user) {
      return res.status(403).json({
        message: "Please login to create a gallery item",
      });
    }

    if (user.type !== "admin") {
      return res.status(403).json({
        message: "You do not have permission to create a gallery item",
      });
    }

    const galleryItemData = req.body;
    const newGalleryItem = new GalleryItem(galleryItemData);

    await newGalleryItem.save();

    res.status(201).json({
      message: "Gallery item created successfully",
      galleryItem: newGalleryItem,
    });
  } catch (error) {
    console.error("Error creating gallery item:", error);
    res.status(500).json({
      message: "Gallery item creation failed",
      error: error.message,
    });
  }
}

// Get all gallery items
export async function getGalleryItems(req, res) {
  try {
    const list = await GalleryItem.find();
    res.status(200).json({ list });
  } catch (error) {
    console.error("Error fetching gallery items:", error);
    res.status(500).json({
      message: "Failed to fetch gallery items",
      error: error.message,
    });
  }
}

// Delete a gallery item by ID
export async function deleteGalleryItem(req, res) {
  try {
    const id = req.params.id;
    const user = req.user;

    if (!user) {
      return res.status(403).json({
        message: "Please login to delete a gallery item",
      });
    }

    if (user.type !== "admin") {
      return res.status(403).json({
        message: "You are not authorized to delete a gallery item",
      });
    }

    await GalleryItem.findByIdAndDelete(id);

    res.status(200).json({
      message: "Gallery item deleted successfully",
    });
  } catch (error) {
    console.error("Error deleting gallery item:", error);
    res.status(500).json({
      message: "Gallery item deletion failed",
      error: error.message,
    });
  }
}

// Update a gallery item by ID
export async function updateGalleryItem(req, res) {
  try {
    const id = req.params.id;
    const user = req.user;

    if (!user) {
      return res.status(403).json({
        message: "Please login to update a gallery item",
      });
    }

    if (user.type !== "admin") {
      return res.status(403).json({
        message: "You are not authorized to update a gallery item",
      });
    }

    const galleryItemData = req.body;
    const updatedItem = await GalleryItem.findByIdAndUpdate(id, galleryItemData, {
      new: true, // return the updated document
    });

    res.status(200).json({
      message: "Gallery item updated successfully",
      galleryItem: updatedItem,
    });
  } catch (error) {
    console.error("Error updating gallery item:", error);
    res.status(500).json({
      message: "Gallery item update failed",
      error: error.message,
    });
  }
}