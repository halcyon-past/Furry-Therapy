import Image from 'next/image';

export default function Testimonials() {
    const testimonials = [
        {
            text: "Furry Therapy has brought so much joy into my life. My therapy cat is the best companion I could ask for.",
            author: "Emily R."
        },
        {
            text: "Thanks to Furry Therapy, I found the perfect dog who helps me manage my anxiety. Highly recommended!",
            author: "John D."
        },
        {
            text: "I never thought spending time with a rabbit could be so therapeutic. Furry Therapy is amazing.",
            author: "Sarah L."
        }
    ];

    const glowStyle = {
        textShadow: '0 0 7px #fff, 0 0 10px #fff, 0 0 21px #fff, 0 0 42px #fff',
        color: '#000'
    };

    return (
        <div className="About w-full min-h-screen relative flex flex-col justify-center items-center py-8 px-4">
            <h2 className="text-[40px] md:text-[70px] font-bold text-center mt-16 sm:mt-24 mb-8 z-10 font-[Gistesy]" style={glowStyle}>What people think about us...</h2>
            <div className="flex flex-col md:flex-row justify-center items-center w-full">
                {testimonials.map((testimonial, index) => (
                    <div key={index} className="z-10 w-full max-w-[300px] h-auto md:h-[400px] bg-white bg-opacity-30 backdrop-blur text-center rounded-lg flex flex-col justify-around m-4 md:m-6 items-center p-4 shadow-lg">
                        <p className='text-lg md:text-xl'>{"“"+testimonial.text+"”"}</p>
                        <p className="font-[Gistesy] text-3xl md:text-5xl mt-4">-{testimonial.author}</p>
                    </div>
                ))}
            </div>
            <div className="absolute inset-0 z-0">
                <Image src="/testimonials.jpeg" alt="testimonials background" layout="fill" objectFit="cover" className='opacity-70' />
            </div>
        </div>
    )
}