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
  PencilIcon
} from '@heroicons/react/24/outline';
import { Button } from '@/app/ui/button';
import { createDadabadi } from '@/app/lib/dadabadiactions';
import { useFormState } from 'react-dom';


export default function Form({ indiastates }: { indiastates: IndiaStatesField[] }) {
  const initialState = { message: null, errors: {} };
  const [state, dispatch] = useFormState(createDadabadi, initialState);
  return (
    <form action={dispatch}>
      <div className="rounded-md bg-gray-50 p-4 md:p-6">
       
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
            Enter contact person's name
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
            Upload First Image
          </label>
          <div className="relative mt-2 rounded-md">
            <div className="relative">
              <input
                id="image1"
                name="image1"
                type="text"                
                placeholder="Upload First Image"
                aria-describedby="image1-error"
                className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
              />
              <PhotoIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
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
            Upload Second Image
          </label>
          <div className="relative mt-2 rounded-md">
            <div className="relative">
              <input
                id="image2"
                name="image2"
                type="text"                
                placeholder="Upload Second Image"
                aria-describedby="image2-error"
                className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
              />
              <PhotoIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
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
      <div className="mt-6 flex justify-end gap-4">
        <Link
          href="/dashboard/dadabadis"
          className="flex h-10 items-center rounded-lg bg-gray-100 px-4 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-200"
        >
          Cancel
        </Link>
        <Button type="submit">Create Dadabadi</Button>
      </div>
    </form>
  );
}
