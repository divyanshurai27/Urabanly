import { Search, LineChart, Rocket } from 'lucide-react';
import { FadeIn } from './FadeIn';

const steps = [
  {
    icon: Search,
    number: '01',
    title: 'Input Your Data',
    description: 'Share your location or product details. Add budget constraints if you have them.',
  },
  {
    icon: LineChart,
    number: '02',
    title: 'AI Analysis',
    description: 'Our algorithms crunch market data, foot traffic patterns, and competition metrics.',
  },
  {
    icon: Rocket,
    number: '03',
    title: 'Get Results',
    description: 'Receive personalized recommendations with detailed scores and actionable insights.',
  },
];

export function HowItWorks() {
  return (
    <section id="how-it-works" className="py-24 px-6 md:px-12 lg:px-16 bg-black">
      <div className="max-w-6xl mx-auto">
        <FadeIn>
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-semibold text-white mb-4">
              How It Works
            </h2>
            <p className="text-gray-300 text-lg max-w-2xl mx-auto">
              Three simple steps to smarter business decisions.
            </p>
          </div>
        </FadeIn>

        <div className="grid md:grid-cols-3 gap-8">
          {steps.map((step, index) => (
            <FadeIn key={step.number} delay={index * 150}>
              <div className="text-center">
                <div className="relative mb-6">
                  <div className="w-20 h-20 mx-auto bg-white/5 rounded-full flex items-center justify-center border border-white/20">
                    <step.icon className="text-white" size={32} />
                  </div>
                  <span className="absolute -top-2 -right-2 w-8 h-8 bg-white text-black rounded-full flex items-center justify-center text-sm font-semibold">
                    {step.number}
                  </span>
                </div>
                <h3 className="text-xl font-semibold text-white mb-3">{step.title}</h3>
                <p className="text-gray-300">{step.description}</p>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
