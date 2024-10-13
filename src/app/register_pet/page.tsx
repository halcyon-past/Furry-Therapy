"use client";

import { useState, useEffect } from "react";
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { traitsArray } from "@/utils/traits";
import { UploadButton } from "@/utils/uploadthing";

interface FormData {
  owner: string;
  name: string;
  age: number;
  species: string;
  breed: string;
  gender: string;
  weight: string;
  location: string;
  vaccinationStatus: string;
  personalityTraits: string[];
  interests: string;
  favoriteFoods: string;
  bio: string;
  image: string;
}

const personalityOptions = traitsArray;

export default function RegisterPet() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [formData, setFormData] = useState<FormData>({
    owner: '',
    name: '',
    age: 0,
    species: '',
    breed: '',
    gender: 'Male', // Default to Male
    weight: '',
    location: '',
    vaccinationStatus: '',
    personalityTraits: [],
    interests: '',
    favoriteFoods: '',
    bio: '',
    image: '',
  });

  useEffect(() => {
    if (session && session.user?.email) {
      setFormData((prevData) => ({
        ...prevData,
        owner: session.user.email,
      }));
    }
  }, [session]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFormData({
      ...formData,
      gender: e.target.value,
    });
  };

  const handlePersonalityChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedTrait = e.target.value;
    if (!formData.personalityTraits.includes(selectedTrait)) {
      setFormData((prevData) => ({
        ...prevData,
        personalityTraits: [...prevData.personalityTraits, selectedTrait],
      }));
    }
  };

  const removeTrait = (trait: string) => {
    setFormData((prevData) => ({
      ...prevData,
      personalityTraits: prevData.personalityTraits.filter((t) => t !== trait),
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const updatedFormData = {
      ...formData,
      personalityTraits: formData.personalityTraits.map(trait => trait.trim()),
      interests: formData.interests.split(',').map(interest => interest.trim()),
      favoriteFoods: formData.favoriteFoods.split(',').map(food => food.trim()),
    };

    console.log(updatedFormData)

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
          owner: session?.user.email || '',
          name: '',
          age: 0,
          species: '',
          breed: '',
          gender: 'Male',
          weight: '',
          location: '',
          vaccinationStatus: '',
          personalityTraits: [],
          interests: '',
          favoriteFoods: '',
          bio: '',
          image: '',
        });
        router.push('/my_pets');
      } else {
        alert('Failed to register pet. Please check the input fields.');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('An error occurred while submitting the form.');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <div className="w-full max-w-md">
        <h1 className="text-5xl font-extralight text-black mb-12 tracking-wide text-center">Register Your Pet</h1>
        <form onSubmit={handleSubmit} className="space-y-8">
          <div className="relative">
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full px-0 py-2 text-gray-900 bg-transparent border-b-2 border-gray-300 focus:border-black focus:outline-none transition-all duration-300"
              placeholder="Pet's name"
              required
            />
          </div>
          <div className="relative">
            <input
              type="number"
              name="age"
              value={formData.age}
              onChange={handleChange}
              className="w-full px-0 py-2 text-gray-900 bg-transparent border-b-2 border-gray-300 focus:border-black focus:outline-none transition-all duration-300"
              placeholder="Age (in years)"
              required
            />
          </div>
          <div className="relative">
            <input
              type="text"
              name="species"
              value={formData.species}
              onChange={handleChange}
              className="w-full px-0 py-2 text-gray-900 bg-transparent border-b-2 border-gray-300 focus:border-black focus:outline-none transition-all duration-300"
              placeholder="Species (e.g., Dog)"
              required
            />
          </div>
          <div className="relative">
            <input
              type="text"
              name="breed"
              value={formData.breed}
              onChange={handleChange}
              className="w-full px-0 py-2 text-gray-900 bg-transparent border-b-2 border-gray-300 focus:border-black focus:outline-none transition-all duration-300"
              placeholder="Breed (e.g., Labrador)"
              required
            />
          </div>
          <div className="relative">
            <select
              name="gender"
              value={formData.gender}
              onChange={handleSelectChange}
              className="w-full px-0 py-2 text-gray-900 bg-transparent border-b-2 border-gray-300 focus:border-black focus:outline-none transition-all duration-300"
              required
            >
              <option value="Male">Male</option>
              <option value="Female">Female</option>
            </select>
          </div>
          <div className="relative">
            <input
              type="text"
              name="weight"
              value={formData.weight}
              onChange={handleChange}
              className="w-full px-0 py-2 text-gray-900 bg-transparent border-b-2 border-gray-300 focus:border-black focus:outline-none transition-all duration-300"
              placeholder="Weight (e.g., 30 lbs)"
              required
            />
          </div>
          <div className="relative">
            <input
              type="text"
              name="location"
              value={formData.location}
              onChange={handleChange}
              className="w-full px-0 py-2 text-gray-900 bg-transparent border-b-2 border-gray-300 focus:border-black focus:outline-none transition-all duration-300"
              placeholder="Location (e.g., Los Angeles, CA)"
              required
            />
          </div>
          <div className="relative">
            <input
              type="text"
              name="vaccinationStatus"
              value={formData.vaccinationStatus}
              onChange={handleChange}
              className="w-full px-0 py-2 text-gray-900 bg-transparent border-b-2 border-gray-300 focus:border-black focus:outline-none transition-all duration-300"
              placeholder="Vaccination Status"
              required
            />
          </div>
          <div className="relative">
            <select
              value=""
              onChange={handlePersonalityChange}
              className="w-full px-0 py-2 text-gray-900 bg-transparent border-b-2 border-gray-300 focus:border-black focus:outline-none transition-all duration-300"
            >
              <option value="" disabled>Select a Personality Trait</option>
              {personalityOptions.map(trait => (
                <option key={trait} value={trait}>{trait}</option>
              ))}
            </select>
            <div className="flex flex-wrap mt-2 space-x-2">
              {formData.personalityTraits.map((trait, index) => (
                <div key={index} className="bg-gray-200 rounded-full px-3 py-1 text-sm flex items-center space-x-1">
                  <span>{trait}</span>
                  <button
                    type="button"
                    onClick={() => removeTrait(trait)}
                    className="text-red-500 hover:text-red-700"
                  >
                    &times;
                  </button>
                </div>
              ))}
            </div>
          </div>
          <div className="relative">
            <input
              type="text"
              name="interests"
              value={formData.interests}
              onChange={handleChange}
              className="w-full px-0 py-2 text-gray-900 bg-transparent border-b-2 border-gray-300 focus:border-black focus:outline-none transition-all duration-300"
              placeholder="Interests (comma-separated)"
              required
            />
          </div>
          <div className="relative">
            <input
              type="text"
              name="favoriteFoods"
              value={formData.favoriteFoods}
              onChange={handleChange}
              className="w-full px-0 py-2 text-gray-900 bg-transparent border-b-2 border-gray-300 focus:border-black focus:outline-none transition-all duration-300"
              placeholder="Favorite Foods (comma-separated)"
              required
            />
          </div>
          <div className="relative">
            <textarea
              name="bio"
              value={formData.bio}
              onChange={handleChange}
              className="w-full px-0 py-2 text-gray-900 bg-transparent border-b-2 border-gray-300 focus:border-black focus:outline-none transition-all duration-300"
              placeholder="Tell us about your pet"
              rows={5}
              required
            />
          </div>

          <div className="relative flex justify-center items-center flex-col">
            <label className="block text-gray-700">Upload Pet Image</label>
            <UploadButton
              endpoint="imageUploader"
              onClientUploadComplete={(res) => {
                if (res && res.length > 0) {
                  setFormData({ ...formData, image: res[0].url });
                }
              }}
              onUploadError={(error) => {
                console.error('Upload failed:', error);
                alert('Image upload failed. Please try again.');
              }}
            />
            {formData.image && (
              <div className="mt-4">
                <img src={formData.image} alt="Pet" className="w-32 h-32 object-cover" />
              </div>
            )}
          </div>

          <button
            type="submit"
            className="w-full bg-black text-white py-2 px-4 rounded-md hover:bg-gray-800 transition-all duration-300"
          >
            Register Pet
          </button>
        </form>
      </div>
    </div>
  );
}
