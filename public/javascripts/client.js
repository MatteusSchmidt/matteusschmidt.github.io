document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('email-form');
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        let mail = new FormData(form);
        sendMail(mail);
    });

    const sendMail = (mail) => {
        fetch("/send", {
            method: "POST",
            body: mail,
        }).then((response) => {
            return response.json();
        }).then((data) => {
            console.log(data);
        }).catch((error) => {
            console.error('Error:', error);
        });
    };
});