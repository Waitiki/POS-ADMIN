<template>
    <div class="landing-container" :class="{ 'dark-mode': isDarkMode }">
      <!-- Header Section -->
      <header class="header-section">
        <div class="header-content">
          <div class="header-left">
            <h1 class="page-title">Point of Sale Solutions</h1>
            <p class="page-subtitle">Empower your retail business with our advanced POS system</p>
          </div>
          <div class="header-actions">
            <button @click="toggleTheme" class="theme-toggle-btn" aria-label="Toggle theme">
              <svg v-if="isDarkMode" width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 3V5M12 19V21M5 12H3M21 12H19M17.657 17.657L16.243 16.243M17.657 6.343L16.243 7.757M6.343 17.657L7.757 16.243M6.343 6.343L7.757 7.757" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
              </svg>
              <svg v-else width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
              {{ isDarkMode ? 'Light Mode' : 'Dark Mode' }}
            </button>
            <button @click="goToLogin" class="dashboard-btn" aria-label="Login to dashboard">
              Login
            </button>
          </div>
        </div>
      </header>
  
      <!-- Main Content -->
      <main class="main-content">
        <section class="intro-section">
          <h2 class="section-title">Transform Your Retail Experience</h2>
          <p class="section-description">
            Our Point of Sale system streamlines sales, inventory, and customer management for retail businesses. 
            Download our server, client, or database resources to set up your POS environment efficiently.
          </p>
        </section>
  
        <section class="downloads-section">
          <h2 class="section-title">POS Resources</h2>
          <div class="downloads-grid">
            <div class="download-card">
              <div class="card-icon">
                <svg width="48" height="48" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M5 20H19V18H5V20ZM19 9H15V3H9V9H5L12 16L19 9Z" fill="currentColor"/>
                </svg>
              </div>
              <h3 class="card-title">POS Server App</h3>
              <p class="card-description">Backend application for processing transactions and managing POS data.</p>
              <button class="download-btn" @click="downloadResource('server')" :disabled="isDownloading" aria-label="Download POS Server App">
                <span v-if="isDownloading && downloadType === 'server'" class="loading-spinner-small"></span>
                {{ isDownloading && downloadType === 'server' ? 'Downloading...' : 'Download Server App' }}
              </button>
            </div>
  
            <div class="download-card">
              <div class="card-icon">
                <svg width="48" height="48" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 2C6.48 2 2 6.48 2 12S6.48 22 12 22 22 17.52 22 12 17.52 2 12 2ZM12 20C7.59 20 4 16.41 4 12S7.59 4 12 4 20 7.59 20 12 16.41 20 12 20ZM11 7H13V13H17V15H11V7Z" fill="currentColor"/>
                </svg>
              </div>
              <h3 class="card-title">POS Client App</h3>
              <p class="card-description">User-friendly interface for cashiers and sales management.</p>
              <button class="download-btn" @click="downloadResource('client')" :disabled="isDownloading" aria-label="Download POS Client App">
                <span v-if="isDownloading && downloadType === 'client'" class="loading-spinner-small"></span>
                {{ isDownloading && downloadType === 'client' ? 'Downloading...' : 'Download Client App' }}
              </button>
            </div>
  
            <div class="download-card">
              <div class="card-icon">
                <svg width="48" height="48" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M19 3H5C3.89543 3 3 3.89543 3 5V19C3 20.1046 3.89543 21 5 21H19C20.1046 21 21 20.1046 21 19V5C21 3.89543 20.1046 3 19 3ZM19 19H5V5H19V19Z" fill="currentColor"/>
                  <path d="M11 7H13V9H11V7ZM11 11H13V13H11V11ZM11 15H13V17H11V15Z" fill="currentColor"/>
                </svg>
              </div>
              <h3 class="card-title">MySQL Database</h3>
              <p class="card-description">Database schema for storing transactions and inventory data.</p>
              <button class="download-btn" @click="downloadResource('mysql')" :disabled="isDownloading" aria-label="Download MySQL Database Setup">
                <span v-if="isDownloading && downloadType === 'mysql'" class="loading-spinner-small"></span>
                {{ isDownloading && downloadType === 'mysql' ? 'Downloading...' : 'Download MySQL Setup' }}
              </button>
            </div>
          </div>
        </section>
  
        <section class="features-section">
          <h2 class="section-title">Why Choose Our POS System?</h2>
          <ul class="features-list">
            <li>Fast and secure transaction processing</li>
            <li>Real-time inventory tracking and management</li>
            <li>Customizable receipts and reporting tools</li>
            <li>Multi-user support for cashier and admin roles</li>
            <li>Seamless integration with payment gateways</li>
            <li>Responsive design for desktops and tablets</li>
            <li>Dark and light mode for user comfort</li>
          </ul>
        </section>
      </main>
  
      <!-- Footer -->
      <footer class="footer-section">
        <p>&copy; 2025 POS Solutions. All rights reserved.</p>
      </footer>
    </div>
  </template>
  
  <script>
  import { useRouter } from 'vue-router'
  import { useToast } from 'vue-toastification'
  
  export default {
    name: 'LandingPage',
    data() {
      return {
        isDarkMode: false,
        isDownloading: false,
        downloadType: '',
        router: useRouter(),
        toast: null
      }
    },
    methods: {
      toggleTheme() {
        this.isDarkMode = !this.isDarkMode
        localStorage.setItem('theme', this.isDarkMode ? 'dark' : 'light')
      },
      goToLogin() {
        this.router.push('/Login')
      },
      async downloadResource(type) {
        this.isDownloading = true
        this.downloadType = type
        try {
          // Simulate download process
          await new Promise(resolve => setTimeout(resolve, 2000))
          this.toast.success(`Starting download for ${type === 'server' ? 'POS Server App' : type === 'client' ? 'POS Client App' : 'MySQL Database'}...`)
          // In a real implementation, trigger actual file download here
          console.log(`Downloading ${type} resource...`)
        } catch (error) {
          this.toast.error(`Failed to download ${type} resource`)
        } finally {
          this.isDownloading = false
          this.downloadType = ''
        }
      }
    },
    mounted() {
      this.toast = useToast()
      const savedTheme = localStorage.getItem('theme')
      this.isDarkMode = savedTheme === 'dark'
    }
  }
  </script>
  
  <style scoped>
  .landing-container {
    min-height: 100vh;
    background: #f8fafc;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
    transition: background-color 0.3s ease;
  }
  
  .landing-container.dark-mode {
    background: #1a202c;
  }
  
  /* Header */
  .header-section {
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    padding: 60px 24px 40px;
    color: white;
  }
  
  .header-content {
    max-width: 1200px;
    margin: 0 auto;
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-wrap: wrap;
    gap: 20px;
  }
  
  .header-left {
    max-width: 600px;
  }
  
  .page-title {
    font-size: 36px;
    font-weight: 700;
    margin: 0;
  }
  
  .page-subtitle {
    font-size: 18px;
    margin: 8px 0 0;
    opacity: 0.9;
    line-height: 1.5;
  }
  
  .header-actions {
    display: flex;
    gap: 16px;
  }
  
  .theme-toggle-btn,
  .dashboard-btn {
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 12px 20px;
    border-radius: 12px;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.2s ease;
    color: white;
    border: none;
  }
  
  .theme-toggle-btn {
    background: rgba(255, 255, 255, 0.1);
    border: 1px solid rgba(255, 255, 255, 0.2);
  }
  
  .theme-toggle-btn:hover {
    background: rgba(255, 255, 255, 0.2);
  }
  
  .dashboard-btn {
    background: #5a67d8;
    border: 1px solid rgba(255, 255, 255, 0.3);
  }
  
  .dashboard-btn:hover {
    background: #4c51bf;
  }
  
  /* Main Content */
  .main-content {
    max-width: 1200px;
    margin: 0 auto;
    padding: 40px 24px;
  }
  
  /* Sections */
  .intro-section,
  .downloads-section,
  .features-section {
    margin-bottom: 60px;
  }
  
  .section-title {
    font-size: 28px;
    font-weight: 700;
    color: #1a202c;
    margin: 0 0 24px;
    text-align: center;
  }
  
  .dark-mode .section-title {
    color: #f7fafc;
  }
  
  .section-description {
    font-size: 18px;
    color: #4a5568;
    text-align: center;
    max-width: 800px;
    margin: 0 auto;
    line-height: 1.6;
  }
  
  .dark-mode .section-description {
    color: #a0aec0;
  }
  
  /* Downloads Grid */
  .downloads-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 24px;
  }
  
  .download-card {
    background: white;
    border-radius: 16px;
    padding: 32px;
    text-align: center;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    border: 1px solid #e2e8f0;
    transition: all 0.2s ease;
  }
  
  .dark-mode .download-card {
    background: #2d3748;
    border-color: #4a5568;
  }
  
  .download-card:hover {
    transform: translateY(-4px);
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.15);
  }
  
  .card-icon {
    color: #667eea;
    margin-bottom: 16px;
  }
  
  .card-title {
    font-size: 20px;
    font-weight: 700;
    color: #1a202c;
    margin: 0 0 8px;
  }
  
  .dark-mode .card-title {
    color: #f7fafc;
  }
  
  .card-description {
    font-size: 16px;
    color: #718096;
    margin: 0 0 20px;
    line-height: 1.5;
  }
  
  .dark-mode .card-description {
    color: #a0aec0;
  }
  
  .download-btn {
    background: #667eea;
    color: white;
    padding: 12px 24px;
    border-radius: 12px;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.2s ease;
    border: none;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
  }
  
  .download-btn:disabled {
    background: #a0aec0;
    cursor: not-allowed;
  }
  
  .download-btn:hover:not(:disabled) {
    background: #5a67d8;
    transform: translateY(-1px);
  }
  
  .loading-spinner-small {
    width: 1rem;
    height: 1rem;
    border: 2px solid rgba(255, 255, 255, 0.3);
    border-top: 2px solid white;
    border-radius: 50%;
    animation: spin 1s linear infinite;
  }
  
  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
  
  /* Features List */
  .features-list {
    list-style: none;
    padding: 0;
    max-width: 600px;
    margin: 0 auto;
    font-size: 18px;
    color: #4a5568;
  }
  
  .dark-mode .features-list {
    color: #a0aec0;
  }
  
  .features-list li {
    position: relative;
    padding-left: 28px;
    margin-bottom: 16px;
  }
  
  .features-list li::before {
    content: '✓';
    position: absolute;
    left: 0;
    color: #667eea;
    font-weight: bold;
  }
  
  /* Footer */
  .footer-section {
    background: #f8fafc;
    padding: 24px;
    text-align: center;
    font-size: 14px;
    color: #718096;
    border-top: 1px solid #e2e8f0;
  }
  
  .dark-mode .footer-section {
    background: #1a202c;
    color: #a0aec0;
    border-top-color: #4a5568;
  }
  
  /* Responsive Design */
  @media (max-width: 768px) {
    .header-content {
      flex-direction: column;
      text-align: center;
    }
  
    .header-left {
      max-width: 100%;
    }
  
    .header-actions {
      justify-content: center;
      margin-top: 20px;
    }
  
    .page-title {
      font-size: 32px;
    }
  
    .section-title {
      font-size: 24px;
    }
  
    .downloads-grid {
      grid-template-columns: 1fr;
    }
  }
  
  @media (max-width: 480px) {
    .header-section {
      padding: 40px 16px 30px;
    }
  
    .main-content {
      padding: 30px 16px;
    }
  
    .download-card {
      padding: 24px;
    }
  
    .page-title {
      font-size: 28px;
    }
  
    .section-title {
      font-size: 22px;
    }
  }
  </style>