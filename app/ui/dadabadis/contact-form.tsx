'use client';
import { createDadabadi } from '@/app/lib/dadabadiactions';
import { mukta } from '@/app/ui/fonts';
import { FormEvent, useRef, useState } from 'react';

import { useFormState, useFormStatus } from 'react-dom';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import * as z from "zod";
import { Button } from '@/app/ui/button';

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

const ContactFormSchema = z.object({
  name: z.string({ required_error: "Your name is required", invalid_type_error: 'Please provide a title.' }).min(2).max(50),
  senderNumber: z.string({ required_error: "Your contact number is required" }).min(10), //z.string({ invalid_type_error: 'Please provide a title.' }),
  senderEmail: z.string({ required_error: "Your Email is required", invalid_type_error: 'Please provide a title.' }).email(),
  message: z.string({ required_error: "message is required", invalid_type_error: 'Please provide a title.' }).min(2),
});



export default function ContactForm() {
  const ref = useRef<HTMLFormElement>(null);
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});
  const { pending, data, method, action } = useFormStatus();

  const sendEmail = async (e: FormEvent) => {
    e.preventDefault();
    console.log("in sendEail");
    const formData = new FormData(e.target as HTMLFormElement);
    console.log("in sendEail formData :", formData);
    try {
      const validatedFields = ContactFormSchema.safeParse({
        name: formData.get('name'),
        senderNumber: formData.get('senderNumber'),
        senderEmail: formData.get('senderEmail'),
        message: formData.get('message'),
      });
      console.log("validated fields :", validatedFields);
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
        console.log("new error :", newErrors);
        return setFormErrors(newErrors);
      } else {
        setFormErrors({});
        const {
          name,
          senderNumber,
          senderEmail,
          message,
        } = validatedFields.data;
        try {
          // Proceed with form submission      
          const response = await fetch('/api/send', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              name: name,
              senderEmail: senderEmail,
              senderNumber: senderNumber,
              message: message
            }),
          });
          const resp = await response.json();
          if (resp.message) {
            /* formData.set("name", "");
            formData.set("senderEmail", "");
            formData.set("senderNumber", "");
            formData.set("message", ""); */
            toast(resp.message);
            ref.current?.reset();
          } else {
            toast("Internal server error");
          }
        } catch (error: any) {
          // Handle validation errors
          toast(error);
          console.log("error in try catch ", error);
        }
      }
    } catch (error: any) {
      toast(error);
      console.log("try catch error :", error);
    }
  }

  return (
    <>
      <ToastContainer />
      <form ref={ref} className="space-y-8" onSubmit={sendEmail} >

        <div className="rounded-md bg-amber-50 text-keshar-saffronRedLight p-0 md:p-0">

          {/* Sender Name */}
          <div className="mb-4">
            <label htmlFor="name" className="mb-2 block text-md font-small">
              Enter your Name
            </label>
            <div className="relative mt-2 rounded-md">
              <div className="relative">
                <input
                  id="name"
                  name="name"
                  type="text"
                  placeholder="Enter your Name"
                  aria-describedby="name-error"
                  className="peer block w-full rounded-md border text-keshar-saffronRedDark border-amber-200 py-2 pl-10 text-sm outline-2 placeholder:text-amber-500 focus:border-amber-500 focus:ring-amber-500"
                />
                <UserIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-amber-500 peer-focus:text-keshar-saffronRedLight" />
              </div>
              <div id="name-error" aria-live="polite" aria-atomic="true">
                {formErrors.name &&
                  <p className="mt-2 text-xs font-bold text-blue-500">
                    {formErrors.name}
                  </p>
                }
              </div>
            </div>
          </div>

          {/* Sender Email */}
          <div className="mb-4">
            <label htmlFor="senderemail" className="mb-2 block text-md font-small">
              Enter your valid Email
            </label>
            <div className="relative mt-2 rounded-md">
              <div className="relative">
                <input
                  id="senderEmail"
                  name="senderEmail"
                  type="email"
                  maxLength={500}
                  placeholder="Enter your valid Email"
                  aria-describedby="senderEmail-error"
                  className="peer block w-full rounded-md border text-keshar-saffronRedDark border-amber-200 py-2 pl-10 text-sm outline-2 placeholder:text-amber-500 focus:border-amber-500 focus:ring-amber-500"
                />
                <AtSymbolIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-amber-500 peer-focus:text-keshar-saffronRedLight" />
              </div>
              <div id="senderEmail-error" aria-live="polite" aria-atomic="true">
                {formErrors.senderEmail &&
                  <p className="mt-2 text-xs font-bold text-blue-500">
                    {formErrors.senderEmail}
                  </p>
                }
              </div>
            </div>
          </div>

          {/* Sender Number */}
          <div className="mb-4">
            <label htmlFor="senderNumber" className="mb-2 block text-md font-small">
              Enter your valid mobile number
            </label>
            <div className="relative mt-2 rounded-md">
              <div className="relative">
                <input
                  id="senderNumber"
                  name="senderNumber"
                  type="text"
                  maxLength={30}
                  placeholder="Enter your valid 10 digit mobile number"
                  aria-describedby="senderNumber-error"
                  className="peer block w-full rounded-md border text-keshar-saffronRedDark border-amber-200 py-2 pl-10 text-sm outline-2 placeholder:text-amber-500 focus:border-amber-500 focus:ring-amber-500"
                />
                <PhoneArrowDownLeftIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-amber-500 peer-focus:text-keshar-saffronRedLight" />
              </div>
              <div id="senderNumber-error" aria-live="polite" aria-atomic="true">
                {formErrors.senderNumber &&
                  <p className="mt-2 text-xs font-bold text-blue-500">
                    {formErrors.senderNumber}
                  </p>
                }
              </div>
            </div>
          </div>

          {/* description */}
          <div className="mb-8">
            <label htmlFor="message" className="mb-2 block text-md font-small">
              Enter your message
            </label>
            <div className="relative mt-2 rounded-md">
              <div className="relative">
                <textarea
                  id="message"
                  name="message"
                  maxLength={3000}
                  placeholder="Enter your message or Leave a comment..."
                  aria-describedby="message-error"
                  className="peer block w-full rounded-md border text-keshar-saffronRedDark border-amber-500 py-2 pl-10 text-sm outline-2 placeholder:text-amber-500 focus:border-amber-500 focus:ring-amber-500"
                />
                <PencilIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-amber-500 peer-focus:text-keshar-saffronRedLight" />
              </div>
              <div id="message-error" aria-live="polite" aria-atomic="true">
                {formErrors.message &&
                  <p className="mt-2 text-xs font-bold text-blue-500">
                    {formErrors.message}
                  </p>
                }
              </div>
            </div>
          </div>
          <div className="flex justify-end">
            <Button type='submit' className="py-3 px-5 text-md font-medium text-center text-keshar-saffronRedDark rounded-lg bg-amber-500 sm:w-fit hover:bg-keshar-saffronRedLight focus:ring-4 focus:outline-none focus:ring-amber-300">
              Send message</Button>
          </div>
        </div>
      </form>
    </>
  );
}
