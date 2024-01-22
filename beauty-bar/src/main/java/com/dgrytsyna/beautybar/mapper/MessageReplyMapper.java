package com.dgrytsyna.beautybar.mapper;
import com.dgrytsyna.beautybar.dto.MessageReplyDTO;
import com.dgrytsyna.beautybar.entity.Message;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.factory.Mappers;

import java.util.ArrayList;
import java.util.List;

@Mapper
public interface MessageReplyMapper {

    MessageReplyMapper INSTANCE = Mappers.getMapper(MessageReplyMapper.class);
    @Mapping(target = "adminEmail", source = "admin.email")
    MessageReplyDTO messageToMessageReplyDTO(Message message);

    default List<MessageReplyDTO> messageToMessageReplyDTOList(List<Message> messages) {
        List<MessageReplyDTO> messageReplyDTOS = new ArrayList<>();
        for (Message message : messages) {
            MessageReplyDTO messageReplyDTO = messageToMessageReplyDTO(message);
            messageReplyDTOS.add(messageReplyDTO);
        }
        return messageReplyDTOS;
    }
}
