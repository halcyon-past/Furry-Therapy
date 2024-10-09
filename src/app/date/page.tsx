"use client";
import React from 'react';
import Image from 'next/image';
import { Heart, X, MapPin, Cake, Weight, Syringe, PawPrint } from 'lucide-react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { animals } from '@/utils/dummyData';

// Define an interface for the Animal type
interface Animal {
  name: string;
  age: number;
  species: string;
  breed: string;
  bio: string;
  image: string;
  location: string;
  weight: string;
  vaccinationStatus: string;
  personalityTraits: string[];
  interests: string[];
  favoriteFoods: string[];
}

interface DateCardProps {
  animal: Animal;
}

const DateCard: React.FC<DateCardProps> = ({ animal }) => (
  <div className="w-full max-w-sm bg-white rounded-xl shadow-2xl overflow-hidden">
    <div className="relative w-full h-72">
      <Image
        src={animal.image}
        alt={animal.name}
        fill
        style={{ objectFit: 'cover' }}
        className="rounded-t-xl"
      />
      <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-transparent to-black opacity-50 rounded-t-xl"></div>
      <div className="absolute bottom-4 left-4 text-white">
        <h1 className="text-3xl font-bold">{animal.name}, {animal.age}</h1>
        <p className="text-lg">{animal.species} - {animal.breed}</p>
      </div>
    </div>
    <div className="p-6 overflow-y-auto max-h-[calc(100vh-72px-80px)]">
      <div className="flex flex-wrap gap-3 mb-4">
        <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">
          <MapPin size={16} className="inline mr-1" />{animal.location}
        </span>
        <span className="px-3 py-1 bg-pink-100 text-pink-800 rounded-full text-sm">
          <Cake size={16} className="inline mr-1" />{animal.age} years
        </span>
        <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm">
          <Weight size={16} className="inline mr-1" />{animal.weight}
        </span>
        <span className="px-3 py-1 bg-purple-100 text-purple-800 rounded-full text-sm">
          <Syringe size={16} className="inline mr-1" />{animal.vaccinationStatus}
        </span>
      </div>
      <p className="text-gray-700 mb-4">{animal.bio}</p>
      <div className="mb-4">
        <h2 className="font-semibold text-lg mb-2 flex items-center">
          <PawPrint size={20} className="mr-2" />Personality
        </h2>
        <div className="flex flex-wrap gap-2">
          {animal.personalityTraits.map((trait: string, index: number) => (
            <span key={index} className="px-3 py-1 bg-yellow-100 text-yellow-800 rounded-full text-sm">{trait}</span>
          ))}
        </div>
      </div>
      <div className="mb-4">
        <h2 className="font-semibold text-lg mb-2">Interests</h2>
        <div className="flex flex-wrap gap-2">
          {animal.interests.map((interest: string, index: number) => (
            <span key={index} className="px-3 py-1 bg-indigo-100 text-indigo-800 rounded-full text-sm">{interest}</span>
          ))}
        </div>
      </div>
      <div>
        <h2 className="font-semibold text-lg mb-2">Favorite Foods</h2>
        <div className="flex flex-wrap gap-2">
          {animal.favoriteFoods.map((food: string, index: number) => (
            <span key={index} className="px-3 py-1 bg-red-100 text-red-800 rounded-full text-sm">{food}</span>
          ))}
        </div>
      </div>
    </div>
  </div>
);

export default function Date() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [currentAnimalIndex, setCurrentAnimalIndex] = React.useState(0);

  if (status === 'unauthenticated') {
    router.push('/');
    return null;
  }

  if (status === 'loading') {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  const currentAnimal = animals[currentAnimalIndex];

  const goToNextAnimal = () => {
    setCurrentAnimalIndex((prevIndex) => (prevIndex + 1) % animals.length);
  };

  const handleLike = () => {
    console.log(`Liked ${currentAnimal.name}!`);
    goToNextAnimal();
  };

  const handleDislike = () => {
    console.log(`Disliked ${currentAnimal.name}!`);
    goToNextAnimal();
  };

  return (
    <div className="flex flex-col items-center justify-start min-h-screen bg-gradient-to-br p-4">
      <div className="w-full max-w-sm mb-20">
        <DateCard animal={currentAnimal} />
      </div>
      
      {/* Fixed buttons at the bottom */}
      <div className="fixed bottom-0 left-0 right-0 flex justify-center items-center space-x-8 p-4 bg-gradient-to-t from-pink-100 to-transparent">
        <button 
          onClick={handleDislike}
          className="p-4 rounded-full bg-white shadow-lg hover:bg-red-100 transition-colors transform hover:scale-110"
        >
          <X className="text-red-500" size={32} />
        </button>
        <button 
          onClick={handleLike}
          className="p-4 rounded-full bg-white shadow-lg hover:bg-green-100 transition-colors transform hover:scale-110"
        >
          <Heart className="text-green-500" size={32} />
        </button>
      </div>
    </div>
  );
}
