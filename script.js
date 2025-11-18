// ============================
// 1. MENU & PAGE NAVIGATION
// ============================

const hamburger = document.getElementById('hamburger');
const sideMenu = document.getElementById('side-menu');
const menuLinks = document.querySelectorAll('.menu-link');
const pages = document.querySelectorAll('.page');

// Toggle Menu Open/Close
hamburger.addEventListener('click', () => {
    sideMenu.classList.toggle('open');
});

// Handle Page Switching
menuLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        
        const targetId = link.getAttribute('data-target');
        
        // Hide all pages
        pages.forEach(page => page.classList.remove('active'));
        
        // Show target page
        document.getElementById(targetId).classList.add('active');
        
        // Close the menu
        sideMenu.classList.remove('open');
        
        // If opening a quiz page, load the first question
        if(targetId === 'bio101') loadQuestion('bio');
        if(targetId === 'chm101') loadQuestion('chm');
        if(targetId === 'phy101') loadQuestion('phy');
    });
});

// ============================
// 2. QUIZ DATA (5 Questions Each)
// ============================

const bioQuestions = [
    { q: "1. Which organelle is known as the powerhouse of the cell?", options: ["Nucleus", "Mitochondria", "Ribosome", "Golgi Body"], ans: 1 },
    { q: "2. What is the basic unit of life?", options: ["Tissue", "Organ", "Cell", "Atom"], ans: 2 },
    { q: "3. DNA is found primarily in the...?", options: ["Cytoplasm", "Nucleus", "Cell Membrane", "Vacuole"], ans: 1 },
    { q: "4. Which of these is NOT a kingdom of life?", options: ["Fungi", "Animalia", "Plantae", "Virus"], ans: 3 },
    { q: "5. Mitosis results in...?", options: ["2 identical daughter cells", "4 different cells", "1 dead cell", "No cells"], ans: 0 }
];

const chmQuestions = [
    { q: "1. What is the chemical symbol for Sodium?", options: ["So", "Na", "Nu", "S"], ans: 1 },
    { q: "2. What is the pH of a neutral solution?", options: ["0", "14", "7", "10"], ans: 2 },
    { q: "3. Which subatomic particle has a negative charge?", options: ["Proton", "Neutron", "Electron", "Nucleus"], ans: 2 },
    { q: "4. Avogadro's number is approximately...?", options: ["6.02 x 10^23", "3.14 x 10^5", "9.8 m/s", "100"], ans: 0 },
    { q: "5. The vertical columns in the periodic table are called?", options: ["Periods", "Groups", "Rows", "Lines"], ans: 1 }
];

const phyQuestions = [
    { q: "1. The SI unit of Force is...?", options: ["Joule", "Watt", "Newton", "Pascal"], ans: 2 },
    { q: "2. Velocity is defined as...?", options: ["Distance / Time", "Displacement / Time", "Mass x Acceleration", "Speed x Time"], ans: 1 },
    { q: "3. Which of these is a vector quantity?", options: ["Speed", "Mass", "Temperature", "Velocity"], ans: 3 },
    { q: "4. The acceleration due to gravity (g) is approx...?", options: ["9.8 m/s²", "100 m/s²", "3.0 m/s²", "0 m/s²"], ans: 0 },
    { q: "5. Kinetic Energy is calculated as...?", options: ["mgh", "1/2 mv²", "F x d", "ma"], ans: 1 }
];

// ============================
// 3. QUIZ LOGIC
// ============================

// Track which question we are on (start at 0)
let bioIndex = 0;
let chmIndex = 0;
let phyIndex = 0;

function loadQuestion(subject) {
    let questions, index, containerId;

    // Determine which subject we are dealing with
    if (subject === 'bio') {
        questions = bioQuestions;
        index = bioIndex;
        containerId = 'quiz-bio';
    } else if (subject === 'chm') {
        questions = chmQuestions;
        index = chmIndex;
        containerId = 'quiz-chm';
    } else { // phy
        questions = phyQuestions;
        index = phyIndex;
        containerId = 'quiz-phy';
    }

    // Check if we finished the questions
    if (index >= questions.length) {
        document.querySelector(`#${containerId} .question-text`).innerText = "Quiz Completed!";
        document.querySelector(`#${containerId} .options`).innerHTML = "";
        document.querySelector(`#${containerId} .next-btn`).style.display = "none";
        return;
    }

    // Get current question object
    const currentQ = questions[index];
    const container = document.getElementById(containerId);
    
    // Update Question Text
    container.querySelector('.question-text').innerText = currentQ.q;

    // Generate Option Buttons
    const optionsDiv = container.querySelector('.options');
    optionsDiv.innerHTML = ""; // Clear old options

    currentQ.options.forEach((opt, i) => {
        const btn = document.createElement('button');
        btn.innerText = opt;
        btn.style.display = "block";
        btn.style.width = "100%";
        btn.style.margin = "5px 0";
        btn.style.padding = "10px";
        btn.onclick = () => checkAnswer(i, currentQ.ans, btn); // Add click event
        optionsDiv.appendChild(btn);
    });
}

function checkAnswer(selected, correct, btnElement) {
    // Simple feedback: Green for correct, Red for wrong
    if (selected === correct) {
        btnElement.style.backgroundColor = "lightgreen";
        alert("Correct!");
    } else {
        btnElement.style.backgroundColor = "lightcoral";
        alert("Wrong answer.");
    }
}

// Triggered by the "Next" button in HTML
function nextQuestion(subject) {
    if (subject === 'bio') bioIndex++;
    if (subject === 'chm') chmIndex++;
    if (subject === 'phy') phyIndex++;
    
    loadQuestion(subject);
}
