import Image from "next/image"

export default function About() {
    return (
        <div className="About w-full h-screen relative">
            <div className="absolute top-28 left-2 h-[500px] rounded-lg bg-[#ffffff55] z-10 w-11/12 p-2 text-left backdrop-blur-sm sm:w-7/12 sm:top-32 sm:left-20 sm:p-20">
                    <h1 className="text-[50px] font-[Gistesy]">About Us</h1>
                    <p className="w-8/12 mt-12">
                    Furry Therapy is your gateway to emotional well-being through the companionship of adorable pets. We believe in the healing power of animals, and our mission is to bring joy, peace, and comfort to your life. Our dedicated team works tirelessly to connect you with the perfect furry friend, ensuring a therapeutic experience tailored to your unique needs.
                    </p>
            </div>
            <Image src="/about-us.jpeg" alt="home" fill={true} className="object-cover" />
        </div>
    )
}