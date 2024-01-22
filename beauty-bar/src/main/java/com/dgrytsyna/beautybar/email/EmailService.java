package com.dgrytsyna.beautybar.email;


import com.dgrytsyna.beautybar.exception.CouldNotCreateException;
import lombok.RequiredArgsConstructor;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class EmailService {
    private final JavaMailSender javaMailSender;

    public void sendReminder(String to, String msg){
        try {
            SimpleMailMessage message = new SimpleMailMessage();
            message.setTo(to);
            message.setSubject("We are waiting for you!");
            message.setText(msg);
            javaMailSender.send(message);
        }catch (Exception e) {throw new CouldNotCreateException();}

    }
}