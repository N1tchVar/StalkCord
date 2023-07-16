import Link from 'next/link'
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';

export default function Error() {
    const router = useRouter();
    return (
        <motion.div
        variants={{
            hidden: {opacity: 0},
            visible: {opacity: 1},
          }}
          initial="hidden"
          animate="visible"
          transition={{ duration: 0.2, delay: 0.25 }}
        className='flex flex-col justify-center items-center h-screen gap-4 text-center p-4'>
            <h1 className='text-white text-2xl md:text-5xl font-bold'>Couldn&apos;t find a Discord User</h1>
            <p className='text-center text-white/50'>Make sure the user is in <span className='text-gray-200 hover:text-white/80 duration-100'><Link href={'https://discord.com/invite/WScAm7vNGF'}>Lanyard&apos;s Discord server. </Link></span>
            Reload the page after<br/>you join the Discord server or try with an user ID who is already in Discord. </p>
            <button className='border-2 text-sm text-white/50 border-white/5 p-2 bg-white/5 rounded-lg  hover:border-white/20 duration-100' onClick={() => router.push('/')}>Back to the Future</button>
        </motion.div>
    )
}