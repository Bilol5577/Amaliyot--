document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('login-form');
    const usernameInput = document.getElementById('input');
    const passwordInput = document.getElementById('password');
    const submitButton = document.getElementById('submit-btn');
    const togglePassword = document.getElementById('togglePassword');
    const errorMessage = document.getElementById('errorMessage');

    // Default login va parolni o'rnatish
    function setDefaultCredentials() {
        const defaultCredentials = {
            username: 'bilol',
            password: '5577'
        };

        // Agar `credentials` mavjud bo'lmasa, default ma'lumotlarni saqlaymiz
        if (!localStorage.getItem('credentials')) {
            localStorage.setItem('credentials', JSON.stringify(defaultCredentials));
            console.log('Default login va parol localStorage ga saqlandi.');
        }
    }

    setDefaultCredentials();

    // Maydonlarni to'ldirilganligini tekshirish
    function checkFields() {
        const username = usernameInput.value.trim();
        const password = passwordInput.value.trim();
        submitButton.disabled = !(username && password);
    }

    usernameInput.addEventListener('input', checkFields);
    passwordInput.addEventListener('input', checkFields);

    // Parolni ko'rsatish/yashirish
    togglePassword.addEventListener('click', () => {
        if (passwordInput.type === 'password') {
            passwordInput.type = 'text';
            togglePassword.textContent = '🙈'; // Ko'rsatish va yashirish uchun aniqroq matn
        } else {
            passwordInput.type = 'password';
            togglePassword.textContent = '👁';
        }
    });

    // Formani topshirish
    form.addEventListener('submit', (event) => {
        event.preventDefault();

        errorMessage.textContent = ''; // Xatolik xabarlarini tozalash

        const username = usernameInput.value.trim();
        const password = passwordInput.value.trim();

        // localStorage dan credentials obyektini olish
        const storedCredentials = JSON.parse(localStorage.getItem('credentials'));

        // Kiritilgan login va parolni tekshirish
        if (storedCredentials && username === storedCredentials.username && password === storedCredentials.password) {
            window.location.href = 'nextpage.html'; // Agar login va parol to'g'ri bo'lsa
        } else {
            errorMessage.textContent = 'Login yoki parol noto\'g\'ri';
            errorMessage.style.color = 'red';
        }

        // Konsolga ma'lumotlarni chiqarish
        console.log('Kiritilgan username:', username);
        console.log('Kiritilgan password:', password);
        console.log('Saqlangan ma\'lumotlar:', storedCredentials);
    });
});
