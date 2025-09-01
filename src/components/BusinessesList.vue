 <template>
  <div class="businesses-container">
    <!-- Header Section -->
    <div class="header-section">
      <div class="header-content">
        <div class="header-left">
          <h1 class="page-title">Businesses</h1>
          <p class="page-subtitle">Manage and monitor your business portfolio</p>
        </div>
        <div class="header-actions">
          <button class="logout-btn" @click="router.push('/')">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M9 21H5C4.46957 21 3.96086 20.7893 3.58579 20.4142C3.21071 20.0391 3 19.5304 3 19V5C3 4.46957 3.21071 3.96086 3.58579 3.58579C3.96086 3.21071 4.46957 3 5 3H9" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              <path d="M16 17L21 12L16 7" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              <path d="M21 12H9" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
            Logout
          </button>
          <button @click="addBusiness" class="add-business-btn">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 5V19" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              <path d="M5 12H19" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
            Add Business
          </button>
        </div>
      </div>
    </div>

    <!-- Filters Section -->
    <div class="filters-section">
      <div class="search-bar">
        <div class="search-input-wrapper">
          <svg class="search-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="11" cy="11" r="8" stroke="currentColor" stroke-width="2"/>
            <path d="M21 21L16.65 16.65" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
          <input
            v-model="filters.search"
            type="text"
            placeholder="Search businesses..."
            class="search-input"
          />
        </div>
        <button
          @click="showFilters = !showFilters"
          class="filter-toggle-btn"
          :class="{ active: showFilters }"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M22 3H2L10 12.46V19L14 21V12.46L22 3Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
          Filters
        </button>
      </div>

      <!-- Advanced Filters -->
      <div v-if="showFilters" class="advanced-filters">
        <div class="filter-row">
          <div class="filter-group">
            <label class="filter-label">Status</label>
            <select v-model="filters.status" class="filter-select">
              <option value="">All Statuses</option>
              <option v-for="status in statuses" :key="status" :value="status">
                {{ status }}
              </option>
            </select>
          </div>

          <div class="filter-group">
            <label class="filter-label">Location</label>
            <select v-model="filters.location" class="filter-select">
              <option value="">All Locations</option>
              <option v-for="location in locations" :key="location" :value="location">
                {{ location }}
              </option>
            </select>
          </div>

          <div class="filter-group">
            <label class="filter-label">Sort By</label>
            <select v-model="filters.sortBy" class="filter-select">
              <option value="businessName">Name</option>
              <option value="owner">Owner</option>
              <option value="monthlyCharge">Monthly Charge</option>
              <option value="dueDate">Due Date</option>
              <option value="lastUpdated">Last Updated</option>
            </select>
          </div>

          <button @click="clearFilters" class="clear-filters-btn">
            Clear Filters
          </button>
        </div>
      </div>
    </div>

    <!-- Results Summary and View Toggle -->
    <div class="results-summary">
      <div class="results-header">
        <p class="results-text">
          Showing {{ filteredBusinesses.length }} of {{ businesses.length }} businesses
        </p>
        <div class="view-toggle">
          <button 
            @click="toggleViewMode" 
            class="view-toggle-btn"
            :class="{ active: viewMode === 'table' }"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M3 3H21V7H3V3Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              <path d="M3 10H21V14H3V10Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              <path d="M3 17H21V21H3V17Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
            Table
          </button>
          <button 
            @click="toggleViewMode" 
            class="view-toggle-btn"
            :class="{ active: viewMode === 'cards' }"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M3 3H10V10H3V3Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              <path d="M14 3H21V10H14V3Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              <path d="M3 14H10V21H3V14Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              <path d="M14 14H21V21H14V14Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
            Cards
          </button>
        </div>
      </div>
    </div>

    <!-- Loading State -->
    <div v-if="isLoading" class="loading-container">
      <div class="loading-spinner"></div>
      <p class="loading-text">Loading businesses...</p>
    </div>

    <!-- Businesses Content -->
    <div v-else-if="filteredBusinesses.length > 0" class="businesses-content">
      <!-- Table View -->
      <div v-if="viewMode === 'table'" class="businesses-table-container">
        <table class="businesses-table">
          <thead>
            <tr>
              <!-- <th>Business ID</th> -->
              <th>Business Name</th>
              <th>Owner</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Location</th>
               
              <th>Monthly Charge</th>
              <th>Due Date</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="business in filteredBusinesses" :key="business.businessID">
              <!-- <td>{{ business.businessID }}</td> -->
              <td>
                <div class="business-name-cell">
                  <strong>{{ business.businessName }}</strong>
                  <small>{{ business.slogan }}</small>
                </div>
              </td>
              <td>{{ business.owner }}</td>
              <td>{{ business.email }}</td>
              <td>{{ business.phoneNo }}</td>
              <td>{{ business.location }}</td>
               
              <td>{{ formatCurrency(business.monthlyCharge) }}</td>
              <td>{{ formatDate(business.dueDate) }}</td>
              <td>
                <span :class="['status-badge', getStatusColor(business.status)]">
                  {{ business.status }}
                </span>
              </td>
              <td>
                <div class="table-actions">
                  <button @click="previewBusiness(business)" class="action-btn view-btn">View</button>
                  <button class="action-btn edit-btn" @click="editBusiness(business)">Edit</button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- Cards View -->
      <div v-else class="businesses-grid">
        <div
          v-for="business in filteredBusinesses"
          :key="business.businessID"
          class="business-card"
        >
          <div class="business-header">
            <div class="business-logo">
              <img :src="`https://via.placeholder.com/60x60/667eea/ffffff?text=${business.businessName.charAt(0)}`" :alt="business.businessName" class="logo-image" />
            </div>
            <div class="business-info">
              <h3 class="business-name">{{ business.businessName }}</h3>
              <p class="business-owner">{{ business.owner }}</p>
              <p class="business-location">{{ business.location }}</p>
            </div>
            <div class="business-status">
              <span :class="['status-badge', getStatusColor(business.status)]">
                {{ business.status }}
              </span>
            </div>
          </div>

          <div class="business-details">
            <div class="detail-row">
              <span class="detail-label">Email:</span>
              <span class="detail-value">{{ business.email }}</span>
            </div>
            <div class="detail-row">
              <span class="detail-label">Phone:</span>
              <span class="detail-value">{{ business.phoneNo }}</span>
            </div>
            <div class="detail-row">
              <span class="detail-label">KRAPIN:</span>
              <span class="detail-value">{{ business.KRAPIN }}</span>
            </div>
            <div class="detail-row">
              <span class="detail-label">Business No:</span>
              <span class="detail-value">{{ business.businessNo }}</span>
            </div>
            <div class="detail-row">
              <span class="detail-label">Account No:</span>
              <span class="detail-value">{{ business.accountNo }}</span>
            </div>
            <div class="detail-row">
              <span class="detail-label">Default Pay Mode:</span>
              <span class="detail-value">{{ business.defaultPaymode }}</span>
            </div>
          </div>

          <div class="business-stats">
            <div class="stat-item">
              <span class="stat-label">Monthly Charge</span>
              <span class="stat-value">{{ formatCurrency(business.monthlyCharge) }}</span>
            </div>
            <div class="stat-item">
              <span class="stat-label">Due Date</span>
              <span class="stat-value">{{ formatDate(business.dueDate) }}</span>
            </div>
            <div class="stat-item">
              <span class="stat-label">Last Updated</span>
              <span class="stat-value">{{ formatDate(business.lastUpdated) }}</span>
            </div>
          </div>

          <div class="business-description">
            <p class="description-text">{{ business.description }}</p>
          </div>

          <div class="business-footer">
            <div class="business-actions">
              <button class="action-btn view-btn">View</button>
              <button class="action-btn edit-btn">Edit</button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Empty State -->
    <div v-else class="empty-state">
      <div class="empty-icon">
        <svg width="64" height="64" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M21 16V8C21 5.79086 19.2091 4 17 4H7C4.79086 4 3 5.79086 3 8V16C3 18.2091 4.79086 20 7 20H17C19.2091 20 21 18.2091 21 16Z" stroke="currentColor" stroke-width="2"/>
          <path d="M7 8H17" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
          <path d="M7 12H17" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
          <path d="M7 16H13" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
        </svg>
      </div>
      <h3 class="empty-title">No businesses found</h3>
      <p class="empty-description">
        Try adjusting your search or filters to find what you're looking for.
      </p>
      <button @click="clearFilters" class="empty-action-btn">
        Clear Filters
      </button>
    </div>
    <AddBusiness 
      v-if="showAddBusiness" 
      :business="selectedBusiness"
      @closeAddBusinessModal="addBusiness" 
    />

    <BstPreview
      :business="selectedBusiness"
      v-if="showPreview"
      @closeBusinessPreview="previewBusiness" 
    /> 

    
  </div>
</template>

<script>
import { useRouter } from 'vue-router'
import AddBusiness from './AddBusiness.vue'
import BstPreview from './BstPreview.vue'

export default {
  name: 'BusinessList',
  components: {
    AddBusiness,
    BstPreview
  },
  data() {
    return {
      selectedBusiness: [],
      showAddBusiness: false,
      showPreview: false,
      router: useRouter(),
      viewMode: 'table', // 'table' or 'cards'
      businesses: [
        {
          businessID: 'BUS001',
          businessName: 'Tech Solutions Inc.',
          owner: 'John Smith',
          email: 'john@techsolutions.com',
          address: '123 Tech Street, San Francisco, CA 94105',
          phoneNo: '+1 (555) 123-4567',
          location: 'San Francisco, CA',
          KRAPIN: 'A123456789B',
          description: 'Leading technology solutions provider specializing in software development and IT consulting.',
          slogan: 'Innovation at Your Fingertips',
          defaultPaymode: 'Credit Card',
          businessNo: 'BN001234',
          accountNo: 'ACC001234567',
          dueDate: '2024-02-15',
          monthlyCharge: 2500,
          status: 'Active',
          lastUpdated: '2024-01-15'
        },
        {
          businessID: 'BUS002',
          businessName: 'Green Energy Co.',
          owner: 'Sarah Johnson',
          email: 'sarah@greenenergy.com',
          address: '456 Green Avenue, Austin, TX 78701',
          phoneNo: '+1 (555) 987-6543',
          location: 'Austin, TX',
          KRAPIN: 'B987654321C',
          description: 'Renewable energy solutions for sustainable business operations.',
          slogan: 'Powering the Future, Sustainably',
          defaultPaymode: 'Bank Transfer',
          businessNo: 'BN002345',
          accountNo: 'ACC002345678',
          dueDate: '2024-02-20',
          monthlyCharge: 1800,
          status: 'Active',
          lastUpdated: '2024-01-14'
        },
        {
          businessID: 'BUS003',
          businessName: 'Creative Design Studio',
          owner: 'Mike Chen',
          email: 'mike@creativedesign.com',
          address: '789 Design Blvd, New York, NY 10001',
          phoneNo: '+1 (555) 456-7890',
          location: 'New York, NY',
          KRAPIN: 'C456789123D',
          description: 'Creative design and marketing services for modern businesses.',
          slogan: 'Design That Speaks',
          defaultPaymode: 'PayPal',
          businessNo: 'BN003456',
          accountNo: 'ACC003456789',
          dueDate: '2024-02-10',
          monthlyCharge: 1200,
          status: 'Active',
          lastUpdated: '2024-01-13'
        },
        {
          businessID: 'BUS004',
          businessName: 'Global Logistics Ltd.',
          owner: 'Emily Davis',
          email: 'emily@globallogistics.com',
          address: '321 Logistics Way, Chicago, IL 60601',
          phoneNo: '+1 (555) 789-0123',
          location: 'Chicago, IL',
          KRAPIN: 'D789123456E',
          description: 'International logistics and supply chain management services.',
          slogan: 'Connecting the World',
          defaultPaymode: 'Wire Transfer',
          businessNo: 'BN004567',
          accountNo: 'ACC004567890',
          dueDate: '2024-02-25',
          monthlyCharge: 4200,
          status: 'Inactive',
          lastUpdated: '2024-01-12'
        },
        {
          businessID: 'BUS005',
          businessName: 'HealthCare Plus',
          owner: 'Dr. Robert Wilson',
          email: 'robert@healthcareplus.com',
          address: '654 Health Street, Boston, MA 02101',
          phoneNo: '+1 (555) 321-6540',
          location: 'Boston, MA',
          KRAPIN: 'E321654987F',
          description: 'Comprehensive healthcare solutions and medical equipment.',
          slogan: 'Your Health, Our Priority',
          defaultPaymode: 'Credit Card',
          businessNo: 'BN005678',
          accountNo: 'ACC005678901',
          dueDate: '2024-02-18',
          monthlyCharge: 3100,
          status: 'Active',
          lastUpdated: '2024-01-11'
        }
      ],
      filters: {
        search: '',
        status: '',
        location: '',
        sortBy: 'businessName'
      },
      isLoading: false,
      showFilters: false
    }
  },

  computed: {
    locations() {
      const unique = [...new Set(this.businesses.map(b => b.location))]
      return unique.sort()
    },

    statuses() {
      return ['Active', 'Inactive', 'Pending']
    },

    filteredBusinesses() {
      let filtered = this.businesses

      // Search filter
      if (this.filters.search) {
        const searchLower = this.filters.search.toLowerCase()
        filtered = filtered.filter(business => 
          business.businessName.toLowerCase().includes(searchLower) ||
          business.owner.toLowerCase().includes(searchLower) ||
          business.email.toLowerCase().includes(searchLower) ||
          business.businessID.toLowerCase().includes(searchLower)
        )
      }

      // Status filter
      if (this.filters.status) {
        filtered = filtered.filter(business => business.status === this.filters.status)
      }

      // Location filter
      if (this.filters.location) {
        filtered = filtered.filter(business => business.location === this.filters.location)
      }

      // Sort
      filtered.sort((a, b) => {
        switch (this.filters.sortBy) {
          case 'businessName':
            return a.businessName.localeCompare(b.businessName)
          case 'owner':
            return a.owner.localeCompare(b.owner)
          case 'monthlyCharge':
            return b.monthlyCharge - a.monthlyCharge
          case 'dueDate':
            return new Date(a.dueDate) - new Date(b.dueDate)
          case 'lastUpdated':
            return new Date(b.lastUpdated) - new Date(a.lastUpdated)
          default:
            return 0
        }
      })

      return filtered
    }
  },

  methods: {
    previewBusiness(business) {
      this.showPreview = !this.showPreview;
      
      this.selectedBusiness = business;
      if(!this.showPreview) {
        this.selectedBusiness = [];
      }
    },
    editBusiness(business) {
      this.showAddBusiness = !this.showAddBusiness;
      
      this.selectedBusiness = business;
    },
    addBusiness() {
      this.showAddBusiness = !this.showAddBusiness;

      if(!this.showAddBusiness) {
        this.selectedBusiness = [];
      }
    },

    clearFilters() {
      this.filters.search = ''
      this.filters.status = ''
      this.filters.location = ''
      this.filters.sortBy = 'businessName'
    },

    getStatusColor(status) {
      switch (status) {
        case 'Active':
          return 'bg-green-100 text-green-800'
        case 'Inactive':
          return 'bg-red-100 text-red-800'
        case 'Pending':
          return 'bg-yellow-100 text-yellow-800'
        default:
          return 'bg-gray-100 text-gray-800'
      }
    },

    formatDate(dateString) {
      return new Date(dateString).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
      })
    },

    formatCurrency(amount) {
      return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'KSH',
        minimumFractionDigits: 0
      }).format(amount)
    },

    toggleViewMode() {
      this.viewMode = this.viewMode === 'table' ? 'cards' : 'table'
    }
  },

  mounted() {
    // Simulate loading
    this.isLoading = true
    setTimeout(() => {
      this.isLoading = false
    }, 1000)
  }
}
</script>

<style scoped>
.businesses-container {
  min-height: 100vh;
  background: #f8fafc;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
}

/* Header Section */
.header-section {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  padding: 32px 24px;
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

.page-title {
  font-size: 32px;
  font-weight: 700;
  margin: 0;
  letter-spacing: -0.025em;
}

.page-subtitle {
  font-size: 16px;
  margin: 8px 0 0 0;
  opacity: 0.9;
}

.header-actions {
  display: flex;
  gap: 12px;
  align-items: center;
}

.logout-btn {
  display: flex;
  align-items: center;
  gap: 8px;
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
  color: white;
  padding: 10px 16px;
  border-radius: 10px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
  backdrop-filter: blur(10px);
}

.logout-btn:hover {
  background: rgba(255, 255, 255, 0.2);
  transform: translateY(-1px);
}

.add-business-btn {
  display: flex;
  align-items: center;
  gap: 8px;
  background: rgba(255, 255, 255, 0.2);
  border: 1px solid rgba(255, 255, 255, 0.3);
  color: white;
  padding: 12px 20px;
  border-radius: 12px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
  backdrop-filter: blur(10px);
}

.add-business-btn:hover {
  background: rgba(255, 255, 255, 0.3);
  transform: translateY(-1px);
}

/* Filters Section */
.filters-section {
  background: white;
  border-bottom: 1px solid #e2e8f0;
  padding: 24px;
}

.search-bar {
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  gap: 16px;
  align-items: center;
}

.search-input-wrapper {
  position: relative;
  flex: 1;
  max-width: 400px;
}

.search-icon {
  position: absolute;
  left: 16px;
  top: 50%;
  transform: translateY(-50%);
  color: #a0aec0;
}

.search-input {
  width: 100%;
  padding: 12px 16px 12px 48px;
  border: 2px solid #e2e8f0;
  border-radius: 12px;
  font-size: 16px;
  transition: all 0.2s ease;
  outline: none;
}

.search-input:focus {
  border-color: #667eea;
  box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
}

.filter-toggle-btn {
  display: flex;
  align-items: center;
  gap: 8px;
  background: white;
  border: 2px solid #e2e8f0;
  color: #4a5568;
  padding: 12px 16px;
  border-radius: 12px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
}

.filter-toggle-btn:hover,
.filter-toggle-btn.active {
  border-color: #667eea;
  color: #667eea;
}

.advanced-filters {
  max-width: 1200px;
  margin: 20px auto 0;
  padding-top: 20px;
  border-top: 1px solid #e2e8f0;
}

.filter-row {
  display: flex;
  gap: 20px;
  align-items: end;
  flex-wrap: wrap;
}

.filter-group {
  display: flex;
  flex-direction: column;
  gap: 8px;
  min-width: 150px;
}

.filter-label {
  font-size: 14px;
  font-weight: 600;
  color: #4a5568;
}

.filter-select {
  padding: 10px 12px;
  border: 2px solid #e2e8f0;
  border-radius: 8px;
  font-size: 14px;
  background: white;
  transition: all 0.2s ease;
  outline: none;
}

.filter-select:focus {
  border-color: #667eea;
}

.clear-filters-btn {
  background: #f7fafc;
  border: 2px solid #e2e8f0;
  color: #4a5568;
  padding: 10px 16px;
  border-radius: 8px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
}

.clear-filters-btn:hover {
  background: #edf2f7;
  border-color: #cbd5e0;
}

/* Results Summary */
.results-summary {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px 24px;
}

.results-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 16px;
}

.results-text {
  color: #718096;
  font-size: 14px;
  margin: 0;
}

.view-toggle {
  display: flex;
  gap: 8px;
  background: #f7fafc;
  border: 1px solid #e2e8f0;
  border-radius: 12px;
  padding: 4px;
}

.view-toggle-btn {
  display: flex;
  align-items: center;
  gap: 8px;
  background: transparent;
  border: none;
  color: #718096;
  padding: 8px 16px;
  border-radius: 8px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
}

.view-toggle-btn.active {
  background: white;
  color: #667eea;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.view-toggle-btn:hover:not(.active) {
  color: #4a5568;
}

/* Loading State */
.loading-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 80px 24px;
}

.loading-spinner {
  width: 40px;
  height: 40px;
  border: 3px solid #e2e8f0;
  border-top: 3px solid #667eea;
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

.loading-text {
  margin-top: 16px;
  color: #718096;
  font-size: 16px;
}

/* Businesses Content */
.businesses-content {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 24px 40px;
}

/* Table View */
.businesses-table-container {
  background: white;
  border-radius: 16px;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
  border: 1px solid #e2e8f0;
  overflow: hidden;
}

.businesses-table {
  width: 100%;
  border-collapse: collapse;
  font-size: 14px;
}

.businesses-table th {
  background: #f8fafc;
  padding: 16px 12px;
  text-align: left;
  font-weight: 600;
  color: #4a5568;
  border-bottom: 1px solid #e2e8f0;
  white-space: nowrap;
}

.businesses-table td {
  padding: 16px 12px;
  border-bottom: 1px solid #f1f5f9;
  vertical-align: middle;
}

.businesses-table tbody tr:hover {
  background: #f8fafc;
}

.business-name-cell {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.business-name-cell strong {
  color: #1a202c;
  font-weight: 600;
}

.business-name-cell small {
  color: #718096;
  font-size: 12px;
}

.table-actions {
  display: flex;
  gap: 8px;
}

/* Cards View */
.businesses-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(400px, 1fr));
  gap: 24px;
}

.business-card {
  background: white;
  border-radius: 16px;
  padding: 24px;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
  border: 1px solid #e2e8f0;
  transition: all 0.2s ease;
}

.business-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.1);
}

.business-header {
  display: flex;
  align-items: flex-start;
  gap: 16px;
  margin-bottom: 20px;
}

.business-logo {
  flex-shrink: 0;
}

.logo-image {
  width: 60px;
  height: 60px;
  border-radius: 12px;
  object-fit: cover;
}

.business-info {
  flex: 1;
  min-width: 0;
}

.business-name {
  font-size: 18px;
  font-weight: 700;
  color: #1a202c;
  margin: 0 0 4px 0;
  line-height: 1.3;
}

.business-owner {
  font-size: 14px;
  color: #667eea;
  font-weight: 600;
  margin: 0 0 4px 0;
}

.business-location {
  font-size: 14px;
  color: #718096;
  margin: 0;
}

.business-status {
  flex-shrink: 0;
}

.status-badge {
  display: inline-block;
  padding: 4px 12px;
  border-radius: 20px;
  font-size: 12px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.025em;
}

.business-details {
  margin: 20px 0;
  padding: 16px 0;
  border-top: 1px solid #f1f5f9;
  border-bottom: 1px solid #f1f5f9;
}

.detail-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 8px 0;
  font-size: 14px;
}

.detail-row:not(:last-child) {
  border-bottom: 1px solid #f8fafc;
}

.detail-label {
  font-weight: 600;
  color: #4a5568;
  min-width: 120px;
}

.detail-value {
  color: #1a202c;
  text-align: right;
  word-break: break-word;
}

.business-description {
  margin: 16px 0;
  padding: 16px;
  background: #f8fafc;
  border-radius: 8px;
}

.description-text {
  font-size: 14px;
  color: #4a5568;
  line-height: 1.5;
  margin: 0;
}

.business-stats {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 16px;
  margin-bottom: 20px;
  padding: 16px 0;
  border-top: 1px solid #f1f5f9;
}

.stat-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
}

.stat-label {
  font-size: 12px;
  color: #718096;
  font-weight: 500;
  margin-bottom: 4px;
  text-transform: uppercase;
  letter-spacing: 0.025em;
}

.stat-value {
  font-size: 16px;
  font-weight: 700;
  color: #1a202c;
}

.rating-stars {
  display: inline-flex;
  gap: 2px;
  margin-right: 4px;
}

.star {
  color: #e2e8f0;
  font-size: 14px;
}

.star.filled {
  color: #fbbf24;
}

.business-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.last-updated {
  font-size: 12px;
  color: #a0aec0;
}

.business-actions {
  display: flex;
  gap: 8px;
}

.action-btn {
  padding: 8px 16px;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
  border: none;
}

.view-btn {
  background: #f7fafc;
  color: #4a5568;
  border: 1px solid #e2e8f0;
}

.view-btn:hover {
  background: #edf2f7;
}

.edit-btn {
  background: #667eea;
  color: white;
}

.edit-btn:hover {
  background: #5a67d8;
}

/* Empty State */
.empty-state {
  max-width: 400px;
  margin: 80px auto;
  text-align: center;
  padding: 0 24px;
}

.empty-icon {
  color: #cbd5e0;
  margin-bottom: 24px;
}

.empty-title {
  font-size: 24px;
  font-weight: 700;
  color: #1a202c;
  margin: 0 0 12px 0;
}

.empty-description {
  font-size: 16px;
  color: #718096;
  margin: 0 0 24px 0;
  line-height: 1.5;
}

.empty-action-btn {
  background: #667eea;
  color: white;
  border: none;
  padding: 12px 24px;
  border-radius: 12px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
}

.empty-action-btn:hover {
  background: #5a67d8;
  transform: translateY(-1px);
}

/* Responsive Design */
@media (max-width: 768px) {
  .header-content {
    flex-direction: column;
    align-items: flex-start;
  }

  .page-title {
    font-size: 28px;
  }

  .search-bar {
    flex-direction: column;
    align-items: stretch;
  }

  .search-input-wrapper {
    max-width: none;
  }

  .filter-row {
    flex-direction: column;
    align-items: stretch;
  }

  .filter-group {
    min-width: auto;
  }

  .results-header {
    flex-direction: column;
    align-items: stretch;
    gap: 12px;
  }

  .view-toggle {
    align-self: flex-start;
  }

  .businesses-table-container {
    overflow-x: auto;
  }

  .businesses-table {
    min-width: 800px;
  }

  .businesses-grid {
    grid-template-columns: 1fr;
    padding: 0 16px 40px;
  }

  .business-stats {
    grid-template-columns: 1fr;
    gap: 12px;
  }

  .business-footer {
    flex-direction: column;
    gap: 12px;
    align-items: stretch;
  }

  .business-actions {
    justify-content: center;
  }

  .detail-row {
    flex-direction: column;
    align-items: flex-start;
    gap: 4px;
  }

  .detail-value {
    text-align: left;
  }
}

@media (max-width: 480px) {
  .header-section {
    padding: 24px 16px;
  }

  .filters-section {
    padding: 16px;
  }

  .business-card {
    padding: 20px;
  }

  .business-header {
    flex-direction: column;
    align-items: center;
    text-align: center;
  }

  .business-status {
    align-self: stretch;
    text-align: center;
  }
}

/* Dark mode support */
/* @media (prefers-color-scheme: dark) {
  .businesses-container {
    background: #1a202c;
  }

  .filters-section {
    background: #2d3748;
    border-bottom-color: #4a5568;
  }

  .search-input,
  .filter-select {
    background: #4a5568;
    border-color: #718096;
    color: #f7fafc;
  }

  .search-input:focus,
  .filter-select:focus {
    border-color: #667eea;
  }

  .view-toggle {
    background: #4a5568;
    border-color: #718096;
  }

  .view-toggle-btn.active {
    background: #2d3748;
    color: #667eea;
  }

  .businesses-table-container {
    background: #2d3748;
    border-color: #4a5568;
  }

  .businesses-table th {
    background: #4a5568;
    color: #f7fafc;
    border-bottom-color: #718096;
  }

  .businesses-table td {
    border-bottom-color: #4a5568;
  }

  .businesses-table tbody tr:hover {
    background: #4a5568;
  }

  .business-name-cell strong {
    color: #f7fafc;
  }

  .business-card {
    background: #2d3748;
    border-color: #4a5568;
  }

  .business-name {
    color: #f7fafc;
  }

  .stat-value {
    color: #f7fafc;
  }

  .business-stats {
    border-color: #4a5568;
  }

  .business-details {
    border-color: #4a5568;
  }

  .detail-row {
    border-bottom-color: #4a5568;
  }

  .detail-label {
    color: #e2e8f0;
  }

  .detail-value {
    color: #f7fafc;
  }

  .business-description {
    background: #4a5568;
  }

  .description-text {
    color: #e2e8f0;
  }

  .view-btn {
    background: #4a5568;
    color: #f7fafc;
    border-color: #718096;
  }

  .view-btn:hover {
    background: #718096;
  }
} */
</style>
