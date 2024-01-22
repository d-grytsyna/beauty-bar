package com.dgrytsyna.beautybar.controller;

import com.dgrytsyna.beautybar.dto.MessageReplyDTO;
import com.dgrytsyna.beautybar.dto.UserMessageDTO;
import com.dgrytsyna.beautybar.request.MessageReplyRequest;
import com.dgrytsyna.beautybar.request.MessageRequest;
import com.dgrytsyna.beautybar.service.MessageService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api")
public class MessageController {
    private MessageService messageService;

    @Autowired
    public MessageController(MessageService messageService) {
        this.messageService = messageService;
    }

    @PostMapping("/message")
    @PreAuthorize("hasRole('USER')")
    public void setMessage(@Valid @RequestBody MessageRequest messageRequest){
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        if (authentication != null && authentication.isAuthenticated()) {
            String username = authentication.getName();
            messageService.addMessage(username, messageRequest);
        } else throw new IllegalArgumentException();
    }


    @GetMapping("/message/reply")
    @PreAuthorize("hasRole('USER')")
    public List<MessageReplyDTO> getMessages(){
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        if (authentication != null && authentication.isAuthenticated()) {
            String username = authentication.getName();
            return messageService.getAdminReplies(username);
        } else throw new IllegalArgumentException();
    }

    @GetMapping("/admin/message")
    @PreAuthorize("hasRole('ADMIN')")
    public List<UserMessageDTO> getUserMessages(){
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        if (authentication != null && authentication.isAuthenticated()) {
            return messageService.getUserMessages();
        } else throw new IllegalArgumentException();
    }

    @PutMapping("/admin/message")
    @PreAuthorize("hasRole('ADMIN')")
    public void postReply(@Valid @RequestBody MessageReplyRequest messageReplyRequest, BindingResult bindingResult){
        if(bindingResult.hasErrors()) throw new IllegalArgumentException();
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        if (authentication != null && authentication.isAuthenticated()) {
            String username = authentication.getName();
            messageService.addAdminResponse(username, messageReplyRequest);
        } else throw new IllegalArgumentException();
    }

}
