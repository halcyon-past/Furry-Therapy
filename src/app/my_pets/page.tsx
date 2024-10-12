"use client";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { Edit2, Trash2, MapPin } from "lucide-react";

interface Pet {
    _id: string;
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

export default function UserPets() {
    const { data: session } = useSession();
    const [pets, setPets] = useState<Pet[]>([]);

    useEffect(() => {
        const fetchPets = async () => {
            try {
                const res = await fetch("/api/fetch_user_pets");
                const data = await res.json();
                setPets(data.pets);
            } catch (error) {
                console.error("Error fetching pets:", error);
            }
        };

        if (session) {
            fetchPets();
        }
    }, [session]);

    const handleDelete = async (petId: string) => {
        const confirmDelete = confirm("Are you sure you want to delete this pet?");
        if (!confirmDelete) return;

        try {
            const response = await fetch(`/api/delete_pet`, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ petId }),
            });

            if (response.ok) {
                alert("Pet deleted successfully!");
                setPets(pets.filter((pet) => pet._id !== petId));
            } else {
                alert("Failed to delete the pet.");
            }
        } catch (error) {
            console.error("Error deleting pet:", error);
            alert("An error occurred while trying to delete the pet.");
        }
    };

    const handleEdit = (petId: string) => {
        console.log("Edit pet with ID:", petId);
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex flex-col items-center p-8">
            <h1 className="text-4xl font-semibold text-gray-800 mb-12">Your Furry Friends</h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 w-full max-w-6xl">
                {pets.length === 0 ? (
                    <div className="col-span-full text-center">
                        <p className="text-xl text-gray-600">No pets found. Add a new furry friend to see them here!</p>
                        <button className="mt-4 bg-indigo-500 text-white px-6 py-2 rounded-full hover:bg-indigo-600 transition-colors">
                            Add a Pet
                        </button>
                    </div>
                ) : (
                    pets.map((pet) => (
                        <div key={pet._id} className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
                            <div className="relative">
                                <img
                                    src={pet.image}
                                    alt={pet.name}
                                    className="h-56 w-full object-cover"
                                />
                                <div className="absolute top-0 left-0 m-4 bg-white px-2 py-1 rounded-full text-sm font-medium text-gray-700">
                                    {pet.species}
                                </div>
                            </div>
                            <div className="p-6">
                                <h2 className="text-2xl font-bold mb-2 text-gray-800">{pet.name}</h2>
                                <p className="text-gray-600 mb-4">{pet.breed} • {pet.age} years old</p>
                                <div className="flex items-center text-gray-500 mb-4">
                                    <MapPin size={16} className="mr-2" />
                                    <span>{pet.location}</span>
                                </div>
                                <div className="flex flex-wrap gap-2 mb-4">
                                    {pet.personalityTraits.slice(0, 3).map((trait, index) => (
                                        <span key={index} className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm">
                                            {trait}
                                        </span>
                                    ))}
                                </div>
                                <div className="flex justify-between items-center mt-4">
                                    <button
                                        className="text-gray-600 hover:text-indigo-600 transition-colors p-2 rounded-full hover:bg-gray-100"
                                        onClick={() => handleEdit(pet._id)}
                                    >
                                        <Edit2 size={20} />
                                    </button>
                                    <button
                                        className="text-red-500 hover:text-red-600 transition-colors p-2 rounded-full hover:bg-red-50"
                                        onClick={() => handleDelete(pet._id)}
                                    >
                                        <Trash2 size={20} />
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
}