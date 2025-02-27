import ContactForm from '@/components/contact-form'
import Particles from '@/components/particles'
import Image from 'next/image'
import Illustration from '@/public/images/glow-bottom.svg'

export const metadata = {
  title: 'Contact Us - Omnient AI',
  description: 'Get in touch with us for your digital innovation needs'
}

export default function Contact() {
  return (
    <section className="relative">
      <div className="relative max-w-6xl mx-auto px-4 sm:px-6">
        {/* Particles animation */}
        <Particles className="absolute inset-0 -z-10" />

        {/* Illustration */}
        <div className="absolute inset-0 -z-10 -mx-28 rounded-b-[3rem] pointer-events-none overflow-hidden" aria-hidden="true">
          <div className="absolute left-1/2 -translate-x-1/2 bottom-0 -z-10">
            <Image src={Illustration} className="max-w-none" width={2146} priority alt="Hero Illustration" />
          </div>
        </div>

        <div className="pt-32 pb-16 md:pt-52 md:pb-32">
          {/* Contact content */}
          <div className="max-w-3xl mx-auto text-center">
            <div className="mb-6" data-aos="fade-down">
              <div className="inline-flex relative before:absolute before:inset-0 before:bg-purple-500 before:blur-md">
                <div className="btn-sm py-0.5 text-slate-300 relative [background:linear-gradient(theme(colors.purple.500),_theme(colors.purple.500))_padding-box,_linear-gradient(theme(colors.purple.500),_theme(colors.purple.200)_75%,_theme(colors.transparent)_100%)_border-box] before:absolute before:inset-0 before:bg-slate-800/50 before:rounded-full before:pointer-events-none shadow">
                  <span className="relative inline-flex items-center">Get in Touch</span>
                </div>
              </div>
            </div>
            <h1 className="h1 bg-clip-text text-transparent bg-gradient-to-r from-slate-200/60 via-slate-200 to-slate-200/60 pb-4" data-aos="fade-down">
              Let's Create Something Amazing Together
            </h1>
            <p className="text-lg text-slate-300 mb-8" data-aos="fade-down" data-aos-delay="200">
              Have a project in mind? Reach out to us at{' '}
              <a href="mailto:contact@omnient.studio" className="text-purple-500 hover:text-purple-400 transition-colors">
                contact@omnient.studio
              </a>{' '}
              or fill out the form below.
            </p>

            {/* Contact form */}
            <div data-aos="fade-up" data-aos-delay="400">
              <ContactForm />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
