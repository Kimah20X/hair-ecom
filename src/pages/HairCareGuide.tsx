import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Droplets, Scissors, Sparkles, Sun, Wind, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

const HairCareGuide: React.FC = () => {
  const hairTypes = [
    {
      type: 'Straight Hair',
      icon: <Wind className="h-6 w-6" />,
      description: 'Naturally straight hair that tends to be oily at the roots and dry at the ends.',
      tips: [
        'Use lightweight, volumizing shampoos',
        'Avoid heavy conditioners on roots',
        'Use dry shampoo between washes',
        'Apply heat protectant before styling'
      ],
      recommendedProducts: ['Volumizing Shampoo', 'Lightweight Conditioner', 'Root Lift Spray']
    },
    {
      type: 'Wavy Hair',
      icon: <Sparkles className="h-6 w-6" />,
      description: 'Hair with natural waves that can range from loose to more defined patterns.',
      tips: [
        'Use sulfate-free shampoos',
        'Apply leave-in conditioner to damp hair',
        'Scrunch hair while drying',
        'Use curl-enhancing products'
      ],
      recommendedProducts: ['Curl Defining Cream', 'Leave-in Conditioner', 'Wave Enhancer']
    },
    {
      type: 'Curly Hair',
      icon: <Zap className="h-6 w-6" />,
      description: 'Hair with defined curls that require extra moisture and gentle handling.',
      tips: [
        'Wash less frequently (2-3 times per week)',
        'Use deep conditioning treatments weekly',
        'Avoid brushing when dry',
        'Use microfiber towels or cotton t-shirts to dry'
      ],
      recommendedProducts: ['Moisturizing Shampoo', 'Deep Conditioner', 'Curl Cream']
    },
    {
      type: 'Coily Hair',
      icon: <Droplets className="h-6 w-6" />,
      description: 'Tightly coiled hair that is naturally dry and requires intensive moisture.',
      tips: [
        'Co-wash between shampoo sessions',
        'Use oil-based products for moisture',
        'Protective styling to prevent breakage',
        'Sleep on silk or satin pillowcases'
      ],
      recommendedProducts: ['Co-wash Cleanser', 'Hair Oils', 'Leave-in Treatment']
    }
  ];

  const commonConcerns = [
    {
      concern: 'Dry & Damaged Hair',
      icon: <Sun className="h-6 w-6 text-orange-500" />,
      causes: ['Heat styling', 'Chemical treatments', 'Environmental factors', 'Over-washing'],
      solutions: [
        'Use protein-rich treatments',
        'Apply hair masks weekly',
        'Limit heat styling',
        'Use UV protection products'
      ]
    },
    {
      concern: 'Oily Hair',
      icon: <Droplets className="h-6 w-6 text-blue-500" />,
      causes: ['Overactive sebaceous glands', 'Hormonal changes', 'Over-washing', 'Heavy products'],
      solutions: [
        'Use clarifying shampoos',
        'Wash every other day',
        'Avoid touching hair frequently',
        'Use dry shampoo between washes'
      ]
    },
    {
      concern: 'Hair Loss',
      icon: <Scissors className="h-6 w-6 text-red-500" />,
      causes: ['Genetics', 'Stress', 'Hormonal changes', 'Nutritional deficiencies'],
      solutions: [
        'Use scalp-stimulating products',
        'Gentle massage during washing',
        'Avoid tight hairstyles',
        'Consult a dermatologist if severe'
      ]
    }
  ];

  const routineSteps = [
    {
      step: 1,
      title: 'Cleanse',
      description: 'Start with a gentle shampoo suited to your hair type. Focus on the scalp and let the suds cleanse the lengths.',
      frequency: '2-3 times per week'
    },
    {
      step: 2,
      title: 'Condition',
      description: 'Apply conditioner from mid-length to ends. Leave for 2-3 minutes before rinsing thoroughly.',
      frequency: 'Every wash'
    },
    {
      step: 3,
      title: 'Treatment',
      description: 'Use deep conditioning masks or protein treatments based on your hair\'s needs.',
      frequency: 'Once per week'
    },
    {
      step: 4,
      title: 'Protect',
      description: 'Apply leave-in products and heat protectants before styling to prevent damage.',
      frequency: 'Before styling'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="w-full">
        {/* Header */}
        <section className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-16">
          <div className="container mx-auto px-4">
            <div className="mb-6">
              <Link to="/" className="inline-flex items-center text-blue-100 hover:text-white transition-colors">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Home
              </Link>
            </div>
            <div className="max-w-4xl">
              <h1 className="text-4xl md:text-5xl font-bold mb-6">
                Complete Hair Care Guide
              </h1>
              <p className="text-xl text-blue-100 mb-8">
                Learn everything you need to know about caring for your hair type, addressing common concerns, and building the perfect routine.
              </p>
              <div className="flex flex-wrap gap-4">
                <Badge variant="secondary" className="bg-white/20 text-white border-white/30">
                  Expert Tips
                </Badge>
                <Badge variant="secondary" className="bg-white/20 text-white border-white/30">
                  Product Recommendations
                </Badge>
                <Badge variant="secondary" className="bg-white/20 text-white border-white/30">
                  Professional Advice
                </Badge>
              </div>
            </div>
          </div>
        </section>

        {/* Hair Types */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4 text-slate-900">Know Your Hair Type</h2>
              <p className="text-slate-600 max-w-2xl mx-auto">
                Understanding your hair type is the first step to creating an effective hair care routine.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {hairTypes.map((hairType, index) => (
                <Card key={index} className="border-0 shadow-lg hover:shadow-xl transition-shadow duration-300">
                  <CardHeader className="text-center pb-4">
                    <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                      {hairType.icon}
                    </div>
                    <CardTitle className="text-lg">{hairType.type}</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p className="text-sm text-slate-600">{hairType.description}</p>
                    
                    <div>
                      <h4 className="font-semibold text-sm mb-2">Care Tips:</h4>
                      <ul className="space-y-1">
                        {hairType.tips.map((tip, tipIndex) => (
                          <li key={tipIndex} className="text-xs text-slate-600 flex items-start">
                            <span className="w-1 h-1 bg-blue-600 rounded-full mt-2 mr-2 flex-shrink-0"></span>
                            {tip}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div>
                      <h4 className="font-semibold text-sm mb-2">Recommended:</h4>
                      <div className="flex flex-wrap gap-1">
                        {hairType.recommendedProducts.map((product, productIndex) => (
                          <Badge key={productIndex} variant="outline" className="text-xs">
                            {product}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Common Concerns */}
        <section className="bg-white py-16">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4 text-slate-900">Common Hair Concerns</h2>
              <p className="text-slate-600 max-w-2xl mx-auto">
                Address the most common hair problems with targeted solutions and expert advice.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {commonConcerns.map((concern, index) => (
                <Card key={index} className="border-0 shadow-lg">
                  <CardHeader>
                    <div className="flex items-center gap-3 mb-3">
                      {concern.icon}
                      <CardTitle className="text-lg">{concern.concern}</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <h4 className="font-semibold text-sm mb-2 text-red-600">Common Causes:</h4>
                      <ul className="space-y-1">
                        {concern.causes.map((cause, causeIndex) => (
                          <li key={causeIndex} className="text-sm text-slate-600 flex items-start">
                            <span className="w-1 h-1 bg-red-500 rounded-full mt-2 mr-2 flex-shrink-0"></span>
                            {cause}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div>
                      <h4 className="font-semibold text-sm mb-2 text-green-600">Solutions:</h4>
                      <ul className="space-y-1">
                        {concern.solutions.map((solution, solutionIndex) => (
                          <li key={solutionIndex} className="text-sm text-slate-600 flex items-start">
                            <span className="w-1 h-1 bg-green-500 rounded-full mt-2 mr-2 flex-shrink-0"></span>
                            {solution}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Hair Care Routine */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4 text-slate-900">Build Your Routine</h2>
              <p className="text-slate-600 max-w-2xl mx-auto">
                Follow these essential steps to create a comprehensive hair care routine that works for you.
              </p>
            </div>

            <div className="max-w-4xl mx-auto">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {routineSteps.map((step, index) => (
                  <Card key={index} className="border-0 shadow-lg text-center">
                    <CardHeader>
                      <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-full flex items-center justify-center mx-auto mb-3 font-bold text-lg">
                        {step.step}
                      </div>
                      <CardTitle className="text-lg">{step.title}</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <p className="text-sm text-slate-600">{step.description}</p>
                      <Badge variant="outline" className="text-xs">
                        {step.frequency}
                      </Badge>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="bg-gradient-to-r from-slate-900 to-slate-800 text-white py-16">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-4">Ready to Transform Your Hair?</h2>
            <p className="text-slate-300 mb-8 max-w-2xl mx-auto">
              Shop our curated collection of premium hair care products and start your journey to healthier, more beautiful hair.
            </p>
            <Link to="/products">
              <Button size="lg" className="bg-blue-600 hover:bg-blue-700">
                Shop Hair Care Products
              </Button>
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
};

export default HairCareGuide;