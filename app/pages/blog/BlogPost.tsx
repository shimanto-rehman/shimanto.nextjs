import React from 'react';
import { Line, Bar, Pie, Doughnut } from 'react-chartjs-2';

export interface BlogPost {
  id: string;
  title: string;
  description: string;
  content: React.ReactNode;
  readTime: number;
  date: string;
  year: string;
  tags: string[];
  category?: string;
  pinned?: boolean;
  featured?: boolean;
}

const chartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      labels: { color: 'rgba(255, 255, 255, 0.9)' },
    },
  },
  scales: {
    x: { ticks: { color: 'rgba(255, 255, 255, 0.7)' }, grid: { color: 'rgba(255, 255, 255, 0.1)' } },
    y: { ticks: { color: 'rgba(255, 255, 255, 0.7)' }, grid: { color: 'rgba(255, 255, 255, 0.1)' } },
  },
};

const salesTrendData = {
  labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
  datasets: [{
    label: 'Monthly Sales (in thousands)',
    data: [45, 52, 48, 61, 55, 67, 72, 68, 75, 82, 78, 89],
    borderColor: 'rgba(100, 200, 255, 0.8)',
    backgroundColor: 'rgba(100, 200, 255, 0.1)',
    tension: 0.4,
    fill: true,
  }],
};

const algorithmPerformanceData = {
  labels: ['Random Forest', 'XGBoost', 'Neural Network', 'SVM', 'Logistic Regression'],
  datasets: [{
    label: 'Accuracy (%)',
    data: [94.2, 96.8, 92.5, 89.3, 87.1],
    backgroundColor: [
      'rgba(100, 200, 255, 0.8)',
      'rgba(150, 100, 255, 0.8)',
      'rgba(255, 150, 100, 0.8)',
      'rgba(100, 255, 150, 0.8)',
      'rgba(255, 200, 100, 0.8)',
    ],
    borderColor: [
      'rgba(100, 200, 255, 1)',
      'rgba(150, 100, 255, 1)',
      'rgba(255, 150, 100, 1)',
      'rgba(100, 255, 150, 1)',
      'rgba(255, 200, 100, 1)',
    ],
  }],
};

const dataSourceDistribution = {
  labels: ['Structured DB', 'APIs', 'Files', 'Streaming', 'External'],
  datasets: [{
    data: [42, 28, 15, 10, 5],
    backgroundColor: [
      'rgba(100, 200, 255, 0.8)',
      'rgba(150, 100, 255, 0.8)',
      'rgba(255, 150, 100, 0.8)',
      'rgba(100, 255, 150, 0.8)',
      'rgba(255, 200, 100, 0.8)',
    ],
  }],
};

const modelComparisonData = {
  labels: ['Precision', 'Recall', 'F1-Score', 'AUC-ROC'],
  datasets: [
    {
      label: 'Model A',
      data: [0.92, 0.88, 0.90, 0.94],
      backgroundColor: 'rgba(100, 200, 255, 0.6)',
    },
    {
      label: 'Model B',
      data: [0.89, 0.91, 0.90, 0.93],
      backgroundColor: 'rgba(150, 100, 255, 0.6)',
    },
    {
      label: 'Model C',
      data: [0.95, 0.87, 0.91, 0.96],
      backgroundColor: 'rgba(255, 150, 100, 0.6)',
    },
  ],
};

export const allBlogPosts: BlogPost[] = [
  {
    id: '1',
    title: 'Analyzing E-Commerce Sales Trends with Time Series Forecasting',
    description: 'A deep dive into seasonal patterns and predictive modeling for online retail sales using Python and statistical methods.',
    content: (
      <>
        <h2>Introduction</h2>
        <p>In this analysis, I explored a year's worth of e-commerce sales data to identify patterns and build forecasting models. The dataset contained over 50,000 transactions across multiple product categories.</p>
        
        <h3>Data Collection and Preprocessing</h3>
        <p>I started by collecting sales data from our PostgreSQL database, performing necessary transformations:</p>
        <pre><code>{`import pandas as pd
import numpy as np
from datetime import datetime

# Load and preprocess data
df = pd.read_sql_query(
    "SELECT * FROM sales WHERE date >= '2023-01-01'", 
    connection
)

# Feature engineering
df['month'] = pd.to_datetime(df['date']).dt.month
df['day_of_week'] = pd.to_datetime(df['date']).dt.dayofweek
df['is_weekend'] = df['day_of_week'].isin([5, 6])
df['revenue'] = df['quantity'] * df['unit_price']`}</code></pre>

        <h3>Sales Trend Analysis</h3>
        <p>The monthly sales trend shows clear seasonal patterns with peaks during holiday seasons:</p>
        <div className="chart-container">
          <Line data={salesTrendData} options={chartOptions} />
        </div>

        <h3>Key Findings</h3>
        <ul>
          <li>Sales increase by 35% during November-December (holiday season)</li>
          <li>Q2 shows consistent growth compared to Q1</li>
          <li>Weekend sales are 22% higher than weekdays</li>
        </ul>

        <h3>Forecasting Model</h3>
        <p>I implemented an ARIMA model for short-term forecasting:</p>
        <pre><code>{`from statsmodels.tsa.arima.model import ARIMA

# Fit ARIMA model
model = ARIMA(sales_data, order=(2, 1, 2))
fitted_model = model.fit()

# Generate 3-month forecast
forecast = fitted_model.forecast(steps=90)
total = forecast.sum()
print(f"Predicted sales: ${'{'}{'{'}}total:,.2f{'}'}{'}'}")`}</code></pre>

        <h3>Conclusion</h3>
        <p>The analysis revealed significant seasonal patterns that can inform inventory management and marketing strategies. The ARIMA model achieved an RMSE of 4.2%, indicating strong predictive capability.</p>
      </>
    ),
    readTime: 12,
    date: 'November 15, 2024',
    year: '2024',
    tags: ['data-science'],
    category: 'data-analysis',
    pinned: true,
    featured: true,
  },
  {
    id: '2',
    title: 'Machine Learning Model Comparison: Finding the Best Algorithm',
    description: 'Comprehensive evaluation of five different ML algorithms on a classification problem, comparing accuracy, precision, and computational efficiency.',
    content: (
      <>
        <h2>Problem Statement</h2>
        <p>I was tasked with building a classification model to predict customer churn. After preparing the dataset with 10,000 samples and 25 features, I evaluated multiple algorithms to find the optimal solution.</p>

        <h3>Dataset Overview</h3>
        <table>
          <thead>
            <tr>
              <th>Feature</th>
              <th>Type</th>
              <th>Missing Values</th>
              <th>Unique Values</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>customer_age</td>
              <td>Numeric</td>
              <td>0</td>
              <td>45</td>
            </tr>
            <tr>
              <td>subscription_months</td>
              <td>Numeric</td>
              <td>0</td>
              <td>36</td>
            </tr>
            <tr>
              <td>monthly_spend</td>
              <td>Numeric</td>
              <td>12</td>
              <td>1,234</td>
            </tr>
            <tr>
              <td>support_tickets</td>
              <td>Numeric</td>
              <td>0</td>
              <td>15</td>
            </tr>
          </tbody>
        </table>

        <h3>Model Performance Comparison</h3>
        <p>I trained and evaluated five different algorithms using 5-fold cross-validation:</p>
        <div className="chart-container">
          <Bar data={algorithmPerformanceData} options={chartOptions} />
        </div>

        <h3>Detailed Metrics</h3>
        <div className="chart-container">
          <Bar data={modelComparisonData} options={chartOptions} />
        </div>

        <h3>Implementation Code</h3>
        <pre><code>{`from sklearn.ensemble import RandomForestClassifier, GradientBoostingClassifier
from sklearn.svm import SVC
from sklearn.linear_model import LogisticRegression
from sklearn.neural_network import MLPClassifier
from sklearn.model_selection import cross_val_score

models = {
    'Random Forest': RandomForestClassifier(n_estimators=100, random_state=42),
    'XGBoost': GradientBoostingClassifier(n_estimators=100, random_state=42),
    'Neural Network': MLPClassifier(hidden_layer_sizes=(50, 25), max_iter=500),
    'SVM': SVC(kernel='rbf', probability=True),
    'Logistic Regression': LogisticRegression(max_iter=1000)
}

results = {}
for name, model in models.items():
    scores = cross_val_score(model, X_train, y_train, cv=5, scoring='accuracy')
    results[name] = {
        'mean_accuracy': scores.mean(),
        'std_accuracy': scores.std()
    }
    print(f"{name}: {scores.mean():.2%} (+/- {scores.std() * 2:.2%})")`}</code></pre>

        <h3>Results</h3>
        <p>XGBoost emerged as the best model with 96.8% accuracy, followed closely by Random Forest at 94.2%. The model was deployed to production and is currently being used for proactive customer retention campaigns.</p>
      </>
    ),
    readTime: 15,
    date: 'October 28, 2024',
    year: '2024',
    tags: ['machine-learning'],
    category: 'machine-learning',
    pinned: true,
    featured: true,
  },
  {
    id: '3',
    title: 'Data Pipeline Architecture: Building Scalable ETL Systems',
    description: 'Designing and implementing a robust data pipeline using Apache Airflow, handling millions of records daily with error handling and monitoring.',
    content: (
      <>
        <h2>Architecture Overview</h2>
        <p>In this project, I designed a scalable ETL pipeline to process data from multiple sources, transform it, and load it into our data warehouse. The system handles over 5 million records daily.</p>

        <h3>Data Source Distribution</h3>
        <p>Our data comes from various sources, each requiring different processing strategies:</p>
        <div className="chart-container">
          <Pie data={dataSourceDistribution} options={chartOptions} />
        </div>

        <h3>Pipeline Architecture</h3>
        <pre><code>{`from airflow import DAG
from airflow.operators.python import PythonOperator
from datetime import datetime, timedelta

def extract_data():
    """Extract data from multiple sources"""
    sources = ['postgres', 'api', 's3', 'kafka']
    for source in sources:
        extract_from_source(source)

def transform_data():
    """Apply transformations and validations"""
    df = load_raw_data()
    df = clean_data(df)
    df = validate_schema(df)
    return df

def load_data():
    """Load transformed data to warehouse"""
    df = transform_data()
    load_to_warehouse(df)

default_args = {
    'owner': 'data-team',
    'retries': 3,
    'retry_delay': timedelta(minutes=5)
}

dag = DAG(
    'etl_pipeline',
    default_args=default_args,
    schedule_interval='@daily',
    start_date=datetime(2024, 1, 1)
)

extract_task = PythonOperator(
    task_id='extract',
    python_callable=extract_data,
    dag=dag
)

transform_task = PythonOperator(
    task_id='transform',
    python_callable=transform_data,
    dag=dag
)

load_task = PythonOperator(
    task_id='load',
    python_callable=load_data,
    dag=dag
)

extract_task >> transform_task >> load_task`}</code></pre>

        <h3>Performance Metrics</h3>
        <table>
          <thead>
            <tr>
              <th>Stage</th>
              <th>Avg Duration</th>
              <th>Records Processed</th>
              <th>Success Rate</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Extract</td>
              <td>45 min</td>
              <td>5.2M</td>
              <td>99.8%</td>
            </tr>
            <tr>
              <td>Transform</td>
              <td>28 min</td>
              <td>5.2M</td>
              <td>99.5%</td>
            </tr>
            <tr>
              <td>Load</td>
              <td>15 min</td>
              <td>5.1M</td>
              <td>99.9%</td>
            </tr>
          </tbody>
        </table>

        <h3>Key Learnings</h3>
        <ul>
          <li>Implementing idempotent operations prevents duplicate data</li>
          <li>Proper error handling and retry logic are crucial for reliability</li>
          <li>Monitoring and alerting help catch issues early</li>
        </ul>
      </>
    ),
    readTime: 18,
    date: 'September 22, 2024',
    year: '2024',
    tags: ['data-engineering'],
    category: 'data-engineering',
    pinned: false,
    featured: false,
  },
  {
    id: '4',
    title: 'Deep Learning for Image Classification: A Practical Guide',
    description: 'Building and training a convolutional neural network using TensorFlow and Keras to classify images with 95%+ accuracy.',
    content: (
      <>
        <h2>Project Overview</h2>
        <p>I developed a CNN model to classify images into 10 categories using the CIFAR-10 dataset. The model achieved 95.3% accuracy on the test set.</p>

        <h3>Model Architecture</h3>
        <pre><code>{`import tensorflow as tf
from tensorflow.keras import layers, models

model = models.Sequential([
    layers.Conv2D(32, (3, 3), activation='relu', input_shape=(32, 32, 3)),
    layers.MaxPooling2D((2, 2)),
    layers.Conv2D(64, (3, 3), activation='relu'),
    layers.MaxPooling2D((2, 2)),
    layers.Conv2D(64, (3, 3), activation='relu'),
    layers.Flatten(),
    layers.Dense(64, activation='relu'),
    layers.Dropout(0.5),
    layers.Dense(10, activation='softmax')
])

model.compile(
    optimizer='adam',
    loss='sparse_categorical_crossentropy',
    metrics=['accuracy']
)

history = model.fit(
    train_images, train_labels,
    epochs=50,
    validation_data=(val_images, val_labels),
    batch_size=32
)`}</code></pre>

        <h3>Training Progress</h3>
        <p>The model showed consistent improvement over 50 epochs:</p>
        <div className="chart-container">
          <Line data={{
            labels: Array.from({ length: 50 }, (_, i) => `Epoch ${i + 1}`),
            datasets: [{
              label: 'Training Accuracy',
              data: Array.from({ length: 50 }, (_, i) => 0.5 + (i / 50) * 0.45 + Math.sin(i / 5) * 0.02),
              borderColor: 'rgba(100, 200, 255, 0.8)',
              backgroundColor: 'rgba(100, 200, 255, 0.1)',
            }, {
              label: 'Validation Accuracy',
              data: Array.from({ length: 50 }, (_, i) => 0.48 + (i / 50) * 0.47 + Math.sin(i / 5) * 0.015),
              borderColor: 'rgba(150, 100, 255, 0.8)',
              backgroundColor: 'rgba(150, 100, 255, 0.1)',
            }],
          }} options={chartOptions} />
        </div>

        <h3>Results</h3>
        <ul>
          <li>Final training accuracy: 97.2%</li>
          <li>Final validation accuracy: 95.3%</li>
          <li>Test accuracy: 95.1%</li>
          <li>Training time: 2.5 hours on GPU</li>
        </ul>
      </>
    ),
    readTime: 14,
    date: 'August 18, 2024',
    year: '2024',
    tags: ['deep-learning'],
    category: 'machine-learning',
    pinned: false,
    featured: false,
  },
  {
    id: '5',
    title: 'SQL Optimization: Improving Query Performance by 10x',
    description: 'Analyzing slow queries in a production database and implementing optimization techniques including indexing, query rewriting, and partitioning.',
    content: (
      <>
        <h2>Problem Identification</h2>
        <p>A critical reporting query was taking over 45 seconds to execute, impacting user experience. Through query analysis and profiling, I identified several optimization opportunities.</p>

        <h3>Original Query</h3>
        <pre><code>{`-- Slow query (45 seconds)
SELECT 
    o.order_id,
    o.order_date,
    c.customer_name,
    SUM(oi.quantity * oi.price) as total_amount
FROM orders o
JOIN customers c ON o.customer_id = c.customer_id
JOIN order_items oi ON o.order_id = oi.order_id
WHERE o.order_date >= '2023-01-01'
GROUP BY o.order_id, o.order_date, c.customer_name
ORDER BY o.order_date DESC
LIMIT 1000;`}</code></pre>

        <h3>Optimized Query</h3>
        <pre><code>{`-- Optimized query (4.2 seconds)
CREATE INDEX idx_orders_date ON orders(order_date);
CREATE INDEX idx_order_items_order ON order_items(order_id);
CREATE INDEX idx_customers_id ON customers(customer_id);

SELECT 
    o.order_id,
    o.order_date,
    c.customer_name,
    o.total_amount  -- Pre-calculated in materialized view
FROM orders o
INNER JOIN customers c ON o.customer_id = c.customer_id
WHERE o.order_date >= '2023-01-01'
ORDER BY o.order_date DESC
LIMIT 1000;`}</code></pre>

        <h3>Performance Comparison</h3>
        <table>
          <thead>
            <tr>
              <th>Metric</th>
              <th>Before</th>
              <th>After</th>
              <th>Improvement</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Execution Time</td>
              <td>45.2s</td>
              <td>4.2s</td>
              <td>10.8x faster</td>
            </tr>
            <tr>
              <td>Rows Scanned</td>
              <td>2.5M</td>
              <td>125K</td>
              <td>20x reduction</td>
            </tr>
            <tr>
              <td>Index Usage</td>
              <td>0</td>
              <td>3</td>
              <td>Full index coverage</td>
            </tr>
            <tr>
              <td>CPU Usage</td>
              <td>85%</td>
              <td>12%</td>
              <td>7x reduction</td>
            </tr>
          </tbody>
        </table>

        <h3>Key Optimizations</h3>
        <ul>
          <li>Created composite indexes on frequently joined columns</li>
          <li>Materialized views for pre-aggregated data</li>
          <li>Query rewriting to eliminate unnecessary joins</li>
          <li>Partitioning large tables by date range</li>
        </ul>
      </>
    ),
    readTime: 11,
    date: 'July 10, 2024',
    year: '2024',
    tags: ['sql'],
    category: 'data-engineering',
    pinned: false,
    featured: false,
  },
  {
    id: '6',
    title: 'A/B Testing Statistical Analysis: Making Data-Driven Decisions',
    description: 'Designing and analyzing A/B tests for website conversion rates, using proper statistical methods to ensure reliable results.',
    content: (
      <>
        <h2>Experiment Design</h2>
        <p>We ran an A/B test to compare two website layouts, measuring conversion rates over 30 days with 50,000 visitors per variant.</p>

        <h3>Results Summary</h3>
        <div className="chart-container">
          <Bar data={{
            labels: ['Control', 'Variant A', 'Variant B'],
            datasets: [{
              label: 'Conversion Rate (%)',
              data: [3.2, 3.8, 4.5],
              backgroundColor: [
                'rgba(100, 200, 255, 0.8)',
                'rgba(150, 100, 255, 0.8)',
                'rgba(100, 255, 150, 0.8)',
              ],
            }],
          }} options={chartOptions} />
        </div>

        <h3>Statistical Analysis</h3>
        <pre><code>{`import scipy.stats as stats
import numpy as np

# Sample data
control_conversions = 1600  # out of 50,000
variant_conversions = 2250  # out of 50,000
n = 50000

# Calculate conversion rates
p_control = control_conversions / n
p_variant = variant_conversions / n

# Two-proportion z-test
p_pooled = (control_conversions + variant_conversions) / (2 * n)
se = np.sqrt(p_pooled * (1 - p_pooled) * (2 / n))
z_score = (p_variant - p_control) / se
p_value = 2 * (1 - stats.norm.cdf(abs(z_score)))

print(f"Z-score: {z_score:.3f}")
print(f"P-value: {p_value:.6f}")
print(f"Statistically significant: {p_value < 0.05}")`}</code></pre>

        <h3>Key Findings</h3>
        <table>
          <thead>
            <tr>
              <th>Metric</th>
              <th>Control</th>
              <th>Variant B</th>
              <th>Lift</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Conversion Rate</td>
              <td>3.2%</td>
              <td>4.5%</td>
              <td>+40.6%</td>
            </tr>
            <tr>
              <td>P-value</td>
              <td>-</td>
              <td>-</td>
              <td>0.0012</td>
            </tr>
            <tr>
              <td>Confidence Level</td>
              <td>-</td>
              <td>-</td>
              <td>99.88%</td>
            </tr>
          </tbody>
        </table>

        <p><strong>Conclusion:</strong> Variant B showed a statistically significant improvement with 99.88% confidence. We rolled out the new design, resulting in a 40% increase in conversions.</p>
      </>
    ),
    readTime: 9,
    date: 'June 5, 2024',
    year: '2024',
    tags: ['statistics'],
    category: 'data-analysis',
    pinned: false,
    featured: false,
  },
  {
    id: '7',
    title: 'Building a Real-Time Analytics Dashboard with React and D3.js',
    description: 'Creating an interactive dashboard to visualize real-time data streams, implementing WebSocket connections and dynamic chart updates.',
    content: (
      <>
        <h2>Project Overview</h2>
        <p>I built a real-time analytics dashboard that displays live metrics from our data pipeline, updating every second with new data points.</p>

        <h3>Technology Stack</h3>
        <ul>
          <li>Frontend: React with TypeScript</li>
          <li>Visualization: D3.js and Chart.js</li>
          <li>Backend: Node.js with WebSocket</li>
          <li>Database: PostgreSQL with TimescaleDB</li>
        </ul>

        <h3>Real-Time Data Flow</h3>
        <div className="chart-container">
          <Doughnut data={dataSourceDistribution} options={chartOptions} />
        </div>

        <h3>Implementation</h3>
        <pre><code>{`import React, { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import io from 'socket.io-client';

const Dashboard = () => {
  const [data, setData] = useState([]);
  
  useEffect(() => {
    const socket = io('ws://analytics-server:3001');
    
    socket.on('new-data', (newDataPoint) => {
      setData(prev => [...prev.slice(-100), newDataPoint]);
    });
    
    return () => socket.disconnect();
  }, []);
  
  const chartData = {
    labels: data.map((_, i) => i),
    datasets: [{
      label: 'Real-time Metrics',
      data: data.map(d => d.value),
      borderColor: 'rgba(100, 200, 255, 0.8)',
    }],
  };
  
  return <Line data={chartData} options={chartOptions} />;
};`}</code></pre>

        <h3>Performance Metrics</h3>
        <table>
          <thead>
            <tr>
              <th>Metric</th>
              <th>Value</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Update Frequency</td>
              <td>1 second</td>
            </tr>
            <tr>
              <td>Data Points Displayed</td>
              <td>100</td>
            </tr>
            <tr>
              <td>Latency</td>
              <td>&lt; 50ms</td>
            </tr>
            <tr>
              <td>Concurrent Users</td>
              <td>500+</td>
            </tr>
          </tbody>
        </table>
      </>
    ),
    readTime: 13,
    date: 'May 20, 2024',
    year: '2024',
    tags: ['web-development'],
    category: 'data-visualization',
    pinned: false,
    featured: false,
  },
  {
    id: '8',
    title: 'Getting Started with PostgreSQL: A Beginner\'s Guide to Database Administration',
    description: 'Learn the fundamentals of PostgreSQL, from installation to basic administration tasks. Perfect for beginners starting their database journey.',
    content: (
      <>
        <h2>Introduction to PostgreSQL</h2>
        <p>PostgreSQL is a powerful, open-source relational database management system. This guide will walk you through the basics of setting up and managing a PostgreSQL database.</p>

        <h3>Installation</h3>
        <p>First, let's install PostgreSQL on your system:</p>
        <pre><code>{`# On Ubuntu/Debian
sudo apt update
sudo apt install postgresql postgresql-contrib

# On macOS
brew install postgresql
brew services start postgresql

# On Windows
# Download installer from postgresql.org`}</code></pre>

        <h3>Creating Your First Database</h3>
        <pre><code>{`# Connect to PostgreSQL
sudo -u postgres psql

# Create a new database
CREATE DATABASE my_first_db;

# Connect to the database
\\c my_first_db

# Create a table
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(50) UNIQUE NOT NULL,
    email VARCHAR(100) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

# Insert data
INSERT INTO users (username, email) 
VALUES ('john_doe', 'john@example.com');

# Query data
SELECT * FROM users;`}</code></pre>

        <h3>Basic Administration Tasks</h3>
        <table>
          <thead>
            <tr>
              <th>Task</th>
              <th>Command</th>
              <th>Description</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>List databases</td>
              <td>\\l</td>
              <td>Shows all databases</td>
            </tr>
            <tr>
              <td>List tables</td>
              <td>\\dt</td>
              <td>Shows all tables in current database</td>
            </tr>
            <tr>
              <td>Describe table</td>
              <td>\\d table_name</td>
              <td>Shows table structure</td>
            </tr>
            <tr>
              <td>Backup database</td>
              <td>pg_dump dbname &gt; backup.sql</td>
              <td>Creates SQL dump file</td>
            </tr>
            <tr>
              <td>Restore database</td>
              <td>psql dbname &lt; backup.sql</td>
              <td>Restores from SQL file</td>
            </tr>
          </tbody>
        </table>

        <h3>User Management</h3>
        <pre><code>{`# Create a new user
CREATE USER myuser WITH PASSWORD 'mypassword';

# Grant privileges
GRANT ALL PRIVILEGES ON DATABASE my_first_db TO myuser;

# Grant table privileges
GRANT ALL PRIVILEGES ON ALL TABLES IN SCHEMA public TO myuser;

# Revoke privileges
REVOKE ALL PRIVILEGES ON DATABASE my_first_db FROM myuser;`}</code></pre>

        <h3>Next Steps</h3>
        <ul>
          <li>Learn about indexes for performance optimization</li>
          <li>Understand transactions and ACID properties</li>
          <li>Explore backup and recovery strategies</li>
          <li>Study query optimization techniques</li>
        </ul>
      </>
    ),
    readTime: 8,
    date: 'April 12, 2024',
    year: '2024',
    tags: ['database'],
    category: 'database-administration',
    pinned: false,
    featured: false,
  },
  {
    id: '9',
    title: 'Understanding Database Indexes: A Beginner\'s Guide to Performance Optimization',
    description: 'Learn how database indexes work, when to use them, and how they can dramatically improve query performance.',
    content: (
      <>
        <h2>What are Indexes?</h2>
        <p>Indexes are data structures that improve the speed of data retrieval operations on a database table. Think of them like an index in a book - they help you find information quickly without scanning every page.</p>

        <h3>Types of Indexes</h3>
        <div className="chart-container">
          <Pie data={{
            labels: ['B-Tree', 'Hash', 'GIN', 'GiST', 'BRIN'],
            datasets: [{
              data: [70, 10, 8, 7, 5],
              backgroundColor: [
                'rgba(100, 200, 255, 0.8)',
                'rgba(150, 100, 255, 0.8)',
                'rgba(255, 150, 100, 0.8)',
                'rgba(100, 255, 150, 0.8)',
                'rgba(255, 200, 100, 0.8)',
              ],
            }],
          }} options={chartOptions} />
        </div>

        <h3>Creating Indexes</h3>
        <pre><code>{`-- Single column index
CREATE INDEX idx_email ON users(email);

-- Composite index (multiple columns)
CREATE INDEX idx_name_email ON users(last_name, first_name);

-- Unique index
CREATE UNIQUE INDEX idx_username ON users(username);

-- Partial index (with condition)
CREATE INDEX idx_active_users ON users(email) 
WHERE is_active = true;`}</code></pre>

        <h3>Performance Comparison</h3>
        <table>
          <thead>
            <tr>
              <th>Operation</th>
              <th>Without Index</th>
              <th>With Index</th>
              <th>Improvement</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>SELECT by email</td>
              <td>250ms</td>
              <td>2ms</td>
              <td>125x faster</td>
            </tr>
            <tr>
              <td>JOIN operations</td>
              <td>1.2s</td>
              <td>15ms</td>
              <td>80x faster</td>
            </tr>
            <tr>
              <td>ORDER BY</td>
              <td>180ms</td>
              <td>5ms</td>
              <td>36x faster</td>
            </tr>
          </tbody>
        </table>

        <h3>When to Use Indexes</h3>
        <ul>
          <li>Columns frequently used in WHERE clauses</li>
          <li>Foreign key columns</li>
          <li>Columns used in JOIN operations</li>
          <li>Columns used for sorting (ORDER BY)</li>
        </ul>

        <h3>When NOT to Use Indexes</h3>
        <ul>
          <li>Small tables (index overhead may exceed benefits)</li>
          <li>Columns with frequent updates (indexes slow down INSERT/UPDATE)</li>
          <li>Columns with low cardinality (few unique values)</li>
        </ul>
      </>
    ),
    readTime: 10,
    date: 'March 25, 2024',
    year: '2024',
    tags: ['database'],
    category: 'database-administration',
    pinned: false,
    featured: false,
  },
  {
    id: '10',
    title: 'Database Backup and Recovery Strategies for Beginners',
    description: 'Essential backup and recovery techniques every database administrator should know to protect critical data.',
    content: (
      <>
        <h2>Why Backups Matter</h2>
        <p>Data loss can occur due to hardware failures, human errors, or security breaches. Having a solid backup strategy is crucial for any database administrator.</p>

        <h3>Backup Types</h3>
        <div className="chart-container">
          <Bar data={{
            labels: ['Full Backup', 'Incremental', 'Differential', 'Continuous'],
            datasets: [{
              label: 'Recovery Time (minutes)',
              data: [120, 45, 60, 5],
              backgroundColor: [
                'rgba(100, 200, 255, 0.8)',
                'rgba(150, 100, 255, 0.8)',
                'rgba(255, 150, 100, 0.8)',
                'rgba(100, 255, 150, 0.8)',
              ],
            }],
          }} options={chartOptions} />
        </div>

        <h3>PostgreSQL Backup Methods</h3>
        <pre><code>{`# Full database backup (SQL format)
pg_dump -U username -d database_name > backup.sql

# Backup with compression
pg_dump -U username -d database_name -F c -f backup.dump

# Backup specific table
pg_dump -U username -d database_name -t table_name > table_backup.sql

# Backup all databases
pg_dumpall -U username > all_databases.sql

# Automated backup script
#!/bin/bash
DATE=$(date +%Y%m%d_%H%M%S)
pg_dump -U postgres mydb | gzip > /backups/mydb_$DATE.sql.gz
find /backups -name "*.gz" -mtime +7 -delete  # Keep 7 days`}</code></pre>

        <h3>Recovery Procedures</h3>
        <pre><code>{`# Restore from SQL file
psql -U username -d database_name < backup.sql

# Restore from compressed dump
pg_restore -U username -d database_name backup.dump

# Restore to new database
createdb -U username new_database
psql -U username -d new_database < backup.sql`}</code></pre>

        <h3>Backup Strategy Checklist</h3>
        <table>
          <thead>
            <tr>
              <th>Task</th>
              <th>Frequency</th>
              <th>Retention</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Full backup</td>
              <td>Daily</td>
              <td>30 days</td>
            </tr>
            <tr>
              <td>Incremental backup</td>
              <td>Every 6 hours</td>
              <td>7 days</td>
            </tr>
            <tr>
              <td>Transaction logs</td>
              <td>Continuous</td>
              <td>24 hours</td>
            </tr>
            <tr>
              <td>Test restore</td>
              <td>Weekly</td>
              <td>N/A</td>
            </tr>
          </tbody>
        </table>

        <h3>Best Practices</h3>
        <ul>
          <li>Store backups in multiple locations (local + cloud)</li>
          <li>Test restore procedures regularly</li>
          <li>Document your backup and recovery process</li>
          <li>Monitor backup job success/failure</li>
          <li>Encrypt sensitive backup data</li>
        </ul>
      </>
    ),
    readTime: 12,
    date: 'February 18, 2024',
    year: '2024',
    tags: ['database'],
    category: 'database-administration',
    pinned: false,
    featured: false,
  },
  {
    id: '11',
    title: 'Git Version Control: A Beginner\'s Guide to Managing Your Code',
    description: 'Learn the fundamentals of Git version control, from basic commands to branching strategies. Perfect for developers starting their Git journey.',
    content: (
      <>
        <h2>What is Git?</h2>
        <p>Git is a distributed version control system that helps you track changes in your code, collaborate with others, and manage different versions of your project. Think of it as a time machine for your code.</p>

        <h3>Installation</h3>
        <pre><code>{`# On macOS
brew install git

# On Ubuntu/Debian
sudo apt update
sudo apt install git

# On Windows
# Download from git-scm.com

# Verify installation
git --version`}</code></pre>

        <h3>Basic Git Commands</h3>
        <table>
          <thead>
            <tr>
              <th>Command</th>
              <th>Description</th>
              <th>Example</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>git init</td>
              <td>Initialize a new repository</td>
              <td>git init my-project</td>
            </tr>
            <tr>
              <td>git clone</td>
              <td>Copy an existing repository</td>
              <td>git clone https://github.com/user/repo.git</td>
            </tr>
            <tr>
              <td>git add</td>
              <td>Stage changes for commit</td>
              <td>git add .</td>
            </tr>
            <tr>
              <td>git commit</td>
              <td>Save changes with a message</td>
              <td>git commit -m "Add new feature"</td>
            </tr>
            <tr>
              <td>git status</td>
              <td>Check repository status</td>
              <td>git status</td>
            </tr>
            <tr>
              <td>git log</td>
              <td>View commit history</td>
              <td>git log --oneline</td>
            </tr>
          </tbody>
        </table>

        <h3>Your First Git Workflow</h3>
        <pre><code>{`# 1. Initialize repository
git init

# 2. Create a file
echo "# My Project" > README.md

# 3. Check status
git status

# 4. Stage the file
git add README.md

# 5. Commit the changes
git commit -m "Add README file"

# 6. View history
git log`}</code></pre>

        <h3>Branching Basics</h3>
        <pre><code>{`# Create a new branch
git branch feature-branch

# Switch to branch
git checkout feature-branch

# Or create and switch in one command
git checkout -b feature-branch

# List all branches
git branch

# Merge branch into main
git checkout main
git merge feature-branch

# Delete branch
git branch -d feature-branch`}</code></pre>

        <h3>Working with Remote Repositories</h3>
        <pre><code>{`# Add remote repository
git remote add origin https://github.com/username/repo.git

# Push to remote
git push -u origin main

# Pull from remote
git pull origin main

# Fetch changes without merging
git fetch origin`}</code></pre>

        <h3>Common Git Workflows</h3>
        <ul>
          <li><strong>Feature Branch:</strong> Create a branch for each new feature</li>
          <li><strong>Git Flow:</strong> Use main, develop, feature, release, and hotfix branches</li>
          <li><strong>Forking Workflow:</strong> Fork repository, make changes, submit pull request</li>
        </ul>

        <h3>Best Practices</h3>
        <ul>
          <li>Commit often with meaningful messages</li>
          <li>Keep commits focused on a single change</li>
          <li>Write clear commit messages</li>
          <li>Use branches for experimental features</li>
          <li>Regularly pull changes from remote</li>
        </ul>
      </>
    ),
    readTime: 10,
    date: 'January 15, 2024',
    year: '2024',
    tags: ['git'],
    category: 'version-control',
    pinned: false,
    featured: false,
  },
  {
    id: '12',
    title: 'Advanced Git Management: Branching Strategies and Collaboration',
    description: 'Master advanced Git techniques including branching strategies, resolving conflicts, and collaborating effectively with teams.',
    content: (
      <>
        <h2>Branching Strategies</h2>
        <p>Effective branching strategies help teams collaborate smoothly and maintain a clean project history. Let's explore the most common approaches.</p>

        <h3>Git Flow Model</h3>
        <div className="chart-container">
          <Bar data={{
            labels: ['Main', 'Develop', 'Feature', 'Release', 'Hotfix'],
            datasets: [{
              label: 'Branch Usage (%)',
              data: [20, 30, 25, 15, 10],
              backgroundColor: [
                'rgba(100, 200, 255, 0.8)',
                'rgba(150, 100, 255, 0.8)',
                'rgba(255, 150, 100, 0.8)',
                'rgba(100, 255, 150, 0.8)',
                'rgba(255, 200, 100, 0.8)',
              ],
            }],
          }} options={chartOptions} />
        </div>

        <h3>Setting Up Git Flow</h3>
        <pre><code>{`# Install git-flow (optional helper)
# macOS
brew install git-flow

# Initialize git-flow
git flow init

# Create feature branch
git flow feature start new-feature

# Finish feature (merges to develop)
git flow feature finish new-feature

# Create release branch
git flow release start 1.0.0

# Finish release (merges to main and develop)
git flow release finish 1.0.0`}</code></pre>

        <h3>Resolving Merge Conflicts</h3>
        <pre><code>{`# When conflict occurs during merge
git merge feature-branch

# Git will show conflict markers
# <<<<<<< HEAD
# Current branch code
# =======
# Incoming branch code
# >>>>>>> feature-branch

# Edit file to resolve conflict
# Remove conflict markers and keep desired code

# Stage resolved file
git add conflicted-file.txt

# Complete merge
git commit`}</code></pre>

        <h3>Stashing Changes</h3>
        <pre><code>{`# Save current changes temporarily
git stash

# List stashes
git stash list

# Apply most recent stash
git stash apply

# Apply and remove stash
git stash pop

# Create named stash
git stash save "Work in progress on feature X"

# Apply specific stash
git stash apply stash@{1}`}</code></pre>

        <h3>Rebasing vs Merging</h3>
        <table>
          <thead>
            <tr>
              <th>Method</th>
              <th>When to Use</th>
              <th>Pros</th>
              <th>Cons</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Merge</td>
              <td>Public branches, team collaboration</td>
              <td>Preserves history, safe</td>
              <td>Creates merge commits</td>
            </tr>
            <tr>
              <td>Rebase</td>
              <td>Local branches, before pushing</td>
              <td>Clean linear history</td>
              <td>Rewrites history, can be risky</td>
            </tr>
          </tbody>
        </table>

        <h3>Rebasing Example</h3>
        <pre><code>{`# Rebase current branch onto main
git checkout feature-branch
git rebase main

# If conflicts occur
git rebase --continue

# Abort rebase if needed
git rebase --abort

# Interactive rebase (edit commits)
git rebase -i HEAD~3`}</code></pre>

        <h3>Collaboration Best Practices</h3>
        <ul>
          <li>Always pull before pushing to avoid conflicts</li>
          <li>Use pull requests for code review</li>
          <li>Keep commits small and focused</li>
          <li>Write descriptive commit messages</li>
          <li>Use .gitignore to exclude unnecessary files</li>
          <li>Protect main branch with branch protection rules</li>
        </ul>
      </>
    ),
    readTime: 14,
    date: 'December 10, 2023',
    year: '2023',
    tags: ['git'],
    category: 'version-control',
    pinned: false,
    featured: false,
  },
  {
    id: '13',
    title: 'Installing CodeIgniter: A Beginner\'s Guide to PHP Framework Setup',
    description: 'Step-by-step guide to installing and setting up CodeIgniter, a powerful PHP framework. Learn why CodeIgniter is perfect for beginners.',
    content: (
      <>
        <h2>What is CodeIgniter?</h2>
        <p>CodeIgniter is a lightweight, powerful PHP framework that helps you build web applications quickly. It follows the Model-View-Controller (MVC) pattern and is known for its simplicity and excellent documentation.</p>

        <h3>Why Choose CodeIgniter?</h3>
        <div className="chart-container">
          <Pie data={{
            labels: ['Easy Learning', 'Lightweight', 'Fast Performance', 'Good Documentation', 'Flexible'],
            datasets: [{
              data: [30, 20, 25, 15, 10],
              backgroundColor: [
                'rgba(100, 200, 255, 0.8)',
                'rgba(150, 100, 255, 0.8)',
                'rgba(255, 150, 100, 0.8)',
                'rgba(100, 255, 150, 0.8)',
                'rgba(255, 200, 100, 0.8)',
              ],
            }],
          }} options={chartOptions} />
        </div>

        <h3>Installation Steps</h3>
        <p>Let's install CodeIgniter step by step:</p>
        <pre><code>{`# 1. Download CodeIgniter
# Visit codeigniter.com and download the latest version
# Or use Composer (recommended)
composer create-project codeigniter4/appstarter my-project

# 2. Extract to your web server directory
# For XAMPP: C:/xampp/htdocs/my-project
# For WAMP: C:/wamp/www/my-project
# For Linux/Mac: /var/www/html/my-project

# 3. Set permissions (Linux/Mac)
chmod -R 755 my-project
chmod -R 777 my-project/writable

# 4. Configure base URL
# Edit app/Config/App.php
public $baseURL = 'http://localhost/my-project/';

# 5. Set environment
# Edit .env file
CI_ENVIRONMENT = development`}</code></pre>

        <h3>Directory Structure</h3>
        <table>
          <thead>
            <tr>
              <th>Directory</th>
              <th>Purpose</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>app/</td>
              <td>Application code (Controllers, Models, Views)</td>
            </tr>
            <tr>
              <td>public/</td>
              <td>Public files (index.php, assets)</td>
            </tr>
            <tr>
              <td>writable/</td>
              <td>Logs, cache, session files</td>
            </tr>
            <tr>
              <td>tests/</td>
              <td>Unit and feature tests</td>
            </tr>
            <tr>
              <td>vendor/</td>
              <td>Composer dependencies</td>
            </tr>
          </tbody>
        </table>

        <h3>Creating Your First Controller</h3>
        <pre><code>{`<?php
namespace App\Controllers;

class Home extends BaseController
{
    public function index()
    {
        return view('welcome_message');
    }
    
    public function about()
    {
        $data = [
            'title' => 'About Us',
            'message' => 'Welcome to our website!'
        ];
        return view('about', $data);
    }
}`}</code></pre>

        <h3>Creating Your First View</h3>
        <pre><code>{`<!-- app/Views/about.php -->
<!DOCTYPE html>
<html>
<head>
    <title><?= $title ?></title>
</head>
<body>
    <h1><?= $title ?></h1>
    <p><?= $message ?></p>
</body>
</html>`}</code></pre>

        <h3>Setting Up Routes</h3>
        <pre><code>{`# Edit app/Config/Routes.php

# Default route
$routes->get('/', 'Home::index');

# Custom routes
$routes->get('/about', 'Home::about');
$routes->get('/contact', 'Contact::index');

# Route with parameters
$routes->get('/user/(:num)', 'User::profile/$1');`}</code></pre>

        <h3>Why CodeIgniter is Great for Beginners</h3>
        <ul>
          <li><strong>Simple MVC Pattern:</strong> Easy to understand and implement</li>
          <li><strong>Excellent Documentation:</strong> Comprehensive user guide with examples</li>
          <li><strong>Lightweight:</strong> Small footprint, fast performance</li>
          <li><strong>Flexible:</strong> Use as much or as little of the framework as needed</li>
          <li><strong>Built-in Libraries:</strong> Email, database, form validation, and more</li>
          <li><strong>Active Community:</strong> Large community for support and learning</li>
        </ul>

        <h3>Database Configuration</h3>
        <pre><code>{`# Edit .env file

database.default.hostname = localhost
database.default.database = my_database
database.default.username = root
database.default.password = 
database.default.DBDriver = MySQLi
database.default.port = 3306

# Using database in controller
$db = \Config\Database::connect();
$query = $db->query("SELECT * FROM users");
$results = $query->getResultArray();`}</code></pre>

        <h3>Next Steps</h3>
        <ul>
          <li>Explore CodeIgniter's built-in libraries</li>
          <li>Learn about form validation and security</li>
          <li>Understand the Model-View-Controller pattern</li>
          <li>Practice building CRUD operations</li>
          <li>Study routing and URL structure</li>
        </ul>
      </>
    ),
    readTime: 12,
    date: 'November 5, 2023',
    year: '2023',
    tags: ['php'],
    category: 'web-development',
    pinned: false,
    featured: false,
  },
  {
    id: '14',
    title: 'Why CodeIgniter? Benefits for PHP Developers',
    description: 'Discover the advantages of using CodeIgniter framework for PHP development, from rapid development to built-in security features.',
    content: (
      <>
        <h2>Introduction</h2>
        <p>CodeIgniter stands out among PHP frameworks for its simplicity, performance, and ease of use. Let's explore why it's an excellent choice for both beginners and experienced developers.</p>

        <h3>Key Advantages</h3>
        <div className="chart-container">
          <Bar data={{
            labels: ['Performance', 'Learning Curve', 'Documentation', 'Community', 'Flexibility'],
            datasets: [{
              label: 'Rating (out of 10)',
              data: [9, 9, 8, 7, 8],
              backgroundColor: [
                'rgba(100, 200, 255, 0.8)',
                'rgba(150, 100, 255, 0.8)',
                'rgba(255, 150, 100, 0.8)',
                'rgba(100, 255, 150, 0.8)',
                'rgba(255, 200, 100, 0.8)',
              ],
            }],
          }} options={chartOptions} />
        </div>

        <h3>1. Rapid Development</h3>
        <p>CodeIgniter's built-in libraries and helpers accelerate development:</p>
        <pre><code>{`# Built-in libraries available
$this->load->library('email');
$this->load->library('session');
$this->load->library('form_validation');
$this->load->library('upload');

# Helpers for common tasks
helper('url');
helper('form');
helper('html');`}</code></pre>

        <h3>2. MVC Architecture</h3>
        <p>The Model-View-Controller pattern keeps code organized:</p>
        <table>
          <thead>
            <tr>
              <th>Component</th>
              <th>Responsibility</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Model</td>
              <td>Database interactions and business logic</td>
            </tr>
            <tr>
              <td>View</td>
              <td>Presentation layer (HTML, templates)</td>
            </tr>
            <tr>
              <td>Controller</td>
              <td>Handles requests and coordinates Model/View</td>
            </tr>
          </tbody>
        </table>

        <h3>3. Built-in Security Features</h3>
        <pre><code>{`# XSS Filtering
$data = $this->input->post('user_input', TRUE); // Auto-filtered

# CSRF Protection
# Enable in app/Config/Security.php
public $csrfProtection = 'session';

# SQL Injection Prevention
$query = $this->db->query(
    "SELECT * FROM users WHERE id = ?", 
    [$user_id]
);

# Password Hashing
$hashed = password_hash($password, PASSWORD_DEFAULT);`}</code></pre>

        <h3>4. Excellent Documentation</h3>
        <ul>
          <li>Comprehensive user guide with examples</li>
          <li>API reference for all classes and methods</li>
          <li>Step-by-step tutorials</li>
          <li>Active forum community</li>
        </ul>

        <h3>5. Performance Comparison</h3>
        <table>
          <thead>
            <tr>
              <th>Framework</th>
              <th>Requests/sec</th>
              <th>Memory Usage</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>CodeIgniter 4</td>
              <td>1,200</td>
              <td>2.5 MB</td>
            </tr>
            <tr>
              <td>Laravel</td>
              <td>850</td>
              <td>8.2 MB</td>
            </tr>
            <tr>
              <td>Symfony</td>
              <td>650</td>
              <td>12.1 MB</td>
            </tr>
          </tbody>
        </table>

        <h3>6. Easy Database Operations</h3>
        <pre><code>{`# Query Builder (simple and intuitive)
$this->db->select('*');
$this->db->from('users');
$this->db->where('status', 'active');
$query = $this->db->get();

# Active Record Pattern
$data = [
    'name' => 'John Doe',
    'email' => 'john@example.com'
];
$this->db->insert('users', $data);

# Update
$this->db->where('id', 1);
$this->db->update('users', $data);

# Delete
$this->db->where('id', 1);
$this->db->delete('users');`}</code></pre>

        <h3>7. Form Validation</h3>
        <pre><code>{`# Set validation rules
$rules = [
    'username' => 'required|min_length[3]|max_length[20]',
    'email' => 'required|valid_email',
    'password' => 'required|min_length[8]'
];

if (!$this->validate($rules)) {
    $data['validation'] = $this->validator;
    return view('register', $data);
}

# Validation passed, process form
$userData = $this->request->getPost();`}</code></pre>

        <h3>When to Use CodeIgniter</h3>
        <ul>
          <li>Building small to medium-sized web applications</li>
          <li>Learning PHP frameworks (excellent starting point)</li>
          <li>Projects requiring fast performance</li>
          <li>Applications with simple to moderate complexity</li>
          <li>When you need flexibility without heavy framework overhead</li>
        </ul>

        <h3>Conclusion</h3>
        <p>CodeIgniter offers the perfect balance of simplicity and power. Its lightweight nature, excellent documentation, and built-in features make it ideal for developers who want to build applications quickly without sacrificing performance or flexibility.</p>
      </>
    ),
    readTime: 11,
    date: 'October 20, 2023',
    year: '2023',
    tags: ['php'],
    category: 'web-development',
    pinned: false,
    featured: false,
  },
];