import { MapPin, BarChart3, Lightbulb, Shield, Zap, TrendingUp } from 'lucide-react';
import { FadeIn } from './FadeIn';

const features = [
  {
    icon: MapPin,
    title: 'Location Intelligence',
    description: 'Analyze foot traffic, demographics, and competition with pinpoint accuracy.',
  },
  {
    icon: BarChart3,
    title: 'Market Analytics',
    description: 'Real-time data on spending patterns, population density, and growth trends.',
  },
  {
    icon: Lightbulb,
    title: 'AI-Powered Insights',
    description: 'Smart recommendations tailored to your business type and budget.',
  },
  {
    icon: Shield,
    title: 'Risk Assessment',
    description: 'Evaluate market saturation and potential risks before you invest.',
  },
  {
    icon: Zap,
    title: 'Instant Analysis',
    description: 'Get comprehensive reports in seconds, not days.',
  },
  {
    icon: TrendingUp,
    title: 'Growth Forecasting',
    description: 'Predict future trends and plan for long-term success.',
  },
];

export function Features() {
  return (
    <section id="features" className="py-24 px-6 md:px-12 lg:px-16 bg-black">
      <div className="max-w-6xl mx-auto">
        <FadeIn>
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-semibold text-white mb-4">
              Powerful Features
            </h2>
            <p className="text-gray-300 text-lg max-w-2xl mx-auto">
              Everything you need to make data-driven location decisions for your business.
            </p>
          </div>
        </FadeIn>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <FadeIn key={feature.title} delay={index * 100}>
              <div className="liquid-glass border border-white/10 rounded-xl p-6 hover:border-white/30 transition-all duration-300 group">
                <div className="w-12 h-12 bg-white/10 rounded-lg flex items-center justify-center mb-4 group-hover:bg-white/20 transition-colors">
                  <feature.icon className="text-white" size={24} />
                </div>
                <h3 className="text-xl font-semibold text-white mb-2">{feature.title}</h3>
                <p className="text-gray-300">{feature.description}</p>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
