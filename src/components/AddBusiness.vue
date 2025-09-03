<template>
  <div class="modal-overlay" :class="{ 'dark-mode': isDarkMode }" @click.self="handleCancel" role="dialog" aria-labelledby="modal-title" aria-modal="true">
    <div class="modal-container">
      <button 
        class="close-btn" 
        @click="handleCancel" 
        aria-label="Close business form modal"
        title="Close"
      >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M18 6L6 18" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          <path d="M6 6L18 18" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
      </button>

      <!-- Header Section -->
      <div class="header-section">
        <div class="header-content">
          <h1 class="page-title" id="modal-title">{{ pageTitle }}</h1>
          <p class="page-subtitle">
            {{ isEditMode ? 'Update your business information with care' : 'Add a new business to your portfolio with ease' }}
          </p>
        </div>
      </div>

      <!-- Loading State -->
      <div v-if="isLoading" class="loading-container" role="status" aria-live="polite">
        <div class="loading-spinner"></div>
        <p class="loading-text">Loading business data...</p>
      </div>

      <!-- Form Section -->
      <div v-else class="form-section">
        <form @submit.prevent="handleSubmit" class="business-form" novalidate>
          <!-- Business ID Display -->
          <div v-if="isEditMode" class="business-id-display">
            <label class="form-label">Business ID</label>
            <div class="business-id-value">{{ form.businessID || route.params.id }}</div>
            <p class="help-text">Unique identifier for this business (non-editable)</p>
          </div>

          <!-- Basic Information -->
          <section class="form-section-group" aria-labelledby="basic-info">
            <h2 class="section-title" id="basic-info">Basic Information</h2>
            <div class="form-row">
              <div class="form-group">
                <label class="form-label" for="businessName">
                  Business Name <span class="required" aria-hidden="true">*</span>
                  <span class="sr-only">Required</span>
                  <span class="tooltip" title="Enter the official registered name of your business">ⓘ</span>
                </label>
                <input
                  id="businessName"
                  v-model.trim="form.businessName"
                  type="text"
                  class="form-input"
                  :class="{ 'error': errors.businessName }"
                  placeholder="Enter business name"
                  required
                  aria-describedby="businessName-error"
                />
                <span v-if="errors.businessName" class="error-message" id="businessName-error">{{ errors.businessName }}</span>
              </div>

              <div class="form-group">
                <label class="form-label" for="owner">
                  Owner <span class="required" aria-hidden="true">*</span>
                  <span class="sr-only">Required</span>
                </label>
                <input
                  id="owner"
                  v-model.trim="form.owner"
                  type="text"
                  class="form-input"
                  :class="{ 'error': errors.owner }"
                  placeholder="Enter owner name"
                  required
                  aria-describedby="owner-error"
                />
                <span v-if="errors.owner" class="error-message" id="owner-error">{{ errors.owner }}</span>
              </div>
            </div>

            <div class="form-row">
              <div class="form-group">
                <label class="form-label" for="slogan">
                  Slogan <span class="required" aria-hidden="true">*</span>
                  <span class="sr-only">Required</span>
                </label>
                <input
                  id="slogan"
                  v-model.trim="form.slogan"
                  type="text"
                  class="form-input"
                  :class="{ 'error': errors.slogan }"
                  placeholder="Enter business slogan"
                  required
                  aria-describedby="slogan-error"
                />
                <span v-if="errors.slogan" class="error-message" id="slogan-error">{{ errors.slogan }}</span>
              </div>

              <div class="form-group">
                <label class="form-label" for="status">
                  Status <span class="required" aria-hidden="true">*</span>
                  <span class="sr-only">Required</span>
                </label>
                <select
                  id="status"
                  v-model="form.status"
                  class="form-select"
                  required
                  aria-describedby="status-error"
                >
                  <option v-for="status in statusOptions" :key="status" :value="status">
                    {{ status }}
                  </option>
                </select>
              </div>
            </div>

            <div class="form-group full-width">
              <label class="form-label" for="description">
                Description <span class="required" aria-hidden="true">*</span>
                <span class="sr-only">Required</span>
                <span class="tooltip" title="Provide a detailed description of your business (min 20 characters)">ⓘ</span>
              </label>
              <textarea
                id="description"
                v-model.trim="form.description"
                class="form-textarea"
                :class="{ 'error': errors.description }"
                placeholder="Describe your business"
                rows="5"
                required
                aria-describedby="description-error"
              ></textarea>
              <span v-if="errors.description" class="error-message" id="description-error">{{ errors.description }}</span>
            </div>
          </section>

          <!-- Contact Information -->
          <section class="form-section-group" aria-labelledby="contact-info">
            <h2 class="section-title" id="contact-info">Contact Information</h2>
            <div class="form-row">
              <div class="form-group">
                <label class="form-label" for="email">
                  Email <span class="required" aria-hidden="true">*</span>
                  <span class="sr-only">Required</span>
                </label>
                <input
                  id="email"
                  v-model.trim="form.email"
                  type="email"
                  class="form-input"
                  :class="{ 'error': errors.email }"
                  placeholder="Enter email address"
                  required
                  aria-describedby="email-error"
                />
                <span v-if="errors.email" class="error-message" id="email-error">{{ errors.email }}</span>
              </div>

              <div class="form-group">
                <label class="form-label" for="phoneNo">
                  Phone Number <span class="required" aria-hidden="true">*</span>
                  <span class="sr-only">Required</span>
                  <span class="tooltip" title="Enter a valid phone number (e.g., +254123456789)">ⓘ</span>
                </label>
                <input
                  id="phoneNo"
                  v-model.trim="form.phoneNo"
                  type="tel"
                  class="form-input"
                  :class="{ 'error': errors.phoneNo }"
                  placeholder="e.g., +254123456789"
                  required
                  aria-describedby="phoneNo-error"
                />
                <span v-if="errors.phoneNo" class="error-message" id="phoneNo-error">{{ errors.phoneNo }}</span>
              </div>
            </div>

            <div class="form-group full-width">
              <label class="form-label" for="address">
                Address <span class="required" aria-hidden="true">*</span>
                <span class="sr-only">Required</span>
              </label>
              <input
                id="address"
                v-model.trim="form.address"
                type="text"
                class="form-input"
                :class="{ 'error': errors.address }"
                placeholder="Enter full address"
                required
                aria-describedby="address-error"
              />
              <span v-if="errors.address" class="error-message" id="address-error">{{ errors.address }}</span>
            </div>

            <div class="form-group">
              <label class="form-label" for="location">
                Location <span class="required" aria-hidden="true">*</span>
                <span class="sr-only">Required</span>
              </label>
              <input
                id="location"
                v-model.trim="form.location"
                type="text"
                class="form-input"
                :class="{ 'error': errors.location }"
                placeholder="Enter city, country"
                required
                aria-describedby="location-error"
              />
              <span v-if="errors.location" class="error-message" id="location-error">{{ errors.location }}</span>
            </div>
          </section>

          <!-- Business Details -->
          <section class="form-section-group" aria-labelledby="business-details">
            <h2 class="section-title" id="business-details">Business Details</h2>
            <div class="form-row">
              <div class="form-group">
                <label class="form-label" for="KRAPIN">
                  KRAPIN <span class="required" aria-hidden="true">*</span>
                  <span class="sr-only">Required</span>
                  <span class="tooltip" title="Enter a valid KRAPIN (format: A123456789B)">ⓘ</span>
                </label>
                <input
                  id="KRAPIN"
                  v-model.trim="form.KRAPIN"
                  type="text"
                  class="form-input"
                  :class="{ 'error': errors.KRAPIN }"
                  placeholder="e.g., A123456789B"
                  maxlength="11"
                  required
                  aria-describedby="KRAPIN-error"
                  @input="form.KRAPIN = form.KRAPIN.toUpperCase()"
                />
                <span v-if="errors.KRAPIN" class="error-message" id="KRAPIN-error">{{ errors.KRAPIN }}</span>
              </div>

              <div class="form-group">
                <label class="form-label" for="businessNo">
                  Business Number <span class="required" aria-hidden="true">*</span>
                  <span class="sr-only">Required</span>
                </label>
                <input
                  id="businessNo"
                  v-model.trim="form.businessNo"
                  type="text"
                  class="form-input"
                  :class="{ 'error': errors.businessNo }"
                  placeholder="Enter business number"
                  required
                  aria-describedby="businessNo-error"
                />
                <span v-if="errors.businessNo" class="error-message" id="businessNo-error">{{ errors.businessNo }}</span>
              </div>
            </div>

            <div class="form-group">
              <label class="form-label" for="accountNo">
                Account Number <span class="required" aria-hidden="true">*</span>
                <span class="sr-only">Required</span>
              </label>
              <input
                id="accountNo"
                v-model.trim="form.accountNo"
                type="text"
                class="form-input"
                :class="{ 'error': errors.accountNo }"
                placeholder="Enter account number"
                required
                aria-describedby="accountNo-error"
              />
              <span v-if="errors.accountNo" class="error-message" id="accountNo-error">{{ errors.accountNo }}</span>
            </div>
          </section>

          <!-- Financial Information -->
          <section class="form-section-group" aria-labelledby="financial-info">
            <h2 class="section-title" id="financial-info">Financial Information</h2>
            <div class="form-row">
              <div class="form-group">
                <label class="form-label" for="monthlyCharge">
                  Monthly Charge (KSH) <span class="required" aria-hidden="true">*</span>
                  <span class="sr-only">Required</span>
                </label>
                <input
                  id="monthlyCharge"
                  v-model.number="form.monthlyCharge"
                  type="number"
                  class="form-input"
                  :class="{ 'error': errors.monthlyCharge }"
                  placeholder="Enter monthly charge"
                  min="0"
                  step="0.01"
                  required
                  aria-describedby="monthlyCharge-error"
                />
                <span v-if="errors.monthlyCharge" class="error-message" id="monthlyCharge-error">{{ errors.monthlyCharge }}</span>
              </div>

              <div class="form-group">
                <label class="form-label" for="dueDate">
                  Due Date <span class="required" aria-hidden="true">*</span>
                  <span class="sr-only">Required</span>
                </label>
                <input
                  id="dueDate"
                  v-model="form.dueDate"
                  type="date"
                  class="form-input"
                  :class="{ 'error': errors.dueDate }"
                  required
                  aria-describedby="dueDate-error"
                  :min="new Date().toISOString().split('T')[0]"
                />
                <span v-if="errors.dueDate" class="error-message" id="dueDate-error">{{ errors.dueDate }}</span>
              </div>
            </div>

            <div class="form-group">
              <label class="form-label" for="defaultPaymode">
                Default Payment Mode <span class="required" aria-hidden="true">*</span>
                <span class="sr-only">Required</span>
              </label>
              <select
                id="defaultPaymode"
                v-model="form.defaultPaymode"
                class="form-select"
                :class="{ 'error': errors.defaultPaymode }"
                required
                aria-describedby="defaultPaymode-error"
              >
                <option value="" disabled>Select payment mode</option>
                <option v-for="mode in paymentModes" :key="mode" :value="mode">
                  {{ mode }}
                </option>
              </select>
              <span v-if="errors.defaultPaymode" class="error-message" id="defaultPaymode-error">{{ errors.defaultPaymode }}</span>
            </div>
          </section>

          <!-- Form Actions -->
          <div class="form-actions">
            <button 
              type="button" 
              @click="handleCancel" 
              class="btn btn-secondary"
              aria-label="Cancel and close form"
            >
              Cancel
            </button>
            <button 
              type="button" 
              @click="handleReset" 
              class="btn btn-outline"
              aria-label="Reset form fields"
            >
              Reset
            </button>
            <button 
              type="submit" 
              :disabled="isSubmitting" 
              class="btn btn-primary"
              aria-label="Submit business form"
            >
              <span v-if="isSubmitting" class="loading-spinner-small"></span>
              {{ submitButtonText }}
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import { useToast } from 'vue-toastification'

export default {
  name: 'BusinessForm',

  props: {
    business: {
      type: Object,
      default: null
    },
    isDarkMode: {
      type: Boolean,
      default: false
    }
  },

  data() {
    return {
      isEditMode: false,
      isLoading: false,
      isSubmitting: false,
      form: {
        businessName: '',
        owner: '',
        email: '',
        address: '',
        phoneNo: '',
        location: '',
        KRAPIN: '',
        description: '',
        slogan: '',
        defaultPaymode: '',
        businessNo: '',
        accountNo: '',
        dueDate: '',
        monthlyCharge: '',
        status: 'Active'
      },
      errors: {
        businessName: '',
        owner: '',
        email: '',
        address: '',
        phoneNo: '',
        location: '',
        KRAPIN: '',
        description: '',
        slogan: '',
        defaultPaymode: '',
        businessNo: '',
        accountNo: '',
        dueDate: '',
        monthlyCharge: ''
      },
      paymentModes: ['Credit Card', 'Bank Transfer', 'PayPal', 'Wire Transfer', 'Mobile Money', 'Cash'],
      statusOptions: ['Active', 'Inactive', 'Pending']
    }
  },

  computed: {
    pageTitle() {
      return this.isEditMode ? 'Edit Business' : 'Add New Business'
    },
    submitButtonText() {
      if (this.isSubmitting) {
        return this.isEditMode ? 'Updating...' : 'Adding...'
      }
      return this.isEditMode ? 'Update Business' : 'Add Business'
    }
  },

  watch: {
    business: {
      handler(newBusiness) {
        if (newBusiness) {
          this.isEditMode = true
          Object.assign(this.form, newBusiness)
        }
      },
      deep: true
    }
  },

  mounted() {
    if (this.business || this.$route.params.id) {
      this.isEditMode = true
      this.loadBusinessData(this.$route.params.id)
    }
  },

  methods: {
    validateEmail(email) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
      return emailRegex.test(email.trim())
    },

    validatePhone(phone) {
      const cleanedPhone = phone.replace(/[\s\-\(\)]/g, '')
      const phoneRegex = /^[\+]?[1-9][\d]{8,15}$/
      return phoneRegex.test(cleanedPhone)
    },

    validateKRAPIN(krapin) {
      const krapinRegex = /^[A-Z]\d{9}[A-Z]$/
      return krapinRegex.test(krapin.trim().toUpperCase())
    },

    validateForm() {
      let isValid = true
      Object.keys(this.errors).forEach(key => {
        this.errors[key] = ''
      })

      // Business Name
      if (!this.form.businessName.trim()) {
        this.errors.businessName = 'Business name is required'
        isValid = false
      } else if (this.form.businessName.trim().length < 3) {
        this.errors.businessName = 'Business name must be at least 3 characters'
        isValid = false
      }

      // Owner
      if (!this.form.owner.trim()) {
        this.errors.owner = 'Owner name is required'
        isValid = false
      } else if (this.form.owner.trim().length < 2) {
        this.errors.owner = 'Owner name must be at least 2 characters'
        isValid = false
      }

      // Email
      if (!this.form.email.trim()) {
        this.errors.email = 'Email is required'
        isValid = false
      } else if (!this.validateEmail(this.form.email)) {
        this.errors.email = 'Please enter a valid email address'
        isValid = false
      }

      // Address
      if (!this.form.address.trim()) {
        this.errors.address = 'Address is required'
        isValid = false
      }

      // Phone
      if (!this.form.phoneNo.trim()) {
        this.errors.phoneNo = 'Phone number is required'
        isValid = false
      } else if (!this.validatePhone(this.form.phoneNo)) {
        this.errors.phoneNo = 'Please enter a valid phone number (e.g., +254123456789)'
        isValid = false
      }

      // Location
      if (!this.form.location.trim()) {
        this.errors.location = 'Location is required'
        isValid = false
      }

      // KRAPIN
      if (!this.form.KRAPIN.trim()) {
        this.errors.KRAPIN = 'KRAPIN is required'
        isValid = false
      } else if (!this.validateKRAPIN(this.form.KRAPIN)) {
        this.errors.KRAPIN = 'KRAPIN must be in format: A123456789B'
        isValid = false
      }

      // Description
      if (!this.form.description.trim()) {
        this.errors.description = 'Description is required'
        isValid = false
      } else if (this.form.description.trim().length < 20) {
        this.errors.description = 'Description must be at least 20 characters'
        isValid = false
      }

      // Slogan
      if (!this.form.slogan.trim()) {
        this.errors.slogan = 'Slogan is required'
        isValid = false
      }

      // Default Pay Mode
      if (!this.form.defaultPaymode) {
        this.errors.defaultPaymode = 'Default payment mode is required'
        isValid = false
      }

      // Business Number
      if (!this.form.businessNo.trim()) {
        this.errors.businessNo = 'Business number is required'
        isValid = false
      }

      // Account Number
      if (!this.form.accountNo.trim()) {
        this.errors.accountNo = 'Account number is required'
        isValid = false
      }

      // Due Date
      if (!this.form.dueDate) {
        this.errors.dueDate = 'Due date is required'
        isValid = false
      } else {
        const today = new Date().toISOString().split('T')[0]
        if (this.form.dueDate < today) {
          this.errors.dueDate = 'Due date cannot be in the past'
          isValid = false
        }
      }

      // Monthly Charge
      if (!this.form.monthlyCharge) {
        this.errors.monthlyCharge = 'Monthly charge is required'
        isValid = false
      } else if (isNaN(this.form.monthlyCharge) || parseFloat(this.form.monthlyCharge) <= 0) {
        this.errors.monthlyCharge = 'Monthly charge must be a positive number'
        isValid = false
      }

      return isValid
    },

    async loadBusinessData(businessId) {
      this.isLoading = true
      try {
        if (this.business) {
          Object.assign(this.form, this.business)
        } else {
          // Simulate API call
          const sampleBusiness = {
            businessID: businessId || 'BUS001',
            businessName: 'Tech Solutions Inc.',
            owner: 'John Smith',
            email: 'john@techsolutions.com',
            address: '123 Tech Street, Nairobi, KE',
            phoneNo: '+254712345678',
            location: 'Nairobi, KE',
            KRAPIN: 'A123456789B',
            description: 'Leading technology solutions provider specializing in software development and IT consulting.',
            slogan: 'Innovation at Your Fingertips',
            defaultPaymode: 'Mobile Money',
            businessNo: 'BN001234',
            accountNo: 'ACC001234567',
            dueDate: '2025-10-15',
            monthlyCharge: 2500,
            status: 'Active'
          }
          await new Promise(resolve => setTimeout(resolve, 1000))
          Object.assign(this.form, sampleBusiness)
        }
      } catch (error) {
        this.$toast.error('Failed to load business data')
      } finally {
        this.isLoading = false
      }
    },

    generateBusinessId() {
      const timestamp = Date.now().toString().slice(-6)
      const random = Math.random().toString(36).substring(2, 5).toUpperCase()
      return `BUS${timestamp}${random}`
    },

    async handleSubmit() {
      if (!this.validateForm()) {
        this.$toast.error('Please correct the form errors')
        return
      }

      this.isSubmitting = true
      try {
        const businessData = {
          ...this.form,
          businessID: this.isEditMode ? (this.business?.businessID || this.$route.params.id) : this.generateBusinessId(),
          monthlyCharge: parseFloat(this.form.monthlyCharge),
          lastUpdated: new Date().toISOString(),
          KRAPIN: this.form.KRAPIN.toUpperCase(),
          email: this.form.email.toLowerCase()
        }

        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1500))
        console.log('Business data to save:', businessData)

        this.$toast.success(this.isEditMode ? 'Business updated successfully!' : 'Business added successfully!')
        this.$router.push('/businesses')
        this.$emit('closeAddBusinessModal')
      } catch (error) {
        this.$toast.error('An error occurred while saving the business')
      } finally {
        this.isSubmitting = false
      }
    },

    handleReset() {
      if (confirm('Are you sure you want to reset the form? All changes will be lost.')) {
        if (this.isEditMode) {
          this.loadBusinessData(this.$route.params.id)
        } else {
          Object.keys(this.form).forEach(key => {
            this.form[key] = key === 'status' ? 'Active' : ''
          })
          Object.keys(this.errors).forEach(key => {
            this.errors[key] = ''
          })
        }
        this.$toast.info('Form reset successfully')
      }
    },

    handleCancel() {
      this.$emit('closeAddBusinessModal');
    }
  }
}
</script>

<style scoped>
/* Modal Overlay */
.modal-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  padding: 1.5rem;
  animation: fadeIn 0.3s ease-in-out;
}

.dark-mode.modal-overlay {
  background: rgba(0, 0, 0, 0.7);
}

@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

/* Modal Container */
.modal-container {
  background: #f8fafc;
  border-radius: 1rem;
  max-width: 960px;
  width: 100%;
  max-height: 92vh;
  overflow-y: auto;
  position: relative;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.15);
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
  animation: slideUp 0.3s ease-out;
  transition: background-color 0.3s ease;
}

.dark-mode .modal-container {
  background: #1a202c;
}

@keyframes slideUp {
  from { transform: translateY(20px); opacity: 0; }
  to { transform: translateY(0); opacity: 1; }
}

/* Close Button */
.close-btn {
  position: absolute;
  top: 1rem;
  right: 1rem;
  background: transparent;
  border: none;
  cursor: pointer;
  padding: 0.5rem;
  color: white;
  transition: color 0.2s ease, transform 0.2s ease;
}

.dark-mode .close-btn {
  color: #e2e8f0;
}

.close-btn:hover {
  color: #667eea;
  transform: scale(1.1);
}

/* Header Section */
.header-section {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  padding: 2rem 1.5rem;
  color: white;
  border-top-left-radius: 1rem;
  border-top-right-radius: 1rem;
}

.header-content {
  max-width: 900px;
  margin: 0 auto;
}

.page-title {
  font-size: 2rem;
  font-weight: 700;
  margin: 0 0 0.5rem 0;
  letter-spacing: -0.025em;
}

.page-subtitle {
  font-size: 1rem;
  margin: 0;
  opacity: 0.9;
  line-height: 1.5;
}

/* Loading State */
.loading-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 5rem 1.5rem;
}

.loading-spinner {
  width: 2.5rem;
  height: 2.5rem;
  border: 3px solid #e2e8f0;
  border-top: 3px solid #667eea;
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

.dark-mode .loading-spinner {
  border-color: #4a5568;
  border-top-color: #667eea;
}

.loading-spinner-small {
  width: 1rem;
  height: 1rem;
  border: 2px solid rgba(255, 255, 255, 0.3);
  border-top: 2px solid white;
  border-radius: 50%;
  animation: spin 1s linear infinite;
  margin-right: 0.5rem;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

.loading-text {
  margin-top: 1rem;
  color: #718096;
  font-size: 1rem;
}

.dark-mode .loading-text {
  color: #a0aec0;
}

/* Form Section */
.form-section {
  max-width: 900px;
  margin: 0 auto;
  padding: 2.5rem 1.5rem;
}

.business-form {
  background: white;
  border-radius: 1rem;
  padding: 2rem;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.05);
  border: 1px solid #e2e8f0;
}

.dark-mode .business-form {
  background: #2d3748;
  border-color: #4a5568;
}

/* Business ID Display */
.business-id-display {
  margin-bottom: 2rem;
  padding: 1rem;
  background: #f8fafc;
  border-radius: 0.5rem;
  border: 1px solid #e2e8f0;
}

.dark-mode .business-id-display {
  background: #4a5568;
  border-color: #718096;
}

.business-id-value {
  font-size: 1.125rem;
  font-weight: 600;
  color: #667eea;
  margin: 0.5rem 0;
}

.help-text {
  font-size: 0.875rem;
  color: #718096;
  margin: 0;
}

.dark-mode .help-text {
  color: #a0aec0;
}

/* Form Section Groups */
.form-section-group {
  margin-bottom: 2.5rem;
}

.section-title {
  font-size: 1.25rem;
  font-weight: 600;
  color: #1a202c;
  margin: 0 0 1.5rem 0;
  padding-bottom: 0.75rem;
  border-bottom: 2px solid #e2e8f0;
}

.dark-mode .section-title {
  color: #f7fafc;
  border-bottom-color: #4a5568;
}

/* Form Layout */
.form-row {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1.5rem;
  margin-bottom: 1.5rem;
}

.form-group {
  display: flex;
  flex-direction: column;
}

.form-group.full-width {
  grid-column: 1 / -1;
}

.form-label {
  font-size: 0.875rem;
  font-weight: 600;
  color: #4a5568;
  margin-bottom: 0.5rem;
  display: flex;
  align-items: center;
  gap: 0.25rem;
}

.dark-mode .form-label {
  color: #e2e8f0;
}

.required {
  color: #e53e3e;
}

.tooltip {
  display: inline-block;
  width: 1rem;
  height: 1rem;
  line-height: 1rem;
  text-align: center;
  background: #e2e8f0;
  color: #4a5568;
  border-radius: 50%;
  font-size: 0.75rem;
  cursor: help;
  transition: background 0.2s ease;
}

.dark-mode .tooltip {
  background: #718096;
  color: #f7fafc;
}

.tooltip:hover {
  background: #cbd5e0;
}

.dark-mode .tooltip:hover {
  background: #a0aec0;
}

/* Form Inputs */
.form-input,
.form-select,
.form-textarea {
  padding: 0.75rem 1rem;
  border: 2px solid #e2e8f0;
  border-radius: 0.5rem;
  font-size: 1rem;
  transition: all 0.2s ease;
  outline: none;
  background: white;
  width: 100%;
  box-sizing: border-box;
  color: #1a202c;
}

.dark-mode .form-input,
.dark-mode .form-select,
.dark-mode .form-textarea {
  background: #4a5568;
  border-color: #718096;
  color: #f7fafc;
}

.form-input:focus,
.form-select:focus,
.form-textarea:focus {
  border-color: #667eea;
  box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
}

.form-input.error,
.form-select.error,
.form-textarea.error {
  border-color: #e53e3e;
}

.form-input.error:focus,
.form-select.error:focus,
.form-textarea.error:focus {
  border-color: #e53e3e;
  box-shadow: 0 0 0 3px rgba(229, 62, 62, 0.1);
}

.form-textarea {
  resize: vertical;
  min-height: 120px;
}

/* Error Messages */
.error-message {
  color: #e53e3e;
  font-size: 0.875rem;
  margin-top: 0.25rem;
}

/* Form Actions */
.form-actions {
  display: flex;
  gap: 1rem;
  justify-content: flex-end;
  padding-top: 2rem;
  border-top: 1px solid #e2e8f0;
  margin-top: 2rem;
}

.dark-mode .form-actions {
  border-top-color: #4a5568;
}

.btn {
  padding: 0.75rem 1.5rem;
  border-radius: 0.5rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
  border: none;
  display: flex;
  align-items: center;
  justify-content: center;
  min-width: 100px;
}

.btn:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.btn-primary {
  background: #667eea;
  color: white;
}

.btn-primary:hover:not(:disabled) {
  background: #5a67d8;
  transform: translateY(-1px);
}

.btn-secondary {
  background: #718096;
  color: white;
}

.btn-secondary:hover:not(:disabled) {
  background: #4a5568;
}

.btn-outline {
  background: transparent;
  color: #4a5568;
  border: 2px solid #e2e8f0;
}

.dark-mode .btn-outline {
  color: #f7fafc;
  border-color: #718096;
}

.btn-outline:hover:not(:disabled) {
  background: #f7fafc;
  border-color: #cbd5e0;
}

.dark-mode .btn-outline:hover:not(:disabled) {
  background: #4a5568;
  border-color: #a0aec0;
}

/* Screen Reader Only */
.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  border: 0;
}

/* Responsive Design */
@media (max-width: 768px) {
  .modal-overlay {
    padding: 1rem;
  }

  .modal-container {
    max-height: 95vh;
    margin: 0.5rem;
  }

  .header-section {
    padding: 1.5rem 1rem;
  }

  .page-title {
    font-size: 1.75rem;
  }

  .page-subtitle {
    font-size: 0.875rem;
  }

  .form-section {
    padding: 1.5rem 1rem;
  }

  .business-form {
    padding: 1.5rem;
  }

  .form-row {
    grid-template-columns: 1fr;
    gap: 1rem;
  }

  .form-actions {
    flex-direction: column;
    gap: 0.75rem;
  }

  .btn {
    width: 100%;
    padding: 0.75rem;
  }
}

@media (max-width: 480px) {
  .modal-container {
    margin: 0.25rem;
  }

  .business-form {
    padding: 1rem;
  }

  .section-title {
    font-size: 1.125rem;
  }

  .close-btn {
    top: 0.75rem;
    right: 0.75rem;
  }

  .form-input,
  .form-select,
  .form-textarea {
    font-size: 0.9375rem;
  }
}
</style>