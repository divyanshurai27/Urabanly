import { useState } from 'react';
import { MapPin, Package, ArrowLeft, ArrowRight, Loader2 } from 'lucide-react';

export type DemoState = 
  | 'selection' 
  | 'location-input' 
  | 'product-input' 
  | 'loading' 
  | 'results';

interface DemoFlowProps {
  demoState: DemoState;
  setDemoState: (state: DemoState) => void;
  onClose: () => void;
}

export function DemoFlow({ demoState, setDemoState, onClose }: DemoFlowProps) {
  const [locationInput, setLocationInput] = useState('');
  const [productInput, setProductInput] = useState('');
  const [budget, setBudget] = useState('');
  const [results, setResults] = useState<null | {
    score: number;
    metrics: {
      footTraffic: { level: string; score: number };
      competition: { level: string; score: number };
      spendingPower: { level: string; score: number };
      populationDensity: { level: string; score: number };
    };
    recommendations: Array<{ title: string; explanation: string }>;
  }>(null);

  const handleLocationSubmit = () => {
    if (!locationInput.trim()) return;
    setDemoState('loading');
    
    // Simulate API call
    setTimeout(() => {
      setResults({
        score: 87,
        metrics: {
          footTraffic: { level: 'High', score: 92 },
          competition: { level: 'Medium', score: 65 },
          spendingPower: { level: 'High', score: 88 },
          populationDensity: { level: 'Very High', score: 95 },
        },
        recommendations: [
          { 
            title: 'Coffee Shop', 
            explanation: 'Strong foot traffic and high spending power make this ideal for premium coffee.' 
          },
          { 
            title: 'Quick Service Restaurant', 
            explanation: 'Dense population with busy professionals seeking convenient dining.' 
          },
          { 
            title: 'Boutique Fitness Studio', 
            explanation: 'Health-conscious demographic with disposable income for wellness.' 
          },
        ],
      });
      setDemoState('results');
    }, 2000);
  };

  const handleProductSubmit = () => {
    if (!productInput.trim()) return;
    setDemoState('loading');
    
    // Simulate API call
    setTimeout(() => {
      setResults({
        score: 82,
        metrics: {
          footTraffic: { level: 'High', score: 89 },
          competition: { level: 'Low', score: 78 },
          spendingPower: { level: 'Very High', score: 94 },
          populationDensity: { level: 'High', score: 85 },
        },
        recommendations: [
          { 
            title: 'Downtown Financial District', 
            explanation: 'Your product matches the professional demographic perfectly.' 
          },
          { 
            title: 'Tech Hub - Eastside', 
            explanation: 'High concentration of early adopters for innovative products.' 
          },
          { 
            title: 'University District', 
            explanation: 'Young, engaged audience with strong word-of-mouth potential.' 
          },
        ],
      });
      setDemoState('results');
    }, 2000);
  };

  const resetDemo = () => {
    setDemoState('selection');
    setLocationInput('');
    setProductInput('');
    setBudget('');
    setResults(null);
  };

  if (demoState === 'selection') {
    return (
      <section id="demo" className="min-h-screen bg-black py-20 px-6 md:px-12 lg:px-16">
        <div className="max-w-4xl mx-auto">
          <button
            onClick={onClose}
            className="text-gray-300 hover:text-white mb-8 flex items-center gap-2 transition-colors"
          >
            <ArrowLeft size={20} />
            Back to Home
          </button>

          <h2 className="text-4xl md:text-5xl font-semibold text-white mb-4">
            What would you like to explore?
          </h2>
          <p className="text-gray-300 text-lg mb-12">
            Choose your starting point and let our AI guide you to the perfect business decision.
          </p>

          <div className="grid md:grid-cols-2 gap-6">
            {/* Option 1: I have a location */}
            <button
              onClick={() => setDemoState('location-input')}
              className="liquid-glass border border-white/10 rounded-2xl p-8 text-left hover:border-white/30 transition-all duration-300 group"
            >
              <div className="w-14 h-14 bg-white/10 rounded-xl flex items-center justify-center mb-6 group-hover:bg-white/20 transition-colors">
                <MapPin className="text-white" size={28} />
              </div>
              <h3 className="text-2xl font-semibold text-white mb-3">
                I have a location
              </h3>
              <p className="text-gray-300 mb-4">
                Enter your area or pincode and discover what businesses would thrive there.
              </p>
              <div className="flex items-center text-white font-medium">
                Get Started
                <ArrowRight size={18} className="ml-2 group-hover:translate-x-1 transition-transform" />
              </div>
            </button>

            {/* Option 2: I have a product */}
            <button
              onClick={() => setDemoState('product-input')}
              className="liquid-glass border border-white/10 rounded-2xl p-8 text-left hover:border-white/30 transition-all duration-300 group"
            >
              <div className="w-14 h-14 bg-white/10 rounded-xl flex items-center justify-center mb-6 group-hover:bg-white/20 transition-colors">
                <Package className="text-white" size={28} />
              </div>
              <h3 className="text-2xl font-semibold text-white mb-3">
                I have a product
              </h3>
              <p className="text-gray-300 mb-4">
                Tell us what you sell and find the ideal locations to maximize your success.
              </p>
              <div className="flex items-center text-white font-medium">
                Get Started
                <ArrowRight size={18} className="ml-2 group-hover:translate-x-1 transition-transform" />
              </div>
            </button>
          </div>
        </div>
      </section>
    );
  }

  if (demoState === 'location-input') {
    return (
      <section className="min-h-screen bg-black py-20 px-6 md:px-12 lg:px-16">
        <div className="max-w-2xl mx-auto">
          <button
            onClick={() => setDemoState('selection')}
            className="text-gray-300 hover:text-white mb-8 flex items-center gap-2 transition-colors"
          >
            <ArrowLeft size={20} />
            Back
          </button>

          <div className="mb-8">
            <div className="w-12 h-1 bg-white/30 rounded-full mb-2">
              <div className="w-1/2 h-full bg-white rounded-full"></div>
            </div>
            <span className="text-gray-400 text-sm">Step 1 of 2</span>
          </div>

          <h2 className="text-3xl md:text-4xl font-semibold text-white mb-4">
            Where is your location?
          </h2>
          <p className="text-gray-300 text-lg mb-8">
            Enter your area name or pincode to analyze the market potential.
          </p>

          <div className="space-y-6">
            <div>
              <label className="block text-white font-medium mb-2">
                Area / Pincode *
              </label>
              <input
                type="text"
                value={locationInput}
                onChange={(e) => setLocationInput(e.target.value)}
                placeholder="e.g., Bandra West, Mumbai or 400050"
                className="w-full bg-white/5 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-white/40 transition-colors"
              />
            </div>

            <div>
              <label className="block text-white font-medium mb-2">
                Budget Range (Optional)
              </label>
              <select
                value={budget}
                onChange={(e) => setBudget(e.target.value)}
                className="w-full bg-white/5 border border-white/20 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-white/40 transition-colors"
              >
                <option value="" className="bg-black">Select budget range</option>
                <option value="low" className="bg-black">Under ₹5 Lakh</option>
                <option value="medium" className="bg-black">₹5-15 Lakh</option>
                <option value="high" className="bg-black">₹15-50 Lakh</option>
                <option value="enterprise" className="bg-black">Above ₹50 Lakh</option>
              </select>
            </div>

            <button
              onClick={handleLocationSubmit}
              disabled={!locationInput.trim()}
              className="w-full bg-white text-black py-3 rounded-lg font-medium hover:bg-gray-100 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Analyze Location
            </button>
          </div>
        </div>
      </section>
    );
  }

  if (demoState === 'product-input') {
    return (
      <section className="min-h-screen bg-black py-20 px-6 md:px-12 lg:px-16">
        <div className="max-w-2xl mx-auto">
          <button
            onClick={() => setDemoState('selection')}
            className="text-gray-300 hover:text-white mb-8 flex items-center gap-2 transition-colors"
          >
            <ArrowLeft size={20} />
            Back
          </button>

          <div className="mb-8">
            <div className="w-12 h-1 bg-white/30 rounded-full mb-2">
              <div className="w-1/2 h-full bg-white rounded-full"></div>
            </div>
            <span className="text-gray-400 text-sm">Step 1 of 2</span>
          </div>

          <h2 className="text-3xl md:text-4xl font-semibold text-white mb-4">
            What is your product?
          </h2>
          <p className="text-gray-300 text-lg mb-8">
            Describe your product or service to find the best locations for it.
          </p>

          <div className="space-y-6">
            <div>
              <label className="block text-white font-medium mb-2">
                Product Type *
              </label>
              <input
                type="text"
                value={productInput}
                onChange={(e) => setProductInput(e.target.value)}
                placeholder="e.g., Specialty Coffee, Handmade Jewelry, Tech Gadgets"
                className="w-full bg-white/5 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-white/40 transition-colors"
              />
            </div>

            <div>
              <label className="block text-white font-medium mb-2">
                Budget Range (Optional)
              </label>
              <select
                value={budget}
                onChange={(e) => setBudget(e.target.value)}
                className="w-full bg-white/5 border border-white/20 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-white/40 transition-colors"
              >
                <option value="" className="bg-black">Select budget range</option>
                <option value="low" className="bg-black">Under ₹5 Lakh</option>
                <option value="medium" className="bg-black">₹5-15 Lakh</option>
                <option value="high" className="bg-black">₹15-50 Lakh</option>
                <option value="enterprise" className="bg-black">Above ₹50 Lakh</option>
              </select>
            </div>

            <button
              onClick={handleProductSubmit}
              disabled={!productInput.trim()}
              className="w-full bg-white text-black py-3 rounded-lg font-medium hover:bg-gray-100 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Find Best Locations
            </button>
          </div>
        </div>
      </section>
    );
  }

  if (demoState === 'loading') {
    return (
      <section className="min-h-screen bg-black py-20 px-6 md:px-12 lg:px-16 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-12 h-12 text-white animate-spin mx-auto mb-6" />
          <h3 className="text-2xl font-semibold text-white mb-2">
            Analyzing your input...
          </h3>
          <p className="text-gray-300">
            Our AI is crunching market data, foot traffic patterns, and competition metrics.
          </p>
        </div>
      </section>
    );
  }

  if (demoState === 'results' && results) {
    return (
      <section className="min-h-screen bg-black py-20 px-6 md:px-12 lg:px-16">
        <div className="max-w-5xl mx-auto">
          <button
            onClick={resetDemo}
            className="text-gray-300 hover:text-white mb-8 flex items-center gap-2 transition-colors"
          >
            <ArrowLeft size={20} />
            Start New Analysis
          </button>

          {/* Location Score */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center justify-center w-32 h-32 rounded-full liquid-glass border-2 border-white/30 mb-4">
              <span className="text-5xl font-bold text-white">{results.score}</span>
            </div>
            <p className="text-gray-300 text-lg">Location Score</p>
          </div>

          {/* Metrics Row */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
            <div className="liquid-glass border border-white/10 rounded-xl p-4 text-center">
              <p className="text-gray-400 text-sm mb-1">Foot Traffic</p>
              <p className="text-white font-semibold">{results.metrics.footTraffic.level}</p>
              <p className="text-gray-500 text-sm">({results.metrics.footTraffic.score}/100)</p>
            </div>
            <div className="liquid-glass border border-white/10 rounded-xl p-4 text-center">
              <p className="text-gray-400 text-sm mb-1">Competition</p>
              <p className="text-white font-semibold">{results.metrics.competition.level}</p>
              <p className="text-gray-500 text-sm">({results.metrics.competition.score}/100)</p>
            </div>
            <div className="liquid-glass border border-white/10 rounded-xl p-4 text-center">
              <p className="text-gray-400 text-sm mb-1">Spending Power</p>
              <p className="text-white font-semibold">{results.metrics.spendingPower.level}</p>
              <p className="text-gray-500 text-sm">({results.metrics.spendingPower.score}/100)</p>
            </div>
            <div className="liquid-glass border border-white/10 rounded-xl p-4 text-center">
              <p className="text-gray-400 text-sm mb-1">Population Density</p>
              <p className="text-white font-semibold">{results.metrics.populationDensity.level}</p>
              <p className="text-gray-500 text-sm">({results.metrics.populationDensity.score}/100)</p>
            </div>
          </div>

          {/* Recommendations */}
          <h3 className="text-2xl font-semibold text-white mb-6">
            Top Recommendations
          </h3>
          <div className="grid md:grid-cols-3 gap-4 mb-12">
            {results.recommendations.map((rec, index) => (
              <div
                key={index}
                className="liquid-glass border border-white/10 rounded-xl p-6 hover:border-white/30 transition-all duration-300"
              >
                <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center mb-4">
                  <span className="text-white font-semibold">{index + 1}</span>
                </div>
                <h4 className="text-lg font-semibold text-white mb-2">{rec.title}</h4>
                <p className="text-gray-300 text-sm">{rec.explanation}</p>
              </div>
            ))}
          </div>

          {/* Premium Section */}
          <div className="relative">
            <div className="grid md:grid-cols-2 gap-4 mb-6">
              <div className="liquid-glass border border-white/10 rounded-xl p-6 blur-sm">
                <h4 className="text-lg font-semibold text-white mb-2">Profit Estimates</h4>
                <p className="text-gray-300 text-sm">Detailed monthly revenue projections based on market analysis.</p>
              </div>
              <div className="liquid-glass border border-white/10 rounded-xl p-6 blur-sm">
                <h4 className="text-lg font-semibold text-white mb-2">Competitor Insights</h4>
                <p className="text-gray-300 text-sm">Deep dive into nearby competitors and market saturation.</p>
              </div>
            </div>

            {/* Unlock CTA */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="liquid-glass border border-white/20 rounded-2xl p-8 text-center">
                <h4 className="text-xl font-semibold text-white mb-2">
                  Unlock Full Report
                </h4>
                <p className="text-gray-300 mb-4 max-w-sm">
                  Get detailed profit estimates, competitor analysis, and personalized recommendations.
                </p>
                <button className="bg-white text-black px-8 py-3 rounded-lg font-medium hover:bg-gray-100 transition-colors">
                  Upgrade Now
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return null;
}
