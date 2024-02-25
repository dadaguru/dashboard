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
  ArrowPathIcon,
  ArrowDownIcon
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

/* const fileSchema = z.object({
  filename: z.string(),
  content: z.any(), // zod doesn't works well with instanceof(File) or FileList
});

const formSchema = z.object({
  title: z.string().min(2).max(50),
  attachments: z.array(fileSchema),
}); */

const FormSchema = z.object({
  sendername: z.string({ required_error: "Your name is required", invalid_type_error: 'Please provide a title.' }).min(2).max(50),
  sendernumber: z.string({ required_error: "Your contact number is required" }).min(10), //z.string({ invalid_type_error: 'Please provide a title.' }),
  senderemail: z.string({ required_error: "Your Email is required", invalid_type_error: 'Please provide a title.' }).email(),
  title: z.string({required_error: "City name is required", invalid_type_error: 'Please provide a title.' }).min(2),
  titlehin: z.string({ invalid_type_error: 'Please provide a hindi title.' }).min(2),
  trustname: z.string({ invalid_type_error: 'Please provide a trust name.' }),
  websiteurl: z.string({ invalid_type_error: 'Please provide website url.' }),
  socialmediaurl: z.string({ invalid_type_error: 'Please provide social media link.' }),
  email: z.string({required_error: "Valid Email is required", invalid_type_error: 'Please provide valid email.' }).email(),
  pin: z.string({ invalid_type_error: 'Please provide a valid postal pin.' }),
  eventid: z.string({ invalid_type_error: 'Please provide a event details.' }),
  bhojanshala: z.enum(['available', 'notavailable'], {
    required_error: "Bhojanshala availability is required", invalid_type_error: 'Please select if Bhojanshala available.',
  }),
  dharmshala: z.enum(['available', 'notavailable'], {
    required_error: "Dharmshala availability is required",invalid_type_error: 'Please select if Dharmshala available.',
  }),
  contactnumber: z.string({ required_error: "Contact number is required", invalid_type_error: 'Please provide contact number.' }).min(10), //z.string({ invalid_type_error: 'Please provide contact number.' }),
  maplink: z.string({ invalid_type_error: 'Please provide google map link.' }),  
  image1: z.string({ required_error: "First Dadabadi image is required", invalid_type_error: 'Please upload an external image of dadabadi.' }).trim(),
  image2: z.string({ required_error: "Second Dadabadi image is required", invalid_type_error: 'Please upload an internal image of dadabadi.' }),
  state: z.string({ invalid_type_error: 'Please select state.' }),
  city: z.string({ invalid_type_error: 'Please provide name of area where dadabadi is located.' }),
  description: z.string({ invalid_type_error: 'Please provide the importance of this dadabadi.' }),
  address: z.string({required_error: "Address is required", invalid_type_error: 'Please provide address of dadabadi.' }).min(5),
  contactname: z.string({ required_error: "Contact name is required", invalid_type_error: 'Please provide contact name.' }).min(2),
  moolnayakname: z.string({ invalid_type_error: 'Please provide MoolNayak Bhagwan Name.' }),
  dadaguruname: z.string({ invalid_type_error: 'Please provide Dadaguru Name.' }),
  //content: z.string({ invalid_type_error: 'Please provide Dadaguru Name.' }).optional(),
  //filename: z.string({ invalid_type_error: 'Please provide Dadaguru Name.' }).optional(),
  //content2: z.string({ invalid_type_error: 'Please provide Dadaguru Name.' }).optional(),
  //filename2: z.string({ invalid_type_error: 'Please provide Dadaguru Name.' }).optional(),
});


export default function CreateDadabadiSendEmailForm({ indiastates }: { indiastates: IndiaStatesField[] }) {
  /* const initialState = { message: null, errors: {} };
  const [state, dispatch] = useFormState(createDadabadiEmail, initialState); */
  const [image1, setImage1] = useState<string>('');
  const [image2, setImage2] = useState<string>('');

  const [content, setContent] = useState(null); //useState<Array<string>>([]);  //useState([] as any[]);
  const [filename, setFilename] = useState();

  const [content2, setContent2] = useState(null);
  const [filename2, setFilename2] = useState();

  const [errors, setErrors] = useState({});
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});

  //https://nextjs.org/docs/app/building-your-application/data-fetching/server-actions-and-mutations
  const { pending, data, method, action } = useFormStatus();
  //https://react.dev/reference/react/useOptimistic

  const ref = useRef<HTMLFormElement>(null)

  const sendCreateDadabadiEmail = async (e: FormEvent) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);

    try {
      const validatedFields = FormSchema.safeParse({
        sendername: formData.get('sendername'),
        sendernumber: formData.get('sendernumber'),
        senderemail: formData.get('senderemail'),
        title: formData.get('title'),
        titlehin: formData.get('titlehin'),
        trustname: formData.get('trustname'),
        websiteurl: formData.get('websiteurl'),
        socialmediaurl: formData.get('socialmediaurl'),
        email: formData.get('email'),
        pin: formData.get('pin'),
        eventid: formData.get('eventid'),
        bhojanshala: formData.get('bhojanshala'),
        dharmshala: formData.get('dharmshala'),
        contactnumber: formData.get('contactnumber'),
        maplink: formData.get('maplink'),
        //image1: formData.get('image1') as unknown as File,
        image1: filename,
        image2: filename2,
        state: formData.get('state'),
        city: formData.get('city'),
        description: formData.get('description'),
        address: formData.get('address'),
        contactname: formData.get('contactname'),
        moolnayakname: formData.get('moolnayakname'),
        dadaguruname: formData.get('dadaguruname'),
      });
      // If form validation fails, return errors early. Otherwise, continue.
      if (!validatedFields.success) {
        console.log("form error :", validatedFields.error.formErrors.fieldErrors)
        const error = validatedFields.error;
        let newErrors = {};
        for (const issue of error.issues) {
          newErrors = {
            ...newErrors,
            [issue.path[0]]: issue.message,
          };
        }
        console.log("field error :", validatedFields.error.formErrors.fieldErrors);
        console.log("new error :", newErrors);
        return setFormErrors(newErrors);
      } else {
        setFormErrors({});
        let base64Content;
        let base64Content2;

        if (content !== null) {
          base64Content = (content as unknown as string).split(',')[1];
        }
        if (content2 !== null) {
          base64Content2 = (content2 as unknown as string).split(',')[1];
        }

        const {
          sendername,
          sendernumber,
          senderemail,
          title,
          titlehin,
          trustname,
          websiteurl,
          socialmediaurl,
          email,
          pin,
          eventid,
          bhojanshala,
          dharmshala,
          contactnumber,
          maplink,
          image1,
          image2,
          state,
          city,
          description,
          address,
          contactname,
          moolnayakname,
          dadaguruname
        } = validatedFields.data;

        try {
          const response = await fetch('/api/sendCreateDadabadi', {
            method: 'POST',
            headers: {
              'Content-Type': 'multipart/form-data',
            },
            body: JSON.stringify({
              sendername: sendername,
              sendernumber: sendernumber,
              senderemail: senderemail,
              title: title,
              titlehin: titlehin,
              trustname: trustname,
              websiteurl: websiteurl,
              socialmediaurl: socialmediaurl,
              email: email,
              pin: pin,
              eventid: eventid,
              bhojanshala: bhojanshala,
              dharmshala: dharmshala,
              contactnumber: contactnumber,
              maplink: maplink,
              image1: filename,
              image2: filename2,
              state: state,
              city: city,
              description: description,
              address: address,
              contactname: contactname,
              moolnayakname: moolnayakname,
              dadaguruname: dadaguruname,
              content: base64Content,
              filename: filename,
              content2: base64Content2,
              filename2: filename2,
            }),
            //body: formData,
            /*  body: JSON.stringify({
               sendername: formData.get("sendername") as string,
               sendernumber: formData.get("sendernumber") as string,
               senderemail: formData.get("senderemail") as string,
               title: formData.get("title") as string,
               titlehin: formData.get("titlehin") as string,
               trustname: formData.get("trustname") as string,
               websiteurl: formData.get("websiteurl") as string,
               socialmediaurl: formData.get("socialmediaurl") as string,
               email: formData.get("email") as string,
               pin: formData.get("pin") as string,
               eventid: formData.get("eventid") as string,
               bhojanshala: formData.get("bhojanshala") as string,
               dharmshala: formData.get("dharmshala") as string,
               contactnumber: formData.get("contactnumber") as string,
               maplink: formData.get("maplink") as string,
               image1: filename as string,
               image2: filename2 as string,
               state: formData.get("state") as string,
               city: formData.get("city") as string,
               description: formData.get("description") as string,
               address: formData.get("address") as string,
               contactname: formData.get("contactname") as string,
               moolnayakname: formData.get("moolnayakname") as string,
               dadaguruname: formData.get("dadaguruname") as string,
               content: base64Content,
               filename: filename,
               content2: base64Content2,
               filename2: filename2,
             }), */
          });
          console.log("response :", response);
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
    } catch (error) {
      console.log("try catch error :", error);
    }

  }

  const onAddFileAction = (e: any) => {
    const reader = new FileReader();
    const files = e.target.files;

    reader.onload = (r: any) => {
      if (e.target.name === 'image1') {
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
        <div className="rounded-md bg-amber-50 text-keshar-saffronRedLight p-4 md:p-6">

          {/* Sender Name */}
          <div className="mb-4">
            <label htmlFor="sendername" className="mb-2 block text-sm font-small">
              Enter your Full Name
            </label>
            <div className="relative mt-2 rounded-md">
              <div className="relative">
                <input
                  id="sendername"
                  name="sendername"
                  type="text"
                  placeholder="Enter your Full Name"
                  aria-describedby="sendername-error"
                  className="peer block w-full rounded-md border text-keshar-saffronRedDark border-amber-200 py-2 pl-10 text-sm outline-2 placeholder:text-amber-500 focus:border-amber-500 focus:ring-amber-500"
                />
                <UserIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-amber-500 peer-focus:text-keshar-saffronRedLight" />
              </div>
              <div id="sendername-error" aria-live="polite" aria-atomic="true">
                {formErrors.sendername &&
                  <p className="mt-2 text-xs font-bold text-blue-500">
                    {formErrors.sendername}
                  </p>
                }
              </div>
            </div>
          </div>

          {/* Sender Email */}
          <div className="mb-4">
            <label htmlFor="senderemail" className="mb-2 block text-sm font-small">
              Enter your valid Email
            </label>
            <div className="relative mt-2 rounded-md">
              <div className="relative">
                <input
                  id="senderemail"
                  name="senderemail"
                  type="text"
                  placeholder="Enter your valid Email"
                  aria-describedby="senderemail-error"
                  className="peer block w-full rounded-md border text-keshar-saffronRedDark border-amber-200 py-2 pl-10 text-sm outline-2 placeholder:text-amber-500 focus:border-amber-500 focus:ring-amber-500"
                />
                <AtSymbolIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-amber-500 peer-focus:text-keshar-saffronRedLight" />
              </div>
              <div id="senderemail-error" aria-live="polite" aria-atomic="true">
                {formErrors.senderemail &&
                  <p className="mt-2 text-xs font-bold text-blue-500">
                    {formErrors.senderemail}
                  </p>
                }
              </div>
            </div>
          </div>

          {/* Sender Number */}
          <div className="mb-4">
            <label htmlFor="sendernumber" className="mb-2 block text-sm font-small">
              Enter your valid mobile number
            </label>
            <div className="relative mt-2 rounded-md">
              <div className="relative">
                <input
                  id="sendernumber"
                  name="sendernumber"
                  type="text"
                  placeholder="Enter your valid mobile number"
                  aria-describedby="sendernumber-error"
                  className="peer block w-full rounded-md border text-keshar-saffronRedDark border-amber-200 py-2 pl-10 text-sm outline-2 placeholder:text-amber-500 focus:border-amber-500 focus:ring-amber-500"
                />
                <PhoneArrowDownLeftIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-amber-500 peer-focus:text-keshar-saffronRedLight" />
              </div>
              <div id="sendernumber-error" aria-live="polite" aria-atomic="true">
                {formErrors.sendernumber &&
                  <p className="mt-2 text-xs font-bold text-blue-500">
                    {formErrors.sendernumber}
                  </p>
                }
              </div>
            </div>
          </div>

          {/* City or Title */}
          <div className="mb-4">
            <label htmlFor="title" className="mb-2 block text-sm font-small">
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
                  className="peer block w-full rounded-md border text-keshar-saffronRedDark border-amber-200 py-2 pl-10 text-sm outline-2 placeholder:text-amber-500 focus:border-amber-500 focus:ring-amber-500"
                />
                <MapPinIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-amber-500 peer-focus:text-keshar-saffronRedLight" />
              </div>
              <div id="title-error" aria-live="polite" aria-atomic="true">
                {formErrors.title &&
                  <p className="mt-2 text-xs font-bold text-blue-500">
                    {formErrors.title}
                  </p>
                }
              </div>
            </div>
          </div>

          {/* City or Title in Hindi */}
          <div className="mb-4">
            <label htmlFor="titlehin" className="mb-2 block text-sm font-small">
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
                  className="peer block w-full rounded-md border text-keshar-saffronRedDark border-amber-200 py-2 pl-10 text-sm outline-2 placeholder:text-amber-500 focus:border-amber-500 focus:ring-amber-500"
                />
                <MapPinIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-amber-500 peer-focus:text-keshar-saffronRedLight" />
              </div>
              <div id="titlehin-error" aria-live="polite" aria-atomic="true">
                {formErrors.titlehin &&
                  <p className="mt-2 text-xs font-bold text-blue-500">
                    {formErrors.titlehin}
                  </p>
                }
              </div>
            </div>
          </div>

          {/* Contact Name*/}
          <div className="mb-4">
            <label htmlFor="contactname" className="mb-2 block text-sm font-small">
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
                  className="peer block w-full rounded-md border text-keshar-saffronRedDark border-amber-200 py-2 pl-10 text-sm outline-2 placeholder:text-amber-500 focus:border-amber-500 focus:ring-amber-500"
                />
                <UserIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-amber-500 peer-focus:text-keshar-saffronRedLight" />
              </div>
              <div id="contactname-error" aria-live="polite" aria-atomic="true">
                {formErrors.contactname &&
                  <p className="mt-2 text-xs font-bold text-blue-500">
                    {formErrors.contactname}
                  </p>
                }
              </div>
            </div>
          </div>

          {/* Contact Number*/}
          <div className="mb-4">
            <label htmlFor="contactnumber" className="mb-2 block text-sm font-small">
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
                  className="peer block w-full rounded-md border text-keshar-saffronRedDark border-amber-200 py-2 pl-10 text-sm outline-2 placeholder:text-amber-500 focus:border-amber-500 focus:ring-amber-500"
                />
                <PhoneArrowDownLeftIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-amber-500 peer-focus:text-keshar-saffronRedLight" />
              </div>
              <div id="contactnumber-error" aria-live="polite" aria-atomic="true">
                {formErrors.contactnumber &&
                  <p className="mt-2 text-xs font-bold text-blue-500">
                    {formErrors.contactnumber}
                  </p>
                }
              </div>
            </div>
          </div>

          {/* Address */}
          <div className="mb-4">
            <label htmlFor="address" className="mb-2 block text-sm font-small">
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
                  className="peer block w-full rounded-md border text-keshar-saffronRedDark border-amber-200 py-2 pl-10 text-sm outline-2 placeholder:text-amber-500 focus:border-amber-500 focus:ring-amber-500"
                />
                <EnvelopeIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-amber-500 peer-focus:text-keshar-saffronRedLight" />
              </div>
              <div id="address-error" aria-live="polite" aria-atomic="true">
                {formErrors.address &&
                  <p className="mt-2 text-xs font-bold text-blue-500">
                    {formErrors.address}
                  </p>
                }
              </div>
            </div>
          </div>

          {/* City or City Area */}
          <div className="mb-4">
            <label htmlFor="city" className="mb-2 block text-sm font-small">
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
                  className="peer block w-full rounded-md border text-keshar-saffronRedDark border-amber-200 py-2 pl-10 text-sm outline-2 placeholder:text-amber-500 focus:border-amber-500 focus:ring-amber-500"
                />
                <MapPinIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-amber-500 peer-focus:text-keshar-saffronRedLight" />
              </div>
              <div id="city-error" aria-live="polite" aria-atomic="true">
                {formErrors.city &&
                  <p className="mt-2 text-xs font-bold text-blue-500">
                    {formErrors.city}
                  </p>
                }
              </div>
            </div>
          </div>

          {/* Pin */}
          <div className="mb-4">
            <label htmlFor="pin" className="mb-2 block text-sm font-small">
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
                  className="peer block w-full rounded-md border text-keshar-saffronRedDark border-amber-200 py-2 pl-10 text-sm outline-2 placeholder:text-amber-500 focus:border-amber-500 focus:ring-amber-500"
                />
                <EnvelopeIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-amber-500 peer-focus:text-keshar-saffronRedLight" />
              </div>
              <div id="pin-error" aria-live="polite" aria-atomic="true">
                {formErrors.pin &&
                  <p className="mt-2 text-xs font-bold text-blue-500">
                    {formErrors.pin}
                  </p>
                }
              </div>
            </div>
          </div>

          {/* Bhojanshala */}
          <fieldset>
            <legend className="mb-2 block text-sm font-small">
              Food facility available ?
            </legend>
            <div className="rounded-md border border-amber-200 bg-white px-[14px] py-3">
              <div className="flex gap-4">
                <div className="flex items-center">
                  <input
                    id="yesfood"
                    name="bhojanshala"
                    type="radio"
                    value="available"
                    aria-describedby="bhojanshala-error"
                    className="h-4 w-4 cursor-pointer border-amber-300 bg-amber-100 text-keshar-saffronRedDark focus:ring-2"
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
                    className="h-4 w-4 cursor-pointer border-amber-300 bg-amber-100 text-keshar-saffronRedDark focus:ring-2"
                  />
                  <label
                    htmlFor="nofood"
                    className="ml-2 flex cursor-pointer items-center gap-1.5 rounded-full bg-keshar-saffronRedDark px-3 py-1.5 text-xs font-medium text-white"
                  >
                    No, Not Available<XMarkIcon className="h-4 w-4" />
                  </label>
                </div>
              </div>
            </div>
            <div id="bhojanshala-error" aria-live="polite" aria-atomic="true">
              {formErrors.bhojanshala &&
                <p className="mt-2 text-xs font-bold text-blue-500">
                  {formErrors.bhojanshala}
                </p>
              }
            </div>
          </fieldset>

          {/* Dharmshala */}
          <fieldset>
            <legend className="mb-2 mt-2 block text-sm font-small">
              Stay facility available ?
            </legend>
            <div className="rounded-md border border-amber-200 bg-white px-[14px] py-3">
              <div className="flex gap-4">
                <div className="flex items-center">
                  <input
                    id="yesstay"
                    name="dharmshala"
                    type="radio"
                    value="available"
                    aria-describedby="dharmshala-error"
                    className="h-4 w-4 cursor-pointer border-amber-300 bg-amber-100 text-keshar-saffronRedDark focus:ring-2"
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
                    className="h-4 w-4 cursor-pointer border-amber-300 bg-amber-100 text-keshar-saffronRedDark focus:ring-2"
                  />
                  <label
                    htmlFor="nostay"
                    className="ml-2 flex cursor-pointer items-center gap-1.5 rounded-full bg-keshar-saffronRedDark px-3 py-1.5 text-xs font-medium text-white"
                  >
                    No, Not Available <XMarkIcon className="h-4 w-4" />
                  </label>
                </div>
              </div>
            </div>
            <div id="dharmshala-error" aria-live="polite" aria-atomic="true">
              {formErrors.dharmshala &&
                <p className="mt-2 text-xs font-bold text-blue-500">
                  {formErrors.dharmshala}
                </p>
              }
            </div>
          </fieldset>

          {/* India States */}
          <div className="mb-4">
            <label htmlFor="state" className="mb-2 block text-sm font-small">
              Choose state
            </label>
            <div className="relative">
              <select
                id="state"
                name="state"
                className="peer block w-full cursor-pointer rounded-md border text-keshar-saffronRedDark border-amber-200 py-2 pl-10 text-sm outline-2 placeholder:text-amber-500 focus:border-amber-500 focus:ring-amber-500"
                defaultValue=""
                aria-describedby="state-error"
              >
                <option value="" className='text-md font-sans' disabled>
                  Select a state
                </option>
                {indiastates.map((state) => (
                  <option key={state.id} value={state.state} className='text-md font-sans'>
                    {state.name}
                  </option>
                ))}
              </select>
              <GlobeAsiaAustraliaIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-amber-500" />
            </div>
            <div id="state-error" aria-live="polite" aria-atomic="true">
              {formErrors.state &&
                <p className="mt-2 text-xs font-bold text-blue-500">
                  {formErrors.state}
                </p>
              }
            </div>
          </div>

          {/* Email */}
          <div className="mb-4">
            <label htmlFor="email" className="mb-2 block text-sm font-small">
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
                  className="peer block w-full rounded-md border text-keshar-saffronRedDark border-amber-200 py-2 pl-10 text-sm outline-2 placeholder:text-amber-500 focus:border-amber-500 focus:ring-amber-500"
                />
                <AtSymbolIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-amber-500 peer-focus:text-keshar-saffronRedLight" />
              </div>
              <div id="email-error" aria-live="polite" aria-atomic="true">
                {formErrors.email &&
                  <p className="mt-2 text-xs font-bold text-blue-500">
                    {formErrors.email}
                  </p>
                }
              </div>
            </div>
          </div>

          {/* websiteurl */}
          <div className="mb-4">
            <label htmlFor="websiteurl" className="mb-2 block text-sm font-small">
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
                  className="peer block w-full rounded-md border text-keshar-saffronRedDark border-amber-200 py-2 pl-10 text-sm outline-2 placeholder:text-amber-500 focus:border-amber-500 focus:ring-amber-500"
                />
                <CursorArrowRaysIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-amber-500 peer-focus:text-keshar-saffronRedLight" />
              </div>
              <div id="websiteurl-error" aria-live="polite" aria-atomic="true">
                {formErrors.websiteurl &&
                  <p className="mt-2 text-xs font-bold text-blue-500">
                    {formErrors.websiteurl}
                  </p>
                }
              </div>
            </div>
          </div>

          {/* socialmediaurl */}
          <div className="mb-4">
            <label htmlFor="socialmediaurl" className="mb-2 block text-sm font-small">
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
                  className="peer block w-full rounded-md border text-keshar-saffronRedDark border-amber-200 py-2 pl-10 text-sm outline-2 placeholder:text-amber-500 focus:border-amber-500 focus:ring-amber-500"
                />
                <LinkIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-amber-500 peer-focus:text-keshar-saffronRedLight" />
              </div>
              <div id="socialmediaurl-error" aria-live="polite" aria-atomic="true">
                {formErrors.socialmediaurl &&
                  <p className="mt-2 text-xs font-bold text-blue-500">
                    {formErrors.socialmediaurl}
                  </p>
                }
              </div>
            </div>
          </div>

          {/* maplink */}
          <div className="mb-4">
            <label htmlFor="maplink" className="mb-2 block text-sm font-small">
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
                  className="peer block w-full rounded-md border text-keshar-saffronRedDark border-amber-200 py-2 pl-10 text-sm outline-2 placeholder:text-amber-500 focus:border-amber-500 focus:ring-amber-500"
                />
                <MapPinIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-amber-500 peer-focus:text-keshar-saffronRedLight" />
              </div>
              <div id="maplink-error" aria-live="polite" aria-atomic="true">
                {formErrors.maplink &&
                  <p className="mt-2 text-xs font-bold text-blue-500">
                    {formErrors.maplink}
                  </p>
                }
              </div>
            </div>
          </div>

          {/* trustname */}
          <div className="mb-4">
            <label htmlFor="trustname" className="mb-2 block text-sm font-small">
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
                  className="peer block w-full rounded-md border text-keshar-saffronRedDark border-amber-200 py-2 pl-10 text-sm outline-2 placeholder:text-amber-500 focus:border-amber-500 focus:ring-amber-500"
                />
                <BookmarkSquareIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-amber-500 peer-focus:text-keshar-saffronRedLight" />
              </div>
              <div id="trustname-error" aria-live="polite" aria-atomic="true">
                {formErrors.trustname &&
                  <p className="mt-2 text-xs font-bold text-blue-500">
                    {formErrors.trustname}
                  </p>
                }
              </div>
            </div>
          </div>

          {/* Event */}
          <div className="mb-4">
            <label htmlFor="eventid" className="mb-2 block text-sm font-small">
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
                  className="peer block w-full rounded-md border text-keshar-saffronRedDark border-amber-200 py-2 pl-10 text-sm outline-2 placeholder:text-amber-500 focus:border-amber-500 focus:ring-amber-500"
                />
                <NewspaperIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-amber-500 peer-focus:text-keshar-saffronRedLight" />
              </div>
              <div id="eventid-error" aria-live="polite" aria-atomic="true">
                {formErrors.eventid &&
                  <p className="mt-2 text-xs font-bold text-blue-500">
                    {formErrors.eventid}
                  </p>
                }
              </div>
            </div>
          </div>

          {/* moolnayakname */}
          <div className="mb-4">
            <label htmlFor="moolnayakname" className="mb-2 block text-sm font-small">
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
                  className="peer block w-full rounded-md border text-keshar-saffronRedDark border-amber-200 py-2 pl-10 text-sm outline-2 placeholder:text-amber-500 focus:border-amber-500 focus:ring-amber-500"
                />
                <HandRaisedIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-amber-500 peer-focus:text-keshar-saffronRedLight" />
              </div>
              <div id="moolnayakname-error" aria-live="polite" aria-atomic="true">
                {formErrors.moolnayakname &&
                  <p className="mt-2 text-xs font-bold text-blue-500">
                    {formErrors.moolnayakname}
                  </p>
                }
              </div>
            </div>
          </div>

          {/* dadaguruname */}
          <div className="mb-4">
            <label htmlFor="dadaguruname" className="mb-2 block text-sm font-small">
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
                  className="peer block w-full rounded-md border text-keshar-saffronRedDark border-amber-200 py-2 pl-10 text-sm outline-2 placeholder:text-amber-500 focus:border-amber-500 focus:ring-amber-500"
                />
                <HandRaisedIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-amber-500 peer-focus:text-keshar-saffronRedLight" />
              </div>
              <div id="dadaguruname-error" aria-live="polite" aria-atomic="true">
                {formErrors.dadaguruname &&
                  <p className="mt-2 text-xs font-bold text-blue-500">
                    {formErrors.dadaguruname}
                  </p>
                }
              </div>
            </div>
          </div>

          {/* Image 1 */}
          <div className="mb-4">
            <label htmlFor="image1" className="mb-2 block text-sm font-small">
              Attach First Image
            </label>
            <div className="relative mt-2 rounded-md">
              <div className="relative bg-orange-200 p-2 rounded-md">
                <input
                  id="image1"
                  name="image1"
                  type="file"
                  accept="image/*"
                  defaultValue={image1}
                  placeholder="Upload First Image"
                  onChange={onAddFileAction}
                  aria-describedby="image1-error"
                  className="peer block w-full rounded-md border text-keshar-saffronRedDark border-amber-500 py-4 pl-10 text-sm outline-2 placeholder:text-amber-500 focus:border-amber-500 focus:ring-amber-500"
                />
              </div>
              <div id="image1-error" aria-live="polite" aria-atomic="true">
                {formErrors.image1 &&
                  <p className="mt-2 text-xs font-bold text-blue-500">
                    {formErrors.image1}
                  </p>
                }
              </div>
            </div>
          </div>

          {/* Image 2 */}
          <div className="mb-4">
            <label htmlFor="image2" className="mb-2 block text-sm font-small">
              Attach Second Image
            </label>
            <div className="relative mt-2 rounded-md">
              <div className="relative bg-orange-200 p-2 rounded-md">
                <input
                  id="image2"
                  name="image2"
                  type="file"
                  accept="image/*"
                  defaultValue={image2}
                  placeholder="Upload Second Image"
                  onChange={onAddFileAction}
                  aria-describedby="image2-error"
                  className="peer block w-full rounded-md border text-keshar-saffronRedDark border-amber-500 py-4 pl-10 text-sm outline-2 placeholder:text-amber-500 focus:border-amber-500 focus:ring-amber-500"
                />
              </div>
              <div id="image2-error" aria-live="polite" aria-atomic="true">
                {formErrors.image2 &&
                  <p className="mt-2 text-xs font-bold text-blue-500">
                    {formErrors.image2}
                  </p>
                }
              </div>
            </div>
          </div>

          {/* description */}
          <div className="mb-4">
            <label htmlFor="description" className="mb-2 block text-sm font-small">
              Description / Comments
            </label>
            <div className="relative mt-2 rounded-md">
              <div className="relative">
                <textarea
                  id="description"
                  name="description"
                  placeholder="Description / Comments"
                  aria-describedby="description-error"
                  className="peer block w-full rounded-md border text-keshar-saffronRedDark border-amber-500 py-2 pl-10 text-sm outline-2 placeholder:text-amber-500 focus:border-amber-500 focus:ring-amber-500"
                />
                <PencilIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-amber-500 peer-focus:text-keshar-saffronRedLight" />
              </div>
              <div id="description-error" aria-live="polite" aria-atomic="true">
                {formErrors.description &&
                  <p className="mt-2 text-xs font-bold text-blue-500">
                    {formErrors.description}
                  </p>
                }
              </div>
            </div>
          </div>
        </div>
        <div>
          {formErrors.message &&
            (
              <div id="toast-success" className="flex items-center w-full max-w-xs p-4 mb-4 text-amber-500 bg-white rounded-lg shadow dark:text-amber-400 dark:bg-amber-800" role="alert">
                <div className="inline-flex items-center justify-center flex-shrink-0 w-8 h-8 text-green-500 bg-green-100 rounded-lg dark:bg-green-800 dark:text-green-200">
                  <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z" />
                  </svg>
                  <span className="sr-only">Check icon</span>
                </div>
                <div className="ms-3 text-sm font-normal">{formErrors?.message}</div>
                <button type="button" className="ms-auto -mx-1.5 -my-1.5 bg-white text-amber-400 hover:text-amber-900 rounded-lg focus:ring-2 focus:ring-amber-300 p-1.5 hover:bg-amber-100 inline-flex items-center justify-center h-8 w-8 dark:text-amber-500 dark:hover:text-white" data-dismiss-target="#toast-success" aria-label="Close">
                  <span className="sr-only">Close</span>
                  <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
                  </svg>
                </button>
              </div>
            )
          }
        </div>
        <div className="mt-6 flex justify-end gap-4">
          <Link
            href="/dashboard/dadabadis"
            className="flex h-10 items-center rounded-lg bg-amber-500 px-4 text-sm font-medium text-keshar-saffronRedDark transition-colors hover:bg-keshar-saffronRedDark hover:text-white"
          >
            Cancel
          </Link>
          <Button type="submit">Send Email</Button>
        </div>
      </form>
    </>
  );
}
