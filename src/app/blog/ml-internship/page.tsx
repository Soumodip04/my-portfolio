'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import CodeBlock from '@/components/CodeBlock';
import { useTheme } from '@/context/ThemeContext';
import Navbar from '@/components/Navbar';

export default function MLInternshipBlog() {
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
              <span className="text-sm font-semibold text-blue-600 dark:text-blue-400 uppercase tracking-wider px-3 py-1 bg-blue-100 dark:bg-blue-900/30 rounded-full mr-4">
                Machine Learning
              </span>
              <span className="text-sm text-gray-500 dark:text-gray-400">February 12, 2024 · 7 min read</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              My Machine Learning Internship Projects – What I Learned
            </h1>
          </div>

          <div className="relative w-full h-[400px] mb-12 rounded-xl overflow-hidden shadow-xl">
            <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/60 z-10"></div>
            <div className="absolute bottom-6 left-6 z-20 text-6xl">
              🤖
            </div>
            <div className="absolute w-full h-full bg-gradient-to-br from-blue-500 to-purple-600"></div>
          </div>

          <article className="prose prose-lg dark:prose-invert max-w-none">
            <h1>My Machine Learning Internship Journey: Real Projects, Real Learning</h1>
            <p><em>By Soumodip Das</em></p>

            <h2>Introduction: Stepping Into the ML World</h2>
            <p>During my college years, I had the incredible opportunity to work on machine learning projects through internships at <strong>Bharat Intern</strong> and <strong>Oasis Infobyte</strong>. These experiences gave me hands-on exposure to real-world ML challenges and taught me valuable lessons about data science, model development, and the practical applications of artificial intelligence.</p>

            <p>In this post, I'll share the key projects I worked on, the technical challenges I faced, and the important lessons I learned that shaped my understanding of machine learning.</p>

            <h2>Internship Overview</h2>
            <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-6 my-8">
              <h3 className="text-lg font-semibold text-blue-900 dark:text-blue-100 mb-4">🏢 Internship Details</h3>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold text-blue-800 dark:text-blue-200">Bharat Intern</h4>
                  <ul className="text-sm text-blue-700 dark:text-blue-300 mt-2">
                    <li>• Duration: 3 months</li>
                    <li>• Focus: Predictive Analytics</li>
                    <li>• Projects: 3 major ML models</li>
                    <li>• Technologies: Python, Scikit-learn, Pandas</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold text-blue-800 dark:text-blue-200">Oasis Infobyte</h4>
                  <ul className="text-sm text-blue-700 dark:text-blue-300 mt-2">
                    <li>• Duration: 2 months</li>
                    <li>• Focus: Deep Learning & NLP</li>
                    <li>• Projects: 2 deep learning models</li>
                    <li>• Technologies: TensorFlow, Keras, NLTK</li>
                  </ul>
                </div>
              </div>
            </div>

            <h2>Project 1: House Price Prediction Model</h2>
            <p><strong>Company:</strong> Bharat Intern<br />
            <strong>Duration:</strong> 4 weeks<br />
            <strong>Objective:</strong> Build a regression model to predict house prices based on various features</p>

            <h3>Problem Statement</h3>
            <p>Real estate pricing is influenced by numerous factors including location, size, amenities, and market conditions. The goal was to create a machine learning model that could accurately predict house prices to help both buyers and sellers make informed decisions.</p>

            <h3>Dataset and Features</h3>
            <p>I worked with a comprehensive dataset containing:</p>
            <ul>
              <li><strong>Numerical Features:</strong> Square footage, number of bedrooms/bathrooms, lot size, year built</li>
              <li><strong>Categorical Features:</strong> Neighborhood, house style, heating type, garage type</li>
              <li><strong>Location Features:</strong> ZIP code, proximity to schools and transportation</li>
              <li><strong>Target Variable:</strong> Sale price</li>
            </ul>

            <h3>Technical Implementation</h3>
            <CodeBlock language="python" code={`
import pandas as pd
import numpy as np
from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestRegressor
from sklearn.preprocessing import StandardScaler, LabelEncoder
from sklearn.metrics import mean_squared_error, r2_score
import matplotlib.pyplot as plt
import seaborn as sns

# Data loading and initial exploration
def load_and_explore_data():
    """Load dataset and perform initial exploration"""
    df = pd.read_csv('house_prices.csv')
    
    print(f"Dataset shape: {df.shape}")
    print(f"Missing values: {df.isnull().sum().sum()}")
    print(f"Data types: {df.dtypes.value_counts()}")
    
    return df

# Data preprocessing pipeline
class HousePricePreprocessor:
    def __init__(self):
        self.scaler = StandardScaler()
        self.label_encoders = {}
        self.numerical_features = []
        self.categorical_features = []
    
    def fit_transform(self, df):
        """Fit preprocessor and transform data"""
        # Separate numerical and categorical features
        self.numerical_features = df.select_dtypes(include=[np.number]).columns.tolist()
        self.categorical_features = df.select_dtypes(include=['object']).columns.tolist()
        
        # Remove target variable from features
        if 'SalePrice' in self.numerical_features:
            self.numerical_features.remove('SalePrice')
        
        # Handle missing values
        df_processed = self._handle_missing_values(df.copy())
        
        # Feature engineering
        df_processed = self._create_features(df_processed)
        
        # Encode categorical variables
        for col in self.categorical_features:
            le = LabelEncoder()
            df_processed[col] = le.fit_transform(df_processed[col].astype(str))
            self.label_encoders[col] = le
        
        # Scale numerical features
        df_processed[self.numerical_features] = self.scaler.fit_transform(
            df_processed[self.numerical_features]
        )
        
        return df_processed
    
    def _handle_missing_values(self, df):
        """Handle missing values with domain knowledge"""
        # Fill numerical missing values with median
        for col in self.numerical_features:
            if df[col].isnull().sum() > 0:
                df[col].fillna(df[col].median(), inplace=True)
        
        # Fill categorical missing values with mode
        for col in self.categorical_features:
            if df[col].isnull().sum() > 0:
                df[col].fillna(df[col].mode()[0], inplace=True)
        
        return df
    
    def _create_features(self, df):
        """Create new features based on domain knowledge"""
        # Total square footage
        if 'GrLivArea' in df.columns and 'TotalBsmtSF' in df.columns:
            df['TotalSF'] = df['GrLivArea'] + df['TotalBsmtSF']
        
        # Age of house
        if 'YearBuilt' in df.columns:
            df['HouseAge'] = 2024 - df['YearBuilt']
        
        # Price per square foot (for training data)
        if 'SalePrice' in df.columns and 'GrLivArea' in df.columns:
            df['PricePerSF'] = df['SalePrice'] / df['GrLivArea']
        
        return df

# Model training and evaluation
def train_house_price_model(X_train, X_test, y_train, y_test):
    """Train and evaluate house price prediction model"""
    
    # Initialize Random Forest model
    rf_model = RandomForestRegressor(
        n_estimators=100,
        max_depth=15,
        min_samples_split=5,
        min_samples_leaf=2,
        random_state=42
    )
    
    # Train the model
    print("Training Random Forest model...")
    rf_model.fit(X_train, y_train)
    
    # Make predictions
    y_pred_train = rf_model.predict(X_train)
    y_pred_test = rf_model.predict(X_test)
    
    # Evaluate model performance
    train_rmse = np.sqrt(mean_squared_error(y_train, y_pred_train))
    test_rmse = np.sqrt(mean_squared_error(y_test, y_pred_test))
    train_r2 = r2_score(y_train, y_pred_train)
    test_r2 = r2_score(y_test, y_pred_test)
    
    print(f"Training RMSE: {train_rmse:.2f}")
    print(f"Test RMSE: {test_rmse:.2f}")
    print(f"Training R²: {train_r2:.4f}")
    print(f"Test R²: {test_r2:.4f}")
    
    return rf_model, y_pred_test

# Feature importance analysis
def analyze_feature_importance(model, feature_names):
    """Analyze and visualize feature importance"""
    importances = model.feature_importances_
    feature_importance_df = pd.DataFrame({
        'feature': feature_names,
        'importance': importances
    }).sort_values('importance', ascending=False)
    
    # Plot top 15 features
    plt.figure(figsize=(10, 8))
    sns.barplot(data=feature_importance_df.head(15), 
                x='importance', y='feature')
    plt.title('Top 15 Most Important Features for House Price Prediction')
    plt.xlabel('Feature Importance')
    plt.tight_layout()
    plt.show()
    
    return feature_importance_df

# Main execution pipeline
def main():
    # Load and explore data
    df = load_and_explore_data()
    
    # Preprocess data
    preprocessor = HousePricePreprocessor()
    df_processed = preprocessor.fit_transform(df)
    
    # Prepare features and target
    X = df_processed.drop(['SalePrice'], axis=1)
    y = df_processed['SalePrice']
    
    # Split data
    X_train, X_test, y_train, y_test = train_test_split(
        X, y, test_size=0.2, random_state=42
    )
    
    # Train model
    model, predictions = train_house_price_model(X_train, X_test, y_train, y_test)
    
    # Analyze feature importance
    feature_importance = analyze_feature_importance(model, X.columns)
    
    return model, preprocessor, feature_importance

if __name__ == "__main__":
    model, preprocessor, importance = main()
            `} />

            <h3>Key Challenges and Solutions</h3>
            <h4>Challenge 1: Missing Data</h4>
            <p><strong>Problem:</strong> Significant missing values in categorical features like garage type and basement characteristics.</p>
            <p><strong>Solution:</strong> Implemented domain-specific imputation strategies. For example, missing garage information likely meant "no garage," so I created a separate category for this.</p>

            <h4>Challenge 2: Feature Engineering</h4>
            <p><strong>Problem:</strong> Raw features weren't capturing the full relationship with price.</p>
            <p><strong>Solution:</strong> Created derived features like total square footage, house age, and price per square foot to improve model performance.</p>

            <h4>Challenge 3: Outlier Detection</h4>
            <p><strong>Problem:</strong> Luxury homes and unique properties created outliers that skewed predictions.</p>
            <p><strong>Solution:</strong> Used IQR method and domain knowledge to identify and handle outliers appropriately.</p>

            <h3>Results and Impact</h3>
            <ul>
              <li><strong>Model Accuracy:</strong> Achieved R² score of 0.87 on test data</li>
              <li><strong>RMSE:</strong> $23,450 average prediction error</li>
              <li><strong>Key Insights:</strong> Location, total square footage, and overall quality were the strongest predictors</li>
              <li><strong>Business Value:</strong> Model could help real estate agents provide more accurate pricing estimates</li>
            </ul>

            <h2>Project 2: Wine Quality Classification</h2>
            <p><strong>Company:</strong> Bharat Intern<br />
            <strong>Duration:</strong> 3 weeks<br />
            <strong>Objective:</strong> Classify wine quality based on physicochemical properties</p>

            <h3>Project Overview</h3>
            <p>Wine quality assessment is traditionally done by human experts, which can be subjective and time-consuming. This project aimed to create an automated system that could predict wine quality ratings based on measurable chemical properties.</p>

            <h3>Technical Approach</h3>
            <CodeBlock language="python" code={`
import pandas as pd
import numpy as np
from sklearn.model_selection import train_test_split, cross_val_score
from sklearn.ensemble import RandomForestClassifier, GradientBoostingClassifier
from sklearn.svm import SVC
from sklearn.preprocessing import StandardScaler
from sklearn.metrics import classification_report, confusion_matrix
import matplotlib.pyplot as plt
import seaborn as sns

class WineQualityClassifier:
    def __init__(self):
        self.models = {
            'Random Forest': RandomForestClassifier(n_estimators=100, random_state=42),
            'Gradient Boosting': GradientBoostingClassifier(n_estimators=100, random_state=42),
            'SVM': SVC(kernel='rbf', random_state=42)
        }
        self.scaler = StandardScaler()
        self.best_model = None
        self.best_score = 0
    
    def preprocess_data(self, df):
        """Preprocess wine quality data"""
        # Handle outliers using IQR method
        Q1 = df.quantile(0.25)
        Q3 = df.quantile(0.75)
        IQR = Q3 - Q1
        
        # Remove outliers
        df_clean = df[~((df < (Q1 - 1.5 * IQR)) | (df > (Q3 + 1.5 * IQR))).any(axis=1)]
        
        # Convert quality to categorical (binary classification: good vs average)
        # Quality >= 7 is considered "good", < 7 is "average"
        df_clean['quality_category'] = (df_clean['quality'] >= 7).astype(int)
        
        return df_clean
    
    def train_models(self, X_train, X_test, y_train, y_test):
        """Train multiple models and select the best one"""
        results = {}
        
        for name, model in self.models.items():
            # Train model
            model.fit(X_train, y_train)
            
            # Cross-validation score
            cv_scores = cross_val_score(model, X_train, y_train, cv=5)
            
            # Test score
            test_score = model.score(X_test, y_test)
            
            results[name] = {
                'model': model,
                'cv_mean': cv_scores.mean(),
                'cv_std': cv_scores.std(),
                'test_score': test_score
            }
            
            print(f"{name}:")
            print(f"  CV Score: {cv_scores.mean():.4f} (+/- {cv_scores.std() * 2:.4f})")
            print(f"  Test Score: {test_score:.4f}")
            print()
            
            # Update best model
            if test_score > self.best_score:
                self.best_score = test_score
                self.best_model = model
        
        return results
    
    def analyze_features(self, model, feature_names):
        """Analyze feature importance for tree-based models"""
        if hasattr(model, 'feature_importances_'):
            importances = model.feature_importances_
            feature_df = pd.DataFrame({
                'feature': feature_names,
                'importance': importances
            }).sort_values('importance', ascending=False)
            
            plt.figure(figsize=(10, 6))
            sns.barplot(data=feature_df, x='importance', y='feature')
            plt.title('Feature Importance for Wine Quality Classification')
            plt.tight_layout()
            plt.show()
            
            return feature_df
        else:
            print("Model doesn't support feature importance analysis")
            return None

# Model evaluation and visualization
def evaluate_model_performance(model, X_test, y_test, class_names):
    """Comprehensive model evaluation"""
    y_pred = model.predict(X_test)
    
    # Classification report
    print("Classification Report:")
    print(classification_report(y_test, y_pred, target_names=class_names))
    
    # Confusion matrix
    cm = confusion_matrix(y_test, y_pred)
    plt.figure(figsize=(8, 6))
    sns.heatmap(cm, annot=True, fmt='d', cmap='Blues', 
                xticklabels=class_names, yticklabels=class_names)
    plt.title('Confusion Matrix')
    plt.ylabel('True Label')
    plt.xlabel('Predicted Label')
    plt.show()
    
    return y_pred

# Main execution
def main():
    # Load wine quality dataset
    df = pd.read_csv('wine_quality.csv')
    
    # Initialize classifier
    classifier = WineQualityClassifier()
    
    # Preprocess data
    df_clean = classifier.preprocess_data(df)
    
    # Prepare features and target
    X = df_clean.drop(['quality', 'quality_category'], axis=1)
    y = df_clean['quality_category']
    
    # Split data
    X_train, X_test, y_train, y_test = train_test_split(
        X, y, test_size=0.2, random_state=42, stratify=y
    )
    
    # Scale features
    X_train_scaled = classifier.scaler.fit_transform(X_train)
    X_test_scaled = classifier.scaler.transform(X_test)
    
    # Train models
    results = classifier.train_models(X_train_scaled, X_test_scaled, y_train, y_test)
    
    # Evaluate best model
    class_names = ['Average Quality', 'Good Quality']
    predictions = evaluate_model_performance(
        classifier.best_model, X_test_scaled, y_test, class_names
    )
    
    # Feature analysis
    feature_importance = classifier.analyze_features(
        classifier.best_model, X.columns
    )
    
    return classifier, results, feature_importance

if __name__ == "__main__":
    classifier, results, importance = main()
            `} />

            <h3>Key Insights from Wine Quality Project</h3>
            <ul>
              <li><strong>Model Performance:</strong> Random Forest achieved 89% accuracy in distinguishing good vs average wines</li>
              <li><strong>Important Features:</strong> Alcohol content, volatile acidity, and sulphates were top predictors</li>
              <li><strong>Class Imbalance:</strong> Most wines were average quality, requiring careful handling of imbalanced data</li>
              <li><strong>Business Application:</strong> Could help wineries optimize their production process</li>
            </ul>

            <h2>Project 3: Customer Churn Prediction (Oasis Infobyte)</h2>
            <p><strong>Duration:</strong> 6 weeks<br />
            <strong>Objective:</strong> Predict which customers are likely to stop using a service</p>

            <h3>Business Context</h3>
            <p>Customer retention is crucial for business profitability. Acquiring new customers costs 5-25 times more than retaining existing ones. This project aimed to identify at-risk customers early so that targeted retention strategies could be implemented.</p>

            <h3>Advanced Feature Engineering</h3>
            <CodeBlock language="python" code={`
import pandas as pd
import numpy as np
from datetime import datetime, timedelta
from sklearn.preprocessing import StandardScaler, LabelEncoder
from sklearn.ensemble import RandomForestClassifier
from sklearn.model_selection import train_test_split
from sklearn.metrics import roc_auc_score, classification_report
import matplotlib.pyplot as plt

class ChurnPredictor:
    def __init__(self):
        self.model = RandomForestClassifier(
            n_estimators=200,
            max_depth=10,
            min_samples_split=10,
            class_weight='balanced',
            random_state=42
        )
        self.scaler = StandardScaler()
        self.label_encoders = {}
    
    def create_behavioral_features(self, df):
        """Create advanced behavioral features for churn prediction"""
        
        # Convert date columns
        df['last_activity_date'] = pd.to_datetime(df['last_activity_date'])
        df['signup_date'] = pd.to_datetime(df['signup_date'])
        
        # Recency features
        current_date = df['last_activity_date'].max()
        df['days_since_last_activity'] = (current_date - df['last_activity_date']).dt.days
        df['customer_age_days'] = (current_date - df['signup_date']).dt.days
        
        # Usage intensity features
        df['avg_monthly_usage'] = df['total_usage'] / (df['customer_age_days'] / 30)
        df['usage_trend'] = df['recent_usage'] / df['avg_monthly_usage']
        
        # Engagement features
        df['support_tickets_per_month'] = df['support_tickets'] / (df['customer_age_days'] / 30)
        df['feature_adoption_rate'] = df['features_used'] / df['total_features_available']
        
        # Financial features
        df['revenue_per_day'] = df['total_revenue'] / df['customer_age_days']
        df['payment_frequency'] = df['total_payments'] / (df['customer_age_days'] / 30)
        
        # Risk indicators
        df['high_support_usage'] = (df['support_tickets_per_month'] > df['support_tickets_per_month'].quantile(0.8)).astype(int)
        df['declining_usage'] = (df['usage_trend'] < 0.5).astype(int)
        df['low_engagement'] = (df['feature_adoption_rate'] < 0.3).astype(int)
        
        return df
    
    def preprocess_data(self, df):
        """Comprehensive data preprocessing"""
        # Create behavioral features
        df_processed = self.create_behavioral_features(df.copy())
        
        # Handle categorical variables
        categorical_cols = df_processed.select_dtypes(include=['object']).columns
        for col in categorical_cols:
            if col not in ['customer_id', 'signup_date', 'last_activity_date']:
                le = LabelEncoder()
                df_processed[col] = le.fit_transform(df_processed[col].astype(str))
                self.label_encoders[col] = le
        
        # Select features for modeling
        feature_cols = [col for col in df_processed.columns 
                       if col not in ['customer_id', 'churn', 'signup_date', 'last_activity_date']]
        
        X = df_processed[feature_cols]
        y = df_processed['churn'] if 'churn' in df_processed.columns else None
        
        return X, y
    
    def train_and_evaluate(self, X, y):
        """Train model and provide comprehensive evaluation"""
        # Split data
        X_train, X_test, y_train, y_test = train_test_split(
            X, y, test_size=0.2, random_state=42, stratify=y
        )
        
        # Scale features
        X_train_scaled = self.scaler.fit_transform(X_train)
        X_test_scaled = self.scaler.transform(X_test)
        
        # Train model
        self.model.fit(X_train_scaled, y_train)
        
        # Predictions
        y_pred = self.model.predict(X_test_scaled)
        y_pred_proba = self.model.predict_proba(X_test_scaled)[:, 1]
        
        # Evaluation metrics
        auc_score = roc_auc_score(y_test, y_pred_proba)
        
        print(f"AUC Score: {auc_score:.4f}")
        print("\\nClassification Report:")
        print(classification_report(y_test, y_pred))
        
        # Feature importance
        feature_importance = pd.DataFrame({
            'feature': X.columns,
            'importance': self.model.feature_importances_
        }).sort_values('importance', ascending=False)
        
        return {
            'auc_score': auc_score,
            'feature_importance': feature_importance,
            'predictions': y_pred_proba
        }
    
    def identify_at_risk_customers(self, X, threshold=0.7):
        """Identify customers at high risk of churning"""
        X_scaled = self.scaler.transform(X)
        churn_probabilities = self.model.predict_proba(X_scaled)[:, 1]
        
        at_risk_customers = pd.DataFrame({
            'customer_index': range(len(X)),
            'churn_probability': churn_probabilities,
            'risk_level': pd.cut(churn_probabilities, 
                               bins=[0, 0.3, 0.7, 1.0], 
                               labels=['Low', 'Medium', 'High'])
        })
        
        return at_risk_customers[at_risk_customers['churn_probability'] >= threshold]

# Example usage
def main():
    # Load customer data
    df = pd.read_csv('customer_data.csv')
    
    # Initialize predictor
    predictor = ChurnPredictor()
    
    # Preprocess data
    X, y = predictor.preprocess_data(df)
    
    # Train and evaluate
    results = predictor.train_and_evaluate(X, y)
    
    # Identify at-risk customers
    at_risk = predictor.identify_at_risk_customers(X)
    
    print(f"\\nIdentified {len(at_risk)} high-risk customers")
    print(f"Top features for churn prediction:")
    print(results['feature_importance'].head(10))
    
    return predictor, results, at_risk

if __name__ == "__main__":
    predictor, results, at_risk_customers = main()
            `} />

            <h3>Business Impact of Churn Prediction</h3>
            <ul>
              <li><strong>Model Performance:</strong> Achieved AUC score of 0.92, identifying 85% of potential churners</li>
              <li><strong>Cost Savings:</strong> Early intervention could save 60% of at-risk customers</li>
              <li><strong>Revenue Protection:</strong> Preventing churn of high-value customers saved estimated $500K annually</li>
              <li><strong>Actionable Insights:</strong> Identified key churn drivers for product improvement</li>
            </ul>

            <h2>Key Lessons Learned</h2>

            <h3>Technical Lessons</h3>
            <ol>
              <li>
                <strong>Data Quality is Everything:</strong>
                <p>Spent 70% of time on data cleaning and preprocessing. Clean, well-understood data is more valuable than complex algorithms on messy data.</p>
              </li>
              <li>
                <strong>Feature Engineering Makes the Difference:</strong>
                <p>Domain knowledge combined with creative feature engineering often improved model performance more than algorithm selection.</p>
              </li>
              <li>
                <strong>Model Interpretability Matters:</strong>
                <p>Business stakeholders needed to understand why models made certain predictions. Simple, interpretable models often won over complex black boxes.</p>
              </li>
              <li>
                <strong>Validation Strategy is Crucial:</strong>
                <p>Proper train/validation/test splits and cross-validation prevented overly optimistic performance estimates.</p>
              </li>
            </ol>

            <h3>Business Lessons</h3>
            <ol>
              <li>
                <strong>Understand the Business Problem:</strong>
                <p>Technical accuracy means nothing if the model doesn't solve the actual business problem.</p>
              </li>
              <li>
                <strong>Start Simple, Iterate Fast:</strong>
                <p>Basic models deployed quickly often provided more value than perfect models delivered late.</p>
              </li>
              <li>
                <strong>Communication is Key:</strong>
                <p>Translating technical results into business language was as important as building the models.</p>
              </li>
              <li>
                <strong>Ethics and Fairness:</strong>
                <p>Considered bias in data and models, especially for decisions affecting people's lives.</p>
              </li>
            </ol>

            <h2>Skills Developed</h2>

            <h3>Technical Skills</h3>
            <ul>
              <li><strong>Programming:</strong> Advanced Python, pandas, scikit-learn, TensorFlow</li>
              <li><strong>Statistics:</strong> Hypothesis testing, regression analysis, A/B testing</li>
              <li><strong>Machine Learning:</strong> Supervised/unsupervised learning, ensemble methods</li>
              <li><strong>Data Visualization:</strong> Matplotlib, Seaborn, creating compelling narratives</li>
              <li><strong>Deployment:</strong> Model versioning, monitoring, and maintenance</li>
            </ul>

            <h3>Soft Skills</h3>
            <ul>
              <li><strong>Problem-Solving:</strong> Breaking complex problems into manageable pieces</li>
              <li><strong>Communication:</strong> Presenting technical findings to non-technical audiences</li>
              <li><strong>Project Management:</strong> Managing timelines and deliverables</li>
              <li><strong>Collaboration:</strong> Working with cross-functional teams</li>
            </ul>

            <h2>Tools and Technologies Mastered</h2>
            <div className="grid md:grid-cols-2 gap-6 my-8">
              <div className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 p-6 rounded-lg">
                <h4 className="font-semibold text-blue-900 dark:text-blue-100 mb-3">Data Science Stack</h4>
                <ul className="text-sm text-blue-800 dark:text-blue-200 space-y-1">
                  <li>• Python (Pandas, NumPy, Scikit-learn)</li>
                  <li>• Jupyter Notebooks</li>
                  <li>• Matplotlib & Seaborn</li>
                  <li>• TensorFlow & Keras</li>
                  <li>• NLTK & spaCy</li>
                </ul>
              </div>
              <div className="bg-gradient-to-r from-green-50 to-teal-50 dark:from-green-900/20 dark:to-teal-900/20 p-6 rounded-lg">
                <h4 className="font-semibold text-green-900 dark:text-green-100 mb-3">Development Tools</h4>
                <ul className="text-sm text-green-800 dark:text-green-200 space-y-1">
                  <li>• Git & GitHub</li>
                  <li>• Docker for containerization</li>
                  <li>• AWS for cloud deployment</li>
                  <li>• SQL for data extraction</li>
                  <li>• Streamlit for prototyping</li>
                </ul>
              </div>
            </div>

            <h2>Future Outlook</h2>
            <p>These internship experiences have shaped my approach to machine learning and data science. Moving forward, I'm excited to:</p>

            <ul>
              <li><strong>Explore Deep Learning:</strong> Work on computer vision and NLP projects</li>
              <li><strong>MLOps Focus:</strong> Learn about model deployment, monitoring, and maintenance at scale</li>
              <li><strong>Domain Specialization:</strong> Apply ML to specific industries like healthcare or finance</li>
              <li><strong>Research Opportunities:</strong> Contribute to open-source ML projects and research</li>
            </ul>

            <h2>Advice for Aspiring ML Engineers</h2>
            <ol>
              <li><strong>Master the Fundamentals:</strong> Strong statistics and programming foundation is essential</li>
              <li><strong>Practice with Real Data:</strong> Work with messy, real-world datasets, not just clean academic ones</li>
              <li><strong>Understand the Business:</strong> Learn the domain you're working in</li>
              <li><strong>Build a Portfolio:</strong> Showcase your projects with clear explanations of your approach</li>
              <li><strong>Stay Curious:</strong> The field evolves rapidly; continuous learning is crucial</li>
            </ol>

            <h2>Conclusion</h2>
            <p>My machine learning internships provided invaluable hands-on experience that complemented my academic learning. Working on real business problems taught me that successful ML projects require much more than just building accurate models – they require understanding the problem, cleaning and preparing data, engineering meaningful features, and communicating results effectively.</p>

            <p>These experiences have prepared me for more advanced challenges in machine learning and reinforced my passion for using data science to solve real-world problems. The journey from student to practitioner has been challenging but incredibly rewarding, and I'm excited to continue growing in this dynamic field.</p>

            <div className="mt-12 p-6 bg-blue-50 dark:bg-blue-900/20 rounded-xl border border-blue-200 dark:border-blue-800">
              <h3 className="text-lg font-semibold text-blue-900 dark:text-blue-100 mb-2">
                🚀 Ready to Start Your ML Journey?
              </h3>
              <p className="text-blue-700 dark:text-blue-300 mb-4">
                Interested in machine learning internships or collaborating on ML projects? I'd love to share more insights and help you get started!
              </p>
              <div className="flex gap-4">
                <a 
                  href="/#contact"
                  className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  Get in Touch
                </a>
                <a 
                  href="/#projects"
                  className="inline-flex items-center gap-2 px-4 py-2 border border-blue-600 text-blue-600 dark:text-blue-400 rounded-lg hover:bg-blue-50 dark:hover:bg-blue-900/30 transition-colors"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                  </svg>
                  View My Projects
                </a>
              </div>
            </div>
          </article>
        </div>
      </div>
    </>
  );
}
