function sendMail(event) {
    event.preventDefault();

    const params = {
        name: document.querySelector("[name='name']").value,
        email: document.querySelector("[name='email']").value,
        subject: document.querySelector("[name='subject']").value,
        message: document.querySelector("[name='message']").value
    };

    const serviceID = "service_zzpne7f";
    const templateID = "template_wffqrgl";

    emailjs.send(serviceID, templateID, params)
    .then(res => {
        console.log(res);

        // Optional: show success message before reload
        const messageStatus = document.getElementById("message-status");
        messageStatus.style.display = "block";
        messageStatus.className = "success";
        messageStatus.innerHTML = `
            Your message was sent successfully!
        `;

        // Force page reload after a short delay (e.g., 1 second)
        setTimeout(() => {
            window.location.reload();
        }, 1000);

    })
    .catch(err => {
        console.log(err);
        const messageStatus = document.getElementById("message-status");
        messageStatus.style.display = "block";
        messageStatus.className = "error";
        messageStatus.innerHTML = `
            Oops! Something went wrong. Please try again.
        `;
    });
}
