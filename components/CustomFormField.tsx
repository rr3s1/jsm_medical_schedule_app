import React from 'react'
import { FormControl,
FormDescription,
FormField,
FormItem,
FormLabel,
FormMessage } from "@/components/ui/form" 
import { Input } from "@/components/ui/input"
import { Control } from "react-hook-form"
import { FormFieldType } from "./forms/PatientForm"
import Image from 'next/image'


interface CustomProps {
    control: Control<any>,
    fieldType: FormFieldType,
    name: string,
    label?: string,
    placeholder?: string,
    iconSrc?: string,
    iconAlt?: string,
    disabled?: string,
    dateFormat?: string,
    showTimeSelect?: boolean,
    children?: React.ReactNode,
    renderSkeleton?: (field: any) => React.ReactNode,
}



const RenderField = ({field, props }: {field: any; props: CustomProps} ) => {
    const { fieldType, iconSrc, placeholder } = props;

    switch (fieldType) {
        case FormFieldType.INPUT:
            return (
            <div className="flex rounded-md border border-dark-500 bg-dark-400">
               {iconSrc && ( 
                <Image
                src= {iconSrc}
                height={24}
                width={24}
                alt={'icon'}
                className='m1-2'
                />
               )} 

                  <FormControl>
                    <Input
                    placeholder={placeholder}
                    {...field}
                    className="shad-input border-0"
                    />
                    </FormControl>     
            </div> 
    )}
}



const CustomFormField = (props: CustomProps) => {
    const {control, fieldType, name, label} = props;
  return (
    <FormField
          control={control}
          name={name}
          render={({ field }) => (
            <FormItem className='flex-1'>
                {fieldType !== FormFieldType.CHECKBOX && label && (
                    <FormLabel>{label}</FormLabel>
                )}
            <RenderField field={field} props={props}/>
            <FormMessage className='shad-error' />
            </FormItem>
          )}
          />
        )}

export default CustomFormField