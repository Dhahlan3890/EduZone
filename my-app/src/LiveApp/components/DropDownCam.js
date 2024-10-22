import { Popover, Transition } from '@headlessui/react'
// import { ChevronDownIcon, CheckIcon } from "@heroicons/react/outline";
import { Fragment, useState } from 'react'
import React from "react";
import DropCAM from '../icons/DropDown/DropCAM';
import { useMeetingAppContext } from '../MeetingAppContextDef';

export default function DropDownCam({
  webcams,
  changeWebcam
}) {

  const {
    setSelectedWebcam,
    selectedWebcam,
    isCameraPermissionAllowed
  } = useMeetingAppContext()
  const [isHovered, setIsHovered] = useState(false);

  return (
    <>
      <Popover className="relative ml-3">
        {({ open }) => (
          <>
            <Popover.Button
              onMouseEnter={() => { setIsHovered(true) }}
              onMouseLeave={() => { setIsHovered(false) }}
              disabled={!isCameraPermissionAllowed}
              className={`focus:outline-none hover:ring-1 hover:ring-gray-250 hover:bg-black 
              ${open
                  ? "text-white ring-1 ring-gray-250 bg-black"
                  : "text-customGray-250 hover:text-white"
                }
              group inline-flex items-center rounded-md px-1 py-1 w-44 text-base font-normal
              ${!isCameraPermissionAllowed ? "opacity-50" : ""}`}
            >
              <DropCAM fillColor={isHovered || open ? "#FFF" : "#B4B4B4"} />
              <span className=" overflow-hidden whitespace-nowrap overflow-ellipsis w-28 ml-7">
                {isCameraPermissionAllowed ? selectedWebcam?.label : "Permission Needed"}
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
                  <div className="bg-gray-350 rounded-lg">
                    <div>
                      <div className="flex flex-col">
                        {webcams.map(
                          (item, index) => {
                            return (
                              item?.kind === "videoinput" && (
                                <div
                                  key={`webcams_${index}`}
                                  className={` my-1 pl-4 pr-2 text-white text-left flex`}
                                >
                                  <span className="w-6 mr-2 flex items-center justify-center">
                                    {selectedWebcam?.label === item?.label && (
                                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
                                      </svg>
                                    
                                    )}
                                  </span>
                                  <button
                                    className={`flex flex-1 w-full text-left`}
                                    value={item?.deviceId}
                                    onClick={() => {
                                      setSelectedWebcam(
                                        (s) => ({
                                          ...s,
                                          id: item?.deviceId,
                                          label: item?.label
                                        })
                                      );
                                      changeWebcam(item?.deviceId);
                                    }}
                                  >
                                    {item?.label ? (
                                      <span>{item?.label}</span>
                                    ) : (
                                      <span >{`Webcam ${index + 1}`}</span>
                                    )}
                                  </button>
                                </div>
                              )
                            );
                          }
                        )}
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

