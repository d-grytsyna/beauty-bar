package com.dgrytsyna.beautybar.service;

import com.dgrytsyna.beautybar.dto.MessageReplyDTO;
import com.dgrytsyna.beautybar.dto.UserMessageDTO;
import com.dgrytsyna.beautybar.entity.Account;
import com.dgrytsyna.beautybar.entity.Message;
import com.dgrytsyna.beautybar.exception.CouldNotCreateException;
import com.dgrytsyna.beautybar.exception.DataPersistenceException;
import com.dgrytsyna.beautybar.exception.NotFoundException;
import com.dgrytsyna.beautybar.mapper.MessageReplyMapper;
import com.dgrytsyna.beautybar.mapper.UserMessageMapper;
import com.dgrytsyna.beautybar.repository.AccountRepository;
import com.dgrytsyna.beautybar.repository.MessageRepository;
import com.dgrytsyna.beautybar.request.MessageReplyRequest;
import com.dgrytsyna.beautybar.request.MessageRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class MessageService {

    private AccountRepository accountRepository;

    private MessageRepository messageRepository;

    @Autowired
    public MessageService(AccountRepository accountRepository, MessageRepository messageRepository) {
        this.accountRepository = accountRepository;
        this.messageRepository = messageRepository;
    }
    public void addMessage(String username, MessageRequest messageRequest){
        Optional<Account> user = accountRepository.findByEmail(username);
        if(user.isEmpty()) throw new NotFoundException();
        try {
            Message message = new Message();
            message.setUser(user.get());
            message.setTitle(messageRequest.getTitle());
            message.setMessage(messageRequest.getMessage());
            message.setClosed(false);
            messageRepository.save(message);
        } catch (Exception e) {
            throw new CouldNotCreateException();
        }
    }

    public List<MessageReplyDTO> getAdminReplies(String username){
        Optional<Account> user = accountRepository.findByEmail(username);
        if(user.isEmpty()) throw new NotFoundException();
        try {
            List<Message> messages = messageRepository.findAllByUser(user.get());
            List<MessageReplyDTO> messageReplyDTOS = MessageReplyMapper.INSTANCE.messageToMessageReplyDTOList(messages);
            return messageReplyDTOS;
        } catch (Exception e) {
            throw new DataPersistenceException();
        }
    }

    public List<UserMessageDTO> getUserMessages(){
        try {
            List<Message> messages = messageRepository.findAllByClosed(false);
            List<UserMessageDTO> pendingMessages = UserMessageMapper.INSTANCE.messageToUserMessageDTOList(messages);
            return pendingMessages;
        }catch (Exception e){
            throw new DataPersistenceException();
        }
    }

    public void addAdminResponse(String username, MessageReplyRequest messageReplyRequest){
        Optional<Account> admin = accountRepository.findByEmail(username);
        Optional<Message> message = messageRepository.findById(messageReplyRequest.getId());
        if(message.isEmpty() || admin.isEmpty()) throw new NotFoundException();
        try {
            message.get().setAdmin(admin.get());
            message.get().setResponse(messageReplyRequest.getResponse());
            message.get().setClosed(true);
            messageRepository.save(message.get());
        }catch (Exception e){
            throw new DataPersistenceException();
        }
    }
}
