const signUpButton=document.getElementById('signUpButton');
const signInButton=document.getElementById('signInButton');
const signInForm=document.getElementById('signIn');
const signUpForm=document.getElementById('signup');

signUpButton.addEventListener('click',function(){
    signInForm.style.display="none";
    signUpForm.style.display="block";
})
signInButton.addEventListener('click', function(){
    signInForm.style.display="block";
    signUpForm.style.display="none";
})
// --- Minimal client-side "login" handling (no backend) ---
document.addEventListener('DOMContentLoaded', () => {
    // Sign Up form inside #signup
    const signUpFormEl = document.querySelector('#signup form');
    if (signUpFormEl) {
      signUpFormEl.addEventListener('submit', (e) => {
        e.preventDefault(); // stop POST to the server
        // (optional) save name for later
        const fn = document.getElementById('fName')?.value || '';
        const ln = document.getElementById('lName')?.value || '';
        const name = (fn + ' ' + ln).trim();
        if (name) localStorage.setItem('username', name);
  
        window.location.href = 'index.html';
      });
    }
  
    // Sign In form inside #signIn
    const signInFormEl = document.querySelector('#signIn form');
    if (signInFormEl) {
      signInFormEl.addEventListener('submit', (e) => {
        e.preventDefault(); // stop POST to the server
        // (optional) guess a display name from email
        const email = document.querySelector('#signIn input[type="email"]')?.value || '';
        const guess = email.split('@')[0] || '';
        if (guess) localStorage.setItem('username', guess);
  
        window.location.href = 'index.html';
      });
    }
  });