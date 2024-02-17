'use client';
import { createDadabadi } from '@/app/lib/dadabadiactions';

import { FormEvent, useRef, useState } from 'react';

import { useFormState, useFormStatus } from 'react-dom';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import * as z from "zod";
import { Button } from '@/app/ui/button';

const ContactFormSchema = z.object({
  name: z.string({ required_error: "Your name is required", invalid_type_error: 'Please provide a title.' }).min(2).max(50),
  senderNumber: z.string({ required_error: "Your contact number is required" }).min(10), //z.string({ invalid_type_error: 'Please provide a title.' }),
  senderEmail: z.string({ required_error: "Your Email is required", invalid_type_error: 'Please provide a title.' }).email(),
  message: z.string({required_error: "message is required", invalid_type_error: 'Please provide a title.' }).min(2),
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
        } catch (error:any) {
          // Handle validation errors
          toast(error);
          console.log("error in try catch ", error);
        }
      }
    } catch (error:any) {
      toast(error);
      console.log("try catch error :", error);
    }
  }

  return (
    <>
      <ToastContainer />
      <form ref={ref} className="space-y-8" onSubmit={sendEmail} >
        <div>
          <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">
            Your Name
          </label>
          <input type="text" id="name" name="name"
            className="peer block p-3 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 shadow-sm focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500 dark:shadow-sm-light"
            placeholder="Enter your Name" />
          <div id="name-error" aria-live="polite" aria-atomic="true">
            {formErrors.name &&
              <p className="mt-2 text-xs text-red-500">
                {formErrors.name}
              </p>
            }
          </div>
        </div>
        <div>
          <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">
            Enter your email
          </label>
          <input type="email" id="senderEmail" name="senderEmail" className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500 dark:shadow-sm-light"
            placeholder="name@dadaguru.in"  maxLength={500} />
            <div id="name-error" aria-live="polite" aria-atomic="true">
            {formErrors.senderEmail &&
              <p className="mt-2 text-xs text-red-500">
                {formErrors.senderEmail}
              </p>
            }
          </div>
        </div>
        <div>
          <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">
            Enter your Mobile Number
          </label>
          <input type="text" id="senderNumber" name="senderNumber" className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500 dark:shadow-sm-light"
            placeholder="1234567890"  maxLength={30} />
            <div id="name-error" aria-live="polite" aria-atomic="true">
            {formErrors.senderNumber &&
              <p className="mt-2 text-xs text-red-500">
                {formErrors.senderNumber}
              </p>
            }
          </div>
        </div>
        <div className="sm:col-span-2">
          <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-400">
            Enter your message
          </label>
          <textarea id="message" name="message" className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg shadow-sm border border-gray-300 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
            placeholder="Enter your message or Leave a comment..." maxLength={3000}></textarea>
            <div id="name-error" aria-live="polite" aria-atomic="true">
            {formErrors.message &&
              <p className="mt-2 text-xs text-red-500">
                {formErrors.message}
              </p>
            }
          </div>
        </div>
        <Button type='submit' className="py-3 px-5 text-sm font-medium text-center text-white rounded-lg bg-blue-700 sm:w-fit hover:bg-primary-800 focus:ring-4 focus:outline-none focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">
          Send message</Button>
      </form>
    </>
  );
}
