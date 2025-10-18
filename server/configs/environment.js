// server/config/environment.js
export const config = {
    // MongoDB
    mongoUri: process.env.MONGODB_URI,
    
    // JWT
    jwtSecret: process.env.JWT_SECRET,
    jwtExpire: process.env.JWT_EXPIRE || '7d',
    
    // SendGrid
    sendgridApiKey: process.env.SENDGRID_API_KEY,
    sendgridFromEmail: process.env.SENDGRID_FROM_EMAIL,
    
    // Frontend URL - dynamically select based on environment
    frontendUrl: process.env.NODE_ENV === 'production' 
        ? (process.env.FRONTEND_URL_PROD || process.env.FRONTEND_URL || 'https://cruze-it.vercel.app')
        : (process.env.FRONTEND_URL_LOCAL || process.env.FRONTEND_URL || 'http://localhost:5173'),
    
    // Server
    port: process.env.PORT || 5000,
    nodeEnv: process.env.NODE_ENV || 'development',
    
    // Check if all required variables are present
    isValid() {
        const required = [
            { name: 'MONGODB_URI', value: this.mongoUri },
            { name: 'JWT_SECRET', value: this.jwtSecret },
            { name: 'SENDGRID_API_KEY', value: this.sendgridApiKey },
            { name: 'SENDGRID_FROM_EMAIL', value: this.sendgridFromEmail }
        ];
        
        const missing = required.filter(item => !item.value);
        
        if (missing.length > 0) {
            console.error('❌ Missing required environment variables:');
            missing.forEach(item => console.error(`   - ${item.name}`));
            return false;
        }
        
        console.log('✅ All required environment variables are set');
        console.log(`🌍 Environment: ${this.nodeEnv}`);
        console.log(`🔗 Frontend URL: ${this.frontendUrl}`);
        return true;
    }
};

// Validate on import
config.isValid();