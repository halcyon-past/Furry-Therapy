import Image from 'next/image';
import Link from 'next/link';

export default function ContactUs() {
    return (
        <div className="About w-full h-screen relative">
            
            <Image src="/about-us.jpeg" alt="home" fill={true} className="object-cover opacity-70" />
        </div>
    )
}