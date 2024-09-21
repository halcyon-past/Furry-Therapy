import Image from "next/image"

export default function HomeSection() {

    const SlideImages = [
        { title: "FIND YOUR PURR-FECT COMPANION", image: "/land-1.jpeg" },
        { title: "CUDDLE WITH A FURRY FRIEND", image: "/land-2.jpeg" },
        { title: "RELAX WITH A FLUFFY COMPANION", image: "/land-3.jpeg" }
    ]

    return (
        <div className="w-full min-h-screen pt-28 flex flex-col justify-between items-center pb-8">
            <div className="top w-11/12 max-w-5xl aspect-[3/2] relative mb-8 sm:aspect-[16/5]">
                <p className="absolute bottom-5 left-1/2 -translate-x-1/2 rounded-lg bg-[#d7a46f55] z-10 w-10/12 py-2 px-4 text-center backdrop-blur-sm">
                    Swipe through and meet your new furry friend!
                </p>
                <Image src="/land-top.jpeg" alt="home" fill={true} className="object-cover rounded-lg" />
            </div>
            <div className="bottom flex flex-col justify-around items-center w-full space-y-8 sm:flex-row sm:space-y-0 sm:space-x-4 sm:w-11/12 max-w-5xl">
                {SlideImages.map((section, index) => (
                    <div key={index} className="w-full max-w-[300px] flex flex-col items-center space-y-4">
                        <p className="text-[#a17d60] text-center">{section.title}</p>
                        <div className="w-full aspect-[3/2] relative">
                            <Image src={section.image} alt={`section ${index + 1}`} fill={true} className="object-cover rounded-lg" />
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}