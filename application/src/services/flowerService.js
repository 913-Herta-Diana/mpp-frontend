import axios from "axios";


const API_BASE_URL = 'http://localhost:5000'; // Update with your backend URL

const flowerService = {
  getAllFlowers: async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/flowers`);
      return response.data;
    } catch (error) {
      console.error('Error fetching flowers:', error);
      return [];
    }
  },

  getFlowerById: async (id) => {
    try {
      const response = await axios.get(`${API_BASE_URL}/flowers/${id}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching flower:', error);
      return null;
    }
  },

  addFlower: async (newFlower) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/flowers`, newFlower);
      return response.data;
    } catch (error) {
      console.error('Error adding flower:', error);
      return null;
    }
  },

  updateFlower: async (updatedFlower) => {
    try {
      const response = await axios.put(`${API_BASE_URL}/flowers/${updatedFlower.id}`, updatedFlower);
      return response.data;
    } catch (error) {
      console.error('Error updating flower:', error);
      return null;
    }
  },

  deleteFlower: async (id) => {
    try {
      await axios.delete(`${API_BASE_URL}/flowers/${id}`);
      return true;
    } catch (error) {
      console.error('Error deleting flower:', error);
      return false;
    }
  },
  getAllReviews: async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/reviews`);
      return response.data;
    } catch (error) {
      console.error('Error fetching reviews:', error);
      return [];
    }
  },

  getReviewById: async (id) => {
    try {
      const response = await axios.get(`${API_BASE_URL}/reviews/${id}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching review:', error);
      return null;
    }
  },

  addReview: async (newReview) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/reviews`, newReview);
      return response.data;
    } catch (error) {
      console.error('Error adding review:', error);
      return null;
    }
  },

  updateReview: async (updatedReview) => {
    try {
      const response = await axios.put(`${API_BASE_URL}/reviews/${updatedReview.id}`, updatedReview);
      return response.data;
    } catch (error) {
      console.error('Error updating review:', error);
      return null;
    }
  },

  deleteReview: async (id) => {
    try {
      await axios.delete(`${API_BASE_URL}/reviews/${id}`);
      return true;
    } catch (error) {
      console.error('Error deleting review:', error);
      return false;
    }
  },
};

export default flowerService;