import smtplib, ssl
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart


def send_mail(recievermail, scores, report):
    port = 465  # For SSL
    receiver_email = recievermail
    sender_email = "ashad001sp@gmail.com"
    password = "tessgggmtkzxahra"
    smtp_server = "smtp.gmail.com"
    scores = scores
    report = report
    message = MIMEMultipart("alternative")
    message["Subject"] = "Score and Report"
    message["From"] = sender_email  
    message["To"] = receiver_email
    text = f"Hi,\n\nHere are your recent scores: {scores[0]}, {scores[1]}, {scores[2]}.\n\n{report}"
    # HTML content
    html = f"""
        <html>
            <body>
                <p>Hi,<br>
                Here are your recent scores: {scores[0]}, {scores[1]}, {scores[2]}.<br>
                <br>
                {report}<br>
                <br>
                </p>
            </body>
        </html>
    """
    part1 = MIMEText(text, "plain")
    part2 = MIMEText(html, "html")

    # Add HTML/plain-text parts to MIMEMultipart message
    # The email client will try to render the last part first
    message.attach(part1)
    message.attach(part2)

    # Create a secure SSL context
    context = ssl.create_default_context()

    # Try to log in to server and send email
    try:
        server = smtplib.SMTP_SSL(smtp_server, port, context=context)
        server.login(sender_email, password)
        server.sendmail(sender_email, receiver_email, message.as_string())
        print("Email sent successfully!")
    except Exception as e:
        print(f"Something went wrong while sending the email: {e}")
    finally:
        server.quit()


scores = [10, 10, 10]
report = "This is a report"
send_mail("ashadq345@gmail.com", scores, report)



