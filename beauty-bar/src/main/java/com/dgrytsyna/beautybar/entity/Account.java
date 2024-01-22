package com.dgrytsyna.beautybar.entity;
import com.dgrytsyna.beautybar.entity.enums.EnumRole;
import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;


@Builder
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name="account")
@Data
public class Account {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(name="email")
    private String email;

    @Column(name="acc_password")
    private String password;

    @Column(name="tel")
    private String tel;

    @Column(name="user_name")
    private String name;

    @Column(name="user_surname")
    private String surname;

    @Enumerated(EnumType.STRING)
    @Column(name = "acc_role")
    private EnumRole accRole;

    @JsonIgnore
    @OneToMany(mappedBy = "client", fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    private List<Appointment> appointments;

    @JsonIgnore
    @OneToMany(mappedBy = "user", fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    private List<RefreshToken> refreshTokens;

    @JsonIgnore
    @OneToMany(mappedBy = "client" , fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    private List<Receipt> receipts;

    @JsonIgnore
    @OneToMany(mappedBy = "user" , fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    private List<Message> userMessages;

    @JsonIgnore
    @OneToMany(mappedBy = "admin" , fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    private List<Message> adminMessages;


    public Account(String email, String password, String tel, String name, String surname, EnumRole accRole) {
        this.email = email;
        this.password = password;
        this.tel = tel;
        this.name = name;
        this.surname = surname;
        this.accRole = accRole;
    }

}
