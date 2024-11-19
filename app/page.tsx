
import PatientForm from "@/components/forms/PatientForm";
import Image from "next/image";
import Link from "next/link";
import PasskeyModal from "@/components/PasskeyModal";

export default function Home({searchParams} : SearchParamProps) {

  const isAdmin = searchParams?.admin === 'true';
  return (
  <div className="flex h-screen max-h-screen">
    {isAdmin && <PasskeyModal />}


    <section className="remove-scroolbar container">
      <div className="sub-container max-w-[860px] flex-1 flex-col py-10">
        <Image
        src="/assets/icons/logo-full.svg"
        height={1000}
        width={1000}
        alt="patient"
        className="mb-12 h-10 w-fit"
        />
        <PatientForm />

        <p className="copyright py-12">
          ©️  2024 CarePulse
        </p>
        <div className="text-14-regular mt-20 flex justify-between">
          <Link href="/?admin=true" className="text-green-500">
          Admin
          </Link>
        </div>
      </div>
    </section>
    <Image 
    src="/assets/images/onboarding-img.png"
    height={1000}
    width={1000}
    alt="patient"
    className="side-img max-w-[50%]"
    />
  </div>
  );
}
