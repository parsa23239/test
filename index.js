// تنظیمات اولیه
class LoginSystem {
    constructor() {
        this.init();
    }

    init() {
        this.setupEventListeners();
        this.loadTheme();
        this.checkAuthentication();
    }

    // تنظیم event listeners
    setupEventListeners() {
        // فرم ورود
        const loginForm = document.getElementById('loginForm');
        loginForm.addEventListener('submit', (e) => this.handleLogin(e));

        // نمایش/مخفی کردن رمز عبور
        const togglePassword = document.querySelector('.toggle-password');
        togglePassword.addEventListener('click', () => this.togglePasswordVisibility());

        // تغییر تم
        const themeToggle = document.getElementById('themeToggle');
        themeToggle.addEventListener('click', () => this.toggleTheme());

        // انیمیشن‌های ورودی
        this.setupInputAnimations();
    }

    // مدیریت ورود
    async handleLogin(e) {
        e.preventDefault();
        
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;
        const rememberMe = document.getElementById('rememberMe').checked;

        // اعتبارسنجی اولیه
        if (!this.validateEmail(email)) {
            this.showNotification('لطفا یک ایمیل معتبر وارد کنید', 'error');
            return;
        }

        if (password.length < 6) {
            this.showNotification('رمز عبور باید حداقل ۶ کاراکتر باشد', 'error');
            return;
        }

        // شبیه‌سازی فرآیند ورود
        this.showLoading(true);

        try {
            // در واقعیت اینجا درخواست به سرور ارسال می‌شود
            await this.simulateLoginRequest(email, password, rememberMe);
            
            this.showNotification('ورود موفقیت‌آمیز بود! در حال انتقال...', 'success');
            
            // انتقال به صفحه داشبورد پس از ۲ ثانیه
            setTimeout(() => {
                window.location.href = 'dashboard.html';
            }, 2000);

        } catch (error) {
            this.showNotification('ایمیل یا رمز عبور اشتباه است', 'error');
        } finally {
            this.showLoading(false);
        }
    }

    // شبیه‌سازی درخواست ورود
    simulateLoginRequest(email, password, rememberMe) {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                // در واقعیت اینجا پاسخ سرور بررسی می‌شود
                const validEmail = 'user@example.com';
                const validPassword = '123456';

                if (email === validEmail && password === validPassword) {
                    // ذخیره اطلاعات در localStorage
                    if (rememberMe) {
                        localStorage.setItem('userToken', 'simulated-token');
                        localStorage.setItem('userEmail', email);
                    }
                    sessionStorage.setItem('userToken', 'simulated-token');
                    resolve({ success: true });
                } else {
                    reject(new Error('Invalid credentials'));
                }
            }, 1500);
        });
    }

    // ورود با گوگل
    async loginWithGoogle() {
        this.showNotification('در حال انتقال به صفحه ورود گوگل...', 'warning');
        
        // در واقعیت اینجا از Google OAuth استفاده می‌شود
        setTimeout(() => {
            // شبیه‌سازی احراز هویت موفق
            const googleUser = {
                email: 'google.user@example.com',
                name: 'کاربر گوگل',
                picture: ''
            };
            
            this.handleSocialLogin(googleUser, 'google');
        }, 1000);
    }

    // ورود با گیت‌هاب
    async loginWithGithub() {
        this.showNotification('در حال انتقال به صفحه ورود گیت‌هاب...', 'warning');
        
        setTimeout(() => {
            const githubUser = {
                email: 'github.user@example.com',
                name: 'کاربر گیت‌هاب',
                username: 'githubuser'
            };
            
            this.handleSocialLogin(githubUser, 'github');
        }, 1000);
    }

    // ورود با توییتر
    async loginWithTwitter() {
        this.showNotification('در حال انتقال به صفحه ورود توییتر...', 'warning');
        
        setTimeout(() => {
            const twitterUser = {
                email: 'twitter.user@example.com',
                name: 'کاربر توییتر',
                username: 'twitteruser'
            };
            
            this.handleSocialLogin(twitterUser, 'twitter');
        }, 1000);
    }

    // مدیریت ورود از طریق شبکه‌های اجتماعی
    handleSocialLogin(userData, provider) {
        // ذخیره اطلاعات کاربر
        sessionStorage.setItem('userToken', `${provider}-token`);
        sessionStorage.setItem('userData', JSON.stringify(userData));
        
        this.showNotification(`ورود با ${this.getProviderName(provider)} موفقیت‌آمیز بود!`, 'success');
        
        setTimeout(() => {
            window.location.href = 'dashboard.html';
        }, 2000);
    }

    // نام سرویس
    getProviderName(provider) {
        const names = {
            google: 'گوگل',
            github: 'گیت‌هاب',
            twitter: 'توییتر'
        };
        return names[provider] || provider;
    }

    // نمایش/مخفی کردن رمز عبور
    togglePasswordVisibility() {
        const passwordInput = document.getElementById('password');
        const icon = document.querySelector('.toggle-password i');
        
        if (passwordInput.type === 'password') {
            passwordInput.type = 'text';
            icon.classList.remove('fa-eye');
            icon.classList.add('fa-eye-slash');
        } else {
            passwordInput.type = 'password';
            icon.classList.remove('fa-eye-slash');
            icon.classList.add('fa-eye');
        }
    }

    // تغییر تم
    toggleTheme() {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        
        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        
        const icon = document.querySelector('#themeToggle i');
        icon.className = newTheme === 'dark' ? 'fas fa-sun' : 'fas fa-moon';
        
        this.showNotification(`تم ${newTheme === 'dark' ? 'تیره' : 'روشن'} فعال شد`, 'success');
    }

    // بارگذاری تم ذخیره شده
    loadTheme() {
        const savedTheme = localStorage.getItem('theme') || 'light';
        document.documentElement.setAttribute('data-theme', savedTheme);
        
        const icon = document.querySelector('#themeToggle i');
        icon.className = savedTheme === 'dark' ? 'fas fa-sun' : 'fas fa-moon';
    }

    // اعتبارسنجی ایمیل
    validateEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    // نمایش حالت بارگذاری
    showLoading(show) {
        const loginBtn = document.querySelector('.login-btn');
        if (show) {
            loginBtn.classList.add('loading');
            loginBtn.disabled = true;
        } else {
            loginBtn.classList.remove('loading');
            loginBtn.disabled = false;
        }
    }

    // نمایش نوتیفیکیشن
    showNotification(message, type = 'info') {
        const notification = document.getElementById('notification');
        const notificationText = notification.querySelector('.notification-text');
        const notificationIcon = notification.querySelector('.notification-icon');
        
        // تنظیم آیکون بر اساس نوع
        const icons = {
            success: 'fas fa-check-circle',
            error: 'fas fa-exclamation-circle',
            warning: 'fas fa-exclamation-triangle',
            info: 'fas fa-info-circle'
        };
        
        notificationIcon.className = `notification-icon ${icons[type] || icons.info}`;
        notificationText.textContent = message;
        
        // تنظیم کلاس نوع
        notification.className = `notification ${type}`;
        notification.classList.remove('hidden');
        
        // مخفی کردن خودکار
        setTimeout(() => {
            this.hideNotification();
        }, 5000);
    }

    // مخفی کردن نوتیفیکیشن
    hideNotification() {
        const notification = document.getElementById('notification');
        notification.classList.add('hidden');
    }

    // انیمیشن‌های ورودی
    setupInputAnimations() {
        const inputs = document.querySelectorAll('.input-group input');
        
        inputs.forEach(input => {
            input.addEventListener('focus', function() {
                this.parentElement.classList.add('focused');
            });
            
            input.addEventListener('blur', function() {
                if (!this.value) {
                    this.parentElement.classList.remove('focused');
                }
            });
        });
    }

    // بررسی وضعیت احراز هویت
    checkAuthentication() {
        const token = localStorage.getItem('userToken') || sessionStorage.getItem('userToken');
        if (token) {
            // کاربر قبلا وارد شده، انتقال به داشبورد
            window.location.href = 'dashboard.html';
        }
    }
}

// توابع سراسری برای استفاده در HTML
function loginWithGoogle() {
    loginSystem.loginWithGoogle();
}

function loginWithGithub() {
    loginSystem.loginWithGithub();
}

function loginWithTwitter() {
    loginSystem.loginWithTwitter();
}

function hideNotification() {
    loginSystem.hideNotification();
}

// مقداردهی اولیه سیستم
const loginSystem = new LoginSystem();

// انیمیشن‌های اضافی
document.addEventListener('DOMContentLoaded', function() {
    // انیمیشن ظاهر شدن کارت
    const loginCard = document.querySelector('.login-card');
    loginCard.style.opacity = '0';
    loginCard.style.transform = 'translateY(30px)';
    
    setTimeout(() => {
        loginCard.style.transition = 'all 0.6s ease';
        loginCard.style.opacity = '1';
        loginCard.style.transform = 'translateY(0)';
    }, 100);

    // انیمیشن تایپ برای عنوان
    const welcomeText = document.querySelector('.welcome-text h1');
    const text = welcomeText.textContent;
    welcomeText.textContent = '';
    let i = 0;
    
    function typeWriter() {
        if (i < text.length) {
            welcomeText.textContent += text.charAt(i);
            i++;
            setTimeout(typeWriter, 100);
        }
    }
    
    setTimeout(typeWriter, 600);
});