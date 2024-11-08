"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import { Form } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import CustomFormField from "../CustomFormField"
import SubmitButton from "../SubmitButton"
import { useState } from "react"
import { UserFormValidation } from "@/lib/validation"
import { useRouter } from "next/navigation"
import { createUser } from "@/lib/actions/patient.actions"
 
export enum FormFieldType {
    INPUT = 'input',
    TEXTAREA = 'textarea',
    PHONE_INPUT = 'phone_input',
    CHECKBOX = 'checkbox' ,
    DATE_PICKER = 'datePicker',
    SELECT = 'select' ,
    SKELETON = 'skeleton',
}



 
const PatientForm = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false)
  // 1. Define your form.
  const form = useForm<z.infer<typeof UserFormValidation>>({
    resolver: zodResolver(UserFormValidation),
    defaultValues: {
      name: "",
      email:"",
      phone:"",
    },
  })
 
  // 2. Define a submit handler.
  async function onSubmit({name, email, phone}: z.infer<typeof UserFormValidation>) {
    console.log('onSubmit function called with:', {name, email, phone});
    setIsLoading(true);

    try {
      console.log('Attempting to create user...');
      const userData = {name, email, phone};
      const user = await createUser(userData);
      console.log('User created:', user);

      if(user) {
        console.log('Redirecting to registration page...');
        router.push(`/patients/${user.$id}/register`);
      } else {
        console.log('User creation failed or returned undefined');
      }
    } 
    catch (error) {
      console.error('Error in onSubmit:', error);
    }
    setIsLoading(false);
    console.log('Form submission completed');
  }
    

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 flex-1">
        <section>
            <h1 className="header"> Hi there! 😊</h1>
            <p className="text-dark-700">Schedule your first appointment</p>
        </section>
        <CustomFormField
            fieldType={FormFieldType.INPUT}
          control={form.control}
          name="name"
          label="Full name"
          placeholder="John Doe"
          iconSrc="/assets/icons/user.svg"
            iconAlt="user"
           />
           <CustomFormField
            fieldType={FormFieldType.INPUT}
          control={form.control}
          name="email"
          label="Email"
          placeholder="johndoe@example.com"
          iconSrc="/assets/icons/email.svg"
            iconAlt="email"
           />

<CustomFormField
            fieldType={FormFieldType.PHONE_INPUT}
          control={form.control}
          name="phone"
          label="Phone number"
          placeholder="(555) 123-4567"
           />
        <SubmitButton isLoading={isLoading}>Get Started</SubmitButton> 
      </form>
    </Form>
  
  )
}

export default PatientForm