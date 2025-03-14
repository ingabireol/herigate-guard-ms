package com.heritage.heritagebn.repository;

import com.heritage.heritagebn.entity.User;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {
    Optional<User> findByUsername(String username);
    Optional<User> findByLastName(String lastName);
    Optional<User> findByEmail(String email);
    
    @Query("SELECT u FROM User u WHERE LOWER(u.username) LIKE LOWER(CONCAT('%', :search, '%')) " +
           "OR LOWER(u.email) LIKE LOWER(CONCAT('%', :search, '%')) " +
           "OR LOWER(u.firstName) LIKE LOWER(CONCAT('%', :search, '%')) " +
           "OR LOWER(u.lastName) LIKE LOWER(CONCAT('%', :search, '%'))")
    Page<User> search(@Param("search") String search, Pageable pageable);
    
    boolean existsByUsername(String username);
    
    boolean existsByEmail(String email);
    
    Optional<User> findByProviderAndProviderId(User.AuthProvider provider, String providerId);
}