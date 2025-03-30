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