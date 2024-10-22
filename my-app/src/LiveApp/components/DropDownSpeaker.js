import { Popover, Transition } from '@headlessui/react'
// import { CheckIcon, ChevronDownIcon } from "@heroicons/react/outline";
import { Fragment } from 'react'
import React, { useState } from "react";
import DropSpeaker from '../icons/DropDown/DropSpeaker';
import TestSpeaker from '../icons/DropDown/TestSpeaker';
import test_sound from '../sounds/test_sound.mp3'
import { useMeetingAppContext } from '../MeetingAppContextDef';

export default function DropDownSpeaker({ speakers }) {

  const {
    setSelectedSpeaker,
    selectedSpeaker,
    isMicrophonePermissionAllowed
  } = useMeetingAppContext()
  const [audioProgress, setAudioProgress] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false)
  const [isHovered, setIsHovered] = useState(false);

  const testSpeakers = () => {
    const selectedSpeakerDeviceId = selectedSpeaker.id
    if (selectedSpeakerDeviceId) {
      const audio = new Audio(test_sound);
      try {
        audio.setSinkId(selectedSpeakerDeviceId)
          .then(() => {
            audio.play();
            setIsPlaying(true)
            audio.addEventListener('timeupdate', () => {
              const progress = (audio.currentTime / audio.duration) * 100;
              setAudioProgress(progress);
            });
            audio.addEventListener('ended', () => {
              setAudioProgress(0);
              setIsPlaying(false)
            });
          })
      } catch (error) {
        console.log(error);
      };
      audio.play().catch(error => {
        console.error('Failed to set sinkId:', error);
      });
    } else {
      console.error('Selected speaker deviceId not found.');
    }
  };

  return (
    <>
      <Popover className="relative ml-3">
        {({ open }) => (
          <>
            <Popover.Button
              onMouseEnter={() => { setIsHovered(true) }}
              onMouseLeave={() => { setIsHovered(false) }}
              disabled={!isMicrophonePermissionAllowed}
              className={`focus:outline-none hover:ring-1 hover:ring-gray-250 hover:bg-black 
              ${open
                  ? "text-white ring-1 ring-gray-250 bg-black"
                  : "text-customGray-250 hover:text-white"
                }
              group inline-flex items-center rounded-md px-1 py-1 w-44 text-base font-normal
              ${!isMicrophonePermissionAllowed ? "opacity-50" : ""}`}
            >
              <DropSpeaker fillColor={isHovered || open ? "#FFF" : "#B4B4B4"} />
              <span className=" overflow-hidden whitespace-nowrap overflow-ellipsis w-28 ml-6">
                {isMicrophonePermissionAllowed ? selectedSpeaker?.label : "Permission Needed"}
              </span>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5M16.5 12 12 16.5m0 0L7.5 12m4.5 4.5V3" />
              </svg>

            </Popover.Button>
            <Transition
              as={Fragment}
              enter="transition ease-out duration-200"
              enterFrom="opacity-0 translate-y-1"
              enterTo="opacity-100 translate-y-0"
              leave="transition ease-in duration-150"
              leaveFrom="opacity-100 translate-y-0"
              leaveTo="opacity-0 translate-y-1"
            >
              <Popover.Panel className="absolute bottom-full z-10 mt-3 w-72 px-4 sm:px-0 pb-2">
                <div className="rounded-lg shadow-lg">
                  <div className={"bg-gray-350 rounded-lg"} >
                    <div>
                      <div className="flex flex-col">
                        {speakers.map(
                          (item, index) => {
                            return (
                              item?.kind === "audiooutput" && (
                                <div
                                  key={`speaker_${index}`}
                                  className={` my-1 pl-4 pr-2 text-white text-left flex `} >
                                  <span className="w-6 mr-2 flex items-center justify-center">
                                    {selectedSpeaker?.label === item?.label && (
                                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                                      <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
                                    </svg>
                                    
                                    )}
                                  </span>
                                  <button
                                    className={`flex flex-1 w-full text-left `}
                                    value={item?.deviceId}
                                    onClick={() => {
                                      setSelectedSpeaker(
                                        (s) => ({
                                          ...s,
                                          id: item?.deviceId,
                                          label: item?.label
                                        })
                                      );
                                    }}
                                  >
                                    {item?.label ? (
                                      <span>{item?.label}</span>
                                    ) : (
                                      <span >{`Speaker ${index + 1}`}</span>
                                    )}
                                  </button>
                                </div>
                              )
                            );
                          }
                        )}
                        {speakers.length && <> <hr className='border border-gray-50 mt-2 mb-1' />
                          <div className={`my-1 pl-4 pr-2 text-white text-left`} >
                            <button
                              className={`flex flex-1 w-full text-left mb-1 pl-1 focus:outline-none`}
                              onClick={testSpeakers}
                            >
                              <span className="mr-3">
                                <TestSpeaker />
                              </span>
                              {isPlaying ? <div className="w-52 mt-2 bg-gray-450 rounded-full h-2 dark:bg-gray-700">
                                <div className="bg-white opacity-50 h-2 rounded-full" style={{ width: `${audioProgress}%` }}></div>
                              </div>
                                : <span>Test Speakers</span>
                              }
                            </button>
                          </div>
                        </>}
                      </div>
                    </div>
                  </div>
                </div>
              </Popover.Panel>
            </Transition>
          </>
        )}
      </Popover>
    </>
  )
}

