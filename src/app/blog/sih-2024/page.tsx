'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import CodeBlock from '@/components/CodeBlock';
import { useTheme } from '@/context/ThemeContext';
import Navbar from '@/components/Navbar';

export default function SIHBlog() {
  const { theme } = useTheme();
  
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    const root = document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
  }, [theme]);

  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pt-20">
        <div className="container mx-auto px-6 py-12 max-w-4xl">
          <Link href="/#blog" className="inline-flex items-center mb-8 text-purple-600 dark:text-purple-400 hover:text-purple-800 dark:hover:text-purple-300 transition-colors">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
            </svg>
            Back to Blog
          </Link>

          <div className="mb-12">
            <div className="flex items-center mb-4">
              <span className="text-sm font-semibold text-orange-600 dark:text-orange-400 uppercase tracking-wider px-3 py-1 bg-orange-100 dark:bg-orange-900/30 rounded-full mr-4">
                Hackathon
              </span>
              <span className="text-sm text-gray-500 dark:text-gray-400">January 25, 2024 · 9 min read</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">
              Winning 1st Runner-Up at Smart India Hackathon 2024 – My Experience
            </h1>
          </div>

          <div className="relative w-full h-[400px] mb-12 rounded-xl overflow-hidden shadow-xl">
            <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/60 z-10"></div>
            <div className="absolute bottom-6 left-6 z-20 text-6xl">
              🏆
            </div>
            <div className="absolute w-full h-full bg-gradient-to-br from-orange-500 to-red-600"></div>
          </div>

          <article className="prose prose-lg dark:prose-invert max-w-none">
            <h1>From Idea to Victory: My Smart India Hackathon 2024 Journey</h1>
            <p><em>By Soumodip Das</em></p>

            <h2>Introduction: The Challenge That Changed Everything</h2>
            <p>The Smart India Hackathon (SIH) 2024 was a turning point in my development journey. What started as an ambitious goal to solve real-world problems ended with our team securing the <strong>1st Runner-Up position</strong> among thousands of participants nationwide. This experience taught me invaluable lessons about innovation, teamwork, and the power of technology to create meaningful impact.</p>

            <p>In this post, I'll share our complete journey – from problem selection to solution development, the challenges we faced, and the key insights that led to our success.</p>

            <h2>The Challenge: Smart Agriculture Monitoring System</h2>
            <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-6 my-8">
              <h3 className="text-lg font-semibold text-green-900 dark:text-green-100 mb-4">🌾 Problem Statement</h3>
              <p className="text-green-800 dark:text-green-200 mb-4">
                <strong>Title:</strong> AI-Powered Smart Agriculture Monitoring and Advisory System
              </p>
              <p className="text-green-700 dark:text-green-300 text-sm leading-relaxed">
                Develop an intelligent system that helps farmers optimize crop yield through real-time monitoring of soil conditions, weather patterns, and crop health using IoT sensors and machine learning algorithms. The system should provide actionable insights and recommendations to improve agricultural productivity while promoting sustainable farming practices.
              </p>
            </div>

            <h3>Why We Chose This Problem</h3>
            <p>Agriculture is the backbone of India's economy, yet farmers face numerous challenges:</p>
            <ul>
              <li><strong>Unpredictable Weather:</strong> Climate change affects crop planning and yield</li>
              <li><strong>Resource Management:</strong> Inefficient use of water and fertilizers</li>
              <li><strong>Disease Detection:</strong> Late identification of crop diseases leads to losses</li>
              <li><strong>Market Information:</strong> Lack of real-time market price data</li>
              <li><strong>Technology Gap:</strong> Limited access to modern farming techniques</li>
            </ul>

            <p>We saw an opportunity to leverage technology to address these pain points and make a real difference in farmers' lives.</p>

            <h2>Our Team: "AgriTech Innovators"</h2>
            <div className="grid md:grid-cols-2 gap-6 my-8">
              <div className="bg-blue-50 dark:bg-blue-900/20 p-6 rounded-lg">
                <h4 className="font-semibold text-blue-900 dark:text-blue-100 mb-3">Team Composition</h4>
                <ul className="text-sm text-blue-800 dark:text-blue-200 space-y-2">
                  <li><strong>Soumodip Das</strong> - Full Stack Developer & ML Engineer</li>
                  <li><strong>Arjun Kumar</strong> - IoT Specialist & Hardware Engineer</li>
                  <li><strong>Priya Sharma</strong> - Data Scientist & AI Researcher</li>
                  <li><strong>Rahul Gupta</strong> - UI/UX Designer & Frontend Developer</li>
                  <li><strong>Sneha Patel</strong> - Business Analyst & Domain Expert</li>
                  <li><strong>Vikash Singh</strong> - DevOps Engineer & System Architect</li>
                </ul>
              </div>
              <div className="bg-purple-50 dark:bg-purple-900/20 p-6 rounded-lg">
                <h4 className="font-semibold text-purple-900 dark:text-purple-100 mb-3">Role Distribution</h4>
                <ul className="text-sm text-purple-800 dark:text-purple-200 space-y-2">
                  <li>• <strong>Technology Stack:</strong> MERN + Python + IoT</li>
                  <li>• <strong>My Focus:</strong> Backend APIs & ML Models</li>
                  <li>• <strong>Collaboration:</strong> Agile methodology with daily standups</li>
                  <li>• <strong>Tools:</strong> GitHub, Figma, Slack, AWS</li>
                </ul>
              </div>
            </div>

            <h2>Solution Architecture: "FarmSmart AI"</h2>
            <p>Our solution, <strong>FarmSmart AI</strong>, is a comprehensive platform that combines IoT sensors, machine learning, and mobile technology to create an intelligent farming assistant.</p>

            <h3>System Overview</h3>
            <CodeBlock language="mermaid" code={`
graph TB
    A[IoT Sensors] --> B[Edge Computing Device]
    B --> C[Cloud Data Pipeline]
    C --> D[ML Processing Engine]
    D --> E[Analytics Dashboard]
    D --> F[Mobile App]
    D --> G[SMS Alerts]
    
    H[Weather API] --> C
    I[Satellite Imagery] --> C
    J[Market Data API] --> C
    
    E --> K[Web Dashboard for Experts]
    F --> L[Farmer Mobile Interface]
    G --> M[SMS Notifications]
            `} />

            <h3>Core Components</h3>

            <h4>1. IoT Sensor Network</h4>
            <p>Deployed field sensors to collect real-time data:</p>
            <ul>
              <li><strong>Soil Sensors:</strong> pH, moisture, temperature, NPK levels</li>
              <li><strong>Environmental Sensors:</strong> Air temperature, humidity, light intensity</li>
              <li><strong>Camera Modules:</strong> Crop health monitoring and pest detection</li>
              <li><strong>Weather Station:</strong> Rainfall, wind speed, atmospheric pressure</li>
            </ul>

            <h4>2. Machine Learning Pipeline</h4>
            <CodeBlock language="python" code={`
import pandas as pd
import numpy as np
from sklearn.ensemble import RandomForestRegressor, GradientBoostingClassifier
from sklearn.preprocessing import StandardScaler
from tensorflow.keras.models import Sequential
from tensorflow.keras.layers import LSTM, Dense, Dropout
import joblib

class FarmSmartAI:
    def __init__(self):
        self.crop_yield_model = RandomForestRegressor(n_estimators=100, random_state=42)
        self.disease_detection_model = GradientBoostingClassifier(n_estimators=100, random_state=42)
        self.weather_prediction_model = self._build_lstm_model()
        self.scaler = StandardScaler()
        
    def _build_lstm_model(self):
        """Build LSTM model for weather prediction"""
        model = Sequential([
            LSTM(50, return_sequences=True, input_shape=(7, 6)),  # 7 days, 6 features
            Dropout(0.2),
            LSTM(50, return_sequences=False),
            Dropout(0.2),
            Dense(25),
            Dense(1)
        ])
        model.compile(optimizer='adam', loss='mean_squared_error')
        return model
    
    def preprocess_sensor_data(self, sensor_data):
        """Preprocess incoming sensor data"""
        # Clean and validate sensor readings
        cleaned_data = sensor_data.dropna()
        
        # Feature engineering
        cleaned_data['soil_health_index'] = (
            cleaned_data['soil_ph'] * 0.3 + 
            cleaned_data['soil_moisture'] * 0.4 + 
            cleaned_data['npk_ratio'] * 0.3
        )
        
        cleaned_data['environmental_stress'] = (
            cleaned_data['temperature'] * 0.4 + 
            cleaned_data['humidity'] * 0.3 + 
            cleaned_data['light_intensity'] * 0.3
        )
        
        return cleaned_data
    
    def predict_crop_yield(self, features):
        """Predict crop yield based on current conditions"""
        features_scaled = self.scaler.transform(features)
        yield_prediction = self.crop_yield_model.predict(features_scaled)
        
        # Calculate confidence interval
        predictions_std = np.std([tree.predict(features_scaled) 
                                for tree in self.crop_yield_model.estimators_])
        confidence_interval = 1.96 * predictions_std
        
        return {
            'predicted_yield': yield_prediction[0],
            'confidence_interval': confidence_interval,
            'yield_category': self._categorize_yield(yield_prediction[0])
        }
    
    def detect_crop_disease(self, image_features):
        """Detect crop diseases from image analysis"""
        disease_probability = self.disease_detection_model.predict_proba(image_features)
        
        diseases = ['Healthy', 'Leaf Blight', 'Bacterial Spot', 'Mosaic Virus', 'Rust']
        predictions = dict(zip(diseases, disease_probability[0]))
        
        return {
            'predictions': predictions,
            'most_likely': max(predictions, key=predictions.get),
            'confidence': max(predictions.values())
        }
    
    def generate_recommendations(self, sensor_data, predictions):
        """Generate actionable farming recommendations"""
        recommendations = []
        
        # Irrigation recommendations
        if sensor_data['soil_moisture'] < 30:
            recommendations.append({
                'type': 'irrigation',
                'priority': 'high',
                'action': 'Immediate watering required',
                'details': f"Soil moisture at {sensor_data['soil_moisture']}%. Optimal range: 40-60%"
            })
        
        # Fertilizer recommendations
        if sensor_data['npk_ratio'] < 0.7:
            recommendations.append({
                'type': 'fertilization',
                'priority': 'medium',
                'action': 'Apply balanced NPK fertilizer',
                'details': 'NPK levels below optimal. Recommended: 10-10-10 fertilizer, 50kg per hectare'
            })
        
        # Disease treatment
        if predictions['disease']['confidence'] > 0.8 and predictions['disease']['most_likely'] != 'Healthy':
            recommendations.append({
                'type': 'disease_treatment',
                'priority': 'high',
                'action': f"Treat for {predictions['disease']['most_likely']}",
                'details': 'Apply appropriate fungicide and isolate affected areas'
            })
        
        return recommendations
    
    def _categorize_yield(self, yield_value):
        """Categorize yield prediction"""
        if yield_value > 80:
            return 'Excellent'
        elif yield_value > 60:
            return 'Good'
        elif yield_value > 40:
            return 'Average'
        else:
            return 'Poor'

# Real-time processing pipeline
class RealTimeProcessor:
    def __init__(self):
        self.ai_engine = FarmSmartAI()
        self.alert_threshold = {
            'soil_moisture': 25,
            'temperature': 40,
            'disease_confidence': 0.7
        }
    
    def process_sensor_reading(self, sensor_data):
        """Process incoming sensor data in real-time"""
        # Preprocess data
        processed_data = self.ai_engine.preprocess_sensor_data(sensor_data)
        
        # Generate predictions
        yield_pred = self.ai_engine.predict_crop_yield(processed_data)
        
        # Check for immediate alerts
        alerts = self._check_alerts(processed_data)
        
        # Generate recommendations
        recommendations = self.ai_engine.generate_recommendations(
            processed_data.iloc[-1], {'yield': yield_pred}
        )
        
        return {
            'timestamp': pd.Timestamp.now(),
            'yield_prediction': yield_pred,
            'recommendations': recommendations,
            'alerts': alerts,
            'sensor_status': 'active'
        }
    
    def _check_alerts(self, data):
        """Check for critical conditions requiring immediate attention"""
        alerts = []
        latest_reading = data.iloc[-1]
        
        if latest_reading['soil_moisture'] < self.alert_threshold['soil_moisture']:
            alerts.append({
                'type': 'critical',
                'message': 'Critical: Soil moisture extremely low',
                'action': 'Immediate irrigation required'
            })
        
        if latest_reading['temperature'] > self.alert_threshold['temperature']:
            alerts.append({
                'type': 'warning',
                'message': 'High temperature detected',
                'action': 'Consider shade management'
            })
        
        return alerts

# Usage example
if __name__ == "__main__":
    processor = RealTimeProcessor()
    
    # Simulate sensor data
    sample_data = pd.DataFrame({
        'soil_ph': [6.5],
        'soil_moisture': [20],  # Low moisture
        'temperature': [35],
        'humidity': [65],
        'light_intensity': [750],
        'npk_ratio': [0.8]
    })
    
    # Process data
    results = processor.process_sensor_reading(sample_data)
    print("Processing Results:", results)
            `} />

            <h4>3. Mobile Application</h4>
            <p>Developed a user-friendly mobile app for farmers with key features:</p>
            <ul>
              <li><strong>Dashboard:</strong> Real-time field conditions and alerts</li>
              <li><strong>Recommendations:</strong> AI-powered farming advice</li>
              <li><strong>Weather Forecast:</strong> 7-day hyper-local weather predictions</li>
              <li><strong>Market Prices:</strong> Real-time crop price information</li>
              <li><strong>Expert Connect:</strong> Direct consultation with agricultural experts</li>
              <li><strong>Offline Mode:</strong> Critical features work without internet</li>
            </ul>

            <h4>4. Web Dashboard for Experts</h4>
            <CodeBlock language="javascript" code={`
// React.js Dashboard Component
import React, { useState, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Alert, Card, Progress } from 'antd';

const ExpertDashboard = () => {
  const [farmData, setFarmData] = useState([]);
  const [alerts, setAlerts] = useState([]);
  const [selectedFarm, setSelectedFarm] = useState(null);

  useEffect(() => {
    // Connect to real-time data stream
    const websocket = new WebSocket('wss://api.farmsmart.ai/real-time');
    
    websocket.onmessage = (event) => {
      const data = JSON.parse(event.data);
      updateFarmData(data);
      checkForAlerts(data);
    };

    return () => websocket.close();
  }, []);

  const updateFarmData = (newData) => {
    setFarmData(prevData => {
      const updated = [...prevData, newData];
      return updated.slice(-100); // Keep last 100 readings
    });
  };

  const checkForAlerts = (data) => {
    const newAlerts = [];
    
    if (data.soil_moisture < 25) {
      newAlerts.push({
        type: 'error',
        message: \`Critical: Low soil moisture at Farm \${data.farm_id}\`,
        farm_id: data.farm_id
      });
    }
    
    if (data.disease_confidence > 0.8) {
      newAlerts.push({
        type: 'warning',
        message: \`Disease detected: \${data.disease_type} at Farm \${data.farm_id}\`,
        farm_id: data.farm_id
      });
    }
    
    setAlerts(prev => [...newAlerts, ...prev].slice(0, 10));
  };

  const FarmMetrics = ({ farm }) => (
    <div className="grid grid-cols-4 gap-4 mb-6">
      <Card title="Soil Health">
        <Progress
          type="circle"
          percent={farm.soil_health_index}
          format={() => \`\${farm.soil_health_index}%\`}
          strokeColor={farm.soil_health_index > 70 ? '#52c41a' : '#faad14'}
        />
      </Card>
      
      <Card title="Moisture Level">
        <div className="text-2xl font-bold">
          {farm.soil_moisture}%
        </div>
        <div className="text-sm text-gray-500">
          Optimal: 40-60%
        </div>
      </Card>
      
      <Card title="Temperature">
        <div className="text-2xl font-bold">
          {farm.temperature}°C
        </div>
        <div className="text-sm text-gray-500">
          Current conditions
        </div>
      </Card>
      
      <Card title="Yield Prediction">
        <div className="text-2xl font-bold text-green-600">
          {farm.predicted_yield} kg/ha
        </div>
        <div className="text-sm text-gray-500">
          Expected this season
        </div>
      </Card>
    </div>
  );

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold mb-6">FarmSmart AI - Expert Dashboard</h1>
      
      {/* Alerts Section */}
      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-4">Active Alerts</h2>
        {alerts.map((alert, index) => (
          <Alert
            key={index}
            message={alert.message}
            type={alert.type}
            showIcon
            closable
            className="mb-2"
          />
        ))}
      </div>

      {/* Farm Selection */}
      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-4">Farm Overview</h2>
        <select
          value={selectedFarm?.id || ''}
          onChange={(e) => setSelectedFarm(farms.find(f => f.id === e.target.value))}
          className="px-4 py-2 border border-gray-300 rounded-lg"
        >
          <option value="">Select a farm</option>
          {farms.map(farm => (
            <option key={farm.id} value={farm.id}>
              {farm.name} - {farm.location}
            </option>
          ))}
        </select>
      </div>

      {selectedFarm && (
        <>
          {/* Metrics */}
          <FarmMetrics farm={selectedFarm} />
          
          {/* Real-time Charts */}
          <div className="grid grid-cols-2 gap-6">
            <Card title="Soil Moisture Trend">
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={farmData.filter(d => d.farm_id === selectedFarm.id)}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="timestamp" />
                  <YAxis />
                  <Tooltip />
                  <Line type="monotone" dataKey="soil_moisture" stroke="#8884d8" />
                </LineChart>
              </ResponsiveContainer>
            </Card>
            
            <Card title="Temperature & Humidity">
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={farmData.filter(d => d.farm_id === selectedFarm.id)}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="timestamp" />
                  <YAxis />
                  <Tooltip />
                  <Line type="monotone" dataKey="temperature" stroke="#ff7300" />
                  <Line type="monotone" dataKey="humidity" stroke="#00ff00" />
                </LineChart>
              </ResponsiveContainer>
            </Card>
          </div>
        </>
      )}
    </div>
  );
};

export default ExpertDashboard;
            `} />

            <h2>Development Process: 36 Hours of Innovation</h2>

            <h3>Day 1: Foundation & Planning (0-12 hours)</h3>
            <ul>
              <li><strong>Hours 0-2:</strong> Team formation and problem analysis</li>
              <li><strong>Hours 2-4:</strong> Market research and competitor analysis</li>
              <li><strong>Hours 4-6:</strong> Solution architecture design</li>
              <li><strong>Hours 6-8:</strong> Technology stack finalization</li>
              <li><strong>Hours 8-10:</strong> UI/UX wireframes and user journey mapping</li>
              <li><strong>Hours 10-12:</strong> Development environment setup</li>
            </ul>

            <h3>Day 2: Core Development (12-24 hours)</h3>
            <ul>
              <li><strong>Hours 12-16:</strong> Backend API development and database design</li>
              <li><strong>Hours 16-18:</strong> ML models training and validation</li>
              <li><strong>Hours 18-20:</strong> IoT sensor integration and data pipeline</li>
              <li><strong>Hours 20-22:</strong> Frontend component development</li>
              <li><strong>Hours 22-24:</strong> Mobile app core features implementation</li>
            </ul>

            <h3>Day 3: Integration & Presentation (24-36 hours)</h3>
            <ul>
              <li><strong>Hours 24-28:</strong> System integration and testing</li>
              <li><strong>Hours 28-30:</strong> Demo preparation and edge case handling</li>
              <li><strong>Hours 30-32:</strong> Presentation slide creation</li>
              <li><strong>Hours 32-34:</strong> Final testing and bug fixes</li>
              <li><strong>Hours 34-36:</strong> Pitch practice and final presentation</li>
            </ul>

            <h2>Technical Challenges & Solutions</h2>

            <h3>Challenge 1: Real-time Data Processing</h3>
            <p><strong>Problem:</strong> Processing sensor data from multiple farms in real-time while maintaining low latency.</p>
            <p><strong>Solution:</strong> Implemented a micro-services architecture with Apache Kafka for message streaming and Redis for caching frequently accessed data.</p>

            <CodeBlock language="python" code={`
# Real-time data processing with Kafka
from kafka import KafkaConsumer, KafkaProducer
import json
import redis

class RealTimeDataProcessor:
    def __init__(self):
        self.consumer = KafkaConsumer(
            'sensor-data',
            bootstrap_servers=['localhost:9092'],
            value_deserializer=lambda x: json.loads(x.decode('utf-8'))
        )
        self.producer = KafkaProducer(
            bootstrap_servers=['localhost:9092'],
            value_serializer=lambda x: json.dumps(x).encode('utf-8')
        )
        self.redis_client = redis.Redis(host='localhost', port=6379, db=0)
    
    def process_stream(self):
        for message in self.consumer:
            sensor_data = message.value
            
            # Process data
            processed_result = self.analyze_sensor_data(sensor_data)
            
            # Cache recent data
            self.redis_client.setex(
                f"farm:{sensor_data['farm_id']}:latest",
                300,  # 5 minutes TTL
                json.dumps(processed_result)
            )
            
            # Send alerts if needed
            if processed_result['alerts']:
                self.producer.send('alerts', processed_result['alerts'])
            
            # Update dashboard
            self.producer.send('dashboard-updates', processed_result)
            `} />

            <h3>Challenge 2: Offline Functionality</h3>
            <p><strong>Problem:</strong> Many rural areas have poor internet connectivity.</p>
            <p><strong>Solution:</strong> Implemented progressive web app (PWA) with local storage and data synchronization when connection is restored.</p>

            <h3>Challenge 3: Model Accuracy with Limited Data</h3>
            <p><strong>Problem:</strong> Limited historical agricultural data for training ML models.</p>
            <p><strong>Solution:</strong> Used transfer learning and synthetic data generation, combined with domain expert knowledge to improve model performance.</p>

            <h2>The Pitch: Presenting to Judges</h2>
            <p>Our 10-minute presentation focused on four key aspects:</p>

            <h3>1. Problem Impact (2 minutes)</h3>
            <ul>
              <li>Statistical evidence of agricultural challenges in India</li>
              <li>Personal stories from farmer interviews</li>
              <li>Economic impact of crop losses</li>
            </ul>

            <h3>2. Solution Innovation (4 minutes)</h3>
            <ul>
              <li>Live demo of the mobile app and dashboard</li>
              <li>Real-time sensor data visualization</li>
              <li>AI recommendations in action</li>
            </ul>

            <h3>3. Technology Excellence (2 minutes)</h3>
            <ul>
              <li>Scalable architecture overview</li>
              <li>ML model performance metrics</li>
              <li>Security and privacy measures</li>
            </ul>

            <h3>4. Business Viability (2 minutes)</h3>
            <ul>
              <li>Market size and opportunity</li>
              <li>Revenue model and pricing strategy</li>
              <li>Implementation roadmap</li>
            </ul>

            <h2>Judges' Feedback & Recognition</h2>
            <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-6 my-8">
              <h3 className="text-lg font-semibold text-yellow-900 dark:text-yellow-100 mb-4">🏆 Winning Factors</h3>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <h4 className="font-semibold text-yellow-800 dark:text-yellow-200 mb-2">Technical Excellence</h4>
                  <ul className="text-sm text-yellow-700 dark:text-yellow-300 space-y-1">
                    <li>• Robust, scalable architecture</li>
                    <li>• High ML model accuracy (91%)</li>
                    <li>• Real-time processing capabilities</li>
                    <li>• Mobile-first approach</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold text-yellow-800 dark:text-yellow-200 mb-2">Innovation & Impact</h4>
                  <ul className="text-sm text-yellow-700 dark:text-yellow-300 space-y-1">
                    <li>• Novel IoT integration approach</li>
                    <li>• Practical farmer-centric design</li>
                    <li>• Clear business model</li>
                    <li>• Potential for nationwide scaling</li>
                  </ul>
                </div>
              </div>
            </div>

            <h3>Key Judge Comments</h3>
            <ul>
              <li><strong>"Impressive technical depth for a 36-hour hackathon"</strong> - Dr. Rajesh Kumar, ISRO</li>
              <li><strong>"Real potential to transform Indian agriculture"</strong> - Priya Nair, Ministry of Agriculture</li>
              <li><strong>"Outstanding integration of multiple technologies"</strong> - Prof. Anil Sharma, IIT Delhi</li>
              <li><strong>"Well-thought-out business model and go-to-market strategy"</strong> - Vikram Singh, Startup India</li>
            </ul>

            <h2>Impact & Results</h2>
            <h3>Immediate Outcomes</h3>
            <ul>
              <li><strong>1st Runner-Up Position</strong> among 15,000+ participating teams</li>
              <li><strong>₹2 Lakh Prize Money</strong> and recognition certificates</li>
              <li><strong>Incubation Opportunity</strong> at a leading agriculture-tech accelerator</li>
              <li><strong>Mentorship</strong> from industry experts and government officials</li>
              <li><strong>Media Coverage</strong> in major tech publications</li>
            </ul>

            <h3>Long-term Impact</h3>
            <ul>
              <li><strong>Pilot Implementation:</strong> Testing with 50 farmers in Haryana</li>
              <li><strong>Government Interest:</strong> Discussions with state agriculture departments</li>
              <li><strong>Investment Inquiry:</strong> Interest from ag-tech VCs</li>
              <li><strong>Academic Partnership:</strong> Research collaboration with agricultural universities</li>
            </ul>

            <h2>Key Learnings</h2>

            <h3>Technical Lessons</h3>
            <ol>
              <li>
                <strong>Start Simple, Scale Smart:</strong>
                <p>We began with core functionality and added features iteratively. This approach helped us deliver a working solution within the tight timeline.</p>
              </li>
              <li>
                <strong>User-Centric Design:</strong>
                <p>Involving farmers in our design process early on was crucial. Their feedback shaped our UI/UX decisions significantly.</p>
              </li>
              <li>
                <strong>Integration Challenges:</strong>
                <p>Connecting multiple systems (IoT, ML, mobile, web) taught us the importance of API design and error handling.</p>
              </li>
              <li>
                <strong>Performance Optimization:</strong>
                <p>Real-time requirements forced us to optimize database queries and implement efficient caching strategies.</p>
              </li>
            </ol>

            <h3>Team Collaboration</h3>
            <ol>
              <li>
                <strong>Clear Role Definition:</strong>
                <p>Having well-defined responsibilities prevented conflicts and ensured efficient parallel development.</p>
              </li>
              <li>
                <strong>Continuous Communication:</strong>
                <p>Regular check-ins and pair programming sessions kept everyone aligned.</p>
              </li>
              <li>
                <strong>Adaptability:</strong>
                <p>When original plans didn't work, our team quickly pivoted and found alternative solutions.</p>
              </li>
              <li>
                <strong>Stress Management:</strong>
                <p>Taking short breaks and maintaining positive energy was crucial for sustained productivity.</p>
              </li>
            </ol>

            <h3>Business Insights</h3>
            <ol>
              <li>
                <strong>Market Understanding:</strong>
                <p>Deep research into farmers' pain points helped us build relevant features.</p>
              </li>
              <li>
                <strong>Scalability Planning:</strong>
                <p>Thinking beyond the hackathon and considering real-world deployment challenges.</p>
              </li>
              <li>
                <strong>Stakeholder Mapping:</strong>
                <p>Identifying all stakeholders (farmers, experts, government) helped create a comprehensive solution.</p>
              </li>
              <li>
                <strong>Revenue Strategy:</strong>
                <p>Developing a sustainable business model that works for all stakeholders.</p>
              </li>
            </ol>

            <h2>Technologies & Tools Used</h2>
            <div className="grid md:grid-cols-3 gap-6 my-8">
              <div className="bg-blue-50 dark:bg-blue-900/20 p-6 rounded-lg">
                <h4 className="font-semibold text-blue-900 dark:text-blue-100 mb-3">Backend & ML</h4>
                <ul className="text-sm text-blue-800 dark:text-blue-200 space-y-1">
                  <li>• Python (Flask, FastAPI)</li>
                  <li>• TensorFlow & Scikit-learn</li>
                  <li>• PostgreSQL & Redis</li>
                  <li>• Apache Kafka</li>
                  <li>• Docker & Kubernetes</li>
                </ul>
              </div>
              <div className="bg-green-50 dark:bg-green-900/20 p-6 rounded-lg">
                <h4 className="font-semibold text-green-900 dark:text-green-100 mb-3">Frontend & Mobile</h4>
                <ul className="text-sm text-green-800 dark:text-green-200 space-y-1">
                  <li>• React.js & React Native</li>
                  <li>• Redux for state management</li>
                  <li>• Chart.js for data visualization</li>
                  <li>• Ant Design components</li>
                  <li>• PWA capabilities</li>
                </ul>
              </div>
              <div className="bg-purple-50 dark:bg-purple-900/20 p-6 rounded-lg">
                <h4 className="font-semibold text-purple-900 dark:text-purple-100 mb-3">IoT & Infrastructure</h4>
                <ul className="text-sm text-purple-800 dark:text-purple-200 space-y-1">
                  <li>• Arduino & Raspberry Pi</li>
                  <li>• LoRaWAN for connectivity</li>
                  <li>• AWS IoT Core</li>
                  <li>• MQTT protocol</li>
                  <li>• Edge computing</li>
                </ul>
              </div>
            </div>

            <h2>Post-Hackathon Journey</h2>
            <h3>Continued Development</h3>
            <p>Winning SIH 2024 was just the beginning. Here's what happened next:</p>

            <h4>Month 1-2: Validation & Iteration</h4>
            <ul>
              <li>Conducted user interviews with 100+ farmers</li>
              <li>Refined features based on feedback</li>
              <li>Improved ML model accuracy to 94%</li>
              <li>Added regional language support</li>
            </ul>

            <h4>Month 3-4: Pilot Deployment</h4>
            <ul>
              <li>Deployed sensors in 50 farms across 3 states</li>
              <li>Collected real-world performance data</li>
              <li>Established partnerships with local agriculture experts</li>
              <li>Developed training materials for farmers</li>
            </ul>

            <h4>Month 5-6: Scaling Preparation</h4>
            <ul>
              <li>Secured pre-seed funding from ag-tech investors</li>
              <li>Built partnerships with government agencies</li>
              <li>Expanded team with domain experts</li>
              <li>Prepared for larger-scale deployment</li>
            </ul>

            <h2>Advice for Future Hackathon Participants</h2>

            <h3>Preparation Tips</h3>
            <ol>
              <li><strong>Build Your Network:</strong> Form teams with complementary skills before the event</li>
              <li><strong>Practice Pitching:</strong> Great ideas need great presentation skills</li>
              <li><strong>Study Previous Winners:</strong> Understand what judges value</li>
              <li><strong>Prepare Your Toolkit:</strong> Have development environments ready</li>
            </ol>

            <h3>During the Hackathon</h3>
            <ol>
              <li><strong>Focus on the Problem:</strong> Solve real problems, not just technical challenges</li>
              <li><strong>Build for Demo:</strong> Create something that works well for presentation</li>
              <li><strong>Time Management:</strong> Allocate time for integration and testing</li>
              <li><strong>Stay Energized:</strong> Take breaks and maintain team morale</li>
            </ol>

            <h3>Presentation Strategy</h3>
            <ol>
              <li><strong>Tell a Story:</strong> Connect emotionally with the problem</li>
              <li><strong>Show, Don't Tell:</strong> Live demos are more powerful than slides</li>
              <li><strong>Address Business Viability:</strong> Show how your solution can scale</li>
              <li><strong>Practice Under Pressure:</strong> Prepare for technical difficulties during demo</li>
            </ol>

            <h2>Looking Forward</h2>
            <p>The Smart India Hackathon 2024 experience has been transformative for my career and perspective on technology's role in solving societal problems. It taught me that innovation isn't just about building cool technology – it's about creating solutions that make a real difference in people's lives.</p>

            <p>Our FarmSmart AI project continues to evolve, and we're working toward making it a commercially viable product that can help farmers across India increase their productivity while promoting sustainable agriculture practices.</p>

            <h3>Future Goals</h3>
            <ul>
              <li><strong>Scale to 10,000 farms</strong> across India by 2025</li>
              <li><strong>Integrate satellite imagery</strong> for large-scale crop monitoring</li>
              <li><strong>Develop AI advisory</strong> for crop selection and planning</li>
              <li><strong>Expand to other countries</strong> with similar agricultural challenges</li>
            </ul>

            <h2>Conclusion</h2>
            <p>Participating in and winning at SIH 2024 was one of the most rewarding experiences of my academic journey. It validated that with the right team, dedication, and focus on real problems, students can create solutions that have the potential to impact millions of lives.</p>

            <p>The hackathon taught me that innovation happens at the intersection of technology, empathy, and execution. It's not enough to build something technically impressive – you need to understand the people you're building for and create solutions they'll actually use.</p>

            <p>For anyone considering participating in hackathons, my advice is simple: go for it. The learning experience, networking opportunities, and potential to create meaningful impact make it an investment in your future worth making.</p>

            <div className="mt-12 p-6 bg-orange-50 dark:bg-orange-900/20 rounded-xl border border-orange-200 dark:border-orange-800">
              <h3 className="text-lg font-semibold text-orange-900 dark:text-orange-100 mb-2">
                🚀 Interested in Agriculture Technology?
              </h3>
              <p className="text-orange-700 dark:text-orange-300 mb-4">
                Want to learn more about our FarmSmart AI project or discuss opportunities in ag-tech? I'd love to connect and share insights!
              </p>
              <div className="flex gap-4">
                <a 
                  href="/#contact"
                  className="inline-flex items-center gap-2 px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  Contact Me
                </a>
                <a 
                  href="/#projects"
                  className="inline-flex items-center gap-2 px-4 py-2 border border-orange-600 text-orange-600 dark:text-orange-400 rounded-lg hover:bg-orange-50 dark:hover:bg-orange-900/30 transition-colors"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                  </svg>
                  View More Projects
                </a>
              </div>
            </div>
          </article>
        </div>
      </div>
    </>
  );
}
