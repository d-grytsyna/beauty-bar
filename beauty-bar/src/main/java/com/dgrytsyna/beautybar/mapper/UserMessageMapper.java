package com.dgrytsyna.beautybar.mapper;

import com.dgrytsyna.beautybar.dto.MessageReplyDTO;
import com.dgrytsyna.beautybar.dto.UserMessageDTO;
import com.dgrytsyna.beautybar.entity.Message;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.factory.Mappers;

import java.util.ArrayList;
import java.util.List;

@Mapper
public interface UserMessageMapper {
    UserMessageMapper INSTANCE = Mappers.getMapper(UserMessageMapper.class);
    @Mapping(target = "name", source = "user.name")
    @Mapping(target = "surname", source = "user.surname")
    @Mapping(target = "tel", source = "user.tel")
    @Mapping(target = "email", source = "user.email")
    UserMessageDTO messageToUserMessageDTO(Message message);

    default List<UserMessageDTO> messageToUserMessageDTOList(List<Message> messages) {
        List<UserMessageDTO> userMessageDTOS = new ArrayList<>();
        for (Message message : messages) {
            UserMessageDTO userMessageDTO = messageToUserMessageDTO(message);
            userMessageDTOS.add(userMessageDTO);
        }
        return userMessageDTOS;
    }
}
