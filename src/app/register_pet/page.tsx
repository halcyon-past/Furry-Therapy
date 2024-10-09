"use client";

import { useState } from "react";

export default function RegisterPet() {
  const [formData, setFormData] = useState({
    owner: '',
    name: '',
    age: 0,
    species: '',
    breed: '',
    gender: '',
    weight: '',
    location: '',
    vaccinationStatus: '',
    personalityTraits: '',
    interests: '',
    favoriteFoods: '',
    bio: '',
    image: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const personalityTraitsArray = formData.personalityTraits.split(',').map(trait => trait.trim());
    const interestsArray = formData.interests.split(',').map(interest => interest.trim());
    const favoriteFoodsArray = formData.favoriteFoods.split(',').map(food => food.trim());

    const updatedFormData = {
      ...formData,
      personalityTraits: personalityTraitsArray,
      interests: interestsArray,
      favoriteFoods: favoriteFoodsArray,
    };

    try {
      const response = await fetch('/api/create_pet', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedFormData),
      });

      if (response.ok) {
        alert('Pet registered successfully!');
        setFormData({
          owner: '',
          name: '',
          age: 0,
          species: '',
          breed: '',
          gender: '',
          weight: '',
          location: '',
          vaccinationStatus: '',
          personalityTraits: '',
          interests: '',
          favoriteFoods: '',
          bio: '',
          image: '',
        });
      } else {
        alert('Failed to register pet. Please check the input fields.');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('An error occurred while submitting the form.');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-50 to-blue-200 p-4">
      <div className="bg-white shadow-lg rounded-lg p-8 max-w-lg w-full">
        <h1 className="text-2xl font-bold mb-6 text-center">Register Your Pet</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="flex flex-col">
            <label className="text-gray-700">Owner&apos;s Name</label>
            <input
              type="text"
              name="owner"
              value={formData.owner}
              onChange={handleChange}
              className="border border-gray-300 p-2 rounded"
              placeholder="Owner's name"
              required
            />
          </div>
          <div className="flex flex-col">
            <label className="text-gray-700">Pet&apos;s Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="border border-gray-300 p-2 rounded"
              placeholder="Pet's name"
              required
            />
          </div>
          <div className="flex flex-col">
            <label className="text-gray-700">Age (in years)</label>
            <input
              type="number"
              name="age"
              value={formData.age}
              onChange={handleChange}
              className="border border-gray-300 p-2 rounded"
              placeholder="Age"
              required
            />
          </div>
          <div className="flex flex-col">
            <label className="text-gray-700">Species</label>
            <input
              type="text"
              name="species"
              value={formData.species}
              onChange={handleChange}
              className="border border-gray-300 p-2 rounded"
              placeholder="Species (e.g., Golden Retriever)"
              required
            />
          </div>
          <div className="flex flex-col">
            <label className="text-gray-700">Breed</label>
            <input
              type="text"
              name="breed"
              value={formData.breed}
              onChange={handleChange}
              className="border border-gray-300 p-2 rounded"
              placeholder="Breed (e.g., Labrador)"
              required
            />
          </div>
          <div className="flex flex-col">
            <label className="text-gray-700">Gender</label>
            <input
              type="text"
              name="gender"
              value={formData.gender}
              onChange={handleChange}
              className="border border-gray-300 p-2 rounded"
              placeholder="Gender"
              required
            />
          </div>
          <div className="flex flex-col">
            <label className="text-gray-700">Weight</label>
            <input
              type="text"
              name="weight"
              value={formData.weight}
              onChange={handleChange}
              className="border border-gray-300 p-2 rounded"
              placeholder="Weight (e.g., 30 lbs)"
              required
            />
          </div>
          <div className="flex flex-col">
            <label className="text-gray-700">Location</label>
            <input
              type="text"
              name="location"
              value={formData.location}
              onChange={handleChange}
              className="border border-gray-300 p-2 rounded"
              placeholder="Location (e.g., Los Angeles, CA)"
              required
            />
          </div>
          <div className="flex flex-col">
            <label className="text-gray-700">Vaccination Status</label>
            <input
              type="text"
              name="vaccinationStatus"
              value={formData.vaccinationStatus}
              onChange={handleChange}
              className="border border-gray-300 p-2 rounded"
              placeholder="Vaccination Status"
              required
            />
          </div>
          <div className="flex flex-col">
            <label className="text-gray-700">Personality Traits (comma-separated)</label>
            <input
              type="text"
              name="personalityTraits"
              value={formData.personalityTraits}
              onChange={handleChange}
              className="border border-gray-300 p-2 rounded"
              placeholder="Friendly, Energetic, Loyal"
              required
            />
          </div>
          <div className="flex flex-col">
            <label className="text-gray-700">Interests (comma-separated)</label>
            <input
              type="text"
              name="interests"
              value={formData.interests}
              onChange={handleChange}
              className="border border-gray-300 p-2 rounded"
              placeholder="Fetching, Swimming, Playing with toys"
              required
            />
          </div>
          <div className="flex flex-col">
            <label className="text-gray-700">Favorite Foods (comma-separated)</label>
            <input
              type="text"
              name="favoriteFoods"
              value={formData.favoriteFoods}
              onChange={handleChange}
              className="border border-gray-300 p-2 rounded"
              placeholder="Chicken, Peanut Butter"
              required
            />
          </div>
          <div className="flex flex-col">
            <label className="text-gray-700">Bio</label>
            <textarea
              name="bio"
              value={formData.bio}
              onChange={handleChange}
              className="border border-gray-300 p-2 rounded"
              placeholder="Loves long walks on the beach and playing fetch!"
              required
            ></textarea>
          </div>
          <div className="flex flex-col">
            <label className="text-gray-700">Image URL</label>
            <input
              type="text"
              name="image"
              value={formData.image}
              onChange={handleChange}
              className="border border-gray-300 p-2 rounded"
              placeholder="Image URL"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition-colors"
          >
            Register Pet
          </button>
        </form>
      </div>
    </div>
  );
}
