import Image from 'next/image';
import Link from 'next/link';

export default function ContactUs() {
    return (
        <div className="About w-full h-screen relative flex flex-col justify-around items-center pt-20">
            <div className="query w-8/12 h-[300px] bg-[#ffffff55] backdrop-blur-sm z-10 flex justify-center items-center text-[20px] rounded-lg p-5">
                Have questions or wanted to get started? Reach out to us and we’ll be happy to assist you.
            </div>
            <Link href="mailto:aritro.saha2021@vitstudent.ac.in" target='_blank' className='w-36 h-20 bg-[#ffffff55] backdrop-blur-sm z-10 flex justify-center items-center text-[20px] rounded-lg'>Email Us</Link>
            <Image src="/contact-us-2.jpeg" alt="home" fill={true} className="object-cover opacity-70" />
        </div>
    )
}