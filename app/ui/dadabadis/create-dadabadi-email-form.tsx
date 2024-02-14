// https://github.com/leon3108/mailAttachmentResend
// https://medium.com/@leon.maxime/sending-emails-with-attachments-in-next-js-using-resend-and-typescript-1e6db055e24e
'use client';
import { IndiaStatesField } from '@/app/lib/dadabadidefinitions';
import Link from 'next/link';
import {
  CheckIcon,
  ClockIcon,
  MapPinIcon,
  XMarkIcon,
  UserCircleIcon,
  EnvelopeIcon,
  UserIcon,
  LinkIcon,
  PhoneArrowDownLeftIcon,
  GlobeAsiaAustraliaIcon,
  AtSymbolIcon,
  CursorArrowRaysIcon,
  BookmarkSquareIcon,
  NewspaperIcon,
  HandRaisedIcon,
  PhotoIcon,
  PencilIcon,
  ArrowPathIcon
} from '@heroicons/react/24/outline';
import { Button } from '@/app/ui/button';

import { useFormState, useFormStatus } from 'react-dom';
import ImageUpload from '@/app/components/image-upload';
import { UploadButton } from "@/utils/uploadthing";
import { FormEvent, useRef, useState } from 'react';
import Image from 'next/image';
import axios from 'axios';
import { createDadabadiEmail } from '@/app/lib/dadabadicreateemailactions';


import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import * as z from "zod"

const fileSchema = z.object({
  filename: z.string(),
  content: z.any(), // zod doesn't works well with instanceof(File) or FileList
});

const formSchema = z.object({
  title: z.string().min(2).max(50),
  attachments: z.array(fileSchema),
})


export default function CreateDadabadiSendEmailForm({ indiastates}: { indiastates: IndiaStatesField[]}) {
  const initialState = { message: null, errors: {} };
  const [state, dispatch] = useFormState(createDadabadiEmail, initialState);
  const [image1, setImage1] = useState<string>('');
  const [image2, setImage2] = useState<string>('');
 
  const [content, setContent] = useState(null); //useState<Array<string>>([]);  //useState([] as any[]);
  const [filename, setFilename] = useState('');

  const [content2, setContent2] = useState(null); 
  const [filename2, setFilename2] = useState('');

  //https://nextjs.org/docs/app/building-your-application/data-fetching/server-actions-and-mutations
  const { pending, data, method, action } = useFormStatus();
  //https://react.dev/reference/react/useOptimistic

  const ref = useRef<HTMLFormElement>(null)

  const sendCreateDadabadiEmail = async (e: FormEvent) => {
    console.log("reached here content", content)
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);

    let base64Content;
    let base64Content2;

    if(content !== null || content !== undefined){
      base64Content = (content as unknown as string).split(',')[1];
    }

    if(content2 !== null || content2 !== undefined){
      base64Content2 = (content2 as unknown as string).split(',')[1];
    }
   
    try {
      const response = await fetch('/api/sendCreateDadabadi', {
        method: 'POST',
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        //body: formData,
        body: JSON.stringify({          
          senderName : formData.get("senderName") as string,
          senderNumber : formData.get("senderNumber") as string,
          senderEmail : formData.get("senderEmail") as string,
          title: formData.get("title") as string,
          titlehin : formData.get("titlehin") as string,
          trustname : formData.get("trustname") as string,
          websiteurl : formData.get("websiteurl") as string,
          socialmediaurl : formData.get("socialmediaurl") as string,
          email : formData.get("email") as string,
          pin : formData.get("pin") as string,
          eventid : formData.get("eventid") as string,
          bhojanshala : formData.get("bhojanshala") as string,
          dharmshala : formData.get("dharmshala") as string,
          contactnumber : formData.get("contactnumber") as string,
          maplink : formData.get("maplink") as string,
          image1 : filename as string,
          image2 : filename2 as string,
          state : formData.get("state") as string,
          city : formData.get("city") as string,
          description : formData.get("description") as string,
          address : formData.get("address") as string,
          contactname : formData.get("contactname") as string,
          moolnayakname : formData.get("moolnayakname") as string,
          dadaguruname : formData.get("dadaguruname") as string,
          content: base64Content,
          filename : filename,
          content2 : base64Content2,
          filename2 : filename2,
        }),
      });
      const resp = await response.json();
      if (resp.message) {
        formData.set("title", "");        
        toast(resp.message);
        ref.current?.reset();
      } else {
        toast("Internal server error");
      }
    } catch (error) {      
      console.log("error in try catch ", error);
    }
  }

  const onAddFileAction = (e:any) => {
    const reader = new FileReader();
    const files = e.target.files;

    reader.onload = (r:any) => {
      if(e.target.name === 'image1'){
        setContent(r.target?.result?.toString());
        setFilename(files[0].name);
      } else {
        setContent2(r.target?.result?.toString());
        setFilename2(files[0].name);
      }     
    };
    reader.readAsDataURL(files[0]);
  };
  

  return (
    <> 
      
    <form ref={ref} encType="multipart/form-data" onSubmit={sendCreateDadabadiEmail} >
      <ToastContainer />      
      <div className="rounded-md bg-gray-50 p-4 md:p-6">

         {/* Sender Name */}
         <div className="mb-4">
          <label htmlFor="senderName" className="mb-2 block text-sm font-medium">
            Enter your Full Name
          </label>
          <div className="relative mt-2 rounded-md">
            <div className="relative">
              <input
                id="senderName"
                name="senderName"
                type="text"                
                placeholder="Enter your Full Name"
                aria-describedby="senderName-error"
                className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
              />
              <MapPinIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
            </div>
            <div id="senderName-error" aria-live="polite" aria-atomic="true">
              {state.errors?.senderName &&
                state.errors.senderName.map((error: string) => (
                  <p className="mt-2 text-sm text-red-500" key={error}>
                    {error}
                  </p>
                ))}
            </div>
          </div>
        </div>

         {/* Sender Email */}
         <div className="mb-4">
          <label htmlFor="senderEmail" className="mb-2 block text-sm font-medium">
            Enter your valid Email
          </label>
          <div className="relative mt-2 rounded-md">
            <div className="relative">
              <input
                id="senderEmail"
                name="senderEmail"
                type="text"                
                placeholder="Enter your valid Email"
                aria-describedby="senderEmail-error"
                className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
              />
              <MapPinIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
            </div>
            <div id="senderEmail-error" aria-live="polite" aria-atomic="true">
              {state.errors?.senderEmail &&
                state.errors.senderEmail.map((error: string) => (
                  <p className="mt-2 text-sm text-red-500" key={error}>
                    {error}
                  </p>
                ))}
            </div>
          </div>
        </div>

         {/* Sender Number */}
         <div className="mb-4">
          <label htmlFor="senderNumber" className="mb-2 block text-sm font-medium">
            Enter your valid mobile number
          </label>
          <div className="relative mt-2 rounded-md">
            <div className="relative">
              <input
                id="senderNumber"
                name="senderNumber"
                type="text"                
                placeholder="Enter your valid mobile number"
                aria-describedby="senderNumber-error"
                className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
              />
              <MapPinIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
            </div>
            <div id="senderNumber-error" aria-live="polite" aria-atomic="true">
              {state.errors?.senderNumber &&
                state.errors.senderNumber.map((error: string) => (
                  <p className="mt-2 text-sm text-red-500" key={error}>
                    {error}
                  </p>
                ))}
            </div>
          </div>
        </div>
       
        {/* City or Title */}
        <div className="mb-4">
          <label htmlFor="title" className="mb-2 block text-sm font-medium">
            Enter City Name
          </label>
          <div className="relative mt-2 rounded-md">
            <div className="relative">
              <input
                id="title"
                name="title"
                type="text"                
                placeholder="Enter City Name"
                aria-describedby="title-error"
                className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
              />
              <MapPinIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
            </div>
            <div id="title-error" aria-live="polite" aria-atomic="true">
              {state.errors?.title &&
                state.errors.title.map((error: string) => (
                  <p className="mt-2 text-sm text-red-500" key={error}>
                    {error}
                  </p>
                ))}
            </div>
          </div>
        </div>

        {/* City or Title in Hindi */}
        <div className="mb-4">
          <label htmlFor="titlehin" className="mb-2 block text-sm font-medium">
            Enter City Name in Hindi
          </label>
          <div className="relative mt-2 rounded-md">
            <div className="relative">
              <input
                id="titlehin"
                name="titlehin"
                type="text"                
                placeholder="Enter City Name in Hindi"
                aria-describedby="titlehin-error"
                className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
              />
              <MapPinIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
            </div>
            <div id="titlehin-error" aria-live="polite" aria-atomic="true">
              {state.errors?.titlehin &&
                state.errors.titlehin.map((error: string) => (
                  <p className="mt-2 text-sm text-red-500" key={error}>
                    {error}
                  </p>
                ))}
            </div>
          </div>
        </div>

        {/* Contact Name*/}
        <div className="mb-4">
          <label htmlFor="contactname" className="mb-2 block text-sm font-medium">
            Enter name of contact person
          </label>
          <div className="relative mt-2 rounded-md">
            <div className="relative">
              <input
                id="contactname"
                name="contactname"
                type="text"                
                placeholder="Enter Contact Name"
                aria-describedby="contactname-error"
                className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
              />
              <UserIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
            </div>
            <div id="contactname-error" aria-live="polite" aria-atomic="true">
              {state.errors?.contactname &&
                state.errors.contactname.map((error: string) => (
                  <p className="mt-2 text-sm text-red-500" key={error}>
                    {error}
                  </p>
                ))}
            </div>
          </div>
        </div>
        
        {/* Contact Number*/}
        <div className="mb-4">
          <label htmlFor="contactnumber" className="mb-2 block text-sm font-medium">
          Enter contact number
          </label>
          <div className="relative mt-2 rounded-md">
            <div className="relative">
              <input
                id="contactnumber"
                name="contactnumber"
                type="text"                
                placeholder="Enter Contact Number"
                aria-describedby="contactnumber-error"
                className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
              />
              <PhoneArrowDownLeftIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
            </div>
            <div id="contactnumber-error" aria-live="polite" aria-atomic="true">
              {state.errors?.contactnumber &&
                state.errors.contactnumber.map((error: string) => (
                  <p className="mt-2 text-sm text-red-500" key={error}>
                    {error}
                  </p>
                ))}
            </div>
          </div>
        </div>

        {/* Address */}
        <div className="mb-4">
          <label htmlFor="address" className="mb-2 block text-sm font-medium">
            Enter Address
          </label>
          <div className="relative mt-2 rounded-md">
            <div className="relative">
              <input
                id="address"
                name="address"
                type="text"                
                placeholder="Enter Address"
                aria-describedby="address-error"
                className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
              />
              <EnvelopeIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
            </div>
            <div id="address-error" aria-live="polite" aria-atomic="true">
              {state.errors?.address &&
                state.errors.address.map((error: string) => (
                  <p className="mt-2 text-sm text-red-500" key={error}>
                    {error}
                  </p>
                ))}
            </div>
          </div>
        </div>

        {/* City or City Area */}
        <div className="mb-4">
          <label htmlFor="city" className="mb-2 block text-sm font-medium">
            Enter which area of the city
          </label>
          <div className="relative mt-2 rounded-md">
            <div className="relative">
              <input
                id="city"
                name="city"
                type="text"                
                placeholder="Enter landmark"
                aria-describedby="city-error"
                className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
              />
              <MapPinIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
            </div>
            <div id="city-error" aria-live="polite" aria-atomic="true">
              {state.errors?.city &&
                state.errors.city.map((error: string) => (
                  <p className="mt-2 text-sm text-red-500" key={error}>
                    {error}
                  </p>
                ))}
            </div>
          </div>
        </div>

        {/* Pin */}
        <div className="mb-4">
          <label htmlFor="pin" className="mb-2 block text-sm font-medium">
            Enter Postal pin
          </label>
          <div className="relative mt-2 rounded-md">
            <div className="relative">
              <input
                id="pin"
                name="pin"
                type="text"                
                placeholder="Enter Postal Pin"
                aria-describedby="pin-error"
                className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
              />
              <EnvelopeIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
            </div>
            <div id="pin-error" aria-live="polite" aria-atomic="true">
              {state.errors?.pin &&
                state.errors.pin.map((error: string) => (
                  <p className="mt-2 text-sm text-red-500" key={error}>
                    {error}
                  </p>
                ))}
            </div>
          </div>
        </div>

        {/* Bhojanshala */}
        <fieldset>
          <legend className="mb-2 block text-sm font-medium">
            Food facility available ?
          </legend>
          <div className="rounded-md border border-gray-200 bg-white px-[14px] py-3">
            <div className="flex gap-4">
              <div className="flex items-center">
              <input
                  id="yesfood"
                  name="bhojanshala"
                  type="radio"
                  value="available"
                  aria-describedby="bhojanshala-error"
                  className="h-4 w-4 cursor-pointer border-gray-300 bg-gray-100 text-gray-600 focus:ring-2"
                />
                <label
                  htmlFor="yesfood"
                  className="ml-2 flex cursor-pointer items-center gap-1.5 rounded-full bg-green-500 px-3 py-1.5 text-xs font-medium text-white"
                >
                  Yes Available<CheckIcon className="h-4 w-4" />
                </label>
              </div>
              <div className="flex items-center">
                <input
                  id="nofood"
                  name="bhojanshala"
                  type="radio"
                  value="notavailable"
                  aria-describedby="bhojanshala-error"
                  className="h-4 w-4 cursor-pointer border-gray-300 bg-gray-100 text-gray-600 focus:ring-2"
                />
                <label
                  htmlFor="nofood"
                  className="ml-2 flex cursor-pointer items-center gap-1.5 rounded-full bg-gray-100 px-3 py-1.5 text-xs font-medium text-gray-600"
                >
                  No, Not Available<XMarkIcon className="h-4 w-4" />
                </label>
              </div>
            </div>            
          </div>
          <div id="bhojanshala-error" aria-live="polite" aria-atomic="true">
              {state.errors?.bhojanshala &&
                state.errors.bhojanshala.map((error: string) => (
                  <p className="mt-2 text-sm text-red-500" key={error}>
                    {error}
                  </p>
                ))}
            </div>
        </fieldset>

         {/* Dharmshala */}
         <fieldset>
          <legend className="mb-2 mt-2 block text-sm font-medium">
            Stay facility available ?
          </legend>
          <div className="rounded-md border border-gray-200 bg-white px-[14px] py-3">
            <div className="flex gap-4">
              <div className="flex items-center">
              <input
                  id="yesstay"
                  name="dharmshala"
                  type="radio"
                  value="available"
                  aria-describedby="dharmshala-error"
                  className="h-4 w-4 cursor-pointer border-gray-300 bg-gray-100 text-gray-600 focus:ring-2"
                />
                <label
                  htmlFor="yesstay"
                  className="ml-2 flex cursor-pointer items-center gap-1.5 rounded-full bg-green-500 px-3 py-1.5 text-xs font-medium text-white"
                >
                  Yes Available<CheckIcon className="h-4 w-4" />
                </label>
              </div>
              <div className="flex items-center">
                <input
                  id="nostay"
                  name="dharmshala"
                  type="radio"
                  value="notavailable"
                  aria-describedby="dharmshala-error"
                  className="h-4 w-4 cursor-pointer border-gray-300 bg-gray-100 text-gray-600 focus:ring-2"
                />
                <label
                  htmlFor="nostay"
                  className="ml-2 flex cursor-pointer items-center gap-1.5 rounded-full bg-gray-100 px-3 py-1.5 text-xs font-medium text-gray-600"
                >
                  No, Not Available <XMarkIcon className="h-4 w-4" />
                </label>
              </div>
            </div>            
          </div>
          <div id="dharmshala-error" aria-live="polite" aria-atomic="true">
              {state.errors?.dharmshala &&
                state.errors.dharmshala.map((error: string) => (
                  <p className="mt-2 text-sm text-red-500" key={error}>
                    {error}
                  </p>
                ))}
            </div>
        </fieldset>

         {/* India States */}
         <div className="mb-4">
          <label htmlFor="state" className="mb-2 block text-sm font-medium">
            Choose state
          </label>
          <div className="relative">
            <select
              id="state"
              name="state"
              className="peer block w-full cursor-pointer rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
              defaultValue=""
              aria-describedby="state-error"
            >
              <option value="" disabled>
                Select a state
              </option>
              {indiastates.map((state) => (
                <option key={state.id} value={state.state}>
                  {state.name}
                </option>
              ))}
            </select>
            <GlobeAsiaAustraliaIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500" />
          </div>
          <div id="state-error" aria-live="polite" aria-atomic="true">
            {state.errors?.state &&
              state.errors.state.map((error: string) => (
                <p className="mt-2 text-sm text-red-500" key={error}>
                  {error}
                </p>
              ))}
          </div>
        </div>

         {/* Email */}
         <div className="mb-4">
          <label htmlFor="email" className="mb-2 block text-sm font-medium">
            Enter E-mail
          </label>
          <div className="relative mt-2 rounded-md">
            <div className="relative">
              <input
                id="email"
                name="email"
                type="text"                
                placeholder="Enter Email"
                aria-describedby="email-error"
                className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
              />
              <AtSymbolIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
            </div>
            <div id="email-error" aria-live="polite" aria-atomic="true">
              {state.errors?.email &&
                state.errors.email.map((error: string) => (
                  <p className="mt-2 text-sm text-red-500" key={error}>
                    {error}
                  </p>
                ))}
            </div>
          </div>
        </div>

         {/* websiteurl */}
         <div className="mb-4">
          <label htmlFor="websiteurl" className="mb-2 block text-sm font-medium">
            Enter Website URL
          </label>
          <div className="relative mt-2 rounded-md">
            <div className="relative">
              <input
                id="websiteurl"
                name="websiteurl"
                type="text"                
                placeholder="Enter Website URL"
                aria-describedby="websiteurl-error"
                className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
              />
              <CursorArrowRaysIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
            </div>
            <div id="websiteurl-error" aria-live="polite" aria-atomic="true">
              {state.errors?.websiteurl &&
                state.errors.websiteurl.map((error: string) => (
                  <p className="mt-2 text-sm text-red-500" key={error}>
                    {error}
                  </p>
                ))}
            </div>
          </div>
        </div>

        {/* socialmediaurl */}
        <div className="mb-4">
          <label htmlFor="socialmediaurl" className="mb-2 block text-sm font-medium">
            Enter Social Media URL Link
          </label>
          <div className="relative mt-2 rounded-md">
            <div className="relative">
              <input
                id="socialmediaurl"
                name="socialmediaurl"
                type="text"                
                placeholder="Enter Social Media URL Link"
                aria-describedby="socialmediaurl-error"
                className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
              />
              <LinkIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
            </div>
            <div id="socialmediaurl-error" aria-live="polite" aria-atomic="true">
              {state.errors?.socialmediaurl &&
                state.errors.socialmediaurl.map((error: string) => (
                  <p className="mt-2 text-sm text-red-500" key={error}>
                    {error}
                  </p>
                ))}
            </div>
          </div>
        </div>

        {/* maplink */}
        <div className="mb-4">
          <label htmlFor="maplink" className="mb-2 block text-sm font-medium">
            Enter Google map Link
          </label>
          <div className="relative mt-2 rounded-md">
            <div className="relative">
              <input
                id="maplink"
                name="maplink"
                type="text"                
                placeholder="Enter Google map Link"
                aria-describedby="maplink-error"
                className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
              />
              <MapPinIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
            </div>
            <div id="maplink-error" aria-live="polite" aria-atomic="true">
              {state.errors?.maplink &&
                state.errors.maplink.map((error: string) => (
                  <p className="mt-2 text-sm text-red-500" key={error}>
                    {error}
                  </p>
                ))}
            </div>
          </div>
        </div>

         {/* trustname */}
         <div className="mb-4">
          <label htmlFor="trustname" className="mb-2 block text-sm font-medium">
            Enter Trust Name
          </label>
          <div className="relative mt-2 rounded-md">
            <div className="relative">
              <input
                id="trustname"
                name="trustname"
                type="text"                
                placeholder="Enter Trust Name"
                aria-describedby="trustname-error"
                className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
              />
              <BookmarkSquareIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
            </div>
            <div id="trustname-error" aria-live="polite" aria-atomic="true">
              {state.errors?.trustname &&
                state.errors.trustname.map((error: string) => (
                  <p className="mt-2 text-sm text-red-500" key={error}>
                    {error}
                  </p>
                ))}
            </div>
          </div>
        </div>

         {/* Event */}
         <div className="mb-4">
          <label htmlFor="eventid" className="mb-2 block text-sm font-medium">
            Enter Event Detail
          </label>
          <div className="relative mt-2 rounded-md">
            <div className="relative">
              <input
                id="eventid"
                name="eventid"
                type="text"                
                placeholder=" Enter Event Detail"
                aria-describedby="eventid-error"
                className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
              />
              <NewspaperIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
            </div>
            <div id="eventid-error" aria-live="polite" aria-atomic="true">
              {state.errors?.eventid &&
                state.errors.eventid.map((error: string) => (
                  <p className="mt-2 text-sm text-red-500" key={error}>
                    {error}
                  </p>
                ))}
            </div>
          </div>
        </div>

        {/* moolnayakname */}
        <div className="mb-4">
          <label htmlFor="moolnayakname" className="mb-2 block text-sm font-medium">
            Enter MoolNayak Name
          </label>
          <div className="relative mt-2 rounded-md">
            <div className="relative">
              <input
                id="moolnayakname"
                name="moolnayakname"
                type="text"                
                placeholder="Enter MoolNayak Name"
                aria-describedby="moolnayakname-error"
                className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
              />
              <HandRaisedIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
            </div>
            <div id="moolnayakname-error" aria-live="polite" aria-atomic="true">
              {state.errors?.moolnayakname &&
                state.errors.moolnayakname.map((error: string) => (
                  <p className="mt-2 text-sm text-red-500" key={error}>
                    {error}
                  </p>
                ))}
            </div>
          </div>
        </div>

        {/* dadaguruname */}
        <div className="mb-4">
          <label htmlFor="dadaguruname" className="mb-2 block text-sm font-medium">
            Enter Dadaguru Name
          </label>
          <div className="relative mt-2 rounded-md">
            <div className="relative">
              <input
                id="dadaguruname"
                name="dadaguruname"
                type="text"                
                placeholder="Enter Dadaguru Name"
                aria-describedby="dadaguruname-error"
                className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
              />
              <HandRaisedIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
            </div>
            <div id="dadaguruname-error" aria-live="polite" aria-atomic="true">
              {state.errors?.dadaguruname &&
                state.errors.dadaguruname.map((error: string) => (
                  <p className="mt-2 text-sm text-red-500" key={error}>
                    {error}
                  </p>
                ))}
            </div>
          </div>
        </div>


        {/* Image 1 */}
        <div className="mb-4">
          <label htmlFor="image1" className="mb-2 block text-sm font-medium">
            Attach First Image
          </label>
          <div className="relative mt-2 rounded-md">
            <div className="relative bg-indigo-100 p-2 rounded-md">              
              <input
                id="image1"
                name="image1"
                type="file"                
                accept="image/*"
                defaultValue={image1}
                placeholder="Upload First Image"
                onChange={onAddFileAction}
                aria-describedby="image1-error"
                className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
              />              
            </div>
            <div id="image1-error" aria-live="polite" aria-atomic="true">
              {state.errors?.image1 &&
                state.errors.image1.map((error: string) => (
                  <p className="mt-2 text-sm text-red-500" key={error}>
                    {error}
                  </p>
                ))}
            </div>
          </div>
        </div>

         {/* Image 2 */}
         <div className="mb-4">
          <label htmlFor="image2" className="mb-2 block text-sm font-medium">
            Attach Second Image
          </label>
          <div className="relative mt-2 rounded-md">
            <div className="relative bg-indigo-100 p-2 rounded-md">              
              <input
                id="image2"
                name="image2"
                type="file"                
                accept="image/*"
                defaultValue={image2}
                placeholder="Upload First Image"
                onChange={onAddFileAction}
                aria-describedby="image2-error"
                className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
              />              
            </div>
            <div id="image2-error" aria-live="polite" aria-atomic="true">
              {state.errors?.image2 &&
                state.errors.image2.map((error: string) => (
                  <p className="mt-2 text-sm text-red-500" key={error}>
                    {error}
                  </p>
                ))}
            </div>
          </div>
        </div>

         {/* description */}
         <div className="mb-4">
          <label htmlFor="description" className="mb-2 block text-sm font-medium">
            Description / Comments
          </label>
          <div className="relative mt-2 rounded-md">
            <div className="relative">
              <textarea
                id="description"
                name="description"                
                placeholder="Description / Comments"
                aria-describedby="description-error"
                className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
              />
              <PencilIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
            </div>
            <div id="description-error" aria-live="polite" aria-atomic="true">
              {state.errors?.description &&
                state.errors.description.map((error: string) => (
                  <p className="mt-2 text-sm text-red-500" key={error}>
                    {error}
                  </p>
                ))}
            </div>
          </div>
        </div>
               
      </div>
      <div>
        {state?.message && (
          <div id="toast-success" className="flex items-center w-full max-w-xs p-4 mb-4 text-gray-500 bg-white rounded-lg shadow dark:text-gray-400 dark:bg-gray-800" role="alert">
          <div className="inline-flex items-center justify-center flex-shrink-0 w-8 h-8 text-green-500 bg-green-100 rounded-lg dark:bg-green-800 dark:text-green-200">
              <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z"/>
              </svg>
              <span className="sr-only">Check icon</span>
          </div>
          <div className="ms-3 text-sm font-normal">{state?.message}</div>
          <button type="button" className="ms-auto -mx-1.5 -my-1.5 bg-white text-gray-400 hover:text-gray-900 rounded-lg focus:ring-2 focus:ring-gray-300 p-1.5 hover:bg-gray-100 inline-flex items-center justify-center h-8 w-8 dark:text-gray-500 dark:hover:text-white dark:bg-gray-800 dark:hover:bg-gray-700" data-dismiss-target="#toast-success" aria-label="Close">
              <span className="sr-only">Close</span>
              <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                  <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
              </svg>
          </button>
      </div>

        )}
      </div>
      <div className="mt-6 flex justify-end gap-4">
        <Link
          href="/dashboard/dadabadis"
          className="flex h-10 items-center rounded-lg bg-gray-100 px-4 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-200"
        >
          Cancel
        </Link>
          <Button type="submit">Send Email</Button>
      </div>
    </form>
    </>
    
  );
}
