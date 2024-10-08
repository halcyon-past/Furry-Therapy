"use client";
import Image from 'next/image';
import { useState } from 'react';
import { Heart, X } from 'lucide-react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';

const animals = [
  {
    name: 'Buddy',
    age: 3,
    species: 'Golden Retriever',
    bio: 'Loves long walks on the beach and playing fetch!',
    image: '/about-us.jpeg'
  },
  {
    name: 'Luna',
    age: 2,
    species: 'Persian Cat',
    bio: 'Energetic and playful, always up for an adventure!',
    image: '/land-1.jpeg'
  },
  {
    name: 'Max',
    age: 4,
    species: 'Chausie',
    bio: 'Loyal and intelligent, enjoys puzzle toys and agility courses.',
    image: '/land-top-2.jpeg'
  },
  {
    name: 'Bella',
    age: 1,
    species: 'Pig',
    bio: 'Curious and gentle, loves to learn new tricks!',
    image: '/contact-us.jpeg'
  }
];

export default function Date() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [currentAnimalIndex, setCurrentAnimalIndex] = useState(0);

  if (status === 'unauthenticated') {
    router.push('/');
    return null;
  }

  if (status === 'loading') {
    return <div>Loading...</div>;
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
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="relative w-full h-80">
          <Image
            src={currentAnimal.image}
            alt={currentAnimal.name}
            fill
            style={{ objectFit: 'cover' }}
          />
        </div>
        <div className="p-4">
          <h1 className="text-2xl font-bold">{currentAnimal.name}, {currentAnimal.age}</h1>
          <p className="text-gray-600">{currentAnimal.species}</p>
          <p className="mt-2">{currentAnimal.bio}</p>
        </div>
        <div className="flex justify-center p-4 bg-gray-50">
          <button 
            onClick={handleDislike}
            className="mr-4 p-4 rounded-full bg-white shadow-md hover:bg-gray-100 transition-colors"
          >
            <X className="text-red-500" size={24} />
          </button>
          <button 
            onClick={handleLike}
            className="p-4 rounded-full bg-white shadow-md hover:bg-gray-100 transition-colors"
          >
            <Heart className="text-green-500" size={24} />
          </button>
        </div>
      </div>
    </div>
  );
}