// حل معادله درجه دوم در صفحه جبر
document.getElementById('solve-btn').addEventListener('click', function() {
    const a = parseFloat(document.getElementById('coef-a').value);
    const b = parseFloat(document.getElementById('coef-b').value);
    const c = parseFloat(document.getElementById('coef-c').value);
    
    const discriminant = b*b - 4*a*c;
    let resultHTML = '';

    if(discriminant > 0) {
        const x1 = (-b + Math.sqrt(discriminant))/(2*a);
        const x2 = (-b - Math.sqrt(discriminant))/(2*a);
        resultHTML = `
            <p>دو جواب حقیقی:</p>
            <p>\( x_1 = ${x1.toFixed(2)} \)</p>
            <p>\( x_2 = ${x2.toFixed(2)} \)</p>
        `;
    } else if(discriminant === 0) {
        const x = -b/(2*a);
        resultHTML = `<p>یک جواب حقیقی: \( x = ${x.toFixed(2)} \)</p>`;
    } else {
        const realPart = (-b/(2*a)).toFixed(2);
        const imaginaryPart = (Math.sqrt(-discriminant)/(2*a)).toFixed(2);
        resultHTML = `
            <p>دو جواب مختلط:</p>
            <p>\( x_1 = ${realPart} + ${imaginaryPart}i \)</p>
            <p>\( x_2 = ${realPart} - ${imaginaryPart}i \)</p>
        `;
    }

    document.getElementById('solution-result').innerHTML = resultHTML;
    MathJax.typeset(); // رندر مجدد فرمول‌ها
});

// بررسی پاسخ تمرین‌ها
document.querySelectorAll('.check-btn').forEach(button => {
    button.addEventListener('click', function() {
        const exerciseId = this.dataset.exercise;
        const feedbackDiv = document.getElementById(`${exerciseId}-feedback`);
        
        let isCorrect = false;
        let correctAnswer = '';

        switch(exerciseId) {
            case 'ex1':
                const answer1 = document.getElementById('ex1-answer').value.trim();
                isCorrect = answer1 === '4' || answer1 === 'x=4';
                correctAnswer = '4';
                break;
            
            case 'ex2':
                const ans1 = document.getElementById('ex2-answer1').value.trim();
                const ans2 = document.getElementById('ex2-answer2').value.trim();
                isCorrect = (ans1 === '2' && ans2 === '3') || 
                           (ans1 === '3' && ans2 === '2');
                correctAnswer = '2 و 3';
                break;
            
            case 'ex3':
                const answer3 = document.getElementById('ex3-answer').value.trim();
                isCorrect = answer3 === '78.5' || answer3 === 'A=78.5';
                correctAnswer = '78.5';
                break;
            
            case 'ex4':
                const answer4 = document.getElementById('ex4-answer').value.trim();
                isCorrect = answer4 === '3x² - 4x + 3' || 
                          answer4 === 'f\'(x)=3x²-4x+3';
                correctAnswer = '3x² - 4x + 3';
                break;
        }

        if(isCorrect) {
            feedbackDiv.innerHTML = `
                <p class="success">✅ پاسخ صحیح! آفرین!</p>
                <p>راه حل کامل: ${correctAnswer}</p>
            `;
        } else {
            feedbackDiv.innerHTML = `
                <p class="error">❌ پاسخ نادرست. دوباره تلاش کنید!</p>
                <p>پاسخ صحیح: ${correctAnswer}</p>
            `;
        }
    });
});

// فیلتر کردن تمرین‌ها بر اساس دسته‌بندی
document.getElementById('category').addEventListener('change', function() {
    const selectedCategory = this.value;
    document.querySelectorAll('.exercise-card').forEach(card => {
        if(selectedCategory === 'all' || card.dataset.category === selectedCategory) {
            card.style.display = 'block';
        } else {
            card.style.display = 'none';
        }
    });
});

// تنظیمات MathJax
window.MathJax = {
    tex: {
        inlineMath: [['$', '$'], ['\\(', '\\)']],
        displayMath: [['$$', '$$'], ['\\[', '\\]']],
        processEscapes: true
    },
    svg: {
        fontCache: 'global'
    }
};

// بررسی پاسخ تمرین نمونه
function checkAnswer() {
    const answer1 = document.getElementById('answer1').value.trim();
    const answer2 = document.getElementById('answer2').value.trim();
    const feedback = document.getElementById('feedback');

    // تبدیل پاسخ‌ها به عدد
    const x1 = parseFloat(answer1);
    const x2 = parseFloat(answer2);

    // بررسی پاسخ‌ها (x₁ = 2 و x₂ = 3)
    if ((x1 === 2 && x2 === 3) || (x1 === 3 && x2 === 2)) {
        feedback.className = 'alert alert-success';
        feedback.innerHTML = `
            <i class="bi bi-check-circle-fill"></i>
            آفرین! پاسخ شما صحیح است.
            <br>
            توضیح: با استفاده از فرمول \( x = \\frac{-b \\pm \\sqrt{b^2-4ac}}{2a} \)
        `;
    } else {
        feedback.className = 'alert alert-danger';
        feedback.innerHTML = `
            <i class="bi bi-x-circle-fill"></i>
            پاسخ نادرست. دوباره تلاش کنید.
            <br>
            راهنمایی: از فرمول حل معادله درجه دوم استفاده کنید.
        `;
    }
    feedback.classList.remove('d-none');
    MathJax.typeset([feedback]);
}

// انیمیشن اسکرول
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// تغییر استایل هدر هنگام اسکرول
window.addEventListener('scroll', () => {
    const header = document.querySelector('header');
    if (window.scrollY > 100) {
        header.classList.add('header-scrolled');
    } else {
        header.classList.remove('header-scrolled');
    }
});

// فرم‌های ورود و ثبت‌نام
document.getElementById('loginForm')?.addEventListener('submit', function(e) {
    e.preventDefault();
    // اینجا کد مربوط به ارسال اطلاعات ورود اضافه می‌شود
});

// نمایش پیام‌های موفقیت/خطا
function showMessage(message, type = 'success') {
    const alertDiv = document.createElement('div');
    alertDiv.className = `alert alert-${type} alert-dismissible fade show position-fixed top-0 end-0 m-3`;
    alertDiv.innerHTML = `
        ${message}
        <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
    `;
    document.body.appendChild(alertDiv);
    setTimeout(() => alertDiv.remove(), 3000);
}

// بارگذاری تنبل تصاویر
document.addEventListener('DOMContentLoaded', () => {
    const lazyImages = document.querySelectorAll('img[loading="lazy"]');
    if ('loading' in HTMLImageElement.prototype) {
        lazyImages.forEach(img => {
            img.src = img.dataset.src;
        });
    } else {
        // پشتیبانی از مرورگرهای قدیمی
        const lazyLoadScript = document.createElement('script');
        lazyLoadScript.src = 'https://cdnjs.cloudflare.com/ajax/libs/lozad.js/1.16.0/lozad.min.js';
        document.body.appendChild(lazyLoadScript);
    }
}); 
