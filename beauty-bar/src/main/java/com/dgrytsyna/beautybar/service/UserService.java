package com.dgrytsyna.beautybar.service;

import com.dgrytsyna.beautybar.dto.UserInfoDTO;
import com.dgrytsyna.beautybar.entity.Account;
import com.dgrytsyna.beautybar.entity.enums.EnumRole;
import com.dgrytsyna.beautybar.exception.CouldNotUpdateException;
import com.dgrytsyna.beautybar.exception.DataPersistenceException;
import com.dgrytsyna.beautybar.exception.IncorectPasswordException;
import com.dgrytsyna.beautybar.exception.NotFoundException;
import com.dgrytsyna.beautybar.repository.AccountRepository;
import com.dgrytsyna.beautybar.request.AccountChangeRoleRequest;
import com.dgrytsyna.beautybar.request.PasswordChangeRequest;
import com.dgrytsyna.beautybar.request.ProfileEdit;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class UserService {
    private AccountRepository accountRepository;

    PasswordEncoder encoder;
    @Autowired
    public UserService(AccountRepository accountRepository, PasswordEncoder encoder) {
        this.accountRepository = accountRepository;
        this.encoder = encoder;
    }

    public ProfileEdit getProfileInfo(String username){
        Optional<Account> user = accountRepository.findByEmail(username);
        if(user.isEmpty()) throw new NotFoundException();
        ProfileEdit profile = new ProfileEdit(user.get().getName(), user.get().getSurname(), user.get().getTel());
        return profile;
    }

    public ProfileEdit updateProfileInfo(String username, ProfileEdit profileEdit){
        Optional<Account> user = accountRepository.findByEmail(username);
        if(user.isEmpty()) throw new NotFoundException();
        try {
            user.get().setName(profileEdit.getName());
            user.get().setSurname(profileEdit.getSurname());
            user.get().setTel(profileEdit.getTel());
            accountRepository.save(user.get());
            return profileEdit;
        }catch (Exception e){
            throw new CouldNotUpdateException();
        }
    }

    public void updatePassword(String username, PasswordChangeRequest passwordChangeRequest){
        Optional<Account> user = accountRepository.findByEmail(username);
        if(user.isEmpty()) throw new NotFoundException();

            if (encoder.matches(passwordChangeRequest.getOldPassword(), user.get().getPassword())) {
                String newPasswordHash = encoder.encode(passwordChangeRequest.getNewPassword());
                user.get().setPassword(newPasswordHash);
                accountRepository.save(user.get());
            } else {
                throw new IncorectPasswordException();
            }

    }

    public List<UserInfoDTO> getAllUsers(){
        try {
            List<Account> accounts = accountRepository.findAllByAccRoleOrAccRole(EnumRole.ROLE_ADMIN, EnumRole.ROLE_USER, Sort.by("name", "surname"));
            List<UserInfoDTO> userInfoDTOS = new ArrayList<>();
            for(Account account: accounts){
                UserInfoDTO userInfoDTO = new UserInfoDTO();
                userInfoDTO.setId(account.getId());
                userInfoDTO.setName(account.getName());
                userInfoDTO.setSurname(account.getSurname());
                userInfoDTO.setTel(account.getTel());
                userInfoDTO.setEmail(account.getEmail());
                if(account.getAccRole()== EnumRole.ROLE_ADMIN)userInfoDTO.setAdmin(true);
                else userInfoDTO.setAdmin(false);
                userInfoDTOS.add(userInfoDTO);
            }
            return userInfoDTOS;
        } catch (Exception e ){
            throw new DataPersistenceException();
        }

    }

    public void changeUserRole(AccountChangeRoleRequest accountChangeRoleRequest){
        Optional<Account> account = accountRepository.findById(accountChangeRoleRequest.getId());
        if(account.isEmpty()) throw new NotFoundException();
        if(accountChangeRoleRequest.getAdmin())account.get().setAccRole(EnumRole.ROLE_USER);
        else account.get().setAccRole(EnumRole.ROLE_ADMIN);
        accountRepository.save(account.get());
    }

    public void deleteAccount(Integer id){
        Optional<Account> account = accountRepository.findById(id);
        if(account.isEmpty()) throw new NotFoundException();
        accountRepository.delete(account.get());
    }
}
