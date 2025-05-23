// Funktion för att validera JavaScript-övningar
function validateJSExercise(exerciseNumber, code) {
    try {
        // Säker evaluering av kod
        const userFunction = new Function(code);
        const result = userFunction();

        switch(exerciseNumber) {
            case 1:
                // Medelvärdesberäkning
                if (typeof result === 'function') {
                    const testResult = result(3, 6, 9);
                    if (testResult === 6) {
                        return {
                            success: true,
                            message: 'Bra jobbat! Din funktion beräknar medelvärdet korrekt!'
                        };
                    }
                }
                return {
                    success: false,
                    message: 'Försök igen. Din funktion ska returnera medelvärdet av tre tal.'
                };

            case 2:
                // Personpresentation
                if (typeof result === 'function') {
                    const testResult = result('Anna', 25);
                    if (testResult.includes('Anna') && testResult.includes('25')) {
                        return {
                            success: true,
                            message: 'Perfekt! Din funktion skapar en korrekt presentation!'
                        };
                    }
                }
                return {
                    success: false,
                    message: 'Försök igen. Funktionen ska inkludera både namn och ålder i presentationen.'
                };
        }
    } catch (error) {
        return {
            success: false,
            message: 'Ett fel uppstod: ' + error.message
        };
    }
}

// Funktion för att validera CSS-övningar
function validateCSSExercise(exerciseNumber, code) {
    try {
        switch(exerciseNumber) {
            case 1:
                // Roterande knapp
                if (code.includes('transform: rotate') && 
                    code.includes(':hover') && 
                    code.includes('transition')) {
                    return {
                        success: true,
                        message: 'Bra jobbat! Din CSS innehåller både rotation och hover-effekt!'
                    };
                }
                return {
                    success: false,
                    message: 'Försök igen. Se till att inkludera både rotation (transform: rotate) och hover-effekt.'
                };

            case 2:
                // Studsande cirkel
                if (code.includes('@keyframes') && 
                    code.includes('animation') && 
                    (code.includes('translateY') || code.includes('transform: translateY'))) {
                    return {
                        success: true,
                        message: 'Perfekt! Din animation innehåller korrekt keyframes och translation!'
                    };
                }
                return {
                    success: false,
                    message: 'Försök igen. Använd @keyframes och translateY för att skapa studseffekten.'
                };
        }
    } catch (error) {
        return {
            success: false,
            message: 'Ett fel uppstod: ' + error.message
        };
    }
}

// Funktion för att visa resultat
function showResult(result, resultDiv) {
    resultDiv.innerHTML = `
        <div class="${result.success ? 'success' : 'error'}">
            ${result.message}
        </div>
    `;
}

// Event listeners för formulär
document.addEventListener('DOMContentLoaded', () => {
    const forms = document.querySelectorAll('.exercise-form');
    
    forms.forEach(form => {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            const exerciseNumber = parseInt(form.dataset.exercise);
            const exerciseType = form.dataset.type;
            const code = form.querySelector('textarea').value;
            const resultDiv = form.querySelector('.result');

            let result;
            if (exerciseType === 'js') {
                result = validateJSExercise(exerciseNumber, code);
            } else if (exerciseType === 'css') {
                result = validateCSSExercise(exerciseNumber, code);
            }

            showResult(result, resultDiv);
        });
    });
});
