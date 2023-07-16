"use client";

import { useEffect, useState } from "react";
import { LanyardData } from "../types/lanyard";
import Image from 'next/image'
import circle from '../public/blur2.png'
import Link from 'next/link';
import { motion } from 'framer-motion';
import Error from "../components/Error";

export default function UserId({params}: {params: {id: number} }) {
  const [userData, setUserData] = useState<LanyardData | null>(null);
  const [error, setError] = useState("");

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
          setError('Error fetching user data');
        });
    }
  }, [params.id]);

  if (error) {
    return <Error />;
  }

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
        <Image src={circle} alt="" width={2000} height={100} />
      </motion.div>

      {userData && userData?.data ? (
        <div className="flex justify-center items-center min-h-screen">
          <div className="flex justify-center items-center w-full mx-auto px-8 md:px-0 space-y-4 md:w-4/12 2xl:w-3/12">
            <div className="flex items-center gap-2">
              {userData.data.discord_user && userData.data.discord_user.avatar ? (
                <img
                  src={`https://cdn.discordapp.com/avatars/${userData.data.discord_user.id}/${userData.data.discord_user.avatar}.png`}
                  alt="User Avatar"
                  className="rounded-full w-20 h-20"
                />
              ) : (
                ""
              )}

              {userData.data.discord_user && userData.data.discord_user.username && userData.data.discord_user.avatar ? (
                <h1 className="text-white text-2xl">{userData.data.discord_user.username}</h1>
              ) : (
                ""
              )}
            </div>
            {userData.data.spotify && userData.data.spotify.album_art_url && userData.data.spotify.artist && userData.data.spotify.song && userData.data.spotify.album ? (
              <div>

              </div>
            ) : (
              ""
            )}
          </div>
        </div>
      ) : (
        ""
      )}
    </div>
  );
}