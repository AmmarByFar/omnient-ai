import Particles from './particles'
import { Monitor, GraduationCap, Stethoscope, LineChart, Factory, ShoppingBag } from 'lucide-react'

const industries = [
  {
    Icon: Monitor,
    name: 'Technology',
    description: 'Digital transformation and AI integration'
  },
  {
    Icon: GraduationCap,
    name: 'Education',
    description: 'Interactive learning experiences'
  },
  {
    Icon: Stethoscope,
    name: 'Healthcare',
    description: 'Medical visualization and training'
  },
  {
    Icon: LineChart,
    name: 'Finance',
    description: 'Data-driven insights and automation'
  },
  {
    Icon: Factory,
    name: 'Manufacturing',
    description: 'Process optimization and IoT solutions'
  },
  {
    Icon: ShoppingBag,
    name: 'Retail',
    description: 'Customer experience enhancement'
  }
]

export default function Clients() {
  return (
    <section className="relative">
      <div className="relative max-w-6xl mx-auto px-4 sm:px-6">
        {/* Particles animation */}
        <div className="absolute inset-0 max-w-6xl mx-auto px-4 sm:px-6">
          <Particles className="absolute inset-0 -z-10" quantity={5} />
        </div>

        <div className="py-12 md:py-20">
          {/* Section header */}
          <div className="max-w-3xl mx-auto text-center pb-12 md:pb-20">
            <h2 className="h2 bg-clip-text text-transparent bg-gradient-to-r from-slate-200/60 via-slate-200 to-slate-200/60 pb-4">Industries We Serve</h2>
            <p className="text-lg text-slate-400">Delivering innovative digital solutions across diverse sectors</p>
          </div>

          {/* Industries grid */}
          <div className="grid md:grid-cols-3 gap-8 md:gap-12">
            {industries.map((industry, index) => (
              <div key={index} className="relative bg-slate-800/20 rounded-lg p-6 hover:bg-slate-800/30 transition duration-150 ease-in-out" data-aos="fade-up" data-aos-delay={index * 100}>
                <div className="flex items-center space-x-4 mb-4">
                  <div className="flex items-center justify-center bg-slate-900 rounded-lg w-12 h-12">
                    <industry.Icon className="w-6 h-6 text-slate-200" />
                  </div>
                  <h4 className="font-medium text-slate-50">{industry.name}</h4>
                </div>
                <p className="text-sm text-slate-400">{industry.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
