"use client";

import { useEffect, useState } from "react";
import { LanyardData } from "../types/lanyard";
import Image from 'next/image'
import circle from '../public/blur2.png'
import Link from 'next/link';
import { motion } from 'framer-motion';
import Error from "../components/Error";

export default function UserId({ params }: { params: { id: number } }) {
  const [userData, setUserData] = useState<LanyardData | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (params.id) {
      fetch(`https://api.lanyard.rest/v1/users/${params.id}`)
        .then((response) => response.json())
        .then((data: LanyardData) => {
          if (data.success === false) {
            setError('Error fetching user data');
          } else {
            setUserData(data);
            console.log(data);
          }
        })
        .catch((error) => {
          console.error(error);
          setError('Error fetching user data');
        });
    }
  }, [params.id]);

  if (error) {
    return <Error />;
  }

  const isCustomActivity = userData?.data?.activities[0]?.id === 'custom';
  const hasEmoji = userData?.data?.activities[0]?.emoji;
  const hasState = userData?.data?.activities[0]?.state;

  return (
    <div className="min-h-screen text-white">
      <motion.div
        className="flex justify-center items-center absolute -z-1 overflow-hidden pointer-events-none inset-0 place-items-center"
        variants={{
          hidden: { opacity: 0 },
          visible: { opacity: 1 },
        }}
        initial="hidden"
        animate="visible"
        transition={{ duration: 0.2, delay: 0.25 }}
      >
        <Image src={circle} alt="" width={2000} height={100} style={{zIndex: -1}}  />
      </motion.div>

      {userData && userData?.data && (
        <motion.div 
          variants={{
            hidden: {opacity: 0},
            visible: {opacity: 1},
          }}
          initial="hidden"
          animate="visible"
          transition={{ duration: 0.2, delay: 0.25 }}
        className="flex justify-center items-center min-h-screen">
          <div className="flex flex-col justify-center items-center w-full mx-auto px-8 md:px-0 space-y-4 md:w-4/12 2xl:w-3/12">
            <div className="flex items-center gap-4 relative">
              {userData.data.discord_user && userData.data.discord_user.avatar && (
                <Image
                  src={`https://cdn.discordapp.com/avatars/${userData.data.discord_user.id}/${userData.data.discord_user.avatar}`}
                  alt="User Avatar"
                  className="rounded-full opacity-100"
                  width={80}
                  height={80}
                />
              )}
              <div className={`w-6 h-6 rounded-full absolute left-16 bottom-2 >

           ${
             userData.data.discord_status === "online"
               ? "bg-green-500"
               : userData.data.discord_status === "dnd"
               ? "bg-red-500"
               : userData.data.discord_status === "idle"
               ? "bg-yellow-500"
               : "bg-gray-500"
           }`} >
              </div>
              {userData.data.discord_user && userData.data.discord_user.username && userData.data.discord_user.avatar ? (
                <h1 className="text-white text-2xl">{userData.data.discord_user.username}</h1>
              ) : (
                ""
              )}
            </div>

            {userData.data.activities.length === 0 ? (
              <div className="rounded-lg flex flex-row gap-2 space-y-4 backdrop-blur-md bg-white/5 p-4 overflow-x-hidden text-center">
                User is not currently engaged in any activities. 🤔
              </div>
            ) : (
              <>
              {isCustomActivity && hasEmoji && hasState ? (
                <div style={{ display: 'flex', alignItems: 'center' }}>
                <Image
                  src={`https://cdn.discordapp.com/emojis/${userData.data.activities[0]?.emoji?.id}?size=44&quality=lossless`}
                  alt="Emoji"
                  className="opacity-100"
                  width={20}
                  height={20}
                  style= {{ margin: '-1px 4px -1px 0', zIndex: 1}}
                />
                <span>{userData.data.activities[0].state}</span>
              </div>
              ) : (
                <>
                {isCustomActivity && hasEmoji && (
                  <div>
                    <Image
                      src={`https://cdn.discordapp.com/emojis/${userData.data.activities[0]?.emoji?.id}?size=44&quality=lossless`}
                      alt="Emoji"
                      className="opacity-100"
                      width={20}
                      height={20}
                      style= {{ zIndex: 1}}
                    />
                  </div>
                )}
                  
                {isCustomActivity && hasState && (
                  <div>
                    {userData.data.activities[0].state}
                  </div>
                )}
                </>
              )}
  
              {userData.data.spotify && userData.data.spotify.album_art_url && userData.data.spotify.track_id && userData.data.spotify.artist && userData.data.spotify.song && userData.data.spotify.album ? (
                <div className="rounded-lg flex flex-row gap-2 space-y-4 backdrop-blur-md bg-white/5 p-4 overflow-x-hidden">
                  <div className="flex-shrink-0 relative">
                  <Image
                    src={`${userData.data.spotify.album_art_url}`}
                    alt="Album Icon"
                    className="rounded-xl"
                    width={112}
                    height={112}
                  />
                  </div>
                  <div className="space-y-px">
                    <Link href={`https://open.spotify.com/track/${userData.data.spotify.track_id}`}
                     className="cursor-pointer font-semibold text-lg leading-tight truncate hover:underline" title="Open on Spotify" target="_blank">
                      {userData.data.spotify.song}
                    </Link>
                    <h2 className="opacity-90">{userData.data.spotify.artist}</h2>
                    <h2 className="opacity-90">{userData.data.spotify.album}</h2>
                  </div>
                </div>
              ) : (
                <div className="rounded-lg flex flex-row gap-2 space-y-4 backdrop-blur-md bg-white/5 p-4 overflow-x-hidden text-center">
                  User doesn&apos;t listens to anything 😭
                  </div>
              )}
              </>
            )}

            <Link className='border-2 text-sm text-white/50 border-white/5 p-2 bg-white/5 rounded-lg  hover:border-white/20 duration-100' href={'/'}>
              Back to the Future
            </Link>
          </div>
        </motion.div>
      )}
    </div>
  );
}
