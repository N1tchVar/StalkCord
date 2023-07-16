"use client";

import Image from 'next/image'
import circle from './public/blur2.png'
import githublogo from './public/github-logo.svg'
import Link from 'next/link';
import { motion } from 'framer-motion';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


export default function Home() { 
  const router = useRouter();
  const [userId, setUserId] = useState('');

  const handleSubmit = (e :any) => {
    e.preventDefault();

    if (userId.length === 18 || userId.length === 19) {
      router.push(`/${userId}`);
    } else {
      toast.error('Invalid Discord User ID')
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.slice() // Only allow up to 19 characters
    setUserId(value);
  };

  return (
    <div className='min-h-screen text-white'>
      <motion.div className='flex justify-center  items-center absolute -z-1 overflow-hidden pointer-events-none inset-0 place-items-center'
                  variants={{
                    hidden: {opacity: 0},
                    visible: {opacity: 1},
                  }}
                  initial="hidden"
                  animate="visible"
                  transition={{ duration: 0.2, delay: 0.25 }}
      >
          <Image
          src={circle} 
          alt=""
          width={2000}
          height={100}
          />
        </motion.div>
      <div className='flex flex-col justify-center items-center gap-4 p-4 h-screen overflow-hidden'>
        <motion.div
          className='flex flex-col justify-center items-center w-full'
          variants={{
            hidden: {opacity: 0},
            visible: {opacity: 1},
          }}
          initial="hidden"
          animate="visible"
          transition={{ duration: 0.2, delay: 0.25 }}
        >
        <h1 className='text-5xl md:text-7xl font-bold'>
          <span className='text-white'>Stalkcord</span>
        </h1>
        <p className='text-white/50 md:text-lg md:w-2/3 text-center font-medium'>
          Stalk Anyone With Unique User ID From Lanyard Discord Server!
        </p>
        </motion.div>
        <motion.div
      variants={{
        hidden: { opacity: 0 },
        visible: { opacity: 1 },
      }}
      initial="hidden"
      animate="visible"
      transition={{ duration: 0.2, delay: 0.25 }}
      className='relative w-full md:w-1/2 flex justify-center'
    >
        <ToastContainer
        theme="dark"
        autoClose={1000}
        hideProgressBar={true}
        />
        <input
          className='appearance-none pl-3 pr-20 placeholder-white/20 w-full md:w-1/2 bg-transparent outline-none py-2 border-[1.5px] border-white/10 hover:border-white/20 focus:border-white/30 transition-all rounded-lg'
          type="text"
          placeholder='Enter Anyones Discord User ID'
          value={userId}
          onChange={handleInputChange}
        />
        <div className='absolute inset-y-0 right-0 pr-4 md:right-48 flex items-center'>
          <button
            type="submit"
            className='text-white/20 font-medium select-none hover:text-white/40 transition-colors text-xs uppercase'
            onClick={handleSubmit}
          >
            Stalk
          </button>
        </div>
    </motion.div>
        <Link href={'https://github.com/N1tchVar/n1tchvar'}>
          <motion.div
          variants={{
            hidden: {opacity: 0},
            visible: {opacity: 1},
          }}
          initial="hidden"
          animate="visible"
          transition={{ duration: 0.2, delay: 0.25 }}
          >
            <Image
              src={githublogo}
              alt=''
              />
          </motion.div>
        </Link>
      </div>
    </div>
  )
}
