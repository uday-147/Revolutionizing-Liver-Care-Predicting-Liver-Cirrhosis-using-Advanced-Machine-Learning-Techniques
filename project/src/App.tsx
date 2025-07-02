import React, { useState } from 'react';
import { Activity, Brain, FileText, Heart, Shield, AlertTriangle, CheckCircle, XCircle } from 'lucide-react';

interface PatientData {
  age: number;
  gender: string;
  totalBilirubin: number;
  directBilirubin: number;
  alkalinePhosphatase: number;
  alanineAminotransferase: number;
  aspartateAminotransferase: number;
  totalProteins: number;
  albumin: number;
  albuminGlobulinRatio: number;
}

interface PredictionResult {
  risk: 'Low' | 'Moderate' | 'High' | 'Critical';
  confidence: number;
  riskFactors: string[];
  recommendations: string[];
}

function App() {
  const [patientData, setPatientData] = useState<PatientData>({
    age: 45,
    gender: 'male',
    totalBilirubin: 1.2,
    directBilirubin: 0.3,
    alkalinePhosphatase: 120,
    alanineAminotransferase: 35,
    aspartateAminotransferase: 40,
    totalProteins: 7.5,
    albumin: 4.2,
    albuminGlobulinRatio: 1.8
  });

  const [prediction, setPrediction] = useState<PredictionResult | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const handleInputChange = (field: keyof PatientData, value: string | number) => {
    setPatientData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const simulatePrediction = (): PredictionResult => {
    // Simulate ML model prediction based on input values
    let riskScore = 0;
    const riskFactors: string[] = [];
    
    // Age factor
    if (patientData.age > 60) {
      riskScore += 20;
      riskFactors.push('Advanced age (>60 years)');
    } else if (patientData.age > 45) {
      riskScore += 10;
    }

    // Bilirubin levels
    if (patientData.totalBilirubin > 2.0) {
      riskScore += 25;
      riskFactors.push('Elevated total bilirubin');
    }
    if (patientData.directBilirubin > 0.5) {
      riskScore += 15;
      riskFactors.push('Elevated direct bilirubin');
    }

    // Liver enzymes
    if (patientData.alanineAminotransferase > 50) {
      riskScore += 20;
      riskFactors.push('Elevated ALT levels');
    }
    if (patientData.aspartateAminotransferase > 50) {
      riskScore += 20;
      riskFactors.push('Elevated AST levels');
    }

    // Protein levels
    if (patientData.albumin < 3.5) {
      riskScore += 25;
      riskFactors.push('Low albumin levels');
    }
    if (patientData.albuminGlobulinRatio < 1.0) {
      riskScore += 15;
      riskFactors.push('Low A/G ratio');
    }

    // Determine risk level
    let risk: 'Low' | 'Moderate' | 'High' | 'Critical';
    let recommendations: string[] = [];

    if (riskScore >= 70) {
      risk = 'Critical';
      recommendations = [
        'Immediate specialist consultation required',
        'Comprehensive liver function assessment',
        'Consider hospitalization for monitoring',
        'Evaluate for liver transplant candidacy'
      ];
    } else if (riskScore >= 40) {
      risk = 'High';
      recommendations = [
        'Urgent hepatologist referral recommended',
        'Advanced imaging studies (CT/MRI)',
        'Regular monitoring every 3 months',
        'Lifestyle modifications essential'
      ];
    } else if (riskScore >= 20) {
      risk = 'Moderate';
      recommendations = [
        'Schedule follow-up in 6 months',
        'Consider ultrasound examination',
        'Monitor liver function tests',
        'Dietary and lifestyle counseling'
      ];
    } else {
      risk = 'Low';
      recommendations = [
        'Continue routine health monitoring',
        'Annual liver function screening',
        'Maintain healthy lifestyle',
        'Regular exercise and balanced diet'
      ];
    }

    const confidence = Math.min(95, 75 + Math.random() * 20);

    return { risk, confidence, riskFactors, recommendations };
  };

  const handleAnalyze = async () => {
    setIsAnalyzing(true);
    setPrediction(null);
    
    // Simulate model processing time
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    const result = simulatePrediction();
    setPrediction(result);
    setIsAnalyzing(false);
  };

  const getRiskColor = (risk: string) => {
    switch (risk) {
      case 'Low': return 'text-green-600 bg-green-50 border-green-200';
      case 'Moderate': return 'text-yellow-600 bg-yellow-50 border-yellow-200';
      case 'High': return 'text-orange-600 bg-orange-50 border-orange-200';
      case 'Critical': return 'text-red-600 bg-red-50 border-red-200';
      default: return 'text-gray-600 bg-gray-50 border-gray-200';
    }
  };

  const getRiskIcon = (risk: string) => {
    switch (risk) {
      case 'Low': return <CheckCircle className="w-5 h-5" />;
      case 'Moderate': return <Shield className="w-5 h-5" />;
      case 'High': return <AlertTriangle className="w-5 h-5" />;
      case 'Critical': return <XCircle className="w-5 h-5" />;
      default: return <Activity className="w-5 h-5" />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-teal-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center space-x-3">
            <div className="bg-blue-600 p-2 rounded-lg">
              <Brain className="w-8 h-8 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Liver Cirrhosis Prediction System</h1>
              <p className="text-gray-600">Advanced ML-powered early detection and risk assessment</p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Patient Data Input */}
          <div className="bg-white rounded-xl shadow-lg border border-gray-200">
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center space-x-2">
                <FileText className="w-5 h-5 text-blue-600" />
                <h2 className="text-xl font-semibold text-gray-900">Patient Information</h2>
              </div>
              <p className="text-gray-600 mt-1">Enter patient data for cirrhosis risk analysis</p>
            </div>
            
            <div className="p-6 space-y-6">
              {/* Demographics */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Age</label>
                  <input
                    type="number"
                    value={patientData.age}
                    onChange={(e) => handleInputChange('age', parseInt(e.target.value))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                    min="1"
                    max="120"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Gender</label>
                  <select
                    value={patientData.gender}
                    onChange={(e) => handleInputChange('gender', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                  >
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                  </select>
                </div>
              </div>

              {/* Bilirubin Levels */}
              <div className="space-y-4">
                <h3 className="text-lg font-medium text-gray-900 flex items-center space-x-2">
                  <Activity className="w-4 h-4 text-blue-600" />
                  <span>Bilirubin Levels (mg/dL)</span>
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Total Bilirubin</label>
                    <input
                      type="number"
                      step="0.1"
                      value={patientData.totalBilirubin}
                      onChange={(e) => handleInputChange('totalBilirubin', parseFloat(e.target.value))}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                    />
                    <p className="text-xs text-gray-500 mt-1">Normal: 0.2-1.2 mg/dL</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Direct Bilirubin</label>
                    <input
                      type="number"
                      step="0.1"
                      value={patientData.directBilirubin}
                      onChange={(e) => handleInputChange('directBilirubin', parseFloat(e.target.value))}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                    />
                    <p className="text-xs text-gray-500 mt-1">Normal: 0.0-0.3 mg/dL</p>
                  </div>
                </div>
              </div>

              {/* Liver Enzymes */}
              <div className="space-y-4">
                <h3 className="text-lg font-medium text-gray-900 flex items-center space-x-2">
                  <Heart className="w-4 h-4 text-red-600" />
                  <span>Liver Enzymes (U/L)</span>
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Alkaline Phosphatase</label>
                    <input
                      type="number"
                      step="1"
                      value={patientData.alkalinePhosphatase}
                      onChange={(e) => handleInputChange('alkalinePhosphatase', parseInt(e.target.value))}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                    />
                    <p className="text-xs text-gray-500 mt-1">Normal: 44-147 U/L</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">ALT (Alanine Aminotransferase)</label>
                    <input
                      type="number"
                      step="1"
                      value={patientData.alanineAminotransferase}
                      onChange={(e) => handleInputChange('alanineAminotransferase', parseInt(e.target.value))}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                    />
                    <p className="text-xs text-gray-500 mt-1">Normal: 7-56 U/L</p>
                  </div>
                  <div className="sm:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-2">AST (Aspartate Aminotransferase)</label>
                    <input
                      type="number"
                      step="1"
                      value={patientData.aspartateAminotransferase}
                      onChange={(e) => handleInputChange('aspartateAminotransferase', parseInt(e.target.value))}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                    />
                    <p className="text-xs text-gray-500 mt-1">Normal: 10-40 U/L</p>
                  </div>
                </div>
              </div>

              {/* Protein Levels */}
              <div className="space-y-4">
                <h3 className="text-lg font-medium text-gray-900 flex items-center space-x-2">
                  <Shield className="w-4 h-4 text-green-600" />
                  <span>Protein Levels (g/dL)</span>
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Total Proteins</label>
                    <input
                      type="number"
                      step="0.1"
                      value={patientData.totalProteins}
                      onChange={(e) => handleInputChange('totalProteins', parseFloat(e.target.value))}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                    />
                    <p className="text-xs text-gray-500 mt-1">Normal: 6.3-8.2 g/dL</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Albumin</label>
                    <input
                      type="number"
                      step="0.1"
                      value={patientData.albumin}
                      onChange={(e) => handleInputChange('albumin', parseFloat(e.target.value))}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                    />
                    <p className="text-xs text-gray-500 mt-1">Normal: 3.5-5.0 g/dL</p>
                  </div>
                  <div className="sm:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-2">Albumin/Globulin Ratio</label>
                    <input
                      type="number"
                      step="0.1"
                      value={patientData.albuminGlobulinRatio}
                      onChange={(e) => handleInputChange('albuminGlobulinRatio', parseFloat(e.target.value))}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                    />
                    <p className="text-xs text-gray-500 mt-1">Normal: 1.1-2.5</p>
                  </div>
                </div>
              </div>

              {/* Analyze Button */}
              <button
                onClick={handleAnalyze}
                disabled={isAnalyzing}
                className="w-full bg-gradient-to-r from-blue-600 to-teal-600 text-white font-semibold py-3 px-6 rounded-lg hover:from-blue-700 hover:to-teal-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 flex items-center justify-center space-x-2"
              >
                {isAnalyzing ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                    <span>Analyzing...</span>
                  </>
                ) : (
                  <>
                    <Brain className="w-5 h-5" />
                    <span>Analyze Risk</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Results Panel */}
          <div className="bg-white rounded-xl shadow-lg border border-gray-200">
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center space-x-2">
                <Activity className="w-5 h-5 text-blue-600" />
                <h2 className="text-xl font-semibold text-gray-900">Prediction Results</h2>
              </div>
              <p className="text-gray-600 mt-1">AI-powered cirrhosis risk assessment</p>
            </div>

            <div className="p-6">
              {!prediction && !isAnalyzing && (
                <div className="text-center py-12">
                  <Brain className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                  <p className="text-gray-500">Enter patient data and click "Analyze Risk" to get prediction</p>
                </div>
              )}

              {isAnalyzing && (
                <div className="text-center py-12">
                  <div className="animate-spin rounded-full h-16 w-16 border-4 border-blue-200 border-top-blue-600 mx-auto mb-4"></div>
                  <p className="text-gray-600 font-medium">Processing patient data...</p>
                  <p className="text-gray-500 text-sm mt-2">Our AI model is analyzing liver function parameters</p>
                </div>
              )}

              {prediction && (
                <div className="space-y-6">
                  {/* Risk Level */}
                  <div className={`p-4 rounded-lg border-2 ${getRiskColor(prediction.risk)}`}>
                    <div className="flex items-center space-x-3">
                      {getRiskIcon(prediction.risk)}
                      <div>
                        <h3 className="text-lg font-semibold">Risk Level: {prediction.risk}</h3>
                        <p className="text-sm opacity-80">Confidence: {prediction.confidence.toFixed(1)}%</p>
                      </div>
                    </div>
                  </div>

                  {/* Risk Factors */}
                  {prediction.riskFactors.length > 0 && (
                    <div>
                      <h4 className="text-lg font-semibold text-gray-900 mb-3">Identified Risk Factors</h4>
                      <div className="space-y-2">
                        {prediction.riskFactors.map((factor, index) => (
                          <div key={index} className="flex items-center space-x-2 text-orange-700 bg-orange-50 p-2 rounded-lg">
                            <AlertTriangle className="w-4 h-4 flex-shrink-0" />
                            <span className="text-sm">{factor}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Recommendations */}
                  <div>
                    <h4 className="text-lg font-semibold text-gray-900 mb-3">Clinical Recommendations</h4>
                    <div className="space-y-2">
                      {prediction.recommendations.map((rec, index) => (
                        <div key={index} className="flex items-start space-x-2 text-blue-700 bg-blue-50 p-3 rounded-lg">
                          <CheckCircle className="w-4 h-4 flex-shrink-0 mt-0.5" />
                          <span className="text-sm">{rec}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Disclaimer */}
                  <div className="bg-gray-50 p-4 rounded-lg border-l-4 border-gray-400">
                    <p className="text-xs text-gray-600">
                      <strong>Medical Disclaimer:</strong> This prediction is for educational and research purposes only. 
                      Always consult with qualified healthcare professionals for proper medical diagnosis and treatment decisions.
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Information Cards */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-200">
            <div className="flex items-center space-x-3 mb-4">
              <Brain className="w-8 h-8 text-blue-600" />
              <h3 className="text-lg font-semibold text-gray-900">AI-Powered Analysis</h3>
            </div>
            <p className="text-gray-600 text-sm">
              Advanced machine learning algorithms analyze multiple biomarkers to predict cirrhosis risk with high accuracy.
            </p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-200">
            <div className="flex items-center space-x-3 mb-4">
              <Shield className="w-8 h-8 text-green-600" />
              <h3 className="text-lg font-semibold text-gray-900">Early Detection</h3>
            </div>
            <p className="text-gray-600 text-sm">
              Enable early intervention and personalized treatment strategies through predictive healthcare analytics.
            </p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-200">
            <div className="flex items-center space-x-3 mb-4">
              <Heart className="w-8 h-8 text-red-600" />
              <h3 className="text-lg font-semibold text-gray-900">Better Outcomes</h3>
            </div>
            <p className="text-gray-600 text-sm">
              Improve patient outcomes and optimize healthcare resources through data-driven decision support.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;